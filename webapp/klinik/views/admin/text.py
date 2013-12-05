from  .__resources__ import AdminResource
from klinik.common.lib.html import admin_t
from hnc.forms.formfields import BaseForm, StringField, TextareaField
from klinik.common.models.content import AddTextProc, DeleteTextProc, GetTextsProc, EditTextProc, GetTextProc
from hnc.forms.handlers import FormHandler
from hnc.tools.request import JsonAwareRedirect
from pyramid.decorator import reify


class TextResource(AdminResource):
    @reify
    def text(self):
        id = self.request.params['id']
        return GetTextProc(self.request, {'id':id})

def add_views(config):
    config.add_view(
        route_name="admin_text_list"
        , view=all_texts
        , renderer=admin_t("text/list.html")
    )

    config.add_view(
        route_name="admin_text_create"
        , view=CreateTextHandler
        , renderer=admin_t("form.html")
    )

    config.add_view(
        route_name="admin_text_delete"
        , view=delete
    )

    config.add_view(
        route_name="admin_text_edit"
        , view=EditTextHandler
        , renderer=admin_t("form.html")
    )

# ========================================== VIEWS ==========================================

class CreateTextForm(BaseForm):
    id="CreateText"
    label = "Add paragraph"
    fields=[
        StringField("title", "Title"),
        TextareaField("body", "Text"),
    ]
    @classmethod
    def on_success(cls, request, values):
        AddTextProc(request, values)
        return {'success':True, 'redirect': request.fwd_url("admin_text_list")}

class EditTextForm(BaseForm):
    id = "EditText"
    label = "Edit paragraph"
    fields= CreateTextForm.fields


    @classmethod
    def on_success(cls, request, values):
        values["id"]=request.params['id']
        EditTextProc(request, values)
        return {'success':True, 'redirect': request.fwd_url("admin_text_list")}

class CreateTextHandler(FormHandler):
    form = CreateTextForm

class EditTextHandler(FormHandler):
    form = EditTextForm
    def pre_fill_values(self, request, result):
        text = request.context.text
        result['values'][self.form.id] = text.unwrap()
        return super(EditTextHandler, self).pre_fill_values(request, result)

def delete(context, request):
    DeleteTextProc(request, {'id': request.params['id']})
    raise JsonAwareRedirect(request.fwd_url("admin_text_list"))

def all_texts(context,request):
    return {'texts':GetTextsProc(request)}