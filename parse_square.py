from bs4 import BeautifulSoup
import json
import re
import urllib.request
import os

with open("square_rendered.html", "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

products = []

for group in soup.select(".product-group"):
    title_el = group.select_one(".w-product-title")
    if not title_el:
        continue
    title = title_el.get_text(strip=True)
    
    price_el = group.select_one(".product-price__wrapper")
    price = price_el.get_text(strip=True) if price_el else ""
    price = re.sub(r'\s+', ' ', price).strip()
    
    img_el = group.select_one("img")
    image_url = ""
    if img_el and img_el.has_attr("src"):
        image_url = img_el["src"]
        
    products.append({
        "name": title,
        "price": price,
        "image_url": image_url,
        "description": ""
    })

print(f"Found {len(products)} products")

unique = {}
for p in products:
    name = p["name"]
    if name not in unique:
        unique[name] = p

final_products = list(unique.values())

os.makedirs('public/extract_img', exist_ok=True)
os.makedirs('src/data', exist_ok=True)

for p in final_products:
    img_url = p["image_url"]
    local_path = ""
    if img_url:
        base_url = img_url.split("?")[0]
        dl_url = base_url + "?width=800"
        
        safe_name = "".join([c if c.isalnum() else "_" for c in p["name"]]) + ".jpg"
        filepath = os.path.join("public", "extract_img", safe_name)
        
        try:
            print(f"Downloading {dl_url}")
            headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
            req = urllib.request.Request(dl_url, headers=headers)
            with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                data = response.read()
                out_file.write(data)
            local_path = f"/extract_img/{safe_name}"
        except Exception as e:
            print(f"Failed to download {dl_url}: {e}")
            local_path = img_url
            
    p["localImage"] = local_path

with open('src/data/square_menu.json', 'w', encoding='utf-8') as f:
    json.dump({"items": final_products}, f, indent=2, ensure_ascii=False)

print("Saved to src/data/square_menu.json")
