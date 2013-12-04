from hnc.apps.static_content.views import ContentCreationViewFactory, ContentEditViewFactory, delete_view_factory, KeyValueModel
from .__resources__ import AdminResource
from klinik.common.lib.baseviews import EMPTY_VIEW
from klinik.common.lib.html import admin_t
from klinik.common.models.content import SetStaticContentProc
from pyramid.decorator import reify

class ContentResource(AdminResource):
    @reify
    def content(self):
        slug = self.request.params['slug']
        return KeyValueModel(key = slug, value = self.contentsMap[slug])

def add_views(config):
    config.add_view(
        route_name="admin_content_list"
        , view=EMPTY_VIEW
        , renderer=admin_t("content/list.html")
    )
    config.add_view(
        route_name="admin_content_add"
        , view=ContentCreationViewFactory(SetStaticContentProc, lambda req: req.fwd_url("admin_content_list"))
        , renderer=admin_t("form.html")
    )
    config.add_view(
        route_name="admin_content_edit"
        , view=ContentEditViewFactory(SetStaticContentProc, lambda req: req.fwd_url("admin_content_list"))
        , renderer=admin_t("form.html")
    )
    config.add_view(
        route_name="admin_content_delete"
        , view=delete_view_factory(SetStaticContentProc, lambda req: req.fwd_url("admin_content_list"))
    )

