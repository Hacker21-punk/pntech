import os
import glob
import re

# 1. Define the master footer HTML
master_footer = """  <!-- ========== FOOTER ========== -->
  <footer>
    <div class="con">
      <div class="ft-out">
        <div class="ft">
          <div class="ft-right">
            <div class="ft-nav">
              <ul class="ftnav-box">
                <li><a href="products.html">Product</a>
                  <ul class="sub-menu">
                    <li><a href="product-spectrum-analyzer.html">Spectrum Analyzer</a></li>
                    <li><a href="product-vector-signal-generator.html">Vector Signal Generator</a></li>
                    <li><a href="product-hda.html">Antenna</a></li>
                  </ul>
                </li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="news.html">Latest News</a></li>
                <li><a href="application.html">Application</a></li>
                <li><a href="contact.html">Contact Us</a></li>
              </ul>
            </div>
            <div class="ft-right-end">
              <div class="ft-contact-info">
                <p><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="m22 6-10 7L2 6"/></svg> <a href="mailto:business@pntech.in" style="color:#aaa;">business@pntech.in</a></p>
                <p style="margin-top:6px;color:#777;font-size:12px;">Offices: Bhopal &middot; Ahmedabad, India</p>
              </div>
              <div class="ft-sns">
                <a href="#" target="_blank" rel="nofollow"><svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
                <a href="#" target="_blank" rel="nofollow"><svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                <a href="#" target="_blank" rel="nofollow"><svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
                <a href="#" target="_blank" rel="nofollow"><svg width="16" height="16" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="ft-bb">
        <p>Copyright &copy; 2024-2026 PN Technologies</p>
      </div>
    </div>

    <!-- Mobile Footer -->
    <div class="phone-footer">
      <div class="phone-box">
        <ul class="phone-footer">
          <li><a href="products.html">Product</a></li>
          <li><a href="about.html">About Us</a></li>
          <li><a href="news.html">Latest News</a></li>
          <li><a href="application.html">Application</a></li>
          <li><a href="contact.html">Contact Us</a></li>
        </ul>
      </div>
      <div class="ft-sns-link">
        <a href="#"><svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
        <a href="#"><svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
        <a href="#"><svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
        <a href="#"><svg width="20" height="20" fill="white" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
      </div>
    </div>
  </footer>"""

# 2. Get all HTML files
html_files = glob.glob(r'c:\pntech_source_code\*.html')

for filepath in html_files:
    print(f"Updating footer in: {os.path.basename(filepath)}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace <!-- ========== FOOTER ========== --> ... </footer> block, or fallback to replacing <footer>...</footer>
    if '<!-- ========== FOOTER ========== -->' in content:
        content = re.sub(r'<!-- ========== FOOTER ========== -->.*?</footer>', master_footer, content, flags=re.DOTALL)
    else:
        content = re.sub(r'<footer>.*?</footer>', master_footer, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Footers updated and synced across all pages!")
