# -*- coding: utf-8 -*-
from hnc.forms.handlers import FormHandler
from klinik.common.models.content import GetImagesProc, GetTextsProc, GetControlProc
from klinik.views.website.forms import ContactForm


class index(FormHandler):
    form =ContactForm

    def add_globals(self, request, result):
        result['images'] = GetImagesProc(request)
        result['texts'] = GetTextsProc(request)
        result['title'] = u'Tagesklinik am Friesenplatz Köln'
        result['description'] = u'Die Tagesklinik am Friesenplatz ist als private Fachklinik mit zehn Behandlungsplätzen auf die Diagnostik und Behandlung der Depression spezialisiert.'
        return result

    def display(self, request, value):
        Control =  GetControlProc(request, {"name":value})
        return Control.value

def empty(context, request):
    return {'title':u'Tagesklinik am Friesenplatz Köln | Impressum', 'description':u'Tagesklinik am Friesenplatz, Friesenstraße 72–74, 50670 Köln. Telefon: 0221 120 62 44-2. Fax: 0221 120 62 44-3. Email: info@tages-klinikfriesenplatz.de'}