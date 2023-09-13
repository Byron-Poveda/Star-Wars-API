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