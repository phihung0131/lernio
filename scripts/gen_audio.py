"""Sinh MP3 bằng Piper từ .audio-manifest.json. Chỉ sinh file còn thiếu.
Dùng: python scripts/gen_audio.py <voice.onnx>
"""
import json, subprocess, sys, wave, os, tempfile
from pathlib import Path
from piper import PiperVoice

voice = PiperVoice.load(sys.argv[1])
manifest = json.loads(Path(".audio-manifest.json").read_text())
out = Path("public/audio"); out.mkdir(parents=True, exist_ok=True)
todo = {k: t for k, t in manifest.items() if not (out / f"{k}.mp3").exists()}
print(f"{len(todo)} file cần sinh / {len(manifest)}")
for i, (k, text) in enumerate(todo.items()):
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        wav = tmp.name
    with wave.open(wav, "wb") as w:
        voice.synthesize_wav(text, w)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-ac", "1", "-b:a", "40k", str(out / f"{k}.mp3")], check=True)
    os.unlink(wav)
    if i % 100 == 0: print(i, flush=True)
