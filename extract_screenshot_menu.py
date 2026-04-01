from bs4 import BeautifulSoup
import json
import re

html_file = 'wp_rendered.html'
with open(html_file, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

result = []

def clean_text(text):
    if not text:
        return ""
    text = text.replace('\n', ' ')
    text = " ".join(text.split())
    return text

# We can find the headers, then the next sibling gallery
headings = soup.find_all(['h2', 'h3', 'h4'])

for h in headings:
    category = clean_text(h.get_text())
    # find the next container with gallery
    container = h.find_parent('div', class_='e-con-inner')
    if not container:
        continue
    
    # Next e-con block should have the gallery
    next_parent = h.find_parent('div', class_='e-con')
    if not next_parent:
        continue
        
    next_con = next_parent.find_next_sibling('div', class_='e-con')
    if not next_con:
        continue
        
    galleries = next_con.find_all('div', class_='gallery')
    for g in galleries:
        for item in g.find_all('figure', class_='gallery-item'):
            img = item.find('img')
            if not img:
                continue
            
            src = img.get('src', '')
            src_clean = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', src)
            
            caption = item.find('figcaption')
            caption_text = clean_text(caption.get_text()) if caption else ""
            
            name = caption_text
            desc = ""
            if ":" in caption_text:
                parts = caption_text.split(":", 1)
                name = parts[0].strip()
                desc = parts[1].strip()
            
            # Use raw src_url as localImage because the user said "based on the img I screenshot from..."
            # Using the direct WP url ensures exactly the same image without download issues.
            
            # Hardcoded price matching if possible from merged_menu
            # Or just set price to empty string and display what WP had.
            # actually WP didn't show prices for these items.
            price = ""
            
            result.append({
                "name": name,
                "price": price,
                "category": category,
                "description": desc,
                "image_url": src_clean,
                "localImage": src_clean
            })

with open("src/data/exact_menu.json", "w", encoding="utf-8") as out:
    json.dump(result, out, indent=2, ensure_ascii=False)

print(f"Extracted {len(result)} items.")
