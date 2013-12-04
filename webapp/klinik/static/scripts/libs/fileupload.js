﻿define(["tools/ajax"], function(ajax){

    var View = Backbone.View.extend({
        initialize:function(opts){
            var view = this
                , uploader = this.$(".file-picker-upload")
                , width = uploader.data('picWidth')
                , height = uploader.data('picHeight')
                , doResize = width && height
                , picture_template = _.template(this.$(".picture-template").html())
                , onProgress = function(from, to){
                    return function(percentage) {
                        var $el = uploader.children();
                        if($el.filter(".progress-indicator").length){
                            $el.filter(".progress-indicator").css({width: ((to-from)*percentage).toFixed(2)+'%'});
                            $el.filter(".progress-number").html(((to-from)*percentage).toFixed(0)+'%');
                        } else {
                            uploader.addClass("empty").html('<div class="progress-indicator" style="width:'+((to-from)*percentage).toFixed(2)+'%"></div><div class="progress-number">'+((to-from)*percentage).toFixed(0)+'%</div>');
                        }

                    }
                }
                , onError = function(type, message) {
                    uploader.after().text('('+type+') '+ message);
                }
                , finalSuccess = function(inkBlob){
                    uploader.html('<div class="info">Done!</div>').removeClass("empty");
                    uploader.html(picture_template({pic: inkBlob}));
                    view.$el.closest(".form-validated").validate().element(view.$el.find('input[type=hidden]').val(inkBlob.url));
                }
                , onSuccess = function(inkBlob){
                    if(doResize)
                        filepicker.convert(
                            inkBlob
                            , {width:250, height:167, fit:'clip', format:'jpg', quality:80}, {location: 'S3'}
                            , finalSuccess, onError, onProgress(.8, 1)
                        )
                    else
                        finalSuccess(inkBlob);
                };

            this.$el.on("click", function(e){
                if($(e.target).is(".file-upload-btn,.stop-propagation"))return;
                view.$(".file-upload-btn").click();e.stopPropagation();e.preventDefault();return false;
            });

            this.$(".file-upload-btn").on("change", function(e){
                if(!e.target.value)return;
                filepicker.store(e.target, onSuccess, onError, onProgress(0,1));
            });


            filepicker.makeDropPane(uploader[0], {
                dragEnter: function() {uploader.addClass("drop-target");}
                , dragLeave: function() {uploader.removeClass("drop-target");}
                , onSuccess: function(fpfiles) {onSuccess(fpfiles[0]);}
                , onError: onError
                , onProgress: onProgress(0,1)
            });
        }
    })
    , init = function(opts){
        return new View(opts);
    };
    return {init: init, View: View};
});