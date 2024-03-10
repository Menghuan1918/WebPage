from datetime import datetime
# 定义网站或博客的作者名称
AUTHOR = 'menghuan1918'
# 网站名称
SITENAME = "Menghuan1918's Blog"
# 网站的URL
# SITEURL = "http://localhost:8000"
SITEURL = "https://blog.menghuan1918.com"
# 网站标题，显示在浏览器标签页和网站头部
SITETITLE = "Menghuan1918's Blog"

# 网站副标题，描述网站或作者职业
# SITESUBTITLE = "Hi"
# 网站描述，用于搜索引擎和社交媒体预览
SITEDESCRIPTION = "个人博客，记录学习和生活"
# # 网站Logo的URL，使用SITEURL变量构建完整路径
SITELOGO = SITEURL + "/images/profile.png"
# # 网站的favicon（网站图标）路径
FAVICON = SITEURL + "/images/favicon.ico"

PLUGIN_PATHS = ['./']
# 启用国际化插件
PLUGINS = ["i18n_subsites"]
# 启用Jinja2的国际化扩展，用于解析翻译
JINJA_ENVIRONMENT = {"extensions": ["jinja2.ext.i18n"]}
# 默认语言设置为中文
DEFAULT_LANG = "zh_CN"
# Open Graph协议使用的地区设置
OG_LOCALE = "zh_CN"
# 网站的地区设置，同样设置为中文
LOCALE = ("zh_CN","zh_CN.utf8")
# 默认的主题语言
I18N_TEMPLATES_LANG = "en"

PATH = "content"

TIMEZONE = 'Asia/Shanghai'


# 浏览器颜色配置，用于移动浏览器的地址栏背景颜色
BROWSER_COLOR = "#86cde9"
# 搜索引擎爬虫的索引指令
ROBOTS = "index, follow"

# 网站使用的创作共用许可证信息
CC_LICENSE = {
    "name": "知识共享署名-非商业性使用-相同方式共享4.0协议 进行许可", # 许可证名称
    "version": "4.0", # 许可证版本
    "slug": "by-nc-sa", # 许可证简称
    "language": "zh_CN" # 许可证语言
}

# 网站版权声明的年份
COPYRIGHT_YEAR = datetime.now().year

# 网站静态路径配置，用于指定需要包含在输出中的文件或文件夹
STATIC_PATHS = ["images"]
#,"extra/custom.css"
# 额外路径元数据配置，用于自定义静态文件的输出路径
# EXTRA_PATH_METADATA = {
#     "extra/custom.css": {"path": "static/custom.css"}, # 将custom.css输出到指定路径
# }

# # 自定义CSS文件的路径
# CUSTOM_CSS = "static/custom.css"

# 是否显示主菜单
MAIN_MENU = True

# # AddThis社交分享工具的公共ID
# ADD_THIS_ID = "ra-77hh6723hhjd"
# # Disqus评论系统的网站简称
# DISQUS_SITENAME = "yoursite"
# # Google Analytics追踪ID
# GOOGLE_ANALYTICS = "G-KJQEZVXJ97"
# # Google Tag Manager的ID
# GOOGLE_TAG_MANAGER = "GTM-ABCDEF"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    ("网站源代码", "https://github.com/Menghuan1918/WebPage"),
)

# Social widget
SOCIAL = (
    ("github","https://github.com/Menghuan1918"),
    ("envelope", 'mailto:menghuan@menghuan1918.com'),
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True

THEME_COLOR_AUTO_DETECT_BROWSER_PREFERENCE = True
THEME_COLOR_ENABLE_USER_OVERRIDE = True
TYPOGRIFY = True

MARKDOWN = {
    'extension_configs': {
        'markdown.extensions.codehilite': {'css_class': 'highlight'},
        'markdown.extensions.extra': {},
        'markdown.extensions.meta': {},
        'pymdownx.tilde': {},
    },
    'output_format': 'html5',
}