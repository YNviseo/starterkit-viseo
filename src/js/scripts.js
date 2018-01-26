(function ($, window, document, undefined) {

  'use strict';

  $(function () {
    var PROJECTNAME = {
      vars: {
        mainSlider: $('.full-width-slider'),
        carousel: $('.carousel'),
        navigation: $('.navbar-component'),
        masonryLayout: $('.masonry-container'),
        masonryImages: $('.masonry-images'),
        selectBoxMulitple: $('.select-box-multiple'),
        selectBoxSingle: $('.select-box'),
        accordionHorz: $('#accordion-horizontal'),
        chart: $('#highchart'),
      },
      init: function () {
        var accordionHorz = this.vars.accordionHorz;
        this.fullWidthSlider();
        this.carousel();
        this.masonryLayout();
        this.masonryImages();
        this.lightbox();
        this.customSelect();
        this.accordion(accordionHorz);
        this.chart();
      //  this.contactFormValidation();
      },
      fullWidthSlider: function () {
        this.vars.mainSlider.slick();
      },
      carousel: function () {
        this.vars.carousel.slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });

      },
      masonryLayout: function () {
        PROJECTNAME.vars.masonryLayout.find('.grid').masonry({
          itemSelector: '.grid-item',
          columnWidth: '.grid-sizer',
          percentPosition: true
        });

      },
      masonryImages: function () {
        // init Masonry
        var $grid = PROJECTNAME.vars.masonryImages.find('.grid').masonry({
          itemSelector: '.grid-item',
          percentPosition: true,
          columnWidth: '.grid-sizer'
        });
        $grid.imagesLoaded().progress(function () {
          $grid.masonry();
        });

      },
      lightbox: function () {
        lightbox.option({
          'resizeDuration': 200,
          'wrapAround': true
        });
      },
      customSelect: function () {
        PROJECTNAME.vars.selectBoxMulitple.select2({
          placeholder: "Select a state",
        });

        PROJECTNAME.vars.selectBoxSingle.select2({
          selectOnClose: true,
          placeholder: "Select a state",
        });
      },
      accordion: function (item) {

        var accordion = item,
          accordionHeader = accordion.find('.accordion-question');
        accordion.find('.accordion-item').eq(0).addClass('active');

        accordionHeader.on('click', function () {
          var isActive = $(this).parents('.accordion-item').hasClass('active');
          accordion.find('.accordion-item').each(function () {
            $(this).removeClass('active');
          });
          if (!isActive) $(this).parents('.accordion-item').addClass('active');
        });
      },
      contactFormValidation  : function () {
        $(document).ready(function() {
          $('#contact_form').bootstrapValidator({
            // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
            feedbackIcons: {
              valid: 'glyphicon glyphicon-ok',
              invalid: 'glyphicon glyphicon-remove',
              validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
              first_name: {
                validators: {
                  stringLength: {
                    min: 2,
                  },
                  notEmpty: {
                    message: 'Please supply your first name'
                  }
                }
              },
              last_name: {
                validators: {
                  stringLength: {
                    min: 2,
                  },
                  notEmpty: {
                    message: 'Please supply your last name'
                  }
                }
              },
              email: {
                validators: {
                  notEmpty: {
                    message: 'Please supply your email address'
                  },
                  emailAddress: {
                    message: 'Please supply a valid email address'
                  }
                }
              },
              phone: {
                validators: {
                  notEmpty: {
                    message: 'Please supply your phone number'
                  },
                  phone: {
                    country: 'US',
                    message: 'Please supply a vaild phone number with area code'
                  }
                }
              },
              address: {
                validators: {
                  stringLength: {
                    min: 8,
                  },
                  notEmpty: {
                    message: 'Please supply your street address'
                  }
                }
              },
              city: {
                validators: {
                  stringLength: {
                    min: 4,
                  },
                  notEmpty: {
                    message: 'Please supply your city'
                  }
                }
              },
              state: {
                validators: {
                  notEmpty: {
                    message: 'Please select your state'
                  }
                }
              },
              zip: {
                validators: {
                  notEmpty: {
                    message: 'Please supply your zip code'
                  },
                  zipCode: {
                    country: 'US',
                    message: 'Please supply a vaild zip code'
                  }
                }
              },
              comment: {
                validators: {
                  stringLength: {
                    min: 10,
                    max: 200,
                    message:'Please enter at least 10 characters and no more than 200'
                  },
                  notEmpty: {
                    message: 'Please supply a description of your project'
                  }
                }
              }
            }
          })
            .on('success.form.bv', function(e) {
              $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
              $('#contact_form').data('bootstrapValidator').resetForm();

              // Prevent form submission
              e.preventDefault();
            });
        });


      },
      chart: function () {
        (function () {
          'use strict';
          var chart = new Highcharts.Chart({

            chart: {
              renderTo: 'container',
              animation: true
            },

            title: {
              text: ''
            },

            xAxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            plotOptions: {
              series: {
                point: {
                  events: {

                    drag: function (e) {
                      // Returning false stops the drag and drops. Example:
                      /*
                       if (e.newY > 300) {
                       this.y = 300;
                       return false;
                       }
                       */

                      $('#drag').html(
                        'Dragging <b>' + this.series.name + '</b>, <b>' + this.category + '</b> to <b>' + Highcharts.numberFormat(e.y, 2) + '</b>');
                    },
                    drop: function () {
                      $('#drop').html(
                        'In <b>' + this.series.name + '</b>, <b>' + this.category + '</b> was set to <b>' + Highcharts.numberFormat(this.y, 2) + '</b>');
                    }
                  }
                },
                stickyTracking: false
              },
              column: {
                stacking: 'normal'
              },
              line: {
                cursor: 'ns-resize'
              }
            },

            tooltip: {
              yDecimals: 2
            },

            series: [{
              data: [0, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
              //draggableX: true,
              draggableY: false,
              dragMinY: 0,
              type: 'column',
              minPointLength: 2
            }, {
              data: [0, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4].reverse(),
              draggableY: false,
              dragMinY: 0,
              type: 'column',
              minPointLength: 2
            }, {
              data: [0, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
              draggableY: true
            }]

          });
        })();

      }
    }

    PROJECTNAME.init();

  });

})(jQuery, window, document);
