from datetime import datetime
from operator import attrgetter
from hnc.apiclient import Mapping, TextField, IntegerField, ListField, DictField, DateTimeField
from pyramid.security import has_permission
from pyramid.decorator import reify
import simplejson



class UserModel(Mapping):
    @property
    def UserGroups(self):
        raise NotImplementedError()

    token = TextField()
    slug = TextField()
    name = TextField()
    email = TextField()

    def isAnon(self):
        return self.token is None
    def toJSON(self, stringify = True):
        json = self.unwrap(sparse = True).copy()
        return simplejson.dumps(json) if stringify else json


def UserMixin(SESSION_TOKEN, UserModelImpl):
    class UserMixinImplementation(object):
        @reify
        def user(self):
            return self.request.session.get(SESSION_TOKEN) or UserModelImpl()
        def setUser(self, user):
            self.request.session[SESSION_TOKEN] = user
            self.user = user
    return UserMixinImplementation