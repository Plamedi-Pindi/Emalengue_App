
let sdb_slide = document.getElementById('sdb-slide');
let body = document.getElementsByTagName('body')[0];
// Inicializa o valor da estilizacao padrao no css  
body.style.gridTemplateColumns = '0.6fr 1fr 1fr 1fr';

let sb_content = document.getElementsByClassName('sb-content');
// inicializar o valor padrao
for (var i = 0; i < sb_content.length; i++) {
    sb_content[i].style.display = 'none';
}


// Evento para Espandeir o Sidebar
sdb_slide.addEventListener('click', () => {
    let icon = document.getElementById('slide-icon');
    let sidebar =document.getElementById('sidebar')

    if (body.style.gridTemplateColumns == '0.6fr 1fr 1fr 1fr') {
        sidebar.style.zIndex = 2; 
        body.style.transition = '0.5s';
        body.style.gridTemplateColumns = '6fr 1fr 1fr 1fr';
    }
    else {
       
        setTimeout(() => {
            body.style.gridTemplateColumns = '0.6fr 1fr 1fr 1fr';
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



