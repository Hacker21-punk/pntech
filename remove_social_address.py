import re, glob, os

html_files = glob.glob(r'c:\pntech_source_code\*.html')

for f in html_files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    original = content
    name = os.path.basename(f)
    
    # 1. Remove desktop footer social media icons (ft-sns div)
    content = re.sub(
        r'\s*<div class="ft-sns">.*?</div>\s*\n',
        '\n',
        content,
        flags=re.DOTALL
    )
    
    # 2. Remove mobile footer social media links (ft-sns-link div)
    content = re.sub(
        r'\s*<div class="ft-sns-link">.*?</div>\s*\n',
        '\n',
        content,
        flags=re.DOTALL
    )
    
    # 3. Remove floating sidebar share button (sc33-fx) - only in some files
    content = re.sub(
        r'\s*<div class="sc33-item sc33-fx"[^>]*>.*?</div>\s*</div>\s*\n',
        '\n',
        content,
        flags=re.DOTALL
    )
    
    # 4. For contact.html specifically - remove address from banner
    if name == 'contact.html':
        content = re.sub(
            r'\s*<div style="margin-top:20px;">.*?</div>\s*\n',
            '\n',
            content,
            flags=re.DOTALL,
            count=1
        )
    
    if content != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        print(f'Updated: {name}')
    else:
        print(f'No change: {name}')
