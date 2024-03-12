import os
from pathlib import Path

# bing要求每个网页只能有一个h1标签......
folder_path = './output/'

# 指定要替换的内容
old_content = '''
    <h1>
      <a href="https://blog.menghuan1918.com/">Menghuan1918's Blog</a>
    </h1>
'''
new_content = '''
    <h2>
      <a href="https://blog.menghuan1918.com/">Menghuan1918's Blog</a>
    </h2>
'''

# 遍历文件夹中的所有文件
for file in Path(folder_path).glob('*.html'):
    if file.name != 'index.html':
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
    
        if old_content in content:
            modified_content = content.replace(old_content, new_content)
            
            with open(file, 'w', encoding='utf-8') as f:
                f.write(modified_content)
