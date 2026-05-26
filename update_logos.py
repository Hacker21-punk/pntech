import os
import glob

files = glob.glob(r'c:\pntech_source_code\product-*.html')

desktop_logo = '<div class="hd-logo"><a href="index.html" style="display:flex; align-items:center; gap:10px;"><img src="images/logo.png" alt="PN Technologies Logo" style="height:40px; width:auto;"><span class="hd-logo-text" style="color:#fff; font-size:18px; font-weight:700; letter-spacing:1px; white-space:nowrap;">PN Technologies</span></a></div>'

phone_logo = '<div class="phone-logo"><a href="index.html" style="display:flex; align-items:center; gap:10px;"><img src="images/logo.png" alt="PN Technologies Logo" style="height:32px; width:auto;"><span style="color:#fff; font-size:16px; font-weight:700;">PN Technologies</span></a></div>'

back_logo = '<div class="back-logo"><a href="index.html" style="display:flex; align-items:center; gap:10px;"><img src="images/logo.png" alt="PN Technologies Logo" style="height:32px; width:auto;"><span style="color:#fff; font-size:16px; font-weight:700;">PN Technologies</span></a></div>'

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Desktop logo
    content = content.replace('<div class="hd-logo"><a href="index.html"><img src="images/logo.png" alt="PN Technologies Logo"></a></div>', desktop_logo)
    
    # Phone logo
    content = content.replace('<div class="phone-logo"><a href="index.html"><img src="images/logo.png" alt="PN Technologies Logo"></a></div>', phone_logo)
    
    # Back logo
    content = content.replace('<div class="back-logo"><a href="index.html"><img src="images/logo.png" alt="PN Technologies Logo"></a></div>', back_logo)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated product pages!")
