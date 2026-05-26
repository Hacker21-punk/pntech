import re, glob, os

html_files = glob.glob(r'c:\pntech_source_code\*.html')

for f in html_files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    
    original = content
    name = os.path.basename(f)
    
    # Fix the extra </div> left behind after sc33-fx removal
    # Pattern: sc33-zx item ends, then there's an orphan </div>, then sc33-top
    content = re.sub(
        r'(sc33-zx.*?</div></div>)\s*\r?\n\s*</div>\s*\r?\n(\s*<div class="sc33-item sc33-top")',
        r'\1\n\2',
        content,
        flags=re.DOTALL
    )
    
    if content != original:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        print(f'Fixed: {name}')
    else:
        print(f'OK: {name}')
