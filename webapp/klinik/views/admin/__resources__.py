from klinik import GetStaticContentProc
from klinik.common.lib.baseviews import RootResource
from klinik.common.models.auth import UserModel, UserMixin
from pyramid.decorator import reify
from pyramid.security import Allow, ALL_PERMISSIONS, DENY_ALL


class AdminUserModel(UserModel):UserGroups = ["AdminUser"]
USER_TOKEN = "ADMIN_USER_TOKEN"
AdminUserMixin = UserMixin(USER_TOKEN, AdminUserModel)

class MenuEntry(object):
    def __init__(self, route_name, menu_label):
        super(MenuEntry, self).__init__()
        self.menu_label = menu_label
        self.route_name = route_name


class AdminResource(AdminUserMixin, RootResource):
    __acl__ = [(Allow, "AdminUser", ALL_PERMISSIONS), DENY_ALL]
    app_label = 'admin'
    site_title = ['Admin Site']

    main_menu = [
         MenuEntry("admin_content_list", "Static Content"),
         MenuEntry("admin_image_list", "Images"),
         MenuEntry("admin_text_list", "Text")
    ]

    @property
    def sub_area_route(self):
        return self.request.matched_route.name

    @reify
    def contentsMap(self):
        result = GetStaticContentProc(self.request)
        if not result:
            return {}
        else:
            return {k.key:k.value for k in result.Static}


