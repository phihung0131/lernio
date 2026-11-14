export default function Placeholder({ title }: { title: string }) {
  return (
    <section>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted">Sắp có ở đợt tiếp theo.</p>
    </section>
  )
}
