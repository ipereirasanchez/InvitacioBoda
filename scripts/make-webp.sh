#!/usr/bin/env bash
# Genera els WebP de src/assets/ a partir dels originals (ImageMagick 6).
set -euo pipefail
cd "$(dirname "$0")/.."
for name in noltros mans finca; do
  convert "docs/referencia/originals/$name.png" -resize '1200x1200>' -quality 82 \
    -define webp:alpha-quality=90 "src/assets/$name.webp"
done
# La marca d'aquarel·la és un SVG de 5 MB (2.200 traços): es rasteritza amb Chrome
# a 1600×798 (proporció del viewBox 2006×1000) i es desa com a WebP amb transparència.
tmp="$(mktemp --suffix=.png)"
node scripts/raster-svg.mjs docs/referencia/originals/marca-aquarela.svg "$tmp" 1600 798
convert "$tmp" -quality 80 -define webp:alpha-quality=80 src/assets/marca-aquarela.webp
rm -f "$tmp"
