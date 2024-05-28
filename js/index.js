import PaginaWeb from "./PaginaWeb.js";
$(document).ready(function(){

    // crear una instancia de la clase PaginaWeb
    const paginaWeb = new PaginaWeb();
    // obtener las secciones de la página
    const sections = paginaWeb.getSelections();
    // guardar las secciones en variables diferentes
    const header = sections[0];
    const main = sections[1];
    const footer = sections[2];

    // agregamos las secciones al body en orden
    $('body').prepend(header);
    $('body').append(main);
    $('body').append(footer);

});