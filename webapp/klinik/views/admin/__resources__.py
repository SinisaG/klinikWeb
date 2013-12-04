from klinik.common.lib.baseviews import RootResource
from klinik.common.models.auth import UserModel, UserMixin
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

    ]

    @property
    def sub_area_route(self):
        return self.request.matched_route.name




