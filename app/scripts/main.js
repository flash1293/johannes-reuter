/* main js file */
/*global $:false */

(function () {
    "use strict";

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $("a[data-showOnClick]").bind("click", function (event) {
            var button = $(this);
            var el = $("#" + button.attr("data-showOnClick"));

            el.fadeIn(700);
            button.animate({opacity: 0}, {queue: false, duration: 100});
            $("html, body").stop().animate({
                scrollTop: el.offset().top - 300
            }, 700, "swing");

            event.preventDefault();
        });
    });
}());
