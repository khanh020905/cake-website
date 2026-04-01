from bs4 import BeautifulSoup
import json
import re
import os
import urllib.request

with open("wp_rendered.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

wp_products = []

for fig in soup.select(".gallery-item"):
    img_el = fig.select_one("img")
    caption_el = fig.select_one(".gallery-caption")
    
    if img_el and caption_el:
        img_url = img_el.get("src", "")
        # Remove size suffix like -770x770.jpg
        img_url = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', img_url)
        
        caption_text = caption_el.get_text(strip=True)
        # Try finding Name: Description
        parts = caption_text.split(":", 1)
        if len(parts) == 2:
            name = parts[0].strip()
            desc = parts[1].strip()
        else:
            name = caption_text.strip()
            # some names don't have colon
            if "-" in name:
                n, d = name.split("-", 1)
                name = n.strip()
                desc = d.strip()
            else:
                desc = ""
            
        wp_products.append({
            "name": name,
            "description": desc,
            "wp_image": img_url
        })

print(f"Found {len(wp_products)} items in WP")

# Load existing square menu to merge
try:
    with open('src/data/square_menu.json', 'r', encoding='utf-8') as f:
        square_data = json.load(f)
        square_items = square_data.get("items", [])
except FileNotFoundError:
    square_items = []

os.makedirs('public/extract_img', exist_ok=True)

sq_names_clean = [re.sub(r'[^a-z0-9]', '', s["name"].lower()) for s in square_items]

for wp in wp_products:
    wp_clean = re.sub(r'[^a-z0-9]', '', wp["name"].lower())
    
    sq_matched = False
    for sq in square_items:
        sq_clean = re.sub(r'[^a-z0-9]', '', sq["name"].lower())
        
        if sq_clean in wp_clean or wp_clean in sq_clean:
            sq_matched = True
            # Update description if Square lacks it
            if wp["description"] and not sq.get("description"):
                sq["description"] = wp["description"]
            break # Already found and updated
            
    if not sq_matched:
        # Not in Square, so add it
        img_url = wp["wp_image"]
        local_path = ""
        if img_url:
            safe_name = "wp_" + "".join([c if c.isalnum() else "_" for c in wp["name"]]) + ".jpg"
            filepath = os.path.join("public", "extract_img", safe_name)
            try:
                print(f"Downloading {img_url}")
                headers = {'User-Agent': 'Mozilla/5.0'}
                req = urllib.request.Request(img_url, headers=headers)
                with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                    data = response.read()
                    out_file.write(data)
                local_path = f"/extract_img/{safe_name}"
            except Exception as e:
                print(f"Failed to download {img_url}: {e}")
                local_path = img_url
            
        square_items.append({
            "name": wp["name"],
            "description": wp["description"],
            "price": "CAD$6.00", # default price
            "image_url": wp["wp_image"],
            "localImage": local_path
        })

with open('src/data/merged_menu.json', 'w', encoding='utf-8') as f:
    json.dump({"items": square_items}, f, indent=2, ensure_ascii=False)

print("Saved to src/data/merged_menu.json")
