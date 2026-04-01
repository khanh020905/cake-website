import json

with open("src/data/exact_menu.json", "r", encoding="utf-8") as f:
    exact = json.load(f)

with open("src/data/merged_menu.json", "r", encoding="utf-8") as f:
    merged = json.load(f)

# Create a lookup for prices from merged_menu by name matching
price_map = {}
for m in merged.get("items", []):
    clean_name = m["name"].lower().replace(' ', '').replace('-', '')
    price_map[clean_name] = m.get("price", "")

unique_items = []
seen = set()

for item in exact:
    if item["name"] in seen:
        continue
    seen.add(item["name"])
    
    # Try to find a price
    search_name = item["name"].lower().replace(' ', '').replace('-', '')
    
    # fuzzy search in price_map
    price = ""
    for k, v in price_map.items():
        if search_name in k or k in search_name:
            price = v
            break
            
    # some manual mapping based on known differences:
    mapped_prices = {
        "almondcroisaint": "CAD$5.75",
        "chocolatecroissant": "CAD$5.25",
        "peachdanish": "CAD$5.25",
        "plaincroissant": "CAD$4.75",
        "cinnamonbun": "CAD$3.50",
    }
    
    if not price and search_name in mapped_prices:
        price = mapped_prices[search_name]
        
    item["price"] = price
    
    unique_items.append(item)

# write as {"items": [...]} format!
with open("src/data/merged_menu.json", "w", encoding="utf-8") as f:
    json.dump({"items": unique_items}, f, indent=2, ensure_ascii=False)

print(f"Updated merged_menu.json with {len(unique_items)} unique items from WP screenshots.")
