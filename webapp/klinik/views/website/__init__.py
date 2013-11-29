from klinik.common.lib.html import website_t
from klinik.common.lib.baseviews import EMPTY_VIEW
from . import index
from .__resources__ import WebsiteResource


class BaseSettings(object):
    css_name = key = "website"
    static_prefix = "/static/"


class WebsiteSettings(BaseSettings):
    def __init__(self, settings):
        self.clientToken = settings['apiToken']
        self.gaCode = settings.get('gaCode')
        self.gaDomain = settings.get('gaDomain')


def add_settings(config):
    settings = config.registry.settings
    settings['g'].setSettings(WebsiteSettings, settings)


def add_views(config):
    config.add_forbidden_view(
        view=EMPTY_VIEW
        , renderer=website_t("forbidden.html")
        , containment=WebsiteResource
    )
    config.add_view(
        route_name="website_home"
        , view=index.index
        , renderer=website_t("index.html")
    )

    config.add_view(
        route_name="website_impressum"
        , view=index.empty
        , renderer=website_t("impressum.html")
    )

def add_routes(config):
    config.add_route("website_home", "/", factory=WebsiteResource)
    config.add_route("website_impressum", "/impressum", factory=WebsiteResource)

def includeme(config):
    add_settings(config)
    add_views(config)
    add_routes(config)
