const descShow = document.getElementById('dt_description');
const moduleShow = document.getElementById('dt_modules');
const dt_desc_show = document.getElementById('dt_desc_show');
const dt_module_show = document.getElementById('dt_module_show');

moduleShow.style.borderBottom = "3px solid rgb(2, 22, 90)";
moduleShow.style.background = "#ddd";

descShow.addEventListener("click", () => {
    dt_desc_show.style.display = "block";
    dt_module_show.style.display = "none";
    //
    descShow.style.background = "#ddd";
    descShow.style.borderBottom = "3px solid rgb(2, 22, 90)";
    //
    moduleShow.style.background = "#eee";
    moduleShow.style.borderBottom = "none";

})

moduleShow.addEventListener("click", () => {
    dt_desc_show.style.display = "none";
    dt_module_show.style.display = "block";

    descShow.style.background = "#eee";
    descShow.style.borderBottom = "none";

    moduleShow.style.borderBottom = "3px solid rgb(2, 22, 90)";
    moduleShow.style.background = "#ddd";
})