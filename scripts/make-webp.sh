#!/usr/bin/env bash
# Genera els WebP de src/assets/ a partir dels originals (ImageMagick 6).
set -euo pipefail
cd "$(dirname "$0")/.."
for name in noltros mans finca; do
  convert "docs/referencia/originals/$name.png" -resize '1200x1200>' -quality 82 \
    -define webp:alpha-quality=90 "src/assets/$name.webp"
done
