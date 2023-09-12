const homeSection = document.getElementById("Home-section")
const searchSection = document.getElementById("Search-section")

homeSection.addEventListener("click", ()=>{
    document.querySelector(".search-section").classList.add("hide")
    document.querySelector(".home-section").classList.remove("hide")
})
searchSection.addEventListener("click", ()=>{
    document.querySelector(".home-section").classList.add("hide")
    document.querySelector(".search-section").classList.remove("hide")
})



// FALTA COLOCAR SECCIONES CON PAGINACION PARA CADA SECCION (PEOPLE, PLANETS, FILMS, STARSHIPS...)
// FALTA COLOCAR Q CUANDO ESTE EN UN MODAL SE PUEDA DIRIGIR A LA SECCION Q CREARE