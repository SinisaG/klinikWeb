define(["tools/ajax"], function(ajax){

    // Bootstrap Touch Devices DropDown Fix START
    $('body')
    .on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); })
    .on('touchstart.dropdown', '.dropdown-submenu', function (e) { e.preventDefault(); })
    // Bootstrap Form inside dropdown prevent close
    .on("click", '.dropdown input, .dropdown label', function(e){e.stopPropagation();});
    // Bootstrap Touch Devices DropDown Fix END

    // TOGGLEABLE FLY OUTS
    $(document).on({click: function(e){
        var $t = $(e.currentTarget)
            , data = $t.data()
            , cls = data.toggleClass
            , target = (data.toggleTarget?$t.closest(data.toggleTarget):$t).toggleClass(cls);
        if(data.toggleText){
            if(target.hasClass(cls)){
                $t.data("backupText", $t.html());
                $t.html(data.toggleText);
            } else {
                $t.html(data.backupText);
            }
        }
    }}, "[data-toggle-class]");
    // hiding server generated messages
    var mCont = $("#message-container");
    if(mCont.length){
        mCont.on({click: function(e){
            var $t = $(this).closest(".alert");
            if(!$t.siblings(".alert").length)
                mCont.hide();
            $t.remove();
        }}, '[data-dismiss="alert"]');
        $(document).on({scroll: function(e){
                var messageTop = mCont.position().top;
                mCont[$(window).scrollTop()>messageTop?"addClass":"removeClass"]("fixed")
        }});
    }
    // IE placeholder plugin
    var NATIVE_PLACEHOLDER = !!("placeholder" in document.createElement( "input" ));
    if(!NATIVE_PLACEHOLDER){
        $('input[placeholder], textarea[placeholder]').placeholder();
    }

    var tLoaded = $.Deferred();
    $(".hover-container").one({
        mouseover : function(e){
            var data = $(e.currentTarget).data();
            if(tLoaded.state() != 'resolved')
                    require(["text!templates/profile.html"], function(templ){tLoaded.resolve(_.template(templ)); return {};});
            ajax.submitPrefixed({
                url:"/web/user/mini"
                , data: {slug: data.entityId}
                , success: function(resp, status, xhr){
                    var user = resp.User;
                    if(user){
                        tLoaded.done(function(templ){
                            $(e.currentTarget).append(
                                templ({
                                    link: '/'+user.slug
                                    , startupValue: '$' + hnc.formatNum(user.startupValue)
                                    , user: user
                                })
                            )
                        });
                    }
                }
            });
        }
    }).find("a").prop('href', null);
    return {NATIVE_PLACEHOLDER:NATIVE_PLACEHOLDER}
});
