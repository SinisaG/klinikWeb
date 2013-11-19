import logging
from klinik.common.lib.baseviews import RootResource
from klinik.common.models.auth import UserMixin, UserModel

log = logging.getLogger(__name__)


USER_TOKEN = "USER_TOKEN"
class WebUserModel(UserModel): UserGroups = ['WebUser']
WebUserMixin = UserMixin(USER_TOKEN, WebUserModel)

class WebsiteResource(WebUserMixin, RootResource):
    app_label = 'website'

