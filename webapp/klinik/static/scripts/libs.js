/*
jQuery Waypoints - v1.1.7
Copyright (c) 2011-2012 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/MIT-license.txt
https://github.com/imakewebthings/jquery-waypoints/blob/master/GPL-license.txt
*/
(function($,k,m,i,d){var e=$(i),g="waypoint.reached",b=function(o,n){o.element.trigger(g,n);if(o.options.triggerOnce){o.element[k]("destroy")}},h=function(p,o){if(!o){return -1}var n=o.waypoints.length-1;while(n>=0&&o.waypoints[n].element[0]!==p[0]){n-=1}return n},f=[],l=function(n){$.extend(this,{element:$(n),oldScroll:0,waypoints:[],didScroll:false,didResize:false,doScroll:$.proxy(function(){var q=this.element.scrollTop(),p=q>this.oldScroll,s=this,r=$.grep(this.waypoints,function(u,t){return p?(u.offset>s.oldScroll&&u.offset<=q):(u.offset<=s.oldScroll&&u.offset>q)}),o=r.length;if(!this.oldScroll||!q){$[m]("refresh")}this.oldScroll=q;if(!o){return}if(!p){r.reverse()}$.each(r,function(u,t){if(t.options.continuous||u===o-1){b(t,[p?"down":"up"])}})},this)});$(n).bind("scroll.waypoints",$.proxy(function(){if(!this.didScroll){this.didScroll=true;i.setTimeout($.proxy(function(){this.doScroll();this.didScroll=false},this),$[m].settings.scrollThrottle)}},this)).bind("resize.waypoints",$.proxy(function(){if(!this.didResize){this.didResize=true;i.setTimeout($.proxy(function(){$[m]("refresh");this.didResize=false},this),$[m].settings.resizeThrottle)}},this));e.load($.proxy(function(){this.doScroll()},this))},j=function(n){var o=null;$.each(f,function(p,q){if(q.element[0]===n){o=q;return false}});return o},c={init:function(o,n){this.each(function(){var u=$.fn[k].defaults.context,q,t=$(this);if(n&&n.context){u=n.context}if(!$.isWindow(u)){u=t.closest(u)[0]}q=j(u);if(!q){q=new l(u);f.push(q)}var p=h(t,q),s=p<0?$.fn[k].defaults:q.waypoints[p].options,r=$.extend({},s,n);r.offset=r.offset==="bottom-in-view"?function(){var v=$.isWindow(u)?$[m]("viewportHeight"):$(u).height();return v-$(this).outerHeight()}:r.offset;if(p<0){q.waypoints.push({element:t,offset:null,options:r})}else{q.waypoints[p].options=r}if(o){t.bind(g,o)}if(n&&n.handler){t.bind(g,n.handler)}});$[m]("refresh");return this},remove:function(){return this.each(function(o,p){var n=$(p);$.each(f,function(r,s){var q=h(n,s);if(q>=0){s.waypoints.splice(q,1);if(!s.waypoints.length){s.element.unbind("scroll.waypoints resize.waypoints");f.splice(r,1)}}})})},destroy:function(){return this.unbind(g)[k]("remove")}},a={refresh:function(){$.each(f,function(r,s){var q=$.isWindow(s.element[0]),n=q?0:s.element.offset().top,p=q?$[m]("viewportHeight"):s.element.height(),o=q?0:s.element.scrollTop();$.each(s.waypoints,function(u,x){if(!x){return}var t=x.options.offset,w=x.offset;if(typeof x.options.offset==="function"){t=x.options.offset.apply(x.element)}else{if(typeof x.options.offset==="string"){var v=parseFloat(x.options.offset);t=x.options.offset.indexOf("%")?Math.ceil(p*(v/100)):v}}x.offset=x.element.offset().top-n+o-t;if(x.options.onlyOnScroll){return}if(w!==null&&s.oldScroll>w&&s.oldScroll<=x.offset){b(x,["up"])}else{if(w!==null&&s.oldScroll<w&&s.oldScroll>=x.offset){b(x,["down"])}else{if(!w&&s.element.scrollTop()>x.offset){b(x,["down"])}}}});s.waypoints.sort(function(u,t){return u.offset-t.offset})})},viewportHeight:function(){return(i.innerHeight?i.innerHeight:e.height())},aggregate:function(){var n=$();$.each(f,function(o,p){$.each(p.waypoints,function(q,r){n=n.add(r.element)})});return n}};$.fn[k]=function(n){if(c[n]){return c[n].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof n==="function"||!n){return c.init.apply(this,arguments)}else{if(typeof n==="object"){return c.init.apply(this,[null,n])}else{$.error("Method "+n+" does not exist on jQuery "+k)}}}};$.fn[k].defaults={continuous:true,offset:0,triggerOnce:false,context:i};$[m]=function(n){if(a[n]){return a[n].apply(this)}else{return a.aggregate()}};$[m].settings={resizeThrottle:200,scrollThrottle:100};e.load(function(){$[m]("refresh")})})(jQuery,"waypoint","waypoints",window);

/* ========================================================================
 * Bootstrap: affix.js v3.0.2
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)
    this.$window = $(window)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element = $(element)
    this.affixed  =
    this.unpin    = null

    this.checkPosition()
  }

  Affix.RESET = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$window.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin) this.$element.css('top', '')

    $('#main-menu').hasClass("affix-top")? $('.fill-space').css("margin-top", offsetTop) :  $('.fill-space').css("margin-top", 0);

    this.affixed = affix
    this.unpin   = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))

    if (affix == 'bottom') {
      this.$element.offset({ top: document.body.offsetHeight - offsetBottom - this.$element.height() })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      $spy.affix(data)
    })
  })

}(jQuery);

;(function($, window, document, undefined) {

        var pluginName = 'stellar',
                defaults = {
                        scrollProperty: 'scroll',
                        positionProperty: 'position',
                        horizontalScrolling: true,
                        verticalScrolling: true,
                        horizontalOffset: 0,
                        verticalOffset: 0,
                        responsive: false,
                        parallaxBackgrounds: true,
                        parallaxElements: true,
                        hideDistantElements: true,
                        hideElement: function($elem) { $elem.hide(); },
                        showElement: function($elem) { $elem.show(); }
                },

                scrollProperty = {
                        scroll: {
                                getLeft: function($elem) { return $elem.scrollLeft(); },
                                setLeft: function($elem, val) { $elem.scrollLeft(val); },

                                getTop: function($elem) { return $elem.scrollTop();        },
                                setTop: function($elem, val) { $elem.scrollTop(val); }
                        },
                        position: {
                                getLeft: function($elem) { return parseInt($elem.css('left'), 10) * -1; },
                                getTop: function($elem) { return parseInt($elem.css('top'), 10) * -1; }
                        },
                        margin: {
                                getLeft: function($elem) { return parseInt($elem.css('margin-left'), 10) * -1; },
                                getTop: function($elem) { return parseInt($elem.css('margin-top'), 10) * -1; }
                        },
                        transform: {
                                getLeft: function($elem) {
                                        var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
                                        return (computedTransform !== 'none' ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[4], 10) * -1 : 0);
                                },
                                getTop: function($elem) {
                                        var computedTransform = getComputedStyle($elem[0])[prefixedTransform];
                                        return (computedTransform !== 'none' ? parseInt(computedTransform.match(/(-?[0-9]+)/g)[5], 10) * -1 : 0);
                                }
                        }
                },

                positionProperty = {
                        position: {
                                setLeft: function($elem, left) { $elem.css('left', left); },
                                setTop: function($elem, top) { $elem.css('top', top); }
                        },
                        transform: {
                                setPosition: function($elem, left, startingLeft, top, startingTop) {
                                        $elem[0].style[prefixedTransform] = 'translate3d(' + (left - startingLeft) + 'px, ' + (top - startingTop) + 'px, 0)';
                                }
                        }
                },

                // Returns a function which adds a vendor prefix to any CSS property name
                vendorPrefix = (function() {
                        var prefixes = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
                                style = $('script')[0].style,
                                prefix = '',
                                prop;

                        for (prop in style) {
                                if (prefixes.test(prop)) {
                                        prefix = prop.match(prefixes)[0];
                                        break;
                                }
                        }

                        if ('WebkitOpacity' in style) { prefix = 'Webkit'; }
                        if ('KhtmlOpacity' in style) { prefix = 'Khtml'; }

                        return function(property) {
                                return prefix + (prefix.length > 0 ? property.charAt(0).toUpperCase() + property.slice(1) : property);
                        };
                }()),

                prefixedTransform = vendorPrefix('transform'),

                supportsBackgroundPositionXY = $('<div />', { style: 'background:#fff' }).css('background-position-x') !== undefined,

                setBackgroundPosition = (supportsBackgroundPositionXY ?
                        function($elem, x, y) {
                                $elem.css({
                                        'background-position-x': x,
                                        'background-position-y': y
                                });
                        } :
                        function($elem, x, y) {
                                $elem.css('background-position', x + ' ' + y);
                        }
                ),

                getBackgroundPosition = (supportsBackgroundPositionXY ?
                        function($elem) {
                                return [
                                        $elem.css('background-position-x'),
                                        $elem.css('background-position-y')
                                ];
                        } :
                        function($elem) {
                                return $elem.css('background-position').split(' ');
                        }
                ),

                requestAnimFrame = (
                        window.requestAnimationFrame       ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame    ||
                        window.oRequestAnimationFrame      ||
                        window.msRequestAnimationFrame     ||
                        function(callback) {
                                setTimeout(callback, 1000 / 60);
                        }
                );

        function Plugin(element, options) {
                this.element = element;
                this.options = $.extend({}, defaults, options);

                this._defaults = defaults;
                this._name = pluginName;

                this.init();
        }

        Plugin.prototype = {
                init: function() {
                        this.options.name = pluginName + '_' + Math.floor(Math.random() * 1e9);

                        this._defineElements();
                        this._defineGetters();
                        this._defineSetters();
                        this._handleWindowLoadAndResize();
                        this._detectViewport();

                        this.refresh({ firstLoad: true });

                        if (this.options.scrollProperty === 'scroll') {
                                this._handleScrollEvent();
                        } else {
                                this._startAnimationLoop();
                        }
                },
                _defineElements: function() {
                        if (this.element === document.body) this.element = window;
                        this.$scrollElement = $(this.element);
                        this.$element = (this.element === window ? $('body') : this.$scrollElement);
                        this.$viewportElement = (this.options.viewportElement !== undefined ? $(this.options.viewportElement) : (this.$scrollElement[0] === window || this.options.scrollProperty === 'scroll' ? this.$scrollElement : this.$scrollElement.parent()) );
                },
                _defineGetters: function() {
                        var self = this,
                                scrollPropertyAdapter = scrollProperty[self.options.scrollProperty];

                        this._getScrollLeft = function() {
                                return scrollPropertyAdapter.getLeft(self.$scrollElement);
                        };

                        this._getScrollTop = function() {
                                return scrollPropertyAdapter.getTop(self.$scrollElement);
                        };
                },
                _defineSetters: function() {
                        var self = this,
                                scrollPropertyAdapter = scrollProperty[self.options.scrollProperty],
                                positionPropertyAdapter = positionProperty[self.options.positionProperty],
                                setScrollLeft = scrollPropertyAdapter.setLeft,
                                setScrollTop = scrollPropertyAdapter.setTop;

                        this._setScrollLeft = (typeof setScrollLeft === 'function' ? function(val) {
                                setScrollLeft(self.$scrollElement, val);
                        } : $.noop);

                        this._setScrollTop = (typeof setScrollTop === 'function' ? function(val) {
                                setScrollTop(self.$scrollElement, val);
                        } : $.noop);

                        this._setPosition = positionPropertyAdapter.setPosition ||
                                function($elem, left, startingLeft, top, startingTop) {
                                        if (self.options.horizontalScrolling) {
                                                positionPropertyAdapter.setLeft($elem, left, startingLeft);
                                        }

                                        if (self.options.verticalScrolling) {
                                                positionPropertyAdapter.setTop($elem, top, startingTop);
                                        }
                                };
                },
                _handleWindowLoadAndResize: function() {
                        var self = this,
                                $window = $(window);

                        if (self.options.responsive) {
                                $window.bind('load.' + this.name, function() {
                                        self.refresh();
                                });
                        }

                        $window.bind('resize.' + this.name, function() {
                                self._detectViewport();

                                if (self.options.responsive) {
                                        self.refresh();
                                }
                        });
                },
                refresh: function(options) {
                        var self = this,
                                oldLeft = self._getScrollLeft(),
                                oldTop = self._getScrollTop();

                        if (!options || !options.firstLoad) {
                                this._reset();
                        }

                        this._setScrollLeft(0);
                        this._setScrollTop(0);

                        this._setOffsets();
                        this._findParticles();
                        this._findBackgrounds();

                        // Fix for WebKit background rendering bug
                        if (options && options.firstLoad && /WebKit/.test(navigator.userAgent)) {
                                $(window).load(function() {
                                        var oldLeft = self._getScrollLeft(),
                                                oldTop = self._getScrollTop();

                                        self._setScrollLeft(oldLeft + 1);
                                        self._setScrollTop(oldTop + 1);

                                        self._setScrollLeft(oldLeft);
                                        self._setScrollTop(oldTop);
                                });
                        }

                        this._setScrollLeft(oldLeft);
                        this._setScrollTop(oldTop);
                },
                _detectViewport: function() {
                        var viewportOffsets = this.$viewportElement.offset(),
                                hasOffsets = viewportOffsets !== null && viewportOffsets !== undefined;

                        this.viewportWidth = this.$viewportElement.width();
                        this.viewportHeight = this.$viewportElement.height();

                        this.viewportOffsetTop = (hasOffsets ? viewportOffsets.top : 0);
                        this.viewportOffsetLeft = (hasOffsets ? viewportOffsets.left : 0);
                },
                _findParticles: function() {
                        var self = this,
                                scrollLeft = this._getScrollLeft(),
                                scrollTop = this._getScrollTop();

                        if (this.particles !== undefined) {
                                for (var i = this.particles.length - 1; i >= 0; i--) {
                                        this.particles[i].$element.data('stellar-elementIsActive', undefined);
                                }
                        }

                        this.particles = [];

                        if (!this.options.parallaxElements) return;

                        this.$element.find('[data-stellar-ratio]').each(function(i) {
                                var $this = $(this),
                                        horizontalOffset,
                                        verticalOffset,
                                        positionLeft,
                                        positionTop,
                                        marginLeft,
                                        marginTop,
                                        $offsetParent,
                                        offsetLeft,
                                        offsetTop,
                                        parentOffsetLeft = 0,
                                        parentOffsetTop = 0,
                                        tempParentOffsetLeft = 0,
                                        tempParentOffsetTop = 0;

                                // Ensure this element isn't already part of another scrolling element
                                if (!$this.data('stellar-elementIsActive')) {
                                        $this.data('stellar-elementIsActive', this);
                                } else if ($this.data('stellar-elementIsActive') !== this) {
                                        return;
                                }

                                self.options.showElement($this);

                                // Save/restore the original top and left CSS values in case we refresh the particles or destroy the instance
                                if (!$this.data('stellar-startingLeft')) {
                                        $this.data('stellar-startingLeft', $this.css('left'));
                                        $this.data('stellar-startingTop', $this.css('top'));
                                } else {
                                        $this.css('left', $this.data('stellar-startingLeft'));
                                        $this.css('top', $this.data('stellar-startingTop'));
                                }

                                positionLeft = $this.position().left;
                                positionTop = $this.position().top;

                                // Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
                                marginLeft = ($this.css('margin-left') === 'auto') ? 0 : parseInt($this.css('margin-left'), 10);
                                marginTop = ($this.css('margin-top') === 'auto') ? 0 : parseInt($this.css('margin-top'), 10);

                                offsetLeft = $this.offset().left - marginLeft;
                                offsetTop = $this.offset().top - marginTop;

                                // Calculate the offset parent
                                $this.parents().each(function() {
                                        var $this = $(this);

                                        if ($this.data('stellar-offset-parent') === true) {
                                                parentOffsetLeft = tempParentOffsetLeft;
                                                parentOffsetTop = tempParentOffsetTop;
                                                $offsetParent = $this;

                                                return false;
                                        } else {
                                                tempParentOffsetLeft += $this.position().left;
                                                tempParentOffsetTop += $this.position().top;
                                        }
                                });

                                // Detect the offsets
                                horizontalOffset = ($this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset));
                                verticalOffset = ($this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset));

                                // Add our object to the particles collection
                                self.particles.push({
                                        $element: $this,
                                        $offsetParent: $offsetParent,
                                        isFixed: $this.css('position') === 'fixed',
                                        horizontalOffset: horizontalOffset,
                                        verticalOffset: verticalOffset,
                                        startingPositionLeft: positionLeft,
                                        startingPositionTop: positionTop,
                                        startingOffsetLeft: offsetLeft,
                                        startingOffsetTop: offsetTop,
                                        parentOffsetLeft: parentOffsetLeft,
                                        parentOffsetTop: parentOffsetTop,
                                        stellarRatio: ($this.data('stellar-ratio') !== undefined ? $this.data('stellar-ratio') : 1),
                                        width: $this.outerWidth(true),
                                        height: $this.outerHeight(true),
                                        isHidden: false
                                });
                        });
                },
                _findBackgrounds: function() {
                        var self = this,
                                scrollLeft = this._getScrollLeft(),
                                scrollTop = this._getScrollTop(),
                                $backgroundElements;

                        this.backgrounds = [];

                        if (!this.options.parallaxBackgrounds) return;

                        $backgroundElements = this.$element.find('[data-stellar-background-ratio]');

                        if (this.$element.data('stellar-background-ratio')) {
                $backgroundElements = $backgroundElements.add(this.$element);
                        }

                        $backgroundElements.each(function() {
                                var $this = $(this),
                                        backgroundPosition = getBackgroundPosition($this),
                                        horizontalOffset,
                                        verticalOffset,
                                        positionLeft,
                                        positionTop,
                                        marginLeft,
                                        marginTop,
                                        offsetLeft,
                                        offsetTop,
                                        $offsetParent,
                                        parentOffsetLeft = 0,
                                        parentOffsetTop = 0,
                                        tempParentOffsetLeft = 0,
                                        tempParentOffsetTop = 0;

                                // Ensure this element isn't already part of another scrolling element
                                if (!$this.data('stellar-backgroundIsActive')) {
                                        $this.data('stellar-backgroundIsActive', this);
                                } else if ($this.data('stellar-backgroundIsActive') !== this) {
                                        return;
                                }

                                // Save/restore the original top and left CSS values in case we destroy the instance
                                if (!$this.data('stellar-backgroundStartingLeft')) {
                                        $this.data('stellar-backgroundStartingLeft', backgroundPosition[0]);
                                        $this.data('stellar-backgroundStartingTop', backgroundPosition[1]);
                                } else {
                                        setBackgroundPosition($this, $this.data('stellar-backgroundStartingLeft'), $this.data('stellar-backgroundStartingTop'));
                                }

                                // Catch-all for margin top/left properties (these evaluate to 'auto' in IE7 and IE8)
                                marginLeft = ($this.css('margin-left') === 'auto') ? 0 : parseInt($this.css('margin-left'), 10);
                                marginTop = ($this.css('margin-top') === 'auto') ? 0 : parseInt($this.css('margin-top'), 10);

                                offsetLeft = $this.offset().left - marginLeft - scrollLeft;
                                offsetTop = $this.offset().top - marginTop - scrollTop;

                                // Calculate the offset parent
                                $this.parents().each(function() {
                                        var $this = $(this);

                                        if ($this.data('stellar-offset-parent') === true) {
                                                parentOffsetLeft = tempParentOffsetLeft;
                                                parentOffsetTop = tempParentOffsetTop;
                                                $offsetParent = $this;

                                                return false;
                                        } else {
                                                tempParentOffsetLeft += $this.position().left;
                                                tempParentOffsetTop += $this.position().top;
                                        }
                                });

                                // Detect the offsets
                                horizontalOffset = ($this.data('stellar-horizontal-offset') !== undefined ? $this.data('stellar-horizontal-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-horizontal-offset') !== undefined ? $offsetParent.data('stellar-horizontal-offset') : self.horizontalOffset));
                                verticalOffset = ($this.data('stellar-vertical-offset') !== undefined ? $this.data('stellar-vertical-offset') : ($offsetParent !== undefined && $offsetParent.data('stellar-vertical-offset') !== undefined ? $offsetParent.data('stellar-vertical-offset') : self.verticalOffset));

                                self.backgrounds.push({
                                        $element: $this,
                                        $offsetParent: $offsetParent,
                                        isFixed: $this.css('background-attachment') === 'fixed',
                                        horizontalOffset: horizontalOffset,
                                        verticalOffset: verticalOffset,
                                        startingValueLeft: backgroundPosition[0],
                                        startingValueTop: backgroundPosition[1],
                                        startingBackgroundPositionLeft: (isNaN(parseInt(backgroundPosition[0], 10)) ? 0 : parseInt(backgroundPosition[0], 10)),
                                        startingBackgroundPositionTop: (isNaN(parseInt(backgroundPosition[1], 10)) ? 0 : parseInt(backgroundPosition[1], 10)),
                                        startingPositionLeft: $this.position().left,
                                        startingPositionTop: $this.position().top,
                                        startingOffsetLeft: offsetLeft,
                                        startingOffsetTop: offsetTop,
                                        parentOffsetLeft: parentOffsetLeft,
                                        parentOffsetTop: parentOffsetTop,
                                        stellarRatio: ($this.data('stellar-background-ratio') === undefined ? 1 : $this.data('stellar-background-ratio'))
                                });
                        });
                },
                _reset: function() {
                        var particle,
                                startingPositionLeft,
                                startingPositionTop,
                                background,
                                i;

                        for (i = this.particles.length - 1; i >= 0; i--) {
                                particle = this.particles[i];
                                startingPositionLeft = particle.$element.data('stellar-startingLeft');
                                startingPositionTop = particle.$element.data('stellar-startingTop');

                                this._setPosition(particle.$element, startingPositionLeft, startingPositionLeft, startingPositionTop, startingPositionTop);

                                this.options.showElement(particle.$element);

                                particle.$element.data('stellar-startingLeft', null).data('stellar-elementIsActive', null).data('stellar-backgroundIsActive', null);
                        }

                        for (i = this.backgrounds.length - 1; i >= 0; i--) {
                                background = this.backgrounds[i];

                                background.$element.data('stellar-backgroundStartingLeft', null).data('stellar-backgroundStartingTop', null);

                                setBackgroundPosition(background.$element, background.startingValueLeft, background.startingValueTop);
                        }
                },
                destroy: function() {
                        this._reset();

                        this.$scrollElement.unbind('resize.' + this.name).unbind('scroll.' + this.name);
                        this._animationLoop = $.noop;

                        $(window).unbind('load.' + this.name).unbind('resize.' + this.name);
                },
                _setOffsets: function() {
                        var self = this,
                                $window = $(window);

                        $window.unbind('resize.horizontal-' + this.name).unbind('resize.vertical-' + this.name);

                        if (typeof this.options.horizontalOffset === 'function') {
                                this.horizontalOffset = this.options.horizontalOffset();
                                $window.bind('resize.horizontal-' + this.name, function() {
                                        self.horizontalOffset = self.options.horizontalOffset();
                                });
                        } else {
                                this.horizontalOffset = this.options.horizontalOffset;
                        }

                        if (typeof this.options.verticalOffset === 'function') {
                                this.verticalOffset = this.options.verticalOffset();
                                $window.bind('resize.vertical-' + this.name, function() {
                                        self.verticalOffset = self.options.verticalOffset();
                                });
                        } else {
                                this.verticalOffset = this.options.verticalOffset;
                        }
                },
                _repositionElements: function() {
                        var scrollLeft = this._getScrollLeft(),
                                scrollTop = this._getScrollTop(),
                                horizontalOffset,
                                verticalOffset,
                                particle,
                                fixedRatioOffset,
                                background,
                                bgLeft,
                                bgTop,
                                isVisibleVertical = true,
                                isVisibleHorizontal = true,
                                newPositionLeft,
                                newPositionTop,
                                newOffsetLeft,
                                newOffsetTop,
                                i;

                        // First check that the scroll position or container size has changed
                        if (this.currentScrollLeft === scrollLeft && this.currentScrollTop === scrollTop && this.currentWidth === this.viewportWidth && this.currentHeight === this.viewportHeight) {
                                return;
                        } else {
                                this.currentScrollLeft = scrollLeft;
                                this.currentScrollTop = scrollTop;
                                this.currentWidth = this.viewportWidth;
                                this.currentHeight = this.viewportHeight;
                        }

                        // Reposition elements
                        for (i = this.particles.length - 1; i >= 0; i--) {
                                particle = this.particles[i];

                                fixedRatioOffset = (particle.isFixed ? 1 : 0);

                                // Calculate position, then calculate what the particle's new offset will be (for visibility check)
                                if (this.options.horizontalScrolling) {
                                        newPositionLeft = (scrollLeft + particle.horizontalOffset + this.viewportOffsetLeft + particle.startingPositionLeft - particle.startingOffsetLeft + particle.parentOffsetLeft) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionLeft;
                                        newOffsetLeft = newPositionLeft - particle.startingPositionLeft + particle.startingOffsetLeft;
                                } else {
                                        newPositionLeft = particle.startingPositionLeft;
                                        newOffsetLeft = particle.startingOffsetLeft;
                                }

                                if (this.options.verticalScrolling) {
                                        newPositionTop = (scrollTop + particle.verticalOffset + this.viewportOffsetTop + particle.startingPositionTop - particle.startingOffsetTop + particle.parentOffsetTop) * -(particle.stellarRatio + fixedRatioOffset - 1) + particle.startingPositionTop;
                                        newOffsetTop = newPositionTop - particle.startingPositionTop + particle.startingOffsetTop;
                                } else {
                                        newPositionTop = particle.startingPositionTop;
                                        newOffsetTop = particle.startingOffsetTop;
                                }

                                // Check visibility
                                if (this.options.hideDistantElements) {
                                        isVisibleHorizontal = !this.options.horizontalScrolling || newOffsetLeft + particle.width > (particle.isFixed ? 0 : scrollLeft) && newOffsetLeft < (particle.isFixed ? 0 : scrollLeft) + this.viewportWidth + this.viewportOffsetLeft;
                                        isVisibleVertical = !this.options.verticalScrolling || newOffsetTop + particle.height > (particle.isFixed ? 0 : scrollTop) && newOffsetTop < (particle.isFixed ? 0 : scrollTop) + this.viewportHeight + this.viewportOffsetTop;
                                }

                                if (isVisibleHorizontal && isVisibleVertical) {
                                        if (particle.isHidden) {
                                                this.options.showElement(particle.$element);
                                                particle.isHidden = false;
                                        }

                                        this._setPosition(particle.$element, newPositionLeft, particle.startingPositionLeft, newPositionTop, particle.startingPositionTop);
                                } else {
                                        if (!particle.isHidden) {
                                                this.options.hideElement(particle.$element);
                                                particle.isHidden = true;
                                        }
                                }
                        }

                        // Reposition backgrounds
                        for (i = this.backgrounds.length - 1; i >= 0; i--) {
                                background = this.backgrounds[i];

                                fixedRatioOffset = (background.isFixed ? 0 : 1);
                                bgLeft = (this.options.horizontalScrolling ? (scrollLeft + background.horizontalOffset - this.viewportOffsetLeft - background.startingOffsetLeft + background.parentOffsetLeft - background.startingBackgroundPositionLeft) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueLeft);
                                bgTop = (this.options.verticalScrolling ? (scrollTop + background.verticalOffset - this.viewportOffsetTop - background.startingOffsetTop + background.parentOffsetTop - background.startingBackgroundPositionTop) * (fixedRatioOffset - background.stellarRatio) + 'px' : background.startingValueTop);

                                setBackgroundPosition(background.$element, bgLeft, bgTop);
                        }
                },
                _handleScrollEvent: function() {
                        var self = this,
                                ticking = false;

                        var update = function() {
                                self._repositionElements();
                                ticking = false;
                        };

                        var requestTick = function() {
                                if (!ticking) {
                                        requestAnimFrame(update);
                                        ticking = true;
                                }
                        };

                        this.$scrollElement.bind('scroll.' + this.name, requestTick);
                        requestTick();
                },
                _startAnimationLoop: function() {
                        var self = this;

                        this._animationLoop = function() {
                                requestAnimFrame(self._animationLoop);
                                self._repositionElements();
                        };
                        this._animationLoop();
                }
        };

        $.fn[pluginName] = function (options) {
                var args = arguments;
                if (options === undefined || typeof options === 'object') {
                        return this.each(function () {
                                if (!$.data(this, 'plugin_' + pluginName)) {
                                        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                                }
                        });
                } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
                        return this.each(function () {
                                var instance = $.data(this, 'plugin_' + pluginName);
                                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                                        instance[options].apply(instance, Array.prototype.slice.call(args, 1));
                                }
                                if (options === 'destroy') {
                                        $.data(this, 'plugin_' + pluginName, null);
                                }
                        });
                }
        };

        $[pluginName] = function(options) {
                var $window = $(window);
                return $window.stellar.apply($window, Array.prototype.slice.call(arguments, 0));
        };

        // Expose the scroll and position property function hashes so they can be extended
        $[pluginName].scrollProperty = scrollProperty;
        $[pluginName].positionProperty = positionProperty;

        // Expose the plugin class so it can be modified
        window.Stellar = Plugin;
}(jQuery, this, document));