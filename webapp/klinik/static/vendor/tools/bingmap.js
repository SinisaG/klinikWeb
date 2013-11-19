define([], function(){
    var mapLoaded = $.Deferred(), locationLoaded = $.Deferred(), n, i;

    n = document.createElement("script");i = document.getElementsByTagName("head")[0];
    n.type = "text/javascript"; n.language = "javascript"; n.id = "bingMapsSources";
    n.src = "http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0&onscriptload=bingLoadedCallback"; i.appendChild(n);

    window.bingLoadedCallback = mapLoaded.resolve;
    return {mapsLoaded: mapLoaded};
});