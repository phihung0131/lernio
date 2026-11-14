-- Lernio: schema + RLS. Chạy trong Supabase SQL editor hoặc `supabase db push`.

create table public.profiles (
  user_id uuid primary key references auth.users on delete cascade,
  display_name text,
  daily_goal_xp int not null default 30,
  settings jsonb not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lesson_progress (
  user_id uuid not null references auth.users on delete cascade,
  lesson_id text not null,
  status text not null check (status in ('not_started','in_progress','completed')),
  best_score numeric,
  completed_at timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create table public.chapter_results (
  user_id uuid not null references auth.users on delete cascade,
  chapter_id text not null,
  attempts int not null default 0,
  best_score numeric not null default 0,
  passed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, chapter_id)
);

create table public.srs_cards (
  user_id uuid not null references auth.users on delete cascade,
  card_id text not null,
  kind text not null check (kind in ('vocab','grammar')),
  due timestamptz not null,
  stability double precision not null default 0,
  difficulty double precision not null default 0,
  reps int not null default 0,
  lapses int not null default 0,
  state int not null default 0,
  last_review timestamptz,
  updated_at timestamptz not null default now(),
  primary key (user_id, card_id)
);

create table public.review_logs (
  id uuid primary key,
  user_id uuid not null references auth.users on delete cascade,
  card_id text not null,
  rating int not null check (rating between 1 and 4),
  reviewed_at timestamptz not null,
  state_before jsonb
);

create table public.xp_events (
  id uuid primary key,
  user_id uuid not null references auth.users on delete cascade,
  amount int not null,
  source text not null,
  day date not null,
  created_at timestamptz not null default now()
);

create table public.badges (
  user_id uuid not null references auth.users on delete cascade,
  badge_id text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

-- RLS: chỉ chủ sở hữu.
do $$
declare t text;
begin
  foreach t in array array['profiles','lesson_progress','chapter_results','srs_cards','review_logs','xp_events','badges']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy "own select" on public.%I for select using (auth.uid() = user_id)', t);
    execute format('create policy "own insert" on public.%I for insert with check (auth.uid() = user_id)', t);
    execute format('create policy "own update" on public.%I for update using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
    execute format('create policy "own delete" on public.%I for delete using (auth.uid() = user_id)', t);
  end loop;
end $$;

-- Tự tạo profile khi đăng ký.
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (user_id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email,'@',1)));
  return new;
end $$;

create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();
