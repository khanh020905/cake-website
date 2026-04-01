import time
import json
import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

def dump_wp():
    options = Options()
    options.add_argument('--headless')
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
    
    print("Loading WordPress Menu...")
    driver.get("https://ykfromscratch.ca/menu/")
    time.sleep(10)
    
    for _ in range(3):
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(2)
        
    html = driver.page_source
    with open("wp_rendered.html", "w", encoding="utf-8") as f:
        f.write(html)
        
    driver.quit()
    print("Done dumping WP.")

if __name__ == "__main__":
    dump_wp()
