export const initSlickSliders = () => {
  const $ = (window as any).jQuery;
  if ($ && $.fn.slick) {
    // Find all slick elements and initialize them
    $('.slick-sliders').each(function(this: any) {
      const $this = $(this);
      
      // If it's already initialized, destroy it first so we can re-init
      if ($this.hasClass('slick-initialized')) {
        try {
          $this.slick('unslick');
        } catch (e) {
          console.warn('Error destroying slick slider:', e);
        }
      }

      const autoplay = $this.data('autoplay') === true || $this.data('autoplay') === 'true';
      const dots = $this.data('dots') === true || $this.data('dots') === 'true';
      const nav = $this.data('nav') === true || $this.data('nav') === 'true';
      const columns = parseInt($this.data('columns')) || 1;
      const columns1440 = parseInt($this.data('columns1440')) || columns;
      const columns1 = parseInt($this.data('columns1')) || columns;
      const columns2 = parseInt($this.data('columns2')) || columns;
      const columns3 = parseInt($this.data('columns3')) || columns;
      const columns4 = parseInt($this.data('columns4')) || 1;
      const slidesToScroll = $this.data('slidestoscroll') === true || $this.data('slidestoscroll') === 'true';

      $this.slick({
        arrows: nav,
        dots: dots,
        infinite: true,
        autoplay: autoplay,
        autoplaySpeed: 5000,
        slidesToShow: columns,
        slidesToScroll: slidesToScroll ? columns : 1,
        prevArrow: '<button class="slick-prev slick-arrow"><i class="fa fa-angle-left"></i></button>',
        nextArrow: '<button class="slick-next slick-arrow"><i class="fa fa-angle-right"></i></button>',
        responsive: [
          {
            breakpoint: 1441,
            settings: {
              slidesToShow: columns1440,
              slidesToScroll: slidesToScroll ? columns1440 : 1
            }
          },
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: columns1,
              slidesToScroll: slidesToScroll ? columns1 : 1
            }
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: columns2,
              slidesToScroll: slidesToScroll ? columns2 : 1
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: columns3,
              slidesToScroll: slidesToScroll ? columns3 : 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: columns4,
              slidesToScroll: slidesToScroll ? columns4 : 1
            }
          }
        ]
      });
    });
  }
};
