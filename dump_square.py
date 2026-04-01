import time
import json
import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import urllib.request

def dump_html():
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    print("Loading Square Site...")
    driver.get("https://from-scratch-bakeshop-boba.square.site/?location=LYB17NEAF81R6&menu=#most-popular")
    time.sleep(10)
    
    for _ in range(3):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        
    html = driver.page_source
    with open("square_rendered.html", "w", encoding="utf-8") as f:
        f.write(html)
        
    try:
        # Let's also grab the API request if it's stored in window objects
        # sometimes square stores it in window.__PRELOADED_STATE__ or similar
        state = driver.execute_script("return typeof window.__BOOTSTRAP_STATE__ !== 'undefined' ? JSON.stringify(window.__BOOTSTRAP_STATE__) : ''")
        with open("square_state.json", "w", encoding="utf-8") as f:
            f.write(state)
    except Exception as e:
        print("Could not dump JS state")
        
    driver.quit()
    print("Done dumping HTML.")

if __name__ == "__main__":
    dump_html()
