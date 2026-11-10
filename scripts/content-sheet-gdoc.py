"""
Builds Google Docs API requests that append one content-sheet section to the end of the
"TAGT Website Content Sheet" Google Doc, matching the existing sections (page break,
Heading 2, description, picture pieces, Words table, Photos table).

Usage: python3 scripts/content-sheet-gdoc.py <insert index> <commit sha> <section> [<section> ...] > requests.json
  insert index = the doc's body end index - 1 (the last empty paragraph)
Pictures come from content/page-pictures/doc/ on GitHub at <commit sha> (the repo is public).
"""
import json, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "scripts"))
MISSING = "[Needs your words]"
HEADER = {"red": 0.9137255, "green": 0.8666667, "blue": 0.9411765}
YELLOW = {"red": 1, "green": 0.9490196, "blue": 0.8}
WIDTHS = [28.8, 108, 158.4, 172.8]

ns = {}
exec(compile((ROOT / "scripts/build-content-sheet.py").read_text().split("seed = {")[0].split("PAGES = ")[1].join(["PAGES = ", ""]), "pages", "exec"), ns)
PAGES = ns["PAGES"]
seed = {p["slug"]: {r["n"]: r for r in p["rows"]} for p in json.loads((ROOT / "content/sheet-seed.json").read_text())}
site = {p["slug"]: p["rows"] for p in json.loads((ROOT / "content/sheet-rows.json").read_text())}


def u16(s):
    return len(s.encode("utf-16-le")) // 2


def table_requests(i, header, rows):
    """Insert a filled 4-column table at index i (end of the paragraph it follows).
    Returns (requests, index right after the table)."""
    R, C = len(rows) + 1, 4
    cells = [header] + [[str(r["n"]), r["label"], r["now"], ""] for r in rows]
    reqs = [{"insertTable": {"rows": R, "columns": C, "location": {"index": i}}}]
    for r in range(R - 1, -1, -1):
        for c in range(C - 1, -1, -1):
            if cells[r][c]:
                reqs.append({"insertText": {"location": {"index": i + 4 + r * (2 * C + 1) + 2 * c}, "text": cells[r][c]}})
    start = i + 1
    loc = lambda r, c: {"tableStartLocation": {"index": start}, "rowIndex": r, "columnIndex": c}
    # positions after filling
    pos, offset = {}, 0
    for r in range(R):
        for c in range(C):
            pos[(r, c)] = i + 4 + r * (2 * C + 1) + 2 * c + offset
            offset += u16(cells[r][c])
    total = offset
    end = i + 3 + R * (2 * C + 1) + total  # the empty paragraph after the table
    # cells and the empty paragraph after the table are body text, not the heading above
    reqs.append({"updateParagraphStyle": {"range": {"startIndex": start, "endIndex": end + 1}, "paragraphStyle": {"namedStyleType": "NORMAL_TEXT"}, "fields": "namedStyleType"}})
    reqs.append({"updateTextStyle": {"range": {"startIndex": start, "endIndex": end}, "textStyle": {}, "fields": "bold,italic"}})
    for c in range(C):
        if cells[0][c]:
            reqs.append({"updateTextStyle": {"range": {"startIndex": pos[(0, c)], "endIndex": pos[(0, c)] + u16(cells[0][c])}, "textStyle": {"bold": True}, "fields": "bold"}})
    reqs.append({"updateTableCellStyle": {"tableRange": {"tableCellLocation": loc(0, 0), "rowSpan": 1, "columnSpan": C},
                 "tableCellStyle": {"backgroundColor": {"color": {"rgbColor": HEADER}}}, "fields": "backgroundColor"}})
    for r in range(1, R):
        if cells[r][2].startswith(MISSING):
            reqs.append({"updateTextStyle": {"range": {"startIndex": pos[(r, 2)], "endIndex": pos[(r, 2)] + u16(MISSING)}, "textStyle": {"bold": True}, "fields": "bold"}})
            reqs.append({"updateTableCellStyle": {"tableRange": {"tableCellLocation": loc(r, 2), "rowSpan": 1, "columnSpan": 1},
                         "tableCellStyle": {"backgroundColor": {"color": {"rgbColor": YELLOW}}}, "fields": "backgroundColor"}})
    for c, w in enumerate(WIDTHS):
        reqs.append({"updateTableColumnProperties": {"tableStartLocation": {"index": start}, "columnIndices": [c],
                     "tableColumnProperties": {"widthType": "FIXED_WIDTH", "width": {"magnitude": w, "unit": "PT"}}, "fields": "width,widthType"}})
    reqs.append({"pinTableHeaderRows": {"tableStartLocation": {"index": start}, "pinnedHeaderRowsCount": 1}})
    return reqs, end


def section_requests(slug, q, sha):
    title, purpose = PAGES[slug]
    reqs = [{"insertPageBreak": {"location": {"index": q}}}]
    q += 2
    for text, style in [(title, "HEADING_2"), (purpose, "NORMAL_TEXT")]:
        reqs.append({"insertText": {"location": {"index": q}, "text": text + "\n"}})
        reqs.append({"updateParagraphStyle": {"range": {"startIndex": q, "endIndex": q + u16(text) + 1}, "paragraphStyle": {"namedStyleType": style}, "fields": "namedStyleType"}})
        q += u16(text) + 1
    pieces = sorted((ROOT / "content/page-pictures/doc").glob(f"{slug}-*.png"), key=lambda p: int(p.stem.rsplit("-", 1)[1]))
    from PIL import Image
    for p in pieces:
        w, h = Image.open(p).size
        reqs.append({"insertInlineImage": {"location": {"index": q}, "uri": f"https://raw.githubusercontent.com/dazzlindezigns/tagt/{sha}/content/page-pictures/doc/{p.name}",
                     "objectSize": {"width": {"magnitude": 468, "unit": "PT"}, "height": {"magnitude": round(468 * h / w, 1), "unit": "PT"}}}})
        reqs.append({"insertText": {"location": {"index": q + 1}, "text": "\n"}})
        q += 2
    rows = [dict(seed[slug][r["n"]], now=seed[slug][r["n"]]["now"].strip()) for r in site[slug]]
    words = [r for r in rows if r["kind"] == "text"]
    photos = [r for r in rows if r["kind"] == "photo"]
    # Headings are styled after their table goes in: inserting a table resets the paragraph before it.
    h3 = lambda a: {"updateParagraphStyle": {"range": {"startIndex": a, "endIndex": a + 1}, "paragraphStyle": {"namedStyleType": "HEADING_3"}, "fields": "namedStyleType"}}
    reqs.append({"insertText": {"location": {"index": q}, "text": "Words\n"}})
    words_at = q
    q += 6
    t, after = table_requests(q - 1, ["#", "Part of the page", "What it says now", "Your new words (leave blank to keep)"], words)
    reqs += t
    reqs.append(h3(words_at))
    if photos:
        # the empty paragraph after the table becomes the "Photos" heading
        reqs.append({"insertText": {"location": {"index": after}, "text": "Photos"}})
        photos_at = after
        t2, after = table_requests(after + 6, ["#", "Photo spot", "What is there now", "Photo file name (type it here)"], photos)
        reqs += t2
        reqs.append(h3(photos_at))
    # the doc now ends: table, one empty paragraph (at `after`), the final empty paragraph
    return reqs, after + 1


if __name__ == "__main__":
    # python3 content-sheet-gdoc.py <insert index> <sha> <section> [<section> ...]
    q, sha, slugs = int(sys.argv[1]), sys.argv[2], sys.argv[3:]
    out = []
    for slug in slugs:
        r, q = section_requests(slug, q, sha)
        out += r
    print(json.dumps(out, ensure_ascii=False, separators=(",", ":")))
    print("next insert index:", q, file=sys.stderr)
