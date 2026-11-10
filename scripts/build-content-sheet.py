"""
Builds "TAGT Website Content Sheet" as a .docx (pictures, tables, formatting) for upload
to Google Drive, where it converts to a Google Doc. Spec: docs/prompts/content-sheet-prompt.md

Inputs: content/sheet-rows.json (numbers found on the built site, from scripts/read-sheet-rows.mjs),
        content/sheet-seed.json (the words), content/page-pictures/*.png (numbered pictures).
Usage:  python3 scripts/build-content-sheet.py
"""
import io, json
from pathlib import Path
from PIL import Image
from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.enum.text import WD_BREAK
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "content" / "TAGT Website Content Sheet.docx"
MISSING = "[Needs your words]"
HEADER_FILL, MISSING_FILL = "E9DDF0", "FFF2CC"

PAGES = {
    "0-every-page": ("Every page (top menu, bottom footer, service times)",
                     "These parts show on every page of the website. The picture is the Home page, numbered only for the top menu, the service times, and the footer."),
    "1-home": ("Home", "The first page people see: a welcome, service times, the latest message, what's coming up, and giving."),
    "2-about": ("About", "Who we are and what we believe."),
    "3-visit-us": ("Visit Us", "Everything a first-time guest needs: service times, directions, what to expect, and a form to tell us they're coming."),
    "4-ministries": ("Ministries", "Our ministries and when they meet."),
    "5-teachings": ("Teachings", "Where people watch the live service and past messages."),
    "6-events": ("Events", "The church calendar and what's coming up."),
    "7-prayer-requests": ("Prayer Requests", "Where people send a prayer request and choose who can see it."),
    "8-give": ("Give", "Ways to give, and how to reach the church."),
    "9-our-beliefs": ("About: Our Beliefs", "The full Our Beliefs page. The title and short line at the top come from the About section (#10 and #11), so change them there."),
    "10-our-mission": ("About: Our Mission", "The full Our Mission page. The title and short line at the top come from the About section (#12 and #13), so change them there."),
    "11-our-heart": ("About: Our Heart", "The full Our Heart page. The title and short line at the top come from the About section (#14 and #15), so change them there."),
    "12-ministry-youth": ("Ministry: Youth", "The Youth Ministry page. The ministry's name here is also what shows in the Ministries menu."),
    "13-ministry-prayer": ("Ministry: Sunday Morning Prayer", "The Sunday Morning Prayer page."),
    "14-ministry-bible-study": ("Ministry: Bible Study", "The Bible Study page."),
    "15-ministry-women": ("Ministry: Women of Glory", "The Women of Glory page. Parts that say [Needs your words] stay hidden on the website until you fill them in."),
    "16-ministry-men": ("Ministry: Men of Glory", "The Men of Glory page."),
    "17-ministry-one-sound": ("Ministry: One Sound", "The One Sound (sound and media team) page."),
    "18-ministry-one-accord": ("Ministry: One Accord", "The One Accord (worship team) page."),
    "19-event-page": ("Event page", "Every event has its own page. This section holds the words that are the same on every event page. The event's name, day, and time come from the \u201cEvery page\u201d section. The picture shows the Worship Service page."),
    "20-give-online": ("Give Online (giving form)", "The online giving form. Tell us if the list of funds or the how-often choices should change."),
}

seed = {p["slug"]: {r["n"]: r for r in p["rows"]} for p in json.loads((ROOT / "content/sheet-seed.json").read_text())}
site = {p["slug"]: p["rows"] for p in json.loads((ROOT / "content/sheet-rows.json").read_text())}


def shade(cell, fill):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear"); shd.set(qn("w:color"), "auto"); shd.set(qn("w:fill"), fill)
    tcPr.append(shd)


def repeat_header(row):
    trPr = row._tr.get_or_add_trPr()
    el = OxmlElement("w:tblHeader"); el.set(qn("w:val"), "true"); trPr.append(el)


def set_width(table, widths):
    table.autofit = False
    tbl = table._tbl
    tblPr = tbl.tblPr
    w = OxmlElement("w:tblW"); w.set(qn("w:w"), "5000"); w.set(qn("w:type"), "pct")  # full page width
    for old in tblPr.findall(qn("w:tblW")) + tblPr.findall(qn("w:tblLayout")): tblPr.remove(old)
    tblPr.append(w)
    layout = OxmlElement("w:tblLayout"); layout.set(qn("w:type"), "fixed"); tblPr.append(layout)
    grid = tbl.tblGrid
    for i, gc in enumerate(grid.findall(qn("w:gridCol"))):
        gc.set(qn("w:w"), str(int(widths[i] * 1440)))
    for row in table.rows:
        for i, cell in enumerate(row.cells):
            cell.width = Inches(widths[i])


def cell_text(cell, text, bold=False):
    cell.text = ""
    p = cell.paragraphs[0]
    if text.startswith(MISSING):
        r = p.add_run(MISSING); r.bold = True
        rest = text[len(MISSING):]
        if rest: p.add_run(rest)
        shade(cell, MISSING_FILL)
    else:
        r = p.add_run(text); r.bold = bold


def add_table(doc, headers, rows, widths):
    t = doc.add_table(rows=1, cols=4)
    t.style = "Table Grid"
    t.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, h in enumerate(headers):
        cell_text(t.rows[0].cells[i], h, bold=True); shade(t.rows[0].cells[i], HEADER_FILL)
    repeat_header(t.rows[0])
    for r in rows:
        cells = t.add_row().cells
        cell_text(cells[0], str(r["n"])); cell_text(cells[1], r["label"]); cell_text(cells[2], r["now"]); cell_text(cells[3], "")
        for c in cells: c.paragraphs[0].paragraph_format.space_after = Pt(4)
    set_width(t, widths)
    return t


def add_picture(doc, slug, title):
    """Adds the numbered page picture at full width, split into page-sized pieces."""
    im = Image.open(ROOT / "content/page-pictures" / f"{slug}.png").convert("RGB")
    w, h = im.size
    step = int(w * 1.25)
    parts = list(range(0, h, step))
    for i, top in enumerate(parts):
        piece = im.crop((0, top, w, min(h, top + step)))
        buf = io.BytesIO(); piece.save(buf, "PNG", optimize=True); buf.seek(0)
        doc.add_picture(buf, width=Inches(6.5))
        pic = doc.paragraphs[-1]._p.xpath(".//wp:docPr")[0]
        part = f", part {i + 1} of {len(parts)}" if len(parts) > 1 else ""
        pic.set("descr", f"The {title} page of the website with gold numbered circles{part}.")
        pic.set("title", f"{title} page picture")


doc = Document()
sec = doc.sections[0]
sec.left_margin = sec.right_margin = Inches(1)
for name in ["Normal", "Title", "Heading 1", "Heading 2", "Heading 3", "List Number", "List Bullet"]:
    st = doc.styles[name]
    st.font.name = "Arial"
    st.element.rPr.rFonts.set(qn("w:eastAsia"), "Arial") if st.element.rPr is not None else None
doc.styles["Normal"].font.size = Pt(11)
for name in ["Title", "Heading 1", "Heading 2", "Heading 3"]:
    doc.styles[name].font.color.rgb = RGBColor(0, 0, 0)

doc.add_paragraph("TAGT Website Content Sheet", style="Title")
doc.add_paragraph("This is where you tell us what to change on the website. Find your page, find the number, type your new words. That's it.")

doc.add_heading("Start here (1 minute)", level=1)
for s in [
    "Scroll to your page. Each page has a picture with gold numbered circles on it.",
    "Find the same number in the table under the picture. The “What it says now” column is what the website says today.",
    "Want to change it? Type your new words in the last column. If it's fine, leave that box empty.",
]:
    doc.add_paragraph(s, style="List Number")
p = doc.add_paragraph()
p.add_run("Photos: ").bold = True
p.add_run("the purple striped boxes are photo spots. Put your photo in the TAGT Photos folder, then type the photo's file name in the last column of the photo table.")
doc.add_heading("Good to know", level=2)
for parts in [
    [("You can't break the website by typing here. Nothing changes on the live website until Dani reviews it.", False)],
    [("Please don't change the numbers.", False)],
    [(MISSING, True), (" means we don't have this yet. Please fill it in.", False)],
    [("Service times, menu words, and the footer only live in the “Every page” section. Change them there once and they change everywhere.", False)],
]:
    p = doc.add_paragraph(style="List Bullet")
    for t, b in parts:
        p.add_run(t).bold = b

counts = {}
for slug, (title, purpose) in PAGES.items():
    doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)
    doc.add_heading(title, level=2)
    doc.add_paragraph(purpose)
    add_picture(doc, slug, title.split(" (")[0])
    found = site[slug]
    rows = [dict(seed[slug][r["n"]], now=seed[slug][r["n"]]["now"].strip()) for r in found]
    words = [r for r in rows if r["kind"] == "text"]
    photos = [r for r in rows if r["kind"] == "photo"]
    doc.add_heading("Words", level=3)
    add_table(doc, ["#", "Part of the page", "What it says now", "Your new words (leave blank to keep)"], words, [0.4, 1.5, 2.2, 2.4])
    if photos:
        doc.add_heading("Photos", level=3)
        add_table(doc, ["#", "Photo spot", "What is there now", "Photo file name (type it here)"], photos, [0.4, 1.5, 2.2, 2.4])
    counts[slug] = (sorted(r["n"] for r in found), sorted(r["n"] for r in words + photos))

doc.add_paragraph().add_run().add_break(WD_BREAK.PAGE)
doc.add_heading("For Dani and Claude Code only (team can skip this)", level=1)
doc.add_paragraph("How an import works:")
for parts in [
    [("Export this doc as Markdown to ", False), ("/content/site-copy.md", "code"), (". Photos go in ", False), ("/content/images/", "code"), (".", False)],
    [("A row is identified by page section plus number (for example ", False), ("3-visit-us #5", "code"), (").", False)],
    [("Only rows where “Your new words” or “Photo file name” is not empty get imported. Empty means keep what's live.", False)],
    [("Write photo alt text from the image itself.", False)],
    [("Do not renumber. New spots get the next unused number in their section.", False)],
    [("Run the import script, ", False), ("scripts/import-content", "code"), (" (being built next). Report every change, and never publish without Dani's go-ahead.", False)],
]:
    p = doc.add_paragraph(style="List Bullet")
    for t, kind in parts:
        r = p.add_run(t)
        if kind == "code":
            r.font.name = "Courier New"
p = doc.add_paragraph("Section keys: ")
p.add_run(", ".join(PAGES)).font.name = "Courier New"

doc.save(OUT)
bad = {k: v for k, v in counts.items() if v[0] != v[1]}
print("saved", OUT.relative_to(ROOT), f"{OUT.stat().st_size/1e6:.1f} MB")
print("number check:", "all pages match" if not bad else bad)
