/**IMPORTS ======================================== */

const form = document.getElementById('register_form')
form.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.getElementsByName('email')[0].vale
    const password = document.getElementsByName('password')[0]
    
    try {
        if(password === '' || email === ''){
            password.style.color = 'blue'
            email.style.color = 'blue'
        }
    } catch (error) {
        
    }


    
    
})


module.exports = {form}