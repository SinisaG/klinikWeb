from klinik.common.lib.baseviews import RootResource
from klinik.common.models.content import GetStaticRawContentProc
from klinik.views.admin.__resources__ import AdminUserMixin
from pyramid.security import ALL_PERMISSIONS, DENY_ALL, Allow


class AdminApiResource(AdminUserMixin, RootResource):
    __acl__ = [(Allow, "AdminUser", ALL_PERMISSIONS), DENY_ALL]
    app_label = 'admin'

def add_views(config):

    def get_active_keys(ctxt, req): return [l.msgid for l in req.globals.po_file()]
    config.add_view(
        route_name="admin_api_activecontent"
        , view=get_active_keys
        , renderer="json"
    )
    config.add_view(route_name="admin_api_content", view=GetStaticRawContentProc   , renderer="json")


