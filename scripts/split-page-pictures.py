"""Splits each numbered page picture into page-sized pieces (1000 x 1250 px) for the
Google Doc, saved to content/page-pictures/doc/<section>-<n>.png. Usage: python3 scripts/split-page-pictures.py"""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parent.parent
src, out = root / "content/page-pictures", root / "content/page-pictures/doc"
out.mkdir(exist_ok=True)
for old in out.glob("*.png"):
    old.unlink()
for f in sorted(src.glob("*.png")):
    im = Image.open(f).convert("RGB")
    w, h = im.size
    step = int(w * 1.25)
    for i, top in enumerate(range(0, h, step), 1):
        im.crop((0, top, w, min(h, top + step))).save(out / f"{f.stem}-{i}.png", optimize=True)
print(len(list(out.glob("*.png"))), "pieces")
