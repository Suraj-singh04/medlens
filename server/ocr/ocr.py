# server/ocr/ocr.py
import sys
import json
import pytesseract
import requests
from PIL import Image
from io import BytesIO

def extract_text_from_url(image_url):
    response = requests.get(image_url)
    img = Image.open(BytesIO(response.content))
    text = pytesseract.image_to_string(img)
    return text.strip()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({ "text": "" }))
        sys.exit(1)
    
    url = sys.argv[1]
    extracted = extract_text_from_url(url)
    print(json.dumps({ "text": extracted }))
