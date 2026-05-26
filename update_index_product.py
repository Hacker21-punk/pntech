import re

with open(r'c:\pntech_source_code\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Fix sc3-out
sc3_out = re.search(r'<section class="home_product sc3-out"[^>]*>.*?</section>', html, re.DOTALL).group(0)

new_sc3_out = """<section class="home_product sc3-out">
  <div class="swiper sc3">
    <div class="sc3-name con home_title" style="color:var(--brand-primary);">
      <p class="wow sc1fadeInLeft" data-wow-duration="2000ms" data-wow-offset="0">Featured</p>
      <p class="wow sc1fadeInLeft" data-wow-duration="2000ms" data-wow-offset="0" data-wow-delay="200ms">Products</p>
    </div>
    <div class="swiper-wrapper">

      <!-- Product 1: PXN-90 -->
      <div class="swiper-slide">
        <div class="sc3-item con">
          <div class="sc3-item-left">
            <div class="sc3-item-left-part1 wow fadeIn" data-wow-duration="2000ms" data-wow-offset="0" data-wow-delay="300ms">
              <div class="sc3-item-left-part1-img">
                <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="120" height="60" rx="8" fill="#ff6600" fill-opacity="0.15"/>
                  <text x="60" y="38" font-family="Inter" font-size="22" font-weight="700" fill="#ff6600" text-anchor="middle">PXN</text>
                </svg>
              </div>
              <div class="sc3-item-left-part1-xl">
                <p>PXN-90</p>
                <p>9 GHz</p>
              </div>
            </div>
            <div class="sc3-item-left-part3 wow fadeIn" data-wow-duration="2000ms" data-wow-offset="0" data-wow-delay="300ms">
              <h3>Handheld <br>Real-Time Spectrum Analyzer</h3>
              <p class="hyphenate">PXN-90 is the 9 GHz spectrum analyzer with tracking generator support (opt.). It also offers advanced measurement including AM/FM demodulation, channel power, ACPR, and occupied bandwidth.</p>
            </div>
          </div>
          <div class="sc3-item-right">
            <a href="product-pxn.html" class="sc3-item-right-img wow sc4fadeInLeft" data-wow-duration="2000ms" data-wow-offset="0" data-wow-delay="400ms">
              <img class="ani" swiper-animate-effect="sc4fadeInLeft" swiper-animate-duration="1.5s" swiper-animate-delay="0.1s" src="images/products/pxn-90.png" alt="PXN-90">
            </a>
          </div>
        </div>
      </div>

      <!-- Product 2: SAN-60 -->
      <div class="swiper-slide">
        <div class="sc3-item con">
          <div class="sc3-item-left">
            <div class="sc3-item-left-part1 wow fadeIn" data-wow-duration="2000ms" data-wow-offset="0" data-wow-delay="300ms">
              <div class="sc3-item-left-part1-img">
                <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="120" height="60" rx="8" fill="#ff6600" fill-opacity="0.15"/>
                  <text x="60" y="38" font-family="Inter" font-size="22" font-weight="700" fill="#ff6600" text-anchor="middle">SAN</text>
                </svg>
              </div>
              <div class="sc3-item-left-part1-xl">
                <p>SAN-60</p>
                <p>6 GHz</p>
              </div>
            </div>
            <div class="sc3-item-left-part3 wow fadeIn" data-wow-duration="2000ms" data-wow-offset="0" data-wow-delay="300ms">
              <h3>USB <br>Spectrum Analyzer / Receiver</h3>
              <p class="hyphenate">SAN-60 is the spectrum analyzer/receiver up to 6 GHz. It offers compact design and fast sweep for spectrum monitoring, drone detection and embedded RF systems.</p>
            </div>
          </div>
          <div class="sc3-item-right">
            <a href="product-new-san.html" class="sc3-item-right-img wow sc4fadeInLeft" data-wow-duration="2000ms" data-wow-offset="0" data-wow-delay="400ms">
              <img class="ani" swiper-animate-effect="sc4fadeInLeft" swiper-animate-duration="1.5s" swiper-animate-delay="0.1s" src="images/products/san-60.png" alt="SAN-60">
            </a>
          </div>
        </div>
      </div>

      <!-- Product 3: PXN-400R -->
      <div class="swiper-slide">
        <div class="sc3-item con">
          <div class="sc3-item-left">
            <div class="sc3-item-left-part1 wow fadeIn" data-wow-duration="2000ms" data-wow-offset="0" data-wow-delay="300ms">
              <div class="sc3-item-left-part1-img">
                <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="120" height="60" rx="8" fill="#ff6600" fill-opacity="0.15"/>
                  <text x="60" y="38" font-family="Inter" font-size="22" font-weight="700" fill="#ff6600" text-anchor="middle">PXN</text>
                </svg>
              </div>
              <div class="sc3-item-left-part1-xl">
                <p>PXN-400R</p>
                <p>40 GHz</p>
              </div>
            </div>
            <div class="sc3-item-left-part3 wow fadeIn" data-wow-duration="2000ms" data-wow-offset="0" data-wow-delay="300ms">
              <h3>IP68 RUGGED <br>Spectrum Analyzer</h3>
              <p class="hyphenate">PXN-400R rugged spectrum analyzer features IP68-rated design for water, dust and vibration resistance, certified with MIL-STD-810H standards for extreme field conditions.</p>
            </div>
          </div>
          <div class="sc3-item-right">
            <a href="product-px-rugged.html" class="sc3-item-right-img wow sc4fadeInLeft" data-wow-duration="2000ms" data-wow-offset="0" data-wow-delay="400ms">
              <img class="ani" swiper-animate-effect="sc4fadeInLeft" swiper-animate-duration="1.5s" swiper-animate-delay="0.1s" src="images/products/pxn-400r.jpg" alt="PXN-400R">
            </a>
          </div>
        </div>
      </div>

    </div>
  </div>
  <div class="sc3sp-out"><div class="swiper-pagination"></div></div>
</section>"""

# Replace in html
html = html.replace(sc3_out, new_sc3_out)

with open(r'c:\pntech_source_code\index.html', 'w', encoding='utf-8') as f:
    f.write(html)
