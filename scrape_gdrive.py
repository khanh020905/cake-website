import os
import sys
import time
import random
import requests
import re
from selenium import webdriver
from selenium.webdriver.common.by import By

FOLDER_URL = "https://drive.google.com/drive/folders/1DgZ09EibRwk5qe35ElhKQBGP3JrK_S0o"
OUTPUT_DIR = "downloaded_gdrive_images"

def get_file_ids_with_selenium(url):
    print("Initializing Chrome Selenium WebDriver...", flush=True)
    options = webdriver.ChromeOptions()
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    
    driver = webdriver.Chrome(options=options)
    
    try:
        print(f"Opening URL: {url}", flush=True)
        driver.get(url)
        
        print("Waiting for page to load completely...", flush=True)
        time.sleep(random.uniform(4, 7))
        
        file_ids = set()
        
        print("Scrolling page to trigger lazy loading...", flush=True)
        
        scroll_attempts = 0
        last_count = 0
        
        while scroll_attempts < 20: 
            # Google Drive puts scrollable lists in random nested divs. 
            # This universal JS scrolls down ANY scrollable container on the page.
            driver.execute_script("""
                let scrollers = document.querySelectorAll('*');
                for(let s of scrollers) {
                    if(s.scrollHeight > s.clientHeight) {
                         s.scrollTop += 1500;
                    }
                }
            """)
            
            time.sleep(random.uniform(2.0, 4.0))
            
            elements = driver.find_elements(By.XPATH, "//*[@data-id]")
            for el in elements:
                data_id = el.get_attribute("data-id")
                if data_id and len(data_id) > 15:
                    file_ids.add(data_id)
                    
            links = driver.find_elements(By.XPATH, "//a[contains(@href, '/file/d/')]")
            for link in links:
                href = link.get_attribute("href")
                match = re.search(r'/file/d/([a-zA-Z0-9_-]+)', href)
                if match:
                    file_ids.add(match.group(1))

            print(f"Discovered {len(file_ids)} unique files so far...", flush=True)
            
            if len(file_ids) == last_count:
                print("No new files found this scroll attempt. Checking again...", flush=True)
                scroll_attempts += 1
                if scroll_attempts > 4: # Stop if it fails 4 times in a row
                    break
            else:
                last_count = len(file_ids)
                scroll_attempts = 0
            
        return list(file_ids)
        
    finally:
        print("Closing browser...", flush=True)
        driver.quit()

def download_file_direct(file_id, index, total):
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
        
    download_url = f"https://drive.google.com/uc?export=download&id={file_id}"
    print(f"[{index}/{total}] Requesting download for File ID: {file_id}", flush=True)
    
    try:
        session = requests.Session()
        response = session.get(download_url, stream=True)
        response.raise_for_status()
        
        filename = f"image_{file_id}.jpg" 
        
        if "Content-Disposition" in response.headers:
            content_disp = response.headers["Content-Disposition"]
            match = re.search(r'filename="([^"]+)"', content_disp)
            if match:
                filename = match.group(1)
        
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        # Skip if already exists
        if os.path.exists(filepath):
            print(f"   -> Already exists: {filename}. Skipping.", flush=True)
            return True
            
        with open(filepath, "wb") as f:
            for chunk in response.iter_content(chunk_size=32768):
                if chunk:
                    f.write(chunk)
                    
        print(f"   -> Successfully saved as: {filename}", flush=True)
        return True
        
    except Exception as e:
        print(f"   -> Failed to download {file_id}: {str(e)}", flush=True)
        return False

def main():
    print("Starting scraping process...", flush=True)
    
    file_ids = get_file_ids_with_selenium(FOLDER_URL)
    
    if not file_ids:
        print("No files discovered!", flush=True)
        return
        
    print(f"\nDiscovered {len(file_ids)} files total. Moving to download phase...", flush=True)
    
    for index, file_id in enumerate(file_ids, start=1):
        downloaded = download_file_direct(file_id, index, len(file_ids))
        
        if downloaded and index < len(file_ids):
            delay = random.uniform(3.0, 7.0)
            print(f"Sleeping for {delay:.2f} seconds...\n", flush=True)
            time.sleep(delay)

    print("\nAll downloads finished successfully!", flush=True)

if __name__ == "__main__":
    main()
