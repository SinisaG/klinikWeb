from operator import attrgetter
from hnc.forms.handlers import FormHandler
from klinik.common.models.content import GetImagesProc, GetTextsProc, GetControlProc
from klinik.views.website.forms import ContactForm


class index(FormHandler):
    form =ContactForm

    def add_globals(self, request, result):
        result['images'] = GetImagesProc(request)
        result['texts'] = GetTextsProc(request)
        return result

    def display(self, request, value):
        Control =  GetControlProc(request, {"name":value})
        return Control.value

def empty(context, request):
    return {}