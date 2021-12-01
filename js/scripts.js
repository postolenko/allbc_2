function getBarsChart() {
    if($(".bars").length > 0) {
        $(".bars").each(function() {
            if( $(this).is(":visible") ) {
                var heightArr = [];
                bar = $(this).find(".bar");
                // barsLength = bar.length;
                bar.each(function() {
                    heightVal = parseInt($(this).attr("data-count-val"));
                    heightArr.push(heightVal);
                });
                maxHeight = Math.max.apply(null, heightArr);
                chartHeight = $(this).height();
                // chartWidth = $(this).width();
                heightModul = chartHeight/maxHeight;      
                bar.each(function() {
                    heightVal = parseInt($(this).attr("data-count-val"));
                    $(this).css({
                        "height" : ( heightVal ) + "px"
                        // "width" : chartWidth / barsLength + "px"
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

function getHeaderParams() {
  if( bodyWidth <= 767 ) {
    if($(document).scrollTop() > 5) {
      $("#header").addClass("bg");
    } else {
      $("#header").removeClass("bg");
    }
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
        // if($(".filter_nav").length> 0) {
            // filtersCoord = $(".filter_nav").offset().top + $(".filter_nav").height();
        // } else {
            filtersCoord = $(document).scrollTop();
        // }        
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
      vertical : vertical
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

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;


$(window).on("load", function() {
    getBarsChart();
    getObjectCardsSlider();
});

$(window).resize(function() {
  getBarsChart();
  bodyWidth = w.innerWidth || e.clientWidth || g.clientWidth;
  getObjectCardsSlider();
  getHeaderParams();
  getDropdownWidth();
  getMapParams();
  getFixedHeaderParams();
});

$(document).scroll(function() {
  getHeaderParams();
  getMapParams();
  getFixedHeaderParams();
});

$(document).ready(function() {
  getHeaderParams();
  getDropdownWidth();
  getFixedHeaderParams();
    // $(".gallery_thumbs .gallery_thumb:nth-child(4n+4)").addClass("four");

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
      }
    });

    $(document).mouseup(function(e) {
      hide_element = $(".dr");
      if (!hide_element.is(e.target)
          && hide_element.has(e.target).length === 0) {
          hide_element.removeClass("active");
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
          // $(".price_values").text($("#price_sel").text()[0] + " " + $("#input-number_1").val()+" - "+ $("#input-number_2").val());
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
      parent.removeClass("active");
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

    $("#showMap").on("click", function(e) {
      e.preventDefault();
      $("#mapTempl").toggleClass("mapVisible");
      if($("#mapTempl").hasClass("mapVisible")) {
          $("[data-slider-big]").slick('unslick');
          $("[data-slider-miniature]").slick('unslick');
          getObjectSlider(false);
          $(this).addClass("active");
      } else {
          $("[data-slider-big]").slick('unslick');
          $("[data-slider-miniature]").slick('unslick');
          getObjectSlider(true);
          $(this).removeClass("active");
      }
    });     

    // $("[data-gallery-btn]").on("click", function(e) {
    $(document).on("click", "[data-gallery-btn]", function(e) {
      e.preventDefault();
      galleryName = $(this).attr("data-gallery-btn");
      gallery = $("[data-gallery = '"+galleryName+"']");
      index = parseInt($("[data-slider-big = '"+galleryName+"'] .slick-active").attr("data-slick-index"));
      currentSlide = gallery.find("a").eq(index);
      currentSlide.trigger("click");
      console.log(index +"  "+ galleryName +"  "+ currentSlide);
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

    new Chartist.Pie('#chart', {
      series: [35, 40, 33, 140, 80]
    }, {
      donut: true,
      donutWidth: 35,
      startAngle: 90,
      total: 360,
      showLabel: false
    });

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

});