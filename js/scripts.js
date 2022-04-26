function getBarsChart() {
    if($(".bars").length > 0) {
        $(".bars").each(function() {
            if( $(this).is(":visible") ) {
                var heightArr = [];
                bar = $(this).find(".bar");
                bar.each(function() {
                    heightVal = parseInt($(this).attr("data-count-val"));
                    heightArr.push(heightVal);
                });
                maxHeight = Math.max.apply(null, heightArr);
                chartHeight = $(this).height();
                heightModul = chartHeight/maxHeight;      
                bar.each(function() {
                    heightVal = parseInt($(this).attr("data-count-val"));
                    $(this).css({
                        "height" : ( heightVal ) + "px"
                    });
                });
                barsCharts = $(this).closest(".bars_range_wrapp");
                handleLower = barsCharts.find(".noUi-handle-lower");
                handleUpperr = barsCharts.find(".noUi-handle-upper");
                leftCoord = handleLower.offset().left;
                $(this).find(".bar").each(function() {
                    if(handleUpperr.length > 0) {
                        rightCoord = handleUpperr.offset().left;
                        if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                            $(this).removeClass("disable");
                        } else {
                            $(this).addClass("disable");
                        }
                    } else {
                        if( $(this).offset().left < leftCoord) {
                            $(this).removeClass("disable");
                        } else {
                            $(this).addClass("disable");
                        }
                    }                    
                });
            }
        });
    }
}

function getObjectCardsSlider() {
  if( $(".object_cards_slider").length > 0 ) {
    $(".object_cards_slider").not(".slick-initialized").slick({
        dots: true,
        arrows: false,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: false,
        mobileFirst: true,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button"></button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button"></button>',
        responsive: [
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 680,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 767,
            settings: 'unslick'
          }
        ]
    });
  }
}

function getDropdownWidth() {
  if(bodyWidth <= 600) {
    $(".dropdown_content_2").css({
      "width" : $(".drParent").width() - 8 + "px"
    });
  } else {
    $(".dropdown_content_2").attr("style", "");
  }
}

function getMapParams() {
    if( $(".object_map").length > 0 && bodyWidth > 767) {
        filtersCoord = $(document).scrollTop();    
        mapCoord = $(".object_map").offset().top;
        if(filtersCoord >= mapCoord) {            
            $(".map_scroll").addClass("fixed");
            $(".map_scroll").css({
                "top" : $(".filter_nav").height() + "px"
            });
            if($("#mapTempl").hasClass("mapTempl2")) {
                $(".map_scroll").css({
                    "width" : $(window).width() - ( $("#mapTempl .left_col").offset().left + $("#mapTempl .left_col").outerWidth() ) + "px"
                });
            }
            mapScrollBootmCoord = filtersCoord + $(".map_scroll").height();
            bottomCoord = $(".bottom_coord").offset().top;
            if( mapScrollBootmCoord >= bottomCoord ) {
                $(".map_scroll").addClass("bottom_position");
            } else {
                $(".map_scroll").removeClass("bottom_position");
            }
        } else {
            $(".map_scroll").removeClass("fixed");
            $(".map_scroll").css({
                "top" : 0
            });
            if($("#mapTempl").hasClass("mapTempl2")) {
                $(".map_scroll").css({
                    "width" : "100%"
                });
            }
        }
    }
}

function getObjectSlider(vertical) {
  $("[data-slider-big]").each(function() {
    sl = $(this).attr("data-slider-big");
    bigSlider = $(this);
    miniatureSlider = $("[data-slider-miniature = '"+sl+"']");
    bigSlider.not(".slick-initialized").slick({
      dots: false,
      arrows: false,
      speed: 1200,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      asNavFor: miniatureSlider
    });
    miniatureSlider.not(".slick-initialized").slick({
      dots: false,
      arrows: false,
      speed: 1200,
      slidesToShow: 3,
      slidesToScroll: 1,
      fade: false,
      asNavFor: bigSlider,
      focusOnSelect: true,
      vertical : vertical,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            vertical : false
          }
        }
      ]
    });
  });
}

function getFixedHeaderParams() {
  if($(document).scrollTop() > $("#header").height()) {
    $("#witeHeader").addClass("visible");
  } else {
    $("#witeHeader").removeClass("visible");
  }
}

function getFiltersScrollParams() {
  if($("#filtersFixedWrapp").length > 0) {
    if($("#witeHeader").length > 0) {
      topCoord = $("#filtersFixedWrapp").offset().top - $("#witeHeader").height();
    } else {
      topCoord = $("#filtersFixedWrapp").offset().top;
    }
    if($(document).scrollTop() > topCoord) {
      $("#filtersFixedWrapp").height($("#filtersFixed").height());
      $("#filtersFixed").addClass("fixed");
      if($("#witeHeader").length > 0) {
        $("#filtersFixed").css({
          "top" : $("#witeHeader").height() + "px"
        });
      }
    } else {
      $("#filtersFixed").removeClass("fixed");
      $("#filtersFixedWrapp").css({
        "height" : "auto"
      });
      if($("#witeHeader").length > 0) {
        $("#filtersFixed").css({
          "top" : 0
        });
      }
    }
  }
  if($(".inner_wrapper").length > 0) {
    $("#witeHeader").css({
      "top" : 0
    });
    $(".inner_wrapper").css({
      "padding-top" : $("#witeHeader").height() + "px"
    });
  }
}

function getFixedMenuSidebar() {
  if( $(".fixedScroll").length > 0 ) {
    fixedParent = $(".fixedParent");
    fixedScroll = $(".fixedScroll");
    fixedBottomCoord = $(".fixedBottomCoord").offset().top;
    fixedScrollWidth = $(".fixedScrollWidth");
    if($("#witeHeader").length > 0) {
      topCoord = fixedParent.offset().top - $("#witeHeader").height();
    } else {
      topCoord = fixedParent.offset().top;
    }
    if($(document).scrollTop() > topCoord) {
      fixedScroll.addClass("fixed");
      fixedScroll.css({
        "top" : $("#witeHeader").height() + "px",
        "left" : fixedParent.offset().left + "px",
        "width" : fixedScrollWidth.width() + "px"
      });
    } else {
      fixedScroll.removeClass("fixed");
      fixedScroll.css({
        "top" : "auto",
        "left" : "auto",
        "width" : "auto"
      });
    }
    fixedScrollBottomCoord = $(document).scrollTop() + fixedScroll.height() + $("#witeHeader").height();
    if( fixedScrollBottomCoord >= fixedBottomCoord ) {
        fixedScroll.addClass("bottom_position");
    } else {
        fixedScroll.removeClass("bottom_position");
    }
  }
}

function getFixedScrollBoxParams() {
  if($(".fixedBox").length > 0) {
    $(".fixedBox").each(function() {
      parent = $(this).closest(".heigthWrapp");
      height = $(this).height();
      if($("#witeHeader").length > 0) {
        topCoord = $(document).scrollTop() + $("#witeHeader").height();
      } else {
        topCoord = $(document).scrollTop();
      }
      if(topCoord >= parent.offset().top) {
        parent.height(height);
        $(this).addClass("fixed");
        $(this).css({
          "top" : $("#witeHeader").height() + "px"
        });
      } else {
        parent.css({
          "height" : "auto"
        });
        $(this).removeClass("fixed");
        $(this).css({
          "top" : 0
        });
      }
    });
  }
}

function getAdaptivePositionElements() {
    $(".append_elem").each(function() {
        screenParam = parseInt( $(this).attr("data-min-screen") );
        indexElem = $(this).attr("data-append-desktop-elem");
        if( bodyWidth <= screenParam ) {
            $("[data-append-elem = '"+ indexElem +"']").append($(this).children());
        }
         if( bodyWidth > screenParam ) {
            $("[data-append-desktop-elem = '"+ indexElem +"']").append($("[data-append-elem = '"+ indexElem +"']").children());
        }
    });
}

function getContactsPosition() {
    if( $(".contacts_scroll").length > 0 && bodyWidth > 900 ) {
        $(".contacts_scroll_height").css({
            "height" : $(".contacts_scroll").height() + "px"
        });
        contactsScrollWrappCoord = $("#contactsScrollWrapp").offset().top;
        contactsScrollBottomCoord = $(".contacts_scroll").offset().top + $(".contacts_scroll").height();
        bottomCoord = $(".contactsScrollBotttomCoord").offset().top;
        if($(document).scrollTop() >= contactsScrollWrappCoord ) {
            $(".contacts_scroll").addClass("fixed");
            if(bodyWidth > 1024) {
              objectInfoOffset = $("#objectInfo").height();
            } else {
              objectInfoOffset = 0;
            }
            $(".contacts_scroll").css({
                "left" : $("#contactsScrollWrapp").offset().left + "px",
                "padding-top" : $("#witeHeader").height() + objectInfoOffset + "px"
            });
            if( ($(document).scrollTop() + $(".contacts_scroll").height() ) >= bottomCoord ) {
                $(".contacts_scroll").addClass("bottom_position");
            } else {
                $(".contacts_scroll").removeClass("bottom_position");
            }
        } else {
            $(".contacts_scroll").removeClass("fixed");
            $(".contacts_scroll").removeClass("bottom_position");
            $(".contacts_scroll").css({
                "left" : 0,
                "padding-top" : 0
            });
        }
    } else {
        $(".contacts_scroll").removeClass("fixed");
        $(".contacts_scroll").removeClass("bottom_position");
        $(".contacts_scroll").css({
            "left" : 0,
            "padding-top" : 0
        });
    }
}

function getFixedBoxParams() {
  if( $(".steps_box").length > 0 ){
    if( bodyWidth <= 900 ) {
      bottomCoord = $(".footer_section").offset().top;
      stepsBoxCoord = $(".steps_box").offset().top + $(".steps_box").height();
      if($(document).scrollTop() + $(window).height() >= bottomCoord) {
        $(".steps_box").addClass("relative");
      } else {
        $(".steps_box").removeClass("relative");
      }
    } else {
      $(".steps_box").removeClass("relative");
    }
  }
}

function jmp(e){
    var max = ~~e.getAttribute('maxlength');
    if(max && e.value.length >= max){
        do{
            e = e.nextSibling;
        }
        while(e && !(/text/.test(e.type)));
        if(e && /text/.test(e.type)){
            e.focus();
        }
    }
}

function getWrapperBottomPadding() {
  if( $("#tabBarNav").length > 0 && bodyWidth <= 767) {
    $(".wrapper").addClass("tab_nav");
  } else {
    $(".wrapper").removeClass("tab_nav");
  }
}

function getItemBgParams() {
  $(".sidebar_menu li").each(function() {
    bg = $(this).find("span");
    bgWidth = $(this).offset().left + $(this).width();
    bg.width(bgWidth);
  });
}

function getScrollbar() {
  if($(".sidebar_menu_scroll").length > 0 ) {
    if(bodyWidth <= 900) {
      $(".sidebar_menu_scroll").mCustomScrollbar({
        axis:"x"
      });
    } else {
      $(".sidebar_menu_scroll").mCustomScrollbar('destroy');
    }
  }

  if($(".tabs_scroll").length > 0) {
    if(bodyWidth <= 900) {
      $(".tabs_scroll").mCustomScrollbar({
        axis:"x"
      });
    } else {
      $(".tabs_scroll").mCustomScrollbar('destroy');
    }
  }

  if($(".filter_tags_wrapp").length > 0) {
    if(bodyWidth <= 900) {
      $(".filter_tags_wrapp").mCustomScrollbar({
        axis:"x"
      });
    } else {
      $(".filter_tags_wrapp").mCustomScrollbar('destroy');
    }
  }

}

function getChartWidth() {
  $(".static_chart").each(function() {
    parent = $(this).closest("#chartWidth");
    $(this).width(parent.width() + 15);
  });
}

// function filterFunction() {
//   var input, filter, ul, li, a, i;
//   input = document.getElementById("myInput");
//   filter = input.value.toUpperCase();
//   div = document.getElementById("myDropdown");
//   a = div.getElementsByTagName("a");
//   for (i = 0; i < a.length; i++) {
//     txtValue = a[i].textContent || a[i].innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       a[i].style.display = "";
//     } else {
//       a[i].style.display = "none";
//     }
//   }
// }

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;

$(window).on("load", function() {
  getBarsChart();
  getObjectCardsSlider();
  getScrollbar();
  if($(".inner_scroll").length > 0) {
    $(".inner_scroll").mCustomScrollbar();
  }
  if($(".inner_scroll_2").length > 0) {
    $(".inner_scroll_2").mCustomScrollbar();
  }
  if($(".inner_scroll_3").length > 0) {
    $(".inner_scroll_3").mCustomScrollbar();
  }
  if($(".scroll_x").length > 0) {
    $(".scroll_x").mCustomScrollbar({
      axis:"x"
    });
  }
});

$(window).resize(function() {
  getBarsChart();
  bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
  getObjectCardsSlider();
  getDropdownWidth();
  getMapParams();
  getFixedHeaderParams();
  getFiltersScrollParams();
  getAdaptivePositionElements();
  getContactsPosition();
  getWrapperBottomPadding();
  getItemBgParams();
  getScrollbar();
  getFixedBoxParams();
  getFixedScrollBoxParams();
  getFixedMenuSidebar();
  getChartWidth();
  if(bodyWidth >= 768 && $(".more_filter_popup").is(":visible") > 0) {
    $(".more_filter_popup .close_popup").trigger("click");
  }

});

$(document).scroll(function() {
  getMapParams();
  getFixedHeaderParams();
  getFiltersScrollParams();
  getContactsPosition();
  getWrapperBottomPadding();
  getFixedBoxParams();
  getFixedScrollBoxParams();
  getFixedMenuSidebar();
  // console.log($(document).scrollTop());
});

$(document).ready(function() {
  getDropdownWidth();
  getFixedHeaderParams();
  getFiltersScrollParams();
  getAdaptivePositionElements();
  getContactsPosition();
  getWrapperBottomPadding();
  getItemBgParams();
  getFixedBoxParams();
  getFixedScrollBoxParams();
  getFixedMenuSidebar();
  getChartWidth();

  $(".dr_title").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".dr");
    if(!parent.hasClass("active")) {
      if(parent.closest(".dr.active").length == 0) {
        $(".dr").removeClass("active");
      }
      parent.addClass("active");
      getBarsChart();
    } else {
      parent.removeClass("active");
    }
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $(".dr").removeClass("active");
      $(".promo_sect_2").removeClass("z");
    }
  });

  $(document).mouseup(function(e) {
    hide_element = $(".dr");
    if (!hide_element.is(e.target)
        && hide_element.has(e.target).length === 0) {
        hide_element.removeClass("active");
        $(".promo_sect_2").removeClass("z");
      }
  });

  // ------------

  $(".dr_2_title").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".dr_2");
    dr = parent.find(".dr_2_content");
    if(dr.is(":hidden")) {
      dr.slideDown(300);
      parent.addClass("active");
    } else {
      dr.slideUp(300);
      parent.removeClass("active");
    }
  });

  // ------------

  if( document.getElementById("range_slider_2") ) {
    priceSlider2 = document.getElementById("range_slider_2");
    noUiSlider.create(priceSlider2, {
      start: [ 1000, 50000 ],
      range: {
          'min': [ 0 ],
          'max': [ 100000 ]
      },
      connect: true,
        format: wNumb({
            decimals: 0
        })
    });
    priceSlider2.noUiSlider.on('update', function( values, handle ) {
        minVal = parseInt( values[0] );
        maxVal = parseInt( values[1] );
        $("#input-number_1").val(minVal);
        $("#input-number_2").val(maxVal);
        leftRange = minVal;
        rightRange = maxVal;
        handleLower = $("#range_slider_2").find(".noUi-handle-lower");
        handleUpperr = $("#range_slider_2").find(".noUi-handle-upper");
        leftCoord = handleLower.offset().left;
        rightCoord = handleUpperr.offset().left;
        barsCharts = handleLower.closest(".bars_range_wrapp");
        barsCharts.find(".bars .bar").each(function() {
            if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                $(this).removeClass("disable");
            } else {
                $(this).addClass("disable");
            }
        });
        $("[data-filters-index='filters_3'] .minVal2").html(leftRange);
        $("[data-filters-index='filters_3'] .maxVal2").html(rightRange);
        $(".price_resp").html($("#price_sel").html());
    });
    priceSlider2.noUiSlider.on('set', function( values, handle ) {
        setTimeout(function() {           
            handleLower = $("#range_slider_2").find(".noUi-handle-lower");
            handleUpperr = $("#range_slider_2").find(".noUi-handle-upper");
            leftCoord = handleLower.offset().left;
            rightCoord = handleUpperr.offset().left;
            barsCharts = handleLower.closest(".bars_range_wrapp");
            barsCharts.find(".bars .bar").each(function() {
                if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                    $(this).removeClass("disable");
                } else {
                    $(this).addClass("disable");
                }
            });
        }, 500);
        $("[data-filters-index='filters_3'] .minVal2").html(minVal);
        $("[data-filters-index='filters_3'] .maxVal2").html(maxVal);
        $(".price_resp").html($("#price_sel").html());
        $(".price_values").text($("#price_sel").text()[0] + " " + $("#input-number_1").val()+" - "+ $("#input-number_2").val());
    });
    $("#input-number_1").keyup(function() {
        activeInputVal = parseInt( $(this).val() );
        if( activeInputVal < parseInt( $("#input-number_2").val() ) ) {
            leftRange = parseInt( $(this).val() );
            priceSlider2.noUiSlider.set([leftRange, null]);
        }
    });
    $("#input-number_2").keyup(function() {
      activeInputVal = parseInt( $(this).val() );
      if( activeInputVal > parseInt( $("#input-number_1").val() ) ) {
          rightRange = parseInt( $(this).val() );
          priceSlider2.noUiSlider.set([null, rightRange]);
      }
    });
  }

  if( document.getElementById("range_slider_4") ) {
    priceSlider4 = document.getElementById("range_slider_4");
    noUiSlider.create(priceSlider4, {
      start: [ 1000, 3500 ],
      range: {
          'min': [  0 ],
          'max': [ 8906 ]
      },
      connect: true,
        format: wNumb({
            decimals: 0
        })
    });
    inputNumberMin = document.getElementById("input-number_5");
    inputNumberMax = document.getElementById("input-number_6");

    priceSlider4.noUiSlider.on('update', function( values, handle ) {
        minVal = parseInt( values[0] );
        maxVal = parseInt( values[1] );
        leftRange = maxVal;
        rightRange = maxVal;
        $("#input-number_5").val(minVal);
        $("#input-number_6").val(maxVal);
        handleLower = $("#range_slider_4").find(".noUi-handle-lower");
        handleUpperr = $("#range_slider_4").find(".noUi-handle-upper");
        leftCoord = handleLower.offset().left;
        rightCoord = handleUpperr.offset().left;
        barsCharts = handleLower.closest(".bars_range_wrapp");
        barsCharts.find(".bars .bar").each(function() {
            if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                $(this).removeClass("disable");
            } else {
                $(this).addClass("disable");
            }
        });
        $("[data-filters-index='filters_4'] .minVal").html(minVal);
        $("[data-filters-index='filters_4'] .maxVal").html(maxVal);   
    });

    priceSlider4.noUiSlider.on('set', function( values, handle ) {
        setTimeout(function() { 
            handleLower = $("#range_slider_4").find(".noUi-handle-lower");
            handleUpperr = $("#range_slider_4").find(".noUi-handle-upper");
            leftCoord = handleLower.offset().left;
            rightCoord = handleUpperr.offset().left;
            barsCharts = handleLower.closest(".bars_range_wrapp");
            barsCharts.find(".bars .bar").each(function() {
                if( $(this).offset().left > leftCoord && $(this).offset().left < rightCoord ) {
                    $(this).removeClass("disable");
                } else {
                    $(this).addClass("disable");
                }
            });
        }, 500);
    });

    $("#input-number_5").keyup(function() {
        activeInputVal = parseInt( $(this).val() );
        if( activeInputVal < parseInt( $("#input-number_6").val() ) ) {
            leftRange = parseInt( $(this).val() );
            priceSlider4.noUiSlider.set([leftRange, null]);
        }
    });
    $("#input-number_6").keyup(function() {
      activeInputVal = parseInt( $(this).val() );
      if( activeInputVal > parseInt( $("#input-number_5").val() ) ) {
          rightRange = parseInt( $(this).val() );
          priceSlider4.noUiSlider.set([null, rightRange]);
      }
    });
  }

  // --------

  $(".checkout_list p").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".checkout_dr");
    val = $(this).text();
    parent.find(".checkout_val p").text(val);
    parent.find("input[type='hidden']").val(val);
    parent.removeClass("active");
    parent.find("p").removeClass("active");
    $(this).addClass("active");
  });

  // ---------

  $(".respmenubtn").on("click", function(e) {
    e.preventDefault();
    if( $("#resp_nav").is(":hidden") ) {
      $("#resp_nav").fadeIn(300);
      $(this).addClass("active");
    } else {
      $("#resp_nav").fadeOut(300);
      $(this).removeClass("active");
    }
  });
  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $("#resp_nav").fadeOut(300);
      $(".respmenubtn").removeClass("active");
    }
  });

  $("#closeRespNav").on("click", function(e) {
    e.preventDefault();
    $("#resp_nav").fadeOut(300);
    $(".respmenubtn").removeClass("active");
  });

  // ---------

  if( $(".resp_slider").length > 0 ) {

    $('.resp_slider').on('init', function(event, slick, direction){
      slider = slick.$slider[0].dataset.respslider;
      index = $("[data-respslider ='"+slider+"'] .slick-dots li.slick-active").index();
      $("[data-respslider-filters = '"+slider+"'] li:eq("+index+") .filter_tag_2").addClass("active");
    });

    $(".resp_slider").not(".slick-initialized").slick({
        dots: true,
        arrows: false,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    });

    $("[data-respslider-filters] .filter_tag_2").on("click", function(e) {
      e.preventDefault();
      parent = $(this).closest("[data-respslider-filters]");
      slider = parent.attr("data-respslider-filters");
      index = $(this).index(".filter_tag_2");
      $("[data-respslider = '"+slider+"'] .slick-dots li:eq("+index+") button").trigger("click");
      parent.find(".filter_tag_2").removeClass("active");
      $(this).addClass("active");
    });

  }

  // ---------

  $(document).mouseup(function(e) {
    hide_element = $(".search_wrapp");
    if (!hide_element.is(e.target)
        && hide_element.has(e.target).length === 0) {
        hide_element.removeClass("active");
      }
  });

  // --------

  $(".main_nav li").on("mouseover", function() {
    parent = $(this).closest("li");
    menu = parent.find(".menuItem");
    menu.offset({left: 0});
  });

  $(".main_nav li").on("mouseleave", function() {
    parent = $(this).closest("li");
    menu = parent.find(".menuItem");
    menu.offset({left: -(bodyWidth * 3)});
  });

  // --------

  $("[data-sl-btn]").on("click", function(e) {
    e.preventDefault();
    sl = $("[data-slidedown = '"+$(this).attr("data-sl-btn")+"']");
    if(sl.is(":hidden")) {
      sl.slideDown(300);
      $(this).addClass("active");
    } else {
      sl.slideUp(300);
      $(this).removeClass("active");
    }
  });

  // ---------

  if( $(".object_slider_big").length > 0 ) {
    getObjectSlider(true);
  }

  // ---------

  $(".showMap").on("click", function(e) {
    e.preventDefault();
    $("#mapTempl").toggleClass("mapVisible");
    if($("#mapTempl").hasClass("mapVisible")) {
        $("[data-slider-big]").slick('unslick');
        $("[data-slider-miniature]").slick('unslick');
        getObjectSlider(false);
        $(".showMap").addClass("active");
        getMapParams();
        $("#objectTwoCols").addClass("active");
    } else {
        $("[data-slider-big]").slick('unslick');
        $("[data-slider-miniature]").slick('unslick');
        getObjectSlider(true);
        $(".showMap").removeClass("active");
        $("#objectTwoCols").removeClass("active");
        getContactsPosition();
    }
  });

  $('.object_slider_big').on('beforeChange', function(event, slick, currentSlide, nextSlide){
    galleryName = $(this).attr("data-slider-big");
    $("[data-gallery-btn = '"+galleryName+"']").attr("data-fancybox-index", nextSlide);
  });

  // ---------

  $(".close_tag").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".tag_grey");
    parent.remove();
  });

  // ---------

  $("[data-show-elems]").on("click", function(e) {
    e.preventDefault();
    elems = $("[data-hidden-elems = '"+$(this).attr("data-show-elems")+"']");
    elems.removeClass("hidden");
    $(this).remove();
  });

  // ---------

  if($("#chart").length > 0) {
    new Chartist.Pie('#chart', {
      series: [35, 40, 33, 140, 80]
    }, {
      donut: true,
      donutWidth: 35,
      startAngle: 90,
      total: 360,
      showLabel: false
    });
  }

  // ---------

  var chChildrens;

  $(".main_checkbox input").on("change", function() {
      parentBlock = $(this).closest(".checkboxes_array");
      chChildrens = parentBlock.find(".ch_childrens input");
      if($(this).is(":checked")) {
          chChildrens.prop("checked", true);
      } else {
          chChildrens.prop("checked", false);
      }
  });

  $(".ch_childrens input").on("change", function() {
      parentBlock = $(this).closest(".checkboxes_array");
      chChildrens = parentBlock.find(".ch_childrens input");
      mainCheckbox = parentBlock.find(".main_checkbox input");
      chChildrens.each(function() {
          if(!$(this).is(":checked")) {
              mainCheckbox.prop("checked", false);
              return false;
          } else {
              mainCheckbox.prop("checked", true);
          }
      });
  });

  // ---------

  $(document).on("click", "[data-popup-link]",  function(e) {
    e.preventDefault();
    popupName = $(this).attr("data-popup-link");
    div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    div.style.visibility = 'hidden';
    document.body.appendChild(div);
    scrollWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
    topCoord = $(document).scrollTop();
    $("body").addClass("fixed");
    $("body").css({
        "top" :  -1 * topCoord + "px",
        "padding-right" : scrollWidth + "px"
    });
    $(".popup_bg").fadeIn(300);
    $("[data-popup = '"+ popupName +"']").fadeIn(300);
  });
  $(document).on("click", ".close_popup, .close_popup_3, .popup_bg", function(e) {
    e.preventDefault();
    curTop = $("body").css("top");
    curTop = Math.abs(parseInt(curTop, 10));
    $("body").removeClass("fixed");
    if (curTop !== 0) {
        $("html").scrollTop(curTop);
    }
    $("body").attr("style", "");
    $("[data-popup]").fadeOut(300);
    $(".popup_bg").fadeOut(300);
    $(".drop_image_card").attr("id", "");
    $("#objTitle").val("");
    $("#objDescript").val("");
  });
  $(this).keydown(function(eventObject){
    if (eventObject.which == 27 && $("body").hasClass("fixed")) {
      curTop = $("body").css("top");
      curTop = Math.abs(parseInt(curTop, 10));
      $("body").removeClass("fixed");
      if (curTop !== 0) {
          $("html").scrollTop(curTop);
      }
      $("body").attr("style", "");      
      $(".popup_bg").fadeOut(300);
      $("[data-popup]").fadeOut(300);
    }
  });
  $(document).on("mouseup", function(e) {
    if($(".popup").is(":visible")) {
      e.preventDefault();
      hide_element = $(".popup_content");
      if (!hide_element.is(e.target)
          && hide_element.has(e.target).length === 0) {
          curTop = $("body").css("top");
          curTop = Math.abs(parseInt(curTop, 10));
          $("body").removeClass("fixed");
          if (curTop !== 0) {
              $("html").scrollTop(curTop);
          }
          $("body").attr("style", "");    
          $(".popup_bg").fadeOut(300);
          $("[data-popup]").fadeOut(300);
          $(".drop_image_card").attr("id", "");
          $("#objTitle").val("");
          $("#objDescript").val("");
      }
    }
  });

  if($("input[type = 'tel']").length > 0) {
    var im = new Inputmask("+380 (99)-999-99-99");
    im.mask($("input[type = 'tel']"));
  }

  // ---------

  $("[data-dropdown-menu-link]").on("click", function(e) {
    e.preventDefault();
    dr = $("[data-dropdown-menu = '"+$(this).attr("data-dropdown-menu-link")+"']");
    if(dr.is(":hidden")) {
      dr.slideDown(300);
      $(this).addClass("active");
    } else {
      dr.slideUp(300);
      $(this).removeClass("active");
    }
  });

  // ---------

  if( $("#subscribePopup").length > 0 ) {
    timeout = parseInt($("#subscribePopup").attr("data-timeout"));
    setTimeout(function () {
      $("#showSubscribe").trigger("click");
    },timeout);
  }

  // ---------

  $(".search_tab_radio").each(function () {
      if($(this).is(":checked") ) {
        id = $(this).attr("id");
        $(".search_tab_pill[for = '"+id+"']").addClass("active");
      }
  });

  $(".search_tab_radio").on("change" , function() {
    $(".search_tab_pill").removeClass("active");
    if($(this).is(":checked") ) {
      id = $(this).attr("id");
      $(".search_tab_pill[for = '"+id+"']").addClass("active");
    }
  });

  // ---------

  $(".search_dropdown_title").on("click", function(e) {
    e.preventDefault();
    $(".promo_sect_2").addClass("z");
  });

  $(".dr .close_btn").on('click', function (e) {
    e.preventDefault();
    parent =$(this).closest(".dr");
    parent.removeClass("active");
    $(".promo_sect_2").removeClass("z");
  });

  // ---------

  $("[data-slide-link]").on("click", function(e) {
    e.preventDefault();
    sl = $("[data-slide-box = '"+$(this).attr("data-slide-link")+"']");
    if(sl.is(":hidden")) {
      sl.slideDown(300);
      $(this).addClass("active");
    } else {
      sl.slideUp(300);
      $(this).removeClass("active");
    }
  });

  // ---------

  $(".table_row_title").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".table_row_wrapp");
    table = parent.closest("[data-table]");
    tableName = table.attr("data-table");
    sl = parent.find(".table_slidedown");
    if(sl.is(":hidden")) {
      $("[data-table = '"+tableName+"']").find(".table_row_wrapp").removeClass("active");
      $("[data-table = '"+tableName+"']").find(".table_slidedown").slideUp(300);
      parent.addClass("active");
      sl.slideDown(300);
    } else {
      parent.removeClass("active");
      sl.slideUp(300);
    }
  });

  // ---------

  $('.scroll_menu a[href^="#"]').on('click', function (e) {
      e.preventDefault();
      var hrefAttr = $(this).attr("href");
      if( hrefAttr.length > 0 && hrefAttr != "#" ) {
        $(".scroll_menu a").removeClass("active");
        $(this).addClass("active");
        $('html, body').stop().animate({
          'scrollTop': $(hrefAttr).offset().top+2
        }, 500);
      }
  });

  // ---------

  $(".show_link").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".tel_wrapp_2");
    parent.addClass("active");
  });
  
  // ---------

  $("[data-sq-link]").on("click", function(e) {
    e.preventDefault();
    sq = $(this).attr("data-sq-link");
    $('html, body').stop().animate({
      'scrollTop': $("[data-sq = '"+sq+"']:eq(0)").offset().top - $("#witeHeader").height()
    }, 500);
    setTimeout(function() {
      $("[data-sq = '"+sq+"']:eq(0)").find(".table_row_title").trigger("click");
    }, 600);    
  });

  // ---------

  $('.office_big_slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
    asNavFor: '.office_miniature_slider'
  });
  $('.office_miniature_slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.office_big_slider',
    dots: false,
    focusOnSelect: true,
    vertical: true,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          vertical: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          vertical: false
        }
      }
    ]
  });

  $(document).on("click", ".vertical_arrow", function (e) {
    e.preventDefault();
    parent = $(this).closest(".office_miniature_slider_wrapp");
    topArrow = parent.find(".slick-prev");
    bottomArrow = parent.find(".slick-next");
    if($(this).hasClass("bottom_arrow")) {
      topArrow.trigger("click");
    } else if($(this).hasClass("top_arrow")) {
      bottomArrow.trigger("click");
    }
  });

  // -------------

  $(".show_pass").on("click", function(e) {
    parent = $(this).closest(".password_input_wrapp");
    parent.toggleClass("active");
  });

  $(".password_input").on('propertychange input', function (e) {
    val = $(this).val();
    parent = $(this).closest(".password_input_wrapp");
    parent.find(".password_input").val(val);
  });

  // -------------

  $(".context_menu .close_btn_2").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".context_menu");
    parent.remove();
  });

  // -------------

  $(".promotion_item").on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass("active");
    ch = $(this).find(".reg_checkbox_2 input");
    if($(this).hasClass("active")) {
      ch.prop("checked", true);
    } else {
      ch.prop("checked", false);
    }
  });

  // --------------
  var fileInput = document.querySelector("#myfiles");
  var pullfiles=function(){      
      var files = fileInput.files;
      var fl=files.length;
      var i=0;
      var dropArea = $("#dropArea");
      var templ = "";
      var file;
      while ( i < fl) {
          file = files[i];
          fileUrl = URL.createObjectURL(file);
          if(fileUrl) {
          templ += '<div class="drop_image_card_wrapp">'+
                        '<div class="drop_image_card">'+
                          '<div class="img_box">'+
                            '<img src="'+fileUrl+'" alt="" />'+
                            '<div class="drop_image_card_mask">'+
                              '<div class="drag_n_drop"></div>'+
                              '<div class="controls_btns">'+
                                '<div>'+
                                  '<button type="button" class="control_btn rotate"></button>'+
                                '</div>'+
                                '<div>'+
                                  '<button type="button" class="control_btn trash"></button>'+
                                '</div>'+
                              '</div>'+
                            '</div>'+
                          '</div>'+
                          '<div class="drop_image_card_descript">'+
                            '<button type="button" class="edit_btn" data-popup-link = "popup_edit_obj"></button>'+
                            '<div class="drop_image_title">'+
                              '<h3></h3>'+
                            '</div>'+
                            '<div class="drop_image_text">'+
                              '<p></p>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                      '</div>';
                    }
          i++;
      }
      dropArea.prepend(templ);

      new Sortable(document.getElementById('dropArea'), {
          onEnd: function (evt) {
            $("#dropArea .upl_btn").appendTo($("#dropArea"));
          }
      });

  }

  if($("#myfiles").length > 0 ) {
    document.querySelector("#myfiles").onchange=pullfiles;
    dropArea.addEventListener('dragover', (event) => {
      event.stopPropagation();
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    });
    dropArea.addEventListener('drop', (event) => {
      event.stopPropagation();
      event.preventDefault();
      var files = event.dataTransfer.files;
        var fl=files.length;
        var i=0;
        var dropArea = $("#dropArea");
        var templ = "";
        var file;
        while ( i < fl) {
            file = files[i];
            fileUrl = URL.createObjectURL(file);
            if(fileUrl) {
            templ += '<div class="drop_image_card_wrapp">'+
                          '<div class="drop_image_card">'+
                            '<div class="img_box">'+
                              '<img src="'+fileUrl+'" alt="" />'+
                              '<div class="drop_image_card_mask">'+
                                '<div class="drag_n_drop"></div>'+
                                '<div class="controls_btns">'+
                                  '<div>'+
                                    '<button type="button" class="control_btn rotate"></button>'+
                                  '</div>'+
                                  '<div>'+
                                    '<button type="button" class="control_btn trash"></button>'+
                                  '</div>'+
                                '</div>'+
                              '</div>'+
                            '</div>'+
                            '<div class="drop_image_card_descript">'+
                              '<button type="button" class="edit_btn" data-popup-link = "popup_edit_obj"></button>'+
                              '<div class="drop_image_title">'+
                                '<h3></h3>'+
                              '</div>'+
                              '<div class="drop_image_text">'+
                                '<p></p>'+
                              '</div>'+
                            '</div>'+
                          '</div>'+
                        '</div>';
                      }
            i++;
        }
        dropArea.prepend(templ);
        new Sortable(document.getElementById('dropArea'), {
            onEnd: function (evt) {
              $("#dropArea .upl_btn").appendTo($("#dropArea"));
            }
        });

    });
  }

  $(".reset_drop_area").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".drop_area_wrapp");
    parent.find(".drop_area > div").each(function() {
      if(!$(this).hasClass("upl_btn")) {
        $(this).remove();
      }
    });
  });

  $(document).on("click", ".add_contact", function(e) {
    e.preventDefault();
    parent = $(this).closest(".object_btn_wrapp");
    $('<div class="object_input_wrapp"><input type="text" placeholder="" /></div>').insertBefore(parent);
  });

  // --------------
  $(document).on("propertychange input",".search_input",function() {
    var input, filter, ul, li, a, i;
    id = $(this).attr("id");
    input = document.getElementById(id);
    filter = input.value.toUpperCase();
    parent = $(this).closest(".search_dropdown_input");
    div = parent.find(".dropdown_search");
    a = div.find(".option");
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  });

  // --------------

  $(".search_input").on('propertychange input', function (e) {
    parent = $(this).closest(".search_dropdown_input");
    parent.addClass("active");
  });

  $(".search_input").on('click', function (e) {
    $(".search_dropdown_input").removeClass("active");
    parent = $(this).closest(".search_dropdown_input");
    parent.addClass("active");
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $(".search_dropdown_input").removeClass("active");
    }
  });

  $(document).mouseup(function(e) {
    hide_element = $(".search_input");
    if (!hide_element.is(e.target)
        && hide_element.has(e.target).length === 0) {
        $(".search_dropdown_input").removeClass("active");
      }
  });

  // -------------

  $(".dropdown_search .option").on("click", function(e) {
    e.preventDefault();
    val = $(this).attr("data-val");
    parent = $(this).closest(".search_dropdown_input");
    input = parent.find(".search_input");
    input.val(val);
  });

  // -------------

  $(".count_simbols_input input, textarea").on('propertychange input', function (e) {
    parent = $(this).closest(".count_simbols_input");
    maxlength = parseInt(parent.attr("data-max-simbols"));
    valLength = $(this).val().length;
    val = $(this).val();
    parent.removeClass("error");
    if(valLength > maxlength) {
      val = val.substring(0, val.length - 1);
      $(this).val(val);
      parent.addClass("error");
    }
    if(valLength > maxlength) {
      simbText = maxlength;
    }
     else {
      simbText = valLength;
    }
    parent.find(".simb").text(simbText);
  });

  // -------------

  $(document).on("click", "[data-popup-link = 'popup_edit_obj']", function() {
    parent = $(this).closest(".drop_image_card");
    imgSrc = parent.find("img").attr("src");
    $("#edit_obj_img_src").attr("src", imgSrc);
    parent.attr("id", "activePhotoObjCard");
  });

  $(document).on("click","#saveObjInfo", function(e) {
    e.preventDefault();
    objTitle = $("#objTitle").val();
    objDescript = $("#objDescript").val();
    parent = $(".drop_image_card[id = 'activePhotoObjCard']");
    parent.find(".drop_image_title h3").text(objTitle);
    parent.find(".drop_image_text p").text(objDescript);
    popup = $(this).closest(".popup");
    closeBtn = popup.find(".close_popup");
    closeBtn.trigger("click");
    $("#objTitle").val("");
    $("#objDescript").val("");
    parent.attr("id", "");
  });

  $(this).keydown(function(eventObject){
    if (eventObject.which == 27) {
      $(".drop_image_card").attr("id", "");
      $("#objTitle").val("");
      $("#objDescript").val("");
    }
  });

  // -------------

 $(document).on("click",".drop_image_card_wrapp .trash", function(e) {
    e.preventDefault();
    parent = $(this).closest(".drop_image_card_wrapp");
    parent.remove();
 });

  $(document).on("click",".drop_image_card", function(e) {
    if(bodyWidth <= 767) {
      e.preventDefault();
      parent = $(this).closest(".drop_image_card_wrapp");
      indexSl = parent.index(".drop_image_card_wrapp");
      popupName = "popup_edit_obj_resp";
      div = document.createElement('div');
      div.style.overflowY = 'scroll';
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.visibility = 'hidden';
      document.body.appendChild(div);
      scrollWidth = div.offsetWidth - div.clientWidth;
      document.body.removeChild(div);
      topCoord = $(document).scrollTop();
      $("body").addClass("fixed");
      $("body").css({
          "top" :  -1 * topCoord + "px",
          "padding-right" : scrollWidth + "px"
      });
      $(".popup_bg").fadeIn(300);
      $("[data-popup = '"+ popupName +"']").fadeIn(300);

      imgSrcArray = [];
      $("#dropArea .drop_image_card .img_box img").each(function(){
        src = $(this).attr("src");
        imgSrcArray.push(src);
      });
      templ = "";
      for(i = 0; i<=imgSrcArray.length - 1; i++ ) {
        templ += '<div class="slide"><div class="slide_img_box"><img src="'+imgSrcArray[i]+'"/></div></div>';
      }
      $(".edit_img_slider").html("");
      $(".edit_img_slider_dots").html("");
      $(".edit_img_slider").removeClass("slick-initialized");
      $(".edit_img_slider").append(templ);
      setSlider = setInterval(function() {
        if($('.edit_img_slider').hasClass("slick-initialized")) {
          clearInterval(setSlider);
        } else {
            $('.edit_img_slider').not(".slick-initialized").slick({
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: true,
              fade: true,
              initialSlide: indexSl,
              appendDots: ".edit_img_slider_dots"
            });          
        }
      }, 100);
    }
 });

  $("#saveObjInfo2").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".popup_edit_obj_content_resp");
    activeSlide = parent.find(".slick-active");
    activeSlideIndex = activeSlide.attr("data-slick-index");
    objTitle = $("#objTitle2").val();
    objDescript = $("#objDescript2").val();
    activeImg = $("#dropArea .drop_image_card_wrapp:eq("+activeSlideIndex+")");
    activeImg.find(".drop_image_title h3").text(objTitle);
    activeImg.find(".drop_image_text p").text(objDescript);
    popup = $(this).closest(".popup_edit_obj_content_resp");
    $("#objTitle2").val("");
    $("#objDescript2").val("");
    popup.find(".close_popup_3").trigger("click");
  });

  $("#trash2").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".popup_edit_obj_content_resp");
    activeSlide = parent.find(".slick-active");
    activeSlideIndex = activeSlide.attr("data-slick-index");
    $("#dropArea .drop_image_card_wrapp").eq(activeSlideIndex).remove();
    popup = $(this).closest(".popup_edit_obj_content_resp");
    popup.find(".close_popup_3").trigger("click");
  });

  $(".rotateBtn").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".popup_edit_obj_content_resp");
    activeSlide = parent.find(".slick-active");
    img = activeSlide.find("img");
    angleCss = img.css("transform");
    angle = parseInt(angleCss.match(/\d+/));
    console.log(angleCss +"  "+ angle);
    // if(angle == NaN) {
    //   angle = 0;
    // }

    // if(angle == 0 || angle == NaN || angleCss == "none") {
    //   if($(this).hasClass("toLeft")) {
    //     angle = -90;
    //   }
    //   if($(this).hasClass("toRight")) {
    //     angle = 90;
    //   }
    // }

    // if(angle == 90) {
    //   if($(this).hasClass("toLeft")) {
    //     angle = 0;
    //   }
    //   if($(this).hasClass("toRight")) {
    //     angle = 180;
    //   }
    // }

    // if(angle == 180) {
    //   if($(this).hasClass("toLeft")) {
    //     angle = 90;
    //   }
    //   if($(this).hasClass("toRight")) {
    //     angle = 270;
    //   }
    // }

    // if(angle == 270) {
    //   if($(this).hasClass("toLeft")) {
    //     angle = 180;
    //   }
    //   if($(this).hasClass("toRight")) {
    //     angle = 0;
    //   }
    // }

    // if(angle == -90) {
    //   if($(this).hasClass("toLeft")) {
    //     angle = -180;
    //   }
    //   if($(this).hasClass("toRight")) {
    //     angle = 0;
    //   }
    // }

    // if(angle == -180) {
    //   if($(this).hasClass("toLeft")) {
    //     angle = -270;
    //   }
    //   if($(this).hasClass("toRight")) {
    //     angle = -90;
    //   }
    // }

    // if(angle == -270) {
    //   if($(this).hasClass("toLeft")) {
    //     angle = 0;
    //   }
    //   if($(this).hasClass("toRight")) {
    //     angle = -180;
    //   }
    // }

    activeSlide.find("img").css({
      "transform" : "rotate("+angle+"deg)"
    });

  });

  $(".del_btn").on("click", function(e) {
    e.preventDefault();
    parent = $(this).closest(".del_item");
    parent.remove();
  });

  // --------------

  $(".switch_btn_wrapp").on("click", function(e) {
    e.preventDefault();
    $(this).toggleClass("active");
  });

  // ---------------

  $(document).on("click", "[data-popup-link = 'slider_popup']", function(e) {
    e.preventDefault();
    currentSlide = $('.office_big_slider .slick-active').attr("data-slick-index");
    $('.popup_office_big_slider').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      fade: true,
      asNavFor: '.popup_office_miniature_slider',
      initialSlide: currentSlide
    });
    $('.popup_office_miniature_slider').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      asNavFor: '.popup_office_big_slider',
      dots: false,
      arrows: true,
      focusOnSelect: true,
      initialSlide: currentSlide,
      prevArrow: '<button class="slick-prev tr_arr" aria-label="Previous" type="button">'+
         '<svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">'+
         '<path d="M5.04671 10.9992L13.2967 19.2492L10.94 21.6059L0.333374 10.9992L10.94 0.392578L13.2967 2.74924L5.04671 10.9992Z" fill="white"/>'+
        '</svg></button>',
      nextArrow: '<button class="slick-next tr_arr" aria-label="Next" type="button">'+
        '<svg width="14" height="22" viewBox="0 0 14 22" fill="none" xmlns="http://www.w3.org/2000/svg">'+
        '<path d="M8.95332 11.0008L0.703327 2.75075L3.05999 0.394088L13.6667 11.0008L3.05999 21.6074L0.703325 19.2508L8.95332 11.0008Z" fill="white"/>'+
        '</svg></button>',
      responsive: [
        {
          breakpoint: 1040,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 450,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
    });
  });

  // -------------------

      if( $("[data-static-chart]").length> 0 ) {

        var chart;

        $("[data-static-chart]").each(function() {
            chartName = $(this).attr("data-static-chart");
            chartLabels = [];
            chartSeries = [];
            $("[data-static-chart-values = '"+chartName+"'] .dataVal").each(function() {
                chartLabels.push($(this).attr("data-val-x"));
                chartSeries.push( parseInt($(this).attr("data-val-y")) );
            });
            chart = new Chartist.Line("[data-static-chart = '"+chartName+"']", {
              labels: chartLabels,
              series: [
                chartSeries
              ]
                }, {
                // high: 30,
                low: 0,
                showArea: true,
                fullWidth: true,
                lineSmooth: false,
                axisY: {
                    offset: 3
                },
                axisX: {
                    offset: 60
                }
            });

            chart.on('draw', function(data) {
              if(data.type === 'point') {
                var circle = new Chartist.Svg('circle', {
                  r:"4",
                  cx: data.x,
                  cy: data.y,          
                  style: 'fill:#fff'
                }, 'ct-point');
                data.element.replace(circle);
              }
            });

        });
    }

});