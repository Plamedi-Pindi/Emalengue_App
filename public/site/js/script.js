/**IMPORTS ======================================= */
//  const registerForm = require('./auth')




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



/**REGISTER CONFIG =============================================== */
const password_warnig = document.getElementById("password_warnig")
const confPw_warnig = document.getElementById("confPw_warnig")
const email_warnig = document.getElementById("email_warnig")
password_warnig.style.display = 'none'
confPw_warnig.style.display = 'none'
email_warnig.style.display = 'none'

const form = document.getElementById('register_form')
form.addEventListener('submit', (e) => {

  const confirmPassword = document.getElementById("confirmPassword").value
  const password = document.getElementById("password").value

  password_warnig.innerHTML = " "
  confPw_warnig.innerHTML = " "
  password_warnig.style.display = 'none'
  confPw_warnig.style.display = 'none'

  try {
    if (password.length < 6) {
      e.preventDefault()
      password_warnig.style.display = 'block'
      password_warnig.innerHTML = "Senha não pode conter menos de 6 carateres"

    } else if (confirmPassword.length < 6) {
      e.preventDefault()
      confPw_warnig.style.display = 'block'
      confPw_warnig.innerHTML = "Confirmação da Senha não pode conter menos de 6 carateres"

    } else if (confirmPassword !== password) {
      e.preventDefault()
      confPw_warnig.style.display = 'block'
      confPw_warnig.innerHTML = "A senha de confirmação não deve ser diferente"
    }

  } catch (error) {
    alert(error)
  }

})



/** LOGIN CONFIG ========================================================== */
const password_warnig1 = document.getElementById("password_warnig1")
password_warnig1.style.display = 'none'

const loginForm = document.querySelector('#login_form')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const password = document.getElementById("login_password").value
  
  alert(password)
})