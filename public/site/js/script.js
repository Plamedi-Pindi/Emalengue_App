
/*********** SWIPER START CURSOS *****************/ 
var swiper = new Swiper(".cursos-recomendados-swiper", {
  slidesPerView: 3,
  // spaceBetween: 2,
  watchSlidesProgress: true,
  centerSlide: 'true',
  fade: true,
  loop: true,
   autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      360: {
        slidesPerView: 2,
        // spaceBetween: 20,
      },
      540: {
        slidesPerView: 3,
        // spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        // spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        // spaceBetween: 50,
      },
    },
});
/*********** SWIPER CURSOS END *****************/ 

/*********** SWIPER START FREELANCER *****************/ 
var swiper = new Swiper(".contratar_freelancers-swiper", {
  slidesPerView: 30,
  // spaceBetween: 2,
  watchSlidesProgress: true,
  centerSlide: 'true',
  fade: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      395: {
        slidesPerView: 2,
        // spaceBetween: 20,
      },
      540: {
        slidesPerView: 3,
        // spaceBetween: 20,
      },
      768: {
        slidesPerView: 4,
        // spaceBetween: 40,
      },
      
    },
});
/*********** SWIPER END *****************/ 