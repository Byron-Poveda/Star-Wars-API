const searchInput = document.getElementById("search")
searchInput.addEventListener("change", (e) =>{
    console.log(e.target.value)
    searchInput.value = ""
})
// mejorar estilos, hacer funcionar el input con la peticion correcta y hacer q salga el listados, 
// y mejorar los modales en si falta un chingo