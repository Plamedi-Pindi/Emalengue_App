
let sdb_slide = document.getElementById('sdb-slide');
let body = document.getElementsByTagName('body')[0];
const sdb_container = document.getElementById('sdb_container');
const main = document.getElementsByTagName('main')[0];
const footer = document.getElementsByTagName('footer')[0];

// Inicializa o valor da estilizacao padrao no css  
body.style.gridTemplateColumns = '0rem 1fr 1fr 1fr';
sdb_container.style.left = '0rem'

let sb_content = document.getElementsByClassName('sb-content');
// inicializar o valor padrao
for (var i = 0; i < sb_content.length; i++) {
    sb_content[i].style.display = 'none';
}


// Evento para Espandeir o Sidebar
sdb_slide.addEventListener('click', () => {
    let icon = document.getElementById('slide-icon');
    let sidebar = document.getElementById('sidebar')

    if (body.style.gridTemplateColumns == '0rem 1fr 1fr 1fr') {
        sidebar.style.zIndex = 2;
        body.style.transition = '0.5s';
        body.style.gridTemplateColumns = '16rem 1fr 1fr 1fr';

        setTimeout(() => {
            sdb_container.style.transition = '0.4s'
            sdb_container.style.left = '13rem'

            footer.style.overflowX = 'auto'
        }, 300);
    }
    else {

        setTimeout(() => {
            body.style.gridTemplateColumns = '0rem 1fr 1fr 1fr';
            sdb_container.style.left = '0rem'
            footer.style.overflowX = 'hidden'
        }, 300);

    }

    if (icon.getAttribute('class') == 'bi bi-arrow-right') {
        icon.setAttribute('class', 'bi bi-arrow-left')
    }
    else {
        icon.setAttribute('class', 'bi bi-arrow-right')
    }

    setTimeout(() => {
        for (var i = 0; i < sb_content.length; i++) {
            if (sb_content[i].style.display == 'none') {
                sb_content[i].style.display = 'inline'
            } else {
                sb_content[i].style.display = 'none';
            }
        }
    }, 500);


});


// Dropdow user dashboard
const user_menu = document.getElementById('user-menu');
const dash_dropdown = document.getElementById('dash_dropdown');
dash_dropdown.style.display = 'none'

user_menu.addEventListener('click', () => {

    if (dash_dropdown.style.display == 'none') {
        dash_dropdown.style.transition = '0.5s'

        dash_dropdown.style.display = 'block'

    } else {
        dash_dropdown.style.display = 'none'
    }
})


