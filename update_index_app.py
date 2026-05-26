import re

with open(r'c:\pntech_source_code\index.html', 'r', encoding='utf-8') as f:
    html = f.read()

sc4_out = re.search(r'<section class="sc4-out"[^>]*>.*?</section>', html, re.DOTALL).group(0)

new_sc4_out = """<section class="sc4-out">
  <div class="sc4">
    <div class="sc4-left sc5-out">
      <div class="swiper sc5">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="sc5-item">
              <div class="sc5-item-con">
                <p>Mapping Mode</p>
                <p class="hyphenate">Using PNTECH products<br>RF Signal Mapping and Geolocation</p>
                <a class="sc5-item-a" href="application.html">
                  <i><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></i>
                  More
                </a>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="sc5-item">
              <div class="sc5-item-con">
                <p>PXN Series</p>
                <p class="hyphenate">Tracking Generator<br>and Signal Generator Applications</p>
                <a class="sc5-item-a" href="application.html">
                  <i><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></i>
                  More
                </a>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="sc5-item">
              <div class="sc5-item-con">
                <p>SDR++</p>
                <p class="hyphenate">Works Well on PNTECH<br>PX Series</p>
                <a class="sc5-item-a" href="application.html">
                  <i><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></i>
                  More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sc4-right sc6-out">
      <div class="swiper sc6">
        <div class="swiper-wrapper">
          <div class="swiper-slide"><a href="application.html"><img src="images/HAROGIC-RF-Signal-Mapping-and-Geolocation-Using-HAROGIC-Mapping-Mode.jpg" alt="RF Signal Mapping"></a></div>
          <div class="swiper-slide"><a href="application.html"><img src="images/HAROGIC-Tracking-Generator-and-Signal-Generator-Applications-in-the-New-PXN-Series.jpg" alt="Tracking Generator"></a></div>
          <div class="swiper-slide"><a href="application.html"><img src="images/jjfa_lunbo_3.webp" alt="SDR Integration"></a></div>
        </div>
      </div>
    </div>
  </div>
  <div class="sc4-other">
    <div class="sc4-name con wow sc4fadeInLeft" data-wow-duration="2000ms" data-wow-offset="0">
      <p>Find an</p>
      <p>Application</p>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</section>"""

html = html.replace(sc4_out, new_sc4_out)

with open(r'c:\pntech_source_code\index.html', 'w', encoding='utf-8') as f:
    f.write(html)
