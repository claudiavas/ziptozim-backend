var pins_config = {
  "pins":[
  {
    "shape": "circle",//either "circle" or "square"
    "hover": "<b><u>Bureau de la MRC</u></b><br />11, 5e Avenue Est La Sarre, Québec J9Z 1K7<br/><br /><b><u>Horaires</u></b><br />Lundi au jeudi 8h30 à 12h et 13h à 16h30<br />Vendredi 8h30 à 12h et 13h à 16h<br /><img src='/images/design/bureauMRC.jpg'>",//info of the popup
    "pos_X": 380,//check the X, Y coordinates guide in the documentation
    "pos_Y": 260,
    "size": 14,//size of the pin
    "outline": "#8cc751",//outline color of the pin
    "upColor": "#8cc751",//color of the pin when map load
    "overColor": "#7c6c68",//color of the pin when mouse hover
    "url": "",//link to any webpage
    "target": "none",// use "new_window", "same_window", "modal", or "none"
    "active": true//true/false to activate/deactivate this pin
  },

  ]
};


// The following is the script for pins interaction DON'T EDIT !!!
function isTouchEnabled() {
  return (("ontouchstart" in window)
    || (navigator.MaxTouchPoints > 0)
    || (navigator.msMaxTouchPoints > 0));
}
jQuery(function () {
  var pins_len = pins_config.pins.length;
  if(pins_len > 0) {
    var xmlns = "http://www.w3.org/2000/svg";
    var tsvg_obj = document.getElementById("itjspins");
    var svg_circle, svg_rect;
    for (var i = 0; i < pins_len; i++) {
      if (pins_config.pins[i].shape === "circle") {
        svg_circle = document.createElementNS(xmlns, "circle");
        svg_circle.setAttributeNS(null, "cx", pins_config.pins[i].pos_X + 1);
        svg_circle.setAttributeNS(null, "cy", pins_config.pins[i].pos_Y + 1);
        svg_circle.setAttributeNS(null, "r", pins_config.pins[i].size / 2);
        svg_circle.setAttributeNS(null, "fill", "rgba(0, 0, 0, 0.5)");
        tsvg_obj.appendChild(svg_circle);
        svg_circle = document.createElementNS(xmlns, "circle");
        svg_circle.setAttributeNS(null, "cx", pins_config.pins[i].pos_X);
        svg_circle.setAttributeNS(null, "cy", pins_config.pins[i].pos_Y);
        svg_circle.setAttributeNS(null, "r", pins_config.pins[i].size / 2);
        svg_circle.setAttributeNS(null, "fill", pins_config.pins[i].upColor);
        svg_circle.setAttributeNS(null, "stroke", pins_config.pins[i].outline);
        svg_circle.setAttributeNS(null, "stroke-width", 1);
        svg_circle.setAttributeNS(null, "id", "itjspins_" + i);
        tsvg_obj.appendChild(svg_circle);
        itjsAddEvent(i);
      }
      else if (pins_config.pins[i].shape === "square") {
        svg_rect = document.createElementNS(xmlns, "rect");
        svg_rect.setAttributeNS(null, "x", pins_config.pins[i].pos_X - pins_config.pins[i].size / 2 + 1);
        svg_rect.setAttributeNS(null, "y", pins_config.pins[i].pos_Y - pins_config.pins[i].size / 2 + 1);
        svg_rect.setAttributeNS(null, "width", pins_config.pins[i].size);
        svg_rect.setAttributeNS(null, "height", pins_config.pins[i].size);
        svg_rect.setAttributeNS(null, "fill", "rgba(0, 0, 0, 0.5)");
        tsvg_obj.appendChild(svg_rect);
        svg_rect = document.createElementNS(xmlns, "rect");
        svg_rect.setAttributeNS(null, "x", pins_config.pins[i].pos_X - pins_config.pins[i].size / 2);
        svg_rect.setAttributeNS(null, "y", pins_config.pins[i].pos_Y - pins_config.pins[i].size / 2);
        svg_rect.setAttributeNS(null, "width", pins_config.pins[i].size);
        svg_rect.setAttributeNS(null, "height", pins_config.pins[i].size);
        svg_rect.setAttributeNS(null, "fill", pins_config.pins[i].upColor);
        svg_rect.setAttributeNS(null, "stroke", pins_config.pins[i].outline);
        svg_rect.setAttributeNS(null, "stroke-width", 1);
        svg_rect.setAttributeNS(null, "id", "itjspins_" + i);
        tsvg_obj.appendChild(svg_rect);
        itjsAddEvent(i);
      }
    }
  }
});
function itjsAddEvent(id) {
  var obj = jQuery("#itjspins_" + id);
  if(pins_config.pins[id].active === true){
    obj.attr({"cursor": "pointer"});
    obj.hover(function () {
      jQuery("#itjstip").show().html(pins_config.pins[id].hover);
      obj.css({"fill":pins_config.pins[id].overColor});
    }, function () {
      jQuery("#itjstip").hide();
      obj.css({"fill":pins_config.pins[id].upColor});
    });
    obj.mouseup(function(){
      obj.css({"fill":pins_config.pins[id].overColor});
      if (pins_config.pins[id].target === "new_window"){
        window.open(pins_config.pins[id].url);  
      } else if (pins_config.pins[id].target === "same_window") {
        window.parent.location.href = pins_config.pins[id].url;
      } else if (pins_config.pins[id].target === "modal") {
        jQuery(pins_config.pins[id].url).modal("show");
      }
    });
    obj.mousemove(function (e) {
      var x = e.pageX + 10, y = e.pageY + 15;
      var tipw =jQuery("#itjstip").outerWidth(), tiph =jQuery("#itjstip").outerHeight(),
      x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw - (20 * 2) : x ;
      y = (y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() - tiph - 10 : y ;
      jQuery("#itjstip").css({left: x, top: y});
    });
    if (isTouchEnabled()) {
      obj.on("touchstart", function (e) {
        var touch = e.originalEvent.touches[0];
        var x = touch.pageX + 10, y = touch.pageY + 15;
        var tipw=jQuery("#itjstip").outerWidth(), tiph=jQuery("#itjstip").outerHeight(),
        x = (x + tipw >jQuery(document).scrollLeft() +jQuery(window).width())? x - tipw -(20 * 2) : x ;
        y =(y + tiph >jQuery(document).scrollTop() +jQuery(window).height())? jQuery(document).scrollTop() +jQuery(window).height() -tiph - 10 : y ;
        jQuery("#itjstip").show().html(pins_config.pins[id].hover);
        jQuery("#itjstip").css({left:x, top:y});
      });
      obj.on("touchend", function () {
        jQuery("#" + id).css({"fill":pins_config.pins[id].upColor});
        if (pins_config.pins[id].target === "new_window") {
          window.open(pins_config.pins[id].url);
        } else if (pins_config.pins[id].target === "same_window") {
          window.parent.location.href = pins_config.pins[id].url;
        } else if (pins_config.pins[id].target === "modal") {
          jQuery(pins_config.pins[id].url).modal("show");
        }
      });
    }
  }
}