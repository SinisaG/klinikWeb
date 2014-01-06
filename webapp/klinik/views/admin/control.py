from hnc.forms.formfields import BaseForm
from hnc.forms.handlers import FormHandler
from  .__resources__ import AdminResource
from klinik.common.lib.html import admin_t
from klinik.common.models.content import  GetControlsProc, GetControlProc, EditControlProc
from pyramid.decorator import reify
from hnc.forms.formfields import CheckboxField

class ControlResource(AdminResource):
    @reify
    def control(self):
        name = self.request.params['name']
        return GetControlProc(self.request, {'name':name})


def add_views(config):
    config.add_view(
        route_name="admin_control_list"
        , view=all_texts
        , renderer=admin_t("control/list.html")
    )

    config.add_view(
        route_name="admin_control_edit"
        , view=EditDisplayHandler
        , renderer=admin_t("form.html")
    )

# ========================================== VIEWS ==========================================


class EditDisplayForm(BaseForm):
    id="EditDisplay"
    label = "Edit section properties"
    fields=[
        CheckboxField("value", "Display")
    ]
    @classmethod
    def on_success(cls, request, values):
        values["name"]=request.params['name']
        EditControlProc(request, values)
        return {'success':True, 'redirect': request.fwd_url("admin_control_list")}


class EditDisplayHandler(FormHandler):
    form = EditDisplayForm
    def pre_fill_values(self, request, result):
        control = request.context.control
        result['values'][self.form.id] = control.unwrap()
        return super(EditDisplayHandler, self).pre_fill_values(request, result)

def all_texts(context,request):
    return {'controls':GetControlsProc(request)}