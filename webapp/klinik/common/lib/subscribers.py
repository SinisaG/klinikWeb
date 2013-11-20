import simplejson



def add_renderer_variables(event):
    if event['renderer_name'] != 'json':
        request = event['request']

        app_globals = request.globals
        settings = request.context.settings

        event.update({
              'g'               : app_globals
            , 'root'            : request.root
            , 'ctxt'            : request.context #is identical to root for url dispatch
            , 'url'             : request.route_url
            , '_'               : request._
            , 'pluralize'       : request.pluralize
            , 'settings'        : settings
            , 'STATIC_URL'      : settings.static_prefix
            , 'VERSION_TOKEN'   : app_globals.VERSION_TOKEN
        })
    return event