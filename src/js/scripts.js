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
        selectBoxMulitple : $('.select-box-multiple'),
        selectBoxSingle : $('.select-box')
      },
      init: function () {
        this.fullWidthSlider();
        this.carousel();
        this.masonryLayout();
        this.masonryImages();
        this.lightbox();
        this.customSelect();
      },
      fullWidthSlider: function () {
        this.vars.mainSlider.slick();
      },
      carousel: function () {
        this.vars.carousel.slick({
          slidesToShow: 3,
          slidesToScroll: 1,
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
      customSelect : function () {
        PROJECTNAME.vars.selectBoxMulitple.select2({
          placeholder: "Select a state",
        });

        PROJECTNAME.vars.selectBoxSingle.select2( {
          selectOnClose: true,
          placeholder: "Select a state",
        });
      }
    }

    PROJECTNAME.init();

  });

})(jQuery, window, document);
