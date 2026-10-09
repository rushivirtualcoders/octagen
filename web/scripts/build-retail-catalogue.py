"""Build the public catalogue from the April 2026 retail lists. Prices are dropped."""
import json
import re
from pathlib import Path
from urllib.parse import quote

EXTRACT = Path(__file__).resolve().parents[1] / ".price-extract.txt"
OUT = Path(__file__).resolve().parents[1] / "src" / "lib" / "retail-catalogue.ts"

PROD = re.compile(
    r"^(?:NEW\s+)?(?:\d+\s+)?(\d{3,6})\s+(.+?)\s+(\d+(?:[.,]\d+)?\s*(?:LTR|ML|GM|KG))\s+\d+\s+(?:\d+|-)\s+(?:\d+|-)\s*$",
    re.I,
)
PIECE = re.compile(
    r"^(?:NEW\s+)?(?:\d+\s+)?(\d{3,6})\s+(.+?)\s+1\s+1\s+\d+\s+\d+\s*$",
    re.I,
)
NOISE = re.compile(
    r"^(SR\.?NO\.?|ITEM|ID|PRODUCT NAME|PACK|SIZE|STD|RRP|MRP|RETAIL|CAR PRODUCTS|MOTORCYCLE PRODUCTS)$",
    re.I,
)

CAR_PARENT = "CAR ENGINE OILS"
BIKE_PARENT = "MOTORCYCLE ENGINE OILS"
CAR_CHILDREN = {
    "TOP TEC ENGINE OILS (0W SERIES)",
    "TOP TEC ENGINE OILS",
    "SYNTHOIL ENGINE OILS",
    "HIGH TECH ENGINE OILS",
    "MOLYGEN ENGINE OILS",
    "LEICHLAUF PERFORMANCE ENGINE OILS",
    "LEICHTLAUF PERFORMANCE ENGINE OILS",
    "SPECIAL TEC ENGINE OILS",
    "OPTIMAL ENGINE OILS",
    "MOS2 ENGINE OILS",
}
BIKE_CHILDREN = {"STREET RACE", "STREET", "SCOOTER", "OFF ROAD"}
LOVED = {"8972", "9047", "3721", "2592", "1508", "1502"}

NAME_FIXES = (
    ("Additve", "Additive"),
    (" Stree", " Street"),
)


def slug(value: str) -> str:
    value = value.lower().replace("&", " and ")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value


def title_case(value: str) -> str:
    small = {"and", "for", "of", "the", "with"}
    parts = []
    for i, word in enumerate(value.split()):
        raw = word
        if raw.upper() in {"ATF", "MTF", "GL5", "GL4+", "DOT", "DPF", "CNG/LPG", "SAE", "HD"}:
            parts.append(raw.upper())
            continue
        lower = raw.lower()
        if i and lower in small:
            parts.append(lower)
        else:
            parts.append(lower[:1].upper() + lower[1:] if lower else raw)
    text = " ".join(parts)
    text = text.replace("Mos2", "MoS2").replace("Cng/lpg", "CNG/LPG")
    text = text.replace("0w", "0W").replace("5w", "5W").replace("10w", "10W")
    return text


def fix_header(value: str) -> str:
    value = value.replace("BREAK", "BRAKE")
    value = value.replace("TRNASMISSION", "TRANSMISSION")
    value = value.replace("LEICHLAUF", "LEICHTLAUF")
    value = value.replace("MAINTAINANCE", "MAINTENANCE")
    value = value.replace("AUTOMOBILES", "AUTOMOBILE")
    return title_case(value)


def fix_name(value: str) -> str:
    for old, new in NAME_FIXES:
        value = value.replace(old, new)
    return re.sub(r"\s+", " ", value).strip()


def image_for(category_slug: str, name: str) -> str:
    blob = f"{category_slug} {name}".lower()
    if "cera tec" in blob:
        return "/assets/images/products/cera-tec.png"
    if "molygen" in blob:
        return "/assets/images/products/molygen-new-generation.png"
    if any(word in blob for word in ("engine-oil", "top tec", "synthoil", "leichtlauf", "special tec", "optimal", "mos2 low")):
        return "/assets/images/products/top-tec-4200.png"
    if any(word in blob for word in ("care", "cleaner", "chain", "wax", "leather", "plastic", "rubber", "screen")):
        return "/assets/images/products/premium-rim-cleaner.png"
    return "/assets/images/products/product-bottle.jpg"


def main() -> None:
    text = EXTRACT.read_text(encoding="utf-8")
    path = None
    category = None
    subcategory = None
    categories = []
    products = []
    seen_cats = set()

    def ensure_category(name: str, vehicle: str) -> str:
        base = slug(name)
        cat_slug = base if base.startswith(f"{vehicle}-") else f"{vehicle}-{base}"
        if cat_slug not in seen_cats:
            seen_cats.add(cat_slug)
            categories.append(
                {
                    "slug": cat_slug,
                    "name": name,
                    "path": vehicle,
                    "description": name,
                    "featured": False,
                }
            )
        return cat_slug

    for raw in text.splitlines():
        line = " ".join(raw.split())
        if not line or line.startswith("=====") or line.startswith("---"):
            if "PCMO" in line:
                path = "car"
                category = None
                subcategory = None
            elif "MCO" in line:
                path = "bike"
                category = None
                subcategory = None
            continue
        if NOISE.match(line) or line.startswith("LIQUI MOLY"):
            continue
        if re.search(r"\b(RRP|MRP)\b", line, re.I):
            continue
        if re.match(r"^(SR\.?NO|ITEM|ID|PRODUCT|PACK|SIZE|STD)\b", line, re.I):
            continue
        if path is None:
            continue

        piece = PIECE.match(line)
        match = PROD.match(line)
        if match or piece:
            if category is None or path is None:
                continue
            article, name, pack = (piece.group(1), piece.group(2), "1 pc") if piece else (match.group(1), match.group(2), match.group(3).upper().replace(" ", ""))
            name = fix_name(name)
            cat_slug = ensure_category(category, path)
            sub_name = subcategory or category
            sub_slug = f"{cat_slug}--{slug(sub_name)}"
            products.append(
                {
                    "id": f"{path}-{article}",
                    "name": name,
                    "shortDescription": f"{sub_name} · {pack}",
                    "categorySlug": cat_slug,
                    "subcategorySlug": sub_slug,
                    "subcategoryName": sub_name,
                    "path": path,
                    "packSize": pack,
                    "articleId": article,
                    "image": image_for(cat_slug, name),
                    "liquiMolyUrl": f"https://www.liqui-moly.com/en/in/search?search={quote(name)}",
                    "loved": article in LOVED,
                }
            )
            continue

        header = fix_header(line)
        if line in {CAR_PARENT, BIKE_PARENT}:
            category = header
            subcategory = None
            ensure_category(category, path)
        elif (path == "car" and line in CAR_CHILDREN) or (path == "bike" and line in BIKE_CHILDREN):
            subcategory = header
        else:
            category = header
            subcategory = None
            ensure_category(category, path)

    used = {item["categorySlug"] for item in products}
    categories = [cat for cat in categories if cat["slug"] in used]
    for cat in categories:
        cat["featured"] = cat["slug"] in {
            "car-engine-oils",
            "car-oil-additives",
            "car-fuel-additive-for-petrol",
            "car-vehicle-care",
            "car-automatic-transmission-fluids-steering-gear-oils",
            "bike-motorcycle-engine-oils",
            "bike-motorbike-additive",
            "bike-motorbike-maintenance-product",
            "bike-fork-oil-shock-absorber-oils",
            "bike-vehicle-care",
        }

    lines = [
        "/** April 2026 India retail range. Pack and name only — no prices. */",
        "import type { CatalogueCategory, CatalogueProduct } from './catalogue'",
        "",
        "export const RETAIL_CATEGORIES: CatalogueCategory[] = " + json.dumps(categories, indent=2),
        "",
        "export const RETAIL_PRODUCTS: CatalogueProduct[] = " + json.dumps(products, indent=2),
        "",
    ]
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"categories {len(categories)} products {len(products)} -> {OUT}")


if __name__ == "__main__":
    main()
