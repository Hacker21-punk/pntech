import os
import glob
import re

# 1. Define the master header HTML
master_header = """<header>
  <div class="hd-bg"></div>
  <!-- Desktop Header -->
  <div class="hd-out">
    <div class="hd con">
      <div class="hd-left">
        <a href="index.html" style="display:flex; align-items:center; gap:10px;">
          <img src="images/logo.png" alt="PNTECH" style="height:48px; width:auto;">
          <span class="hd-logo-text" style="color:#fff; font-size:22px; font-weight:700; letter-spacing:1px; white-space:nowrap;">PN Technologies</span>
        </a>
      </div>
      <div class="hd-md">
        <nav class="hd-nav">
          <ul class="hdnav-box">
            <li class="menu-item"><a href="index.html">Home</a></li>
            <li class="menu-item menu-item-has-children">
              <a href="products.html">Product</a>
              <div class="sub-menu mega-menu">
                <div class="mega-menu-inner">
                  <!-- Column 1: Spectrum Analyzer -->
                  <div class="mega-column spectrum-analyzer-column">
                    <div class="mega-column-title"><a href="product-spectrum-analyzer.html">Spectrum Analyzer</a></div>
                    <div class="mega-sub-grid">
                      <!-- USB Sub-column -->
                      <div class="mega-sub-column">
                        <div class="mega-sub-title"><a href="product-spectrum-analyzer.html#usb">USB</a></div>
                        <ul class="mega-links">
                          <li><a href="product-new-san.html">New SAN Series</a></li>
                          <li><a href="product-san400.html">SAN Series</a></li>
                          <li><a href="product-sa.html">SA Series</a></li>
                        </ul>
                      </div>
                      <!-- Networked Sub-column -->
                      <div class="mega-sub-column">
                        <div class="mega-sub-title"><a href="product-spectrum-analyzer.html#networked">Networked</a></div>
                        <ul class="mega-links">
                          <li><a href="product-nxn.html">NXN Series</a></li>
                          <li><a href="product-nxe.html">NXE Series</a></li>
                        </ul>
                      </div>
                      <!-- Benchtop/Handheld Sub-column -->
                      <div class="mega-sub-column">
                        <div class="mega-sub-title"><a href="product-spectrum-analyzer.html#handheld">Benchtop / Handheld</a></div>
                        <ul class="mega-links">
                          <li><a href="product-px-standard.html">PX Series Standard</a></li>
                          <li><a href="product-px-geek.html">PX Series Geek</a></li>
                          <li><a href="product-px-rugged.html">PX Series Rugged</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Column 2: Vector Signal Generator -->
                  <div class="mega-column vsg-column">
                    <div class="mega-column-title"><a href="product-vector-signal-generator.html">Vector Signal Generator</a></div>
                    <div class="mega-sub-grid">
                      <div class="mega-sub-column">
                        <div class="mega-sub-title"><a href="product-vector-signal-generator.html#usb">USB</a></div>
                        <ul class="mega-links">
                          <li><a href="product-sga.html">New SGA-60</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- Column 3: Antenna -->
                  <div class="mega-column antenna-column">
                    <div class="mega-column-title"><a href="product-hda.html">Antenna</a></div>
                    <div class="mega-sub-grid">
                      <div class="mega-sub-column">
                        <div class="mega-sub-title"><a href="product-hda.html">HDA Series</a></div>
                        <ul class="mega-links">
                          <li><a href="product-hda.html">HDA-100</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li class="menu-item"><a href="application.html">Application</a></li>
            <li class="menu-item"><a href="news.html">Latest News</a></li>
            <li class="menu-item"><a href="contact.html">Contact Us</a></li>
          </ul>
        </nav>
      </div>
      <div class="hd-right" style="display: flex; align-items: center; gap: 16px;">
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle theme">
          <svg class="sun-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
          </svg>
          <svg class="moon-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </button>
        <div class="hd-search">
          <form>
            <div class="hd-search-input"><input type="text" placeholder="Search"></div>
            <button class="hd-search-img" type="button">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>

  <!-- Mobile Header -->
  <div class="phone-header" style="background:rgba(0,0,0,0.85);">
    <div class="phone-logo">
      <a href="index.html" style="display:flex; align-items:center; gap:10px;">
        <img src="images/logo.png" alt="PNTECH" style="height:40px; width:auto;">
        <span style="color:#fff; font-size:18px; font-weight:700;">PN Technologies</span>
      </a>
    </div>
    <div class="phone-right-actions" style="display: flex; align-items: center; gap: 15px;">
      <button class="theme-toggle" id="theme-toggle-mobile" aria-label="Toggle theme" style="color: white;">
        <svg class="sun-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
        </svg>
        <svg class="moon-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
      <div class="phone-more">
        <svg width="24" height="24" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
      </div>
    </div>
  </div>
</header>"""

master_phone_back = """<div class="phone-back">
  <div class="back-desc" style="background:rgba(0,0,0,0.85); padding:10px 20px; display:flex; justify-content:space-between; align-items:center;">
    <div class="back-logo">
      <a href="index.html" style="display:flex; align-items:center; gap:10px;">
        <img src="images/logo.png" alt="PNTECH" style="height:40px; width:auto;">
        <span style="color:#fff; font-size:18px; font-weight:700;">PN Technologies</span>
      </a>
    </div>
    <div class="back-more"><svg width="20" height="20" fill="none" stroke="white" stroke-width="2" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg></div>
  </div>
  <div class="back-title">
    <ul class="back-level1">
      <li class="menu-item"><a href="index.html">Home</a></li>
      <li class="menu-item menu-item-has-children">
        <a href="products.html" style="color:#fff;">Product</a>
        <ul class="sub-menu">
          <li class="menu-item"><a href="product-spectrum-analyzer.html">Spectrum Analyzer</a></li>
          <li class="menu-item"><a href="product-vector-signal-generator.html">Vector Signal Generator</a></li>
          <li class="menu-item"><a href="product-hda.html">Antenna</a></li>
        </ul>
      </li>
      <li class="menu-item"><a href="application.html" style="color:#fff;">Application</a></li>
      <li class="menu-item"><a href="news.html" style="color:#fff;">Latest News</a></li>
      <li class="menu-item"><a href="contact.html" style="color:#fff;">Contact Us</a></li>
    </ul>
  </div>
</div>"""

# 2. Get all HTML files
html_files = glob.glob(r'c:\pntech_source_code\*.html')

for filepath in html_files:
    print(f"Updating header in: {os.path.basename(filepath)}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace <header>...</header> block
    content = re.sub(r'<header>.*?</header>', master_header, content, flags=re.DOTALL)

    # Add non-flash theme loader to <head> if not already present
    if "localStorage.getItem('theme')" not in content:
        content = content.replace('<head>', '<head>\n  <script>if(localStorage.getItem(\'theme\')===\'light\')document.documentElement.classList.add(\'light-theme\');</script>')

    # Replace <div class="phone-back">...</div> block
    content = re.sub(r'<div class="phone-back">.*?</div>\s*</ul>\s*</div>|<div class="phone-back">.*?</div>', master_phone_back, content, flags=re.DOTALL)

    # Force stylesheet/script cache busting
    content = re.sub(r'href="css/style\.css(?:\?v=[a-zA-Z0-9_-]+)?"', 'href="css/style.css?v=20260528-v5"', content)
    content = re.sub(r'href="css/product-category\.css(?:\?v=[a-zA-Z0-9_-]+)?"', 'href="css/product-category.css?v=20260528-v5"', content)
    content = re.sub(r'src="js/main\.js(?:\?v=[a-zA-Z0-9_-]+)?"', 'src="js/main.js?v=20260528-v5"', content)

    # Clean up double phone-backs if any
    # (some pages might have different ending tags for phone-back, let's make sure it's correct)
    
    # 3. Replace 'Signal Generator' with 'Vector Signal Generator' where appropriate (case-insensitive for some terms)
    # We will do surgical replacements for specific text
    content = content.replace('products.html#signal-generator', 'products.html#vector-signal-generators')
    content = content.replace('products.html#spectrum-analyzer', 'products.html#spectrum-analyzers')
    
    # Change "Signal Generator" inside submenus or cards to "Vector Signal Generator"
    content = content.replace('Signal Generator (SGA-60)', 'Vector Signal Generator (SGA-60)')
    content = content.replace('View SGA Series', 'View Vector Signal Generator Series')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# 4. Surgical updates in products.html for IDs
print("Updating products.html IDs...")
with open(r'c:\pntech_source_code\products.html', 'r', encoding='utf-8') as f:
    p_content = f.read()

# Add IDs to the items in products.html
p_content = p_content.replace('<!-- Handheld -->\n    <div class="con product_home_item"', '<!-- Handheld -->\n    <div class="con product_home_item" id="benchtop-handheld-spectrum-analyzers"')
p_content = p_content.replace('<!-- USB -->\n    <div class="con product_home_item"', '<!-- USB -->\n    <div class="con product_home_item" id="usb-spectrum-analyzers"')
p_content = p_content.replace('<!-- Networked -->\n    <div class="con product_home_item"', '<!-- Networked -->\n    <div class="con product_home_item" id="networked-spectrum-analyzers"')
p_content = p_content.replace('<!-- Vector Signal Generator -->\n    <div class="con product_home_item"', '<!-- Vector Signal Generator -->\n    <div class="con product_home_item" id="vector-signal-generators"')
p_content = p_content.replace('<!-- Antenna -->\n    <div class="con product_home_item"', '<!-- Antenna -->\n    <div class="con product_home_item" id="antennas"')

with open(r'c:\pntech_source_code\products.html', 'w', encoding='utf-8') as f:
    f.write(p_content)

print("Headers updated and synced across all pages!")
