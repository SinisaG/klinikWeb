from hnc.forms.formfields import EmailField, REQUIRED, PasswordField, BaseForm
from hnc.forms.handlers import FormHandler
from hnc.tools.request import JsonAwareRedirect
from .__resources__ import AdminResource
from klinik.common.lib.html import admin_t
from klinik.views.admin.__resources__ import USER_TOKEN, AdminUserModel


def add_views(config):
    config.add_forbidden_view(
        view=AuthenticationHandler
        , renderer=admin_t("form.html")
        , containment=AdminResource
    )
    config.add_view(
        route_name="admin_logout"
        , view=logout
    )

# ========================================== VIEWS ==========================================



def logout(ctxt, req):
    if USER_TOKEN in req.session:
        del req.session[USER_TOKEN]
    ctxt.user = AdminUserModel()
    raise JsonAwareRedirect(location = req.fwd_url("admin_home"))


class LoginForm(BaseForm):
    label = "Admin Login"
    submit_label = "Login"
    fields = [
        EmailField("email", "Email", REQUIRED)
        , PasswordField("pwd", "Password", REQUIRED)
    ]
    @classmethod
    def on_success(cls, request, values):

        # check if this is same as configured in INI file
        if values == request.context.settings.login:
            request.context.setUser(AdminUserModel(token = 'ADMIN', **values))
            return {'success':True, 'redirect': request.rld_url()}

        return {'success':False, "errors":{"email": "Unknown email or password."}}

class AuthenticationHandler(FormHandler):
    form = LoginForm

