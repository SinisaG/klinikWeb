from operator import itemgetter
import os
from hnc.apiclient import Mapping, TextField, IntegerField, DictField, ListField
from hnc.apiclient.backend import ClientTokenProc
from hnc.apps.static_content.views import ContentModel
from pyramid.path import AssetResolver
from klinik.common.lib.html import website_t

__author__ = 'Martin'

# locate all available template files for homepage blocks
TEMPLATES = []
a = AssetResolver()
asset = website_t("")
asset_path = a.resolve(asset)
if not asset_path.exists():
    raise ValueError("NO HOMEPAGE TEMPLATES EXIST AT: {}".format(asset))
else:
    for f in os.listdir(asset_path.abspath()):
        if f[-5:] == '.html':
            TEMPLATES.append({'path': os.path.join(asset_path.abspath(), f), 'name': f[:-5]})


class HST(Mapping):
    name = TextField()
    path = TextField()

    def getKey(self, request): return self.name
    def getLabel(self, request): return self.name

    @property
    def template(self):
        return website_t("{}.html".format(self.name))


class Image(Mapping):
    id = IntegerField()
    url = TextField()

class Text (Mapping):
    id = IntegerField()
    title = TextField()
    body = TextField()

HOMEPAGE_BLOCKS = [HST(**f) for f in sorted(TEMPLATES, key = itemgetter('name'))]


GetStaticRawContentProc  = ClientTokenProc("/web/content")
GetStaticContentProc  = ClientTokenProc("/web/content", root_key="Content", result_cls=ContentModel)
SetStaticContentProc = ClientTokenProc("/web/content/set")
GetImagesProc = ClientTokenProc("/web/image/all", root_key="Images", result_cls=Image, result_list=True)
GetTextsProc = ClientTokenProc("/web/text/all", root_key="Texts", result_cls=Text, result_list=True)