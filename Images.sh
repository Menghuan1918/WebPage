#!/bin/bash

TARGET_DIR=./content/images

if [ -z "$TARGET_DIR" ]; then
  echo "Usage: $0 <directory>"
  exit 1
fi

find "$TARGET_DIR" -type f -iname "*.png" | while read filename; do
  marker="${filename}.done"

  if [ -f "$marker" ]; then
    echo "Skip $filename"
    continue
  fi

  mogrify -resize 1920x1080\> "$filename"

  pngquant --force --output "$filename" --quality=65-80 "$filename"

  touch "$marker"
done

echo "Done!"
