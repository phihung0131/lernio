"""Sinh MP3 bằng Piper từ .audio-manifest.json ({key: {text, voice}}). Chỉ sinh file còn thiếu.
Dùng: python scripts/gen_audio.py <giọng_nam.onnx> <giọng_nữ.onnx>
"""
import json, subprocess, sys, wave, os, tempfile
from pathlib import Path
from piper import PiperVoice

voices = {"m": PiperVoice.load(sys.argv[1]), "f": PiperVoice.load(sys.argv[2] if len(sys.argv) > 2 else sys.argv[1])}
manifest = json.loads(Path(".audio-manifest.json").read_text())
out = Path("public/audio"); out.mkdir(parents=True, exist_ok=True)
todo = {k: v for k, v in manifest.items() if not (out / f"{k}.mp3").exists()}
print(f"{len(todo)} file cần sinh / {len(manifest)}")
for i, (k, item) in enumerate(todo.items()):
    text, voice = (item, "m") if isinstance(item, str) else (item["text"], item.get("voice", "m"))
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
        wav = tmp.name
    with wave.open(wav, "wb") as w:
        voices[voice].synthesize_wav(text, w)
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", wav, "-ac", "1", "-b:a", "40k", str(out / f"{k}.mp3")], check=True)
    os.unlink(wav)
    if i % 200 == 0: print(i, flush=True)
