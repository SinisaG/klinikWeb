from hnc.forms.formfields import EmailField, StringField, REQUIRED, TextareaField, BaseForm
from turbomail import interface, Message

__author__ = 'Sinisa'


class   ContactForm(BaseForm):
    id="contactForm"
    classes="form-validated form-horizontal"
    fields = [
    ]

    @classmethod
    def on_success(cls, request, values):
        g = request.globals
        config = g.getMailConfig()
        interface.start(config)
        msg = Message(config['mail.smtp.username'], g.mailRecipient, "Contact", encoding ='utf-8')
        msg.plain = u'\n\n'.join( map(lambda s: s.format(**values), [u'First Name: {name}', u'Email: {email}', u'Message: {message}']) )
        msg.send()
        interface.stop(force=True)
        return {'success':True, 'redirect':request.fwd_url('website_home')}
