function isTouchEnabled() {
  return (("ontouchstart" in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}
jQuery(function () {
  jQuery("path[id^=itjs]").each(function (i, e) {
    itaddEvent( jQuery(e).attr("id"));
  });
});
function itaddEvent(id,relationId) {
  var _obj = jQuery("#" + id);
  var arr = id.split("");
  var _Textobj = jQuery("#" + id + "," + "#itjsvn" + arr.slice(4).join(""));
  jQuery("#" + ["visnames"]).attr({"fill":itjsconfig.general.visibleNames});
  _obj.attr({"fill":itjsconfig[id].upColor, "stroke":itjsconfig.general.borderColor});
  _Textobj.attr({"cursor": "default"});
  if (itjsconfig[id].active === true) {
    _Textobj.attr({"cursor": "pointer"});
    _Textobj.hover(function () {
      jQuery("#itjstip").show().html(itjsconfig[id].hover);
      _obj.css({"fill":itjsconfig[id].overColor});
    }, function () {
      jQuery("#itjstip").hide();
      jQuery("#" + id).css({"fill":itjsconfig[id].upColor});
    });
    if (itjsconfig[id].target !== "none") {
      _Textobj.mousedown(function () {
        jQuery("#" + id).css({"fill":itjsconfig[id].downColor});
      });
    }
    _Textobj.mouseup(function () {
      jQuery("#" + id).css({"fill":itjsconfig[id].overColor});
      if (itjsconfig[id].target === "new_window") {
        window.open(itjsconfig[id].url);	
      } else if (itjsconfig[id].target === "same_window") {
        window.parent.location.href = itjsconfig[id].url;
      } else if (itjsconfig[id].target === "modal") {
        jQuery(itjsconfig[id].url).modal("show");
      }
    });
    _Textobj.mousemove(function (e) {
      var x = e.pageX + 10, y = e.pageY + 15;
      var tipw =jQuery("#itjstip").outerWidth(), tiph =jQuery("#itjstip").outerHeight(),
      x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw - (20 * 2) : x ;
      y = (y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() - tiph - 10 : y ;
      jQuery("#itjstip").css({left: x, top: y});
    });
    if (isTouchEnabled()) {
      _Textobj.on("touchstart", function (e) {
        var touch = e.originalEvent.touches[0];
        var x = touch.pageX + 10, y = touch.pageY + 15;
        var tipw =jQuery("#itjstip").outerWidth(), tiph =jQuery("#itjstip").outerHeight(),
        x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw -(20 * 2) : x ;
        y =(y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() -tiph - 10 : y ;
        jQuery("#" + id).css({"fill":itjsconfig[id].downColor});
        jQuery("#itjstip").show().html(itjsconfig[id].hover);
        jQuery("#itjstip").css({left: x, top: y});
      });
      _Textobj.on("touchend", function () {
        jQuery("#" + id).css({"fill":itjsconfig[id].upColor});
        if (itjsconfig[id].target === "new_window") {
          window.open(itjsconfig[id].url);
        } else if (itjsconfig[id].target === "same_window") {
          window.parent.location.href = itjsconfig[id].url;
        } else if (itjsconfig[id].target === "modal") {
          jQuery(itjsconfig[id].url).modal("show");
        }
      });
    }
	}
}