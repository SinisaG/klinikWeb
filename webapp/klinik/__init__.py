from datetime import datetime, date
import logging
from hnc.apps.static_content.views import set_up_content_mgmt_app
from klinik.common.models.content import GetStaticContentProc
from klinik.views.admin.__resources__ import AdminResource
from pyramid.authentication import SessionAuthenticationPolicy
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.config import Configurator
from pyramid.renderers import JSON
from pyramid.security import Authenticated, Everyone
from pyramid_beaker import session_factory_from_settings

from hnc.tools import request
import pyramid_mako

from .common.lib.subscribers import add_renderer_variables
from .common.lib.globals import Globals
from .views.website.__resources__ import WebsiteResource

log = logging.getLogger(__name__)


def format_date(val, request): return val.strftime('%Y-%m-%d')


def format_datetime(val, request): return val.strftime('%Y-%m-%dT%H-%M-%S')


jsonRenderer = JSON()
jsonRenderer.add_adapter(datetime, format_datetime)
jsonRenderer.add_adapter(date, format_date)


class Security(SessionAuthenticationPolicy):
    def authenticated_userid(self, request):
        return request.context.user.token

    def effective_principals(self, request, *args, **kwargs):
        principals = [Everyone]
        user = request.context.user
        if not user.isAnon():
            principals += [Authenticated, 'u:%s' % user.token] + user.UserGroups
        return principals



def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    settings["g"] = g = Globals(**settings)
    config = Configurator(settings=settings
        , session_factory=session_factory_from_settings(settings)
        , authentication_policy=Security()
        , authorization_policy=ACLAuthorizationPolicy()
        , default_permission='view'
    )

    request.extend_request_dispatch(config)

    config.add_directive('add_mako_renderer', pyramid_mako.add_mako_renderer)
    config.add_mako_renderer(".html")
    config.add_mako_renderer(".xml")
    config.add_renderer('json', jsonRenderer)

    def _(request, string):
        return string
    config.add_request_method(_)
    def pluralize(request, singular, plural, num):
        return singular.format(num=num) if num == 1 else plural.format(num=num)
    config.add_request_method(pluralize)



    config.add_subscriber(add_renderer_variables, 'pyramid.events.BeforeRender')

    def dictionary_factory(request):
        result = GetStaticContentProc(request)
        return {k.key:k.value for k in result.Static}
    POFILE = set_up_content_mgmt_app(config, "klinik:locale/klinik.pot", dictionary_factory)
    g.set_po_file(POFILE)

    config.include("klinik.views.website")
    config.include("klinik.views.admin", route_prefix="/admin")
    config.add_route("admin_home", "/admin", factory=AdminResource) # this is required to admin tool is at /admin and not /admin/
    return config.make_wsgi_app()
