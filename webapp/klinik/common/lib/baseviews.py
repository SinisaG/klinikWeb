from pyramid.decorator import reify
from hnc.forms.formfields import BaseForm as BF, GRID_BS3
from pyramid.security import Everyone, Allow, DENY_ALL


def EMPTY_VIEW(context, request): return {}

class BaseForm(BF):
    grid = GRID_BS3
    @classmethod
    def cancel_url(cls, request):
        return request.rld_url()


class RootResource(object):
    __acl__ = [(Allow, Everyone, 'view')]

    def __init__(self, request):
        self.request = request

    @reify
    def settings(self):
        return getattr(self.request.globals, self.app_label)

    @property
    def site_title(self):
        return [self.request.globals.project_name]
