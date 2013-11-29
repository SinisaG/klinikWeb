from operator import attrgetter
from hnc.forms.handlers import FormHandler
from klinik.views.website.forms import ContactForm


class index(FormHandler):
    form =ContactForm
