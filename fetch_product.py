import urllib.request
import re
import sys

# Change standard output encoding to utf-8
sys.stdout.reconfigure(encoding='utf-8')

req = urllib.request.Request(
    'https://www.harogic.com/', 
    headers={'User-Agent': 'Mozilla/5.0'}
)
html = urllib.request.urlopen(req).read().decode('utf-8')
m = re.search(r'<section class="home_product[^>]*>.*?</section>', html, re.DOTALL)
if m:
    print(m.group(0)[:3000])
else:
    print("Not found")
