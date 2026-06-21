# OtherPhone / SafetyMode — Shopify Page JSON Templates

This project generates Shopify page JSON templates for the OtherPhone/SafetyMode store. Pages are uploaded via Shopify Admin > Online Store > Pages > Import.

---

## How to generate a page

Run this command from this directory:

```bash
python3 build_<page-name>.py
```

This writes a `page.<handle>.json` file ready to upload to Shopify.

To generate a new page, create a Python script that uses `json.dump()` to write the JSON. Always use `json.dump()` — never build JSON strings by hand.

---

## File naming

| File | Purpose |
|------|---------|
| `page.<handle>.json` | Shopify page template, matches the page handle in the admin |
| `build_<handle>.py` | Script that generates the JSON |

Examples:
- `page.why-it-works-independence.json`
- `page.guide-landing.json`
- `page.live-content-blocking.json`

---

## Page JSON structure

Every page follows this structure:

```python
page = {
    "sections": {
        "main": {
            "type": "main-page",
            "disabled": True,
            "settings": {
                "heading_hide": True,
                "show_title": False
            }
        },
        "my_section": {
            "type": "custom-liquid",
            "settings": {
                "custom_liquid": "<style>...</style>\n<section>...</section>"
            }
        },
        "forms": {
            "type": "apps",
            "blocks": {
                "6f6482df-897a-4786-a626-0e33d25b2c3e": {
                    "type": "shopify://apps/forms/blocks/inline/8744a304-fcb1-4347-b211-bb6b4759a76a",
                    "settings": {
                        "form_id": "1006637",
                        "button_background_color": "#202020",
                        "button_label_color": "#ffffff",
                        "text_alignment": "left",
                        "form_alignment": "left",
                        "padding_top": 0,
                        "padding_bottom": 24
                    }
                }
            },
            "block_order": ["6f6482df-897a-4786-a626-0e33d25b2c3e"],
            "settings": {"include_margins": True}
        }
    },
    "order": ["main", "my_section", "forms"]
}
```

**Rules:**
- `main` section is always first in `order`, always `disabled: True` and `heading_hide: True`
- Custom HTML goes in `"custom_liquid"` (NOT `"liquid"`)
- Section type for custom HTML is `"custom-liquid"` (with hyphen)
- Shopify Forms app block uses the exact `type` URL above with `form_id: 1006637`
- Block IDs must be unique UUIDs — use different ones for each forms instance on the same page

---

## CSS conventions

### Global stylesheet
The `<style>` block goes inside the FIRST custom-liquid section only. All subsequent sections inherit these classes.

### Class prefixes by page

| Prefix | Page |
|--------|------|
| `.lp-` | Landing/guide pages |
| `.ind-` | Independence (Why it works) |
| `.lt-` | Location Tracking |
| `.rsp-` | RSP |
| `.as-` | App Scheduling |
| `.lcb-` | Live Content Blocking |
| `.hw-` | Hardware |
| `.witb-` | What's in the box |
| `.sf-acc-` | Safety features accordion |

### Key design tokens

```css
/* Brand colours */
--green: #1D9E75       /* eyebrow, card numbers, accents */
--dark: #111714        /* headings */
--body: #555           /* body text */
--muted: #777          /* secondary text */
--bg-light: #F7FAF6    /* card and section backgrounds */
--risk-bg: #FEEDE6     /* coral/risk cards */
--risk-label: #993C1D
--risk-text: #3D1A0C
--reality-bg: #E1F5EE  /* green/reality cards */
--reality-label: #0F6E56
--reality-text: #04342C

/* Spacing */
--section-padding: 72px 0   /* desktop */
--section-padding-mobile: 40px 0
--wrap-padding: 0 80px      /* desktop */
--wrap-padding-mobile: 0 24px
--max-width: 1200px (landing pages), 1440px (feature pages)

/* Mobile breakpoint */
@media(max-width:749px)
```

### Required on all colour/font declarations

All colour and font-size declarations need `!important` to override Shopify's theme colour scheme:

```css
.lp-h1{font-size:42px!important;font-weight:700!important;color:#111714!important}
.lp-body{font-size:16px!important;color:#555!important}
```

### Mobile responsive pattern

```css
/* Desktop first, then override for mobile */
.lp-two-col{display:flex;gap:48px;align-items:center}
@media(max-width:749px){
  .lp-two-col{flex-direction:column;gap:24px}
}

/* Hide on mobile */
.lp-desktop-only{display:block}
@media(max-width:749px){.lp-desktop-only{display:none!important}}

/* Hide on desktop, show on mobile */
.lp-mobile-only{display:none!important}
@media(max-width:749px){.lp-mobile-only{display:block!important}}
```

---

## Copy rules — CRITICAL

1. **NEVER use em dashes** (`—`)
2. **NEVER use `--` as a substitute for an em dash** — use a comma or plain English instead
3. Use plain apostrophes and quotes in HTML strings (they get JSON-escaped automatically by `json.dump()`)

After generating a JSON file, always verify:

```python
with open("page.example.json") as f:
    content = f.read()
assert "--" not in content, "Double hyphens found"
```

---

## CDN assets

```
Base: https://cdn.shopify.com/s/files/1/0955/3366/2543/files/

Key images:
- Boy_on_ground.png?v=1781876713
- Online_Safety_Guide_Landing_Page.png?v=1780579702
- Activation_Products_8_6.png?v=1778234626

Key videos:
- 6561ba1acf3c40538cee3784cf13ac9d.mov  (live content blocking demo)

Guide PDF:
- Web_-_pages_SafetyMode_-_Phone_Safety_for_Teens_Kids.pdf?v=1780578202
```

---

## Standard section patterns

### Two-column layout (text left, media right)

```html
<div class="lp-two-col">
  <div class="lp-col-text">
    <p class="lp-eyebrow">EYEBROW TEXT</p>
    <h2 class="lp-h2">Heading here</h2>
    <p class="lp-body">Body text here.</p>
  </div>
  <div class="lp-col-media" style="height:400px">
    <img src="[CDN URL]" alt="Description">
  </div>
</div>
```

### Video in media column

```html
<video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover">
  <source src="https://cdn.shopify.com/videos/c/o/v/[hash].mov" type="video/mp4">
</video>
```

### CTA button

```html
<a href="/pages/[handle]" class="lp-btn">Button text</a>
```

```css
.lp-btn{display:inline-block;background:#111714!important;color:#fff!important;
  font-family:inherit;font-size:15px!important;font-weight:700!important;
  padding:14px 28px;border-radius:100px;text-decoration:none!important;line-height:1}
```

### Stat cards (tension layout)

```html
<div class="lp-stat-cards" style="display:flex;gap:16px">
  <div class="lp-stat-card" style="background:#FEEDE6;flex:1;border-radius:16px;padding:24px">
    <p style="color:#993C1D;font-size:11px;font-weight:700;text-transform:uppercase">RISK</p>
    <p style="color:#3D1A0C;font-size:36px;font-weight:800">72%</p>
    <p style="color:#3D1A0C">Stat body text</p>
  </div>
  <div class="lp-stat-card" style="background:#E1F5EE;flex:1;border-radius:16px;padding:24px">
    <p style="color:#0F6E56;font-size:11px;font-weight:700;text-transform:uppercase">REALITY</p>
    <p style="color:#04342C;font-size:36px;font-weight:800">98%</p>
    <p style="color:#04342C">Stat body text</p>
  </div>
</div>
```

---

## Generating a new page — quick template

```python
import json

def build():
    style = """<style>
*{box-sizing:border-box}
.lp-wrap{max-width:1200px;margin:0 auto;padding:0 80px}
.lp-section{padding:64px 0}
/* ... add classes as needed ... */
@media(max-width:749px){
  .lp-wrap{padding:0 24px}
  .lp-section{padding:40px 0}
}
</style>"""

    section_1 = style + """
<section class="lp-section">
  <div class="lp-wrap">
    <!-- content -->
  </div>
</section>"""

    page = {
        "sections": {
            "main": {
                "type": "main-page",
                "disabled": True,
                "settings": {"heading_hide": True, "show_title": False}
            },
            "section_1": {
                "type": "custom-liquid",
                "settings": {"custom_liquid": section_1}
            }
        },
        "order": ["main", "section_1"]
    }

    out = "page.my-page.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(page, f, indent=2, ensure_ascii=False)

    with open(out) as f:
        content = f.read()
    assert "--" not in content, "Double hyphens found — fix before uploading"
    print(f"Written: {out} ({len(content)} chars)")

build()
```
