#!/usr/bin/env python3
"""Download public Liqui Moly imagery for local use."""
from __future__ import annotations

import re
import urllib.request
from pathlib import Path

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"}
OUT = Path(__file__).resolve().parents[1] / "public" / "assets" / "images" / "lm"
OUT.mkdir(parents=True, exist_ok=True)

PAGES = [
    "https://www.liqui-moly.com/en/in/",
    "https://www.liqui-moly.com/en/in/company/sponsoring/motorsports.html",
    "https://www.liqui-moly.com/en/in/products/areas-of-use/car.html",
    "https://www.liqui-moly.com/en/in/products/product-groups/engine-oils.html",
    "https://www.liqui-moly.com/en/us/company/sponsoring/motorsports.html",
    "https://www.liqui-moly.com/en/in/press/press-releases.html",
]

# Known public fileadmin / CDN candidates (homepage + motorsport).
SEED = [
    # Logo
    "https://www.liqui-moly.com/typo3conf/ext/theme/Resources/Public/Images/logo.svg",
]


def fetch(url: str) -> bytes:
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=45) as res:
        return res.read()


def extract_urls(html: str) -> list[str]:
    pats = [
        r'https?://[^"\'\s>]+\.(?:jpg|jpeg|png|webp|svg|mp4|webm)',
        r'/fileadmin/[^"\'\s>]+\.(?:jpg|jpeg|png|webp|svg|mp4|webm)',
        r'/typo3temp/[^"\'\s>]+\.(?:jpg|jpeg|png|webp)',
    ]
    found: set[str] = set()
    for pat in pats:
        for m in re.findall(pat, html, flags=re.I):
            if m.startswith("/"):
                m = "https://www.liqui-moly.com" + m
            m = m.replace("&amp;", "&").split("?")[0]
            found.add(m)
    return sorted(found)


def main() -> None:
    urls = set(SEED)
    for page in PAGES:
        try:
            html = fetch(page).decode("utf-8", "ignore")
            got = extract_urls(html)
            print(f"{page} -> {len(got)} urls")
            urls.update(got)
        except Exception as exc:  # noqa: BLE001
            print(f"FAIL {page}: {exc}")

    # Prefer large photographic assets
    preferred = [
        u
        for u in urls
        if any(
            k in u.lower()
            for k in (
                "hero",
                "banner",
                "motorsport",
                "racing",
                "car",
                "formula",
                "gt",
                "engine",
                "oil",
                "product",
                "bottle",
                "driver",
                "track",
                "sponsoring",
            )
        )
    ]
    # Also keep any large-looking fileadmin images
    fileadmin = [u for u in urls if "/fileadmin/" in u and u.lower().endswith((".jpg", ".jpeg", ".png", ".webp"))]
    candidates = list(dict.fromkeys(preferred + fileadmin + list(urls)))

    print(f"TOTAL unique: {len(urls)}")
    print("--- candidates ---")
    for u in candidates[:80]:
        print(u)

    # Save URL list for review
    (OUT / "sources.txt").write_text("\n".join(candidates), encoding="utf-8")

    downloaded = 0
    for u in candidates:
        if downloaded >= 25:
            break
        if not u.lower().endswith((".jpg", ".jpeg", ".png", ".webp", ".svg")):
            continue
        name = re.sub(r"[^a-zA-Z0-9._-]+", "-", u.split("/")[-1])[:120]
        dest = OUT / name
        if dest.exists() and dest.stat().st_size > 1000:
            continue
        try:
            data = fetch(u)
            if len(data) < 2000 and not u.endswith(".svg"):
                continue
            dest.write_bytes(data)
            downloaded += 1
            print(f"OK {len(data):>8} {name}")
        except Exception as exc:  # noqa: BLE001
            print(f"SKIP {u}: {exc}")

    print(f"Downloaded {downloaded} files into {OUT}")


if __name__ == "__main__":
    main()
