#!/usr/bin/env bash
# Gom câu, sinh audio 2 giọng, dọn file thừa. Cần: VOICE_M, VOICE_F (đường dẫn .onnx), PIPER_PY (python có piper-tts).
set -euo pipefail
npx tsx scripts/collect-audio.ts
"${PIPER_PY:-python3}" scripts/gen_audio.py "$VOICE_M" "$VOICE_F"
npx tsx scripts/prune-audio.ts
