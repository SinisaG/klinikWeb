define(["tools/ajax", "tools/bingmap"], function(ajax, maplib){

    var View = Backbone.View.extend({
        initialize:function(opts){
            this.apiKey = this.$el.data("mapsKey");
            this.fieldName = this.$el.data("fieldName");
            this.$map = $('<div class="map-container"></div>').insertAfter(this.$el);
            this.defaults = { center: { latitude: 51.502799, longitude: -0.115914 }, initial_zoom: 14, selected_zoom: 17 }
            this.mapLoaded = $.Deferred();

            var view = this;
            maplib.mapsLoaded.done(function(){
                view.initMap();
            });
        }
        , initMap: function(){
            var center = this.defaults.center;
            center.location = new Microsoft.Maps.Location(center.latitude, center.longitude);
            this.map = new Microsoft.Maps.Map(this.$map[0],
                    _.extend({ credentials: this.ApiKey
                        , mapTypeId: Microsoft.Maps.MapTypeId.road
                        , showMapTypeSelector: false
                        , disableBirdseye: true
                        , showScalebar: true
                        , enableClickableLogo: false
                        , enableSearchLogo: false
                        , showCopyright: false
                        , zoom: this.defaults.initial_zoom
                        , center: center.location
                    }, this.mapOptions()));
            this.map.getMode().setViewChangeEndDelay(0);
            this.center(center.location, this.defaults.initial_zoom);
            Microsoft.Maps.Events.addHandler(this.map, "tiledownloadcomplete", this.mapLoaded.resolve);
            Microsoft.Maps.Events.addHandler(this.map, "click", $.proxy(this.onClick, this));
        }
        , mapOptions: function(){
            return { showDashboard: true, disablePanning: false, disableZooming: false, showMapTypeSelector:true }
        }
        , addPin: function(location){
            var view = this;
            this.mapLoaded.done(function(){
                var pin = new Microsoft.Maps.Pushpin(location, { draggable: false });
                view.map.entities.push(pin);
                view.trigger("pin:dropped", location);
            });
        }
        , setPin : function (location) {
            var view = this;
            this.mapLoaded.done(function(){
                var pin = new Microsoft.Maps.Pushpin(location, { draggable: false });
                view.map.entities.clear();
                view.map.entities.push(pin);
                view.trigger("pin:dropped", location);
            });
        }
        , center: function(location, zoom){
            var view = this;
            this.mapLoaded.done(function(){
                view.map.setView({ center: location});
                view.trigger("map:centered", location.latitude, location.longitude);
            });
        }
        , onClick : function(e){
            var location = this.map.tryPixelToLocation(new Microsoft.Maps.Point(e.getX(), e.getY()));
            this.setPin(location);
            this.$el.find('input[data-property=latitude]').val(location.latitude)
            this.$el.find('input[data-property=longitude]').val(location.longitude)
        }
    })
    , init = function(opts){
        return new View(opts);
    };
    return {init: init, View: View};
});