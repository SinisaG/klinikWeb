from hnc_forms_ext.controls import PictureUploadField
from hnc.forms.formfields import BaseForm
from hnc.forms.handlers import FormHandler
from hnc.tools.request import JsonAwareRedirect
from klinik.common.lib.html import admin_t
from klinik.common.models.content import GetImagesProc, DeleteImageProc, AddImageProc


def add_views(config):
    config.add_view(
        route_name="admin_image_list"
        , view=all_images
        , renderer=admin_t("image/list.html")
    )

    config.add_view(
        route_name="admin_image_create"
        , view=CreateImageHandler
        , renderer=admin_t("form.html")
    )

    config.add_view(
        route_name="admin_image_delete"
        , view=delete
    )

# ========================================== VIEWS ==========================================

class CreateImageForm(BaseForm):
    id="CreateImage"
    label = "Add picture"
    fields=[
        PictureUploadField("url", "Gallery Picture")
    ]

    @classmethod
    def on_success(cls, request, values):
        AddImageProc(request, values)
        return {'success':True, 'redirect': request.fwd_url("admin_image_list")}

class CreateImageHandler(FormHandler):
    form = CreateImageForm

def delete(context, request):
    DeleteImageProc(request, {'id': request.params['id']})
    raise JsonAwareRedirect(request.fwd_url("admin_image_list"))

def all_images(context,request):
    return {'images':GetImagesProc(request)}