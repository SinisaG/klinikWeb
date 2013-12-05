from .__resources__ import AdminResource
from klinik.common.lib.baseviews import EMPTY_VIEW
from klinik.common.lib.html import admin_t
from klinik.views.admin import auth, content, api, image


class AdminSettings(object):
    css_name = key = "admin"
    static_prefix = "/static/"

    def __init__(self, settings):
        self.clientToken = settings['apiToken']
        self.filepickerKey = settings['filepickerKey']
        self.login = settings['login']
        self.gaCode = settings.get('gaCode')
        self.gaDomain = settings.get('gaDomain')
        self.maps_key = 'MAPS_KEY'

def add_settings(config):
    settings = config.registry.settings
    settings['g'].setSettings(AdminSettings, settings)


def add_views(config):
    config.add_view(
        route_name="admin_home"
        , view=EMPTY_VIEW
        , renderer=admin_t("dashboard.html")
    )
    auth.add_views(config)
    content.add_views(config)
    api.add_views(config)
    image.add_views(config)


def add_routes(config):
    config.add_route("admin_logout"                 , "/logout"                 , factory=AdminResource)

    config.add_route("admin_content_list"           , "/contents"               , factory=AdminResource)
    config.add_route("admin_content_add"            , "/contents/add"           , factory=AdminResource)
    config.add_route("admin_content_edit"           , "/contents/edit"          , factory=content.ContentResource)
    config.add_route("admin_content_delete"         , "/contents/delete"        , factory=content.ContentResource)

    config.add_route("admin_api_content"            , "/api/content"            , factory=api.AdminApiResource)
    config.add_route("admin_api_activecontent"      , "/api/activecontent"      , factory=api.AdminApiResource)

    config.add_route("admin_image_list"            , "/image"                 , factory=AdminResource)
    config.add_route("admin_image_create"          , "/image/create"          , factory=AdminResource)
    config.add_route("admin_image_delete"          , "/image/delete"          , factory=AdminResource)

def includeme(config):
    add_settings(config)
    add_views(config)
    add_routes(config)