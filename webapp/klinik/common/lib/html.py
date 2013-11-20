import hashlib
import logging
import re
from BeautifulSoup import BeautifulSoup
from babel import dates
from hnc.tools.tools import word_truncate_by_letters
import markdown
import smartypants
import unidecode


log = logging.getLogger(__name__)

__author__ = 'Martin'


def common(name):
    return "klinik:templates/common/{}".format(name)

def admin_t(name):
    return "klinik:templates/admin/{}".format(name)

def website_t(name):
    return "klinik:templates/website/{}".format(name)





def hash(txt):
    if not txt: return None
    return hashlib.md5(txt).hexdigest()

def html(text):
    if not text: return ''
    # catch any mis-typed en dashes
    converted_txt = text.replace(" - ", " -- ")
    converted_txt = smartypants.educateQuotes(converted_txt)
    converted_txt = smartypants.educateEllipses(converted_txt)
    converted_txt = smartypants.educateDashesOldSchool(converted_txt)
    # normalise line endings and insert blank line between paragraphs for Markdown
    converted_txt = re.sub("\r\n", "\n", converted_txt)
    converted_txt = re.sub("\n\n+", "\n", converted_txt)
    converted_txt = re.sub("\n", "\n\n", converted_txt)
    html = markdown.markdown(converted_txt)
    return html


def slugify(text):
    str = unidecode.unidecode(text).lower()
    return re.sub(r'\W+','.',str)

def trunc(length):
    def f(text):
        if text is None: return ''
        return word_truncate_by_letters(text, length)
    return f

def nn(text, alt = ''):
    return alt if text is None else text

def wc(text):
    txt = '' if text is None else text
    if txt:
        return '{}...'.format(txt.rsplit(" ", 1)[0])
    else:
        return ''

def coalesce(t1, t2):
    return t1 if t1 else t2 if t2 else ''

def clean(txt):
  soup = BeautifulSoup(txt)
  for tag in soup.findAll(True):
      tag.extract()
  val = soup.renderContents()
  return val.decode("utf-8")


def format_date(date, format="short"):
    return dates.format_date(date, format, locale='en')

def format_datetime(date, format="full"):
    return dates.format_datetime(date, format, locale='en')
