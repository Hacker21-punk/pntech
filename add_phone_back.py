import glob
import os

master_phone_back = """

<!-- Mobile Slide-out Menu -->
<div class="phone-back">
  <div class="back-desc" style="background:rgba(0,0,0,0.85); padding:10px 20px; display:flex; justify-content:space-between; align-items:center;">
    <div class="back-logo">
      <a href="index.html" style="display:flex; align-items:center; gap:10px;">
        <img src="images/logo.png" alt="PNTECH" style="height:32px; width:auto;">
        <span style="color:#fff; font-size:16px; font-weight:700;">PN Technologies</span>
      </a>
    </div>
    <div class="back-more"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></div>
  </div>
  <ul class="back-level1">
    <li><a href="products.html" style="color:#fff;">Product</a><img class="back-booton" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\" alt="expand"><ul class="sub-menu"><li><a href="product-new-san.html">SAN Series</a></li><li><a href="product-sa.html">SAE Series</a></li><li><a href="product-nxn.html">NXN Series</a></li><li><a href="product-nxe.html">NXE Series</a></li><li><a href="product-pxn.html">PXN Standard</a></li><li><a href="product-px-geek.html">PXN Geek</a></li><li><a href="product-px-rugged.html">PXN Rugged</a></li><li><a href="product-sga.html">SGA-60</a></li><li><a href="product-hda.html">Antenna</a></li></ul></li>
    <li><a href="application.html" style="color:#fff;">Application</a></li>
    <li><a href="news.html" style="color:#fff;">News</a></li>
    <li><a href="contact.html" style="color:#fff;">Contact Us</a></li>
    <li><a href="about.html" style="color:#fff;">About Us</a></li>
  </ul>
</div>"""

product_files = glob.glob(r'c:\pntech_source_code\product-*.html')

for filepath in product_files:
    print(f"Adding phone-back to: {os.path.basename(filepath)}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'class="phone-back"' not in content:
        content = content.replace('</header>', '</header>' + master_phone_back)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)

print("Finished adding phone-back to all product detail pages!")
