const peopleList = document.getElementById("list-people");
const planetsList = document.getElementById("list-planets");
const filmsList = document.getElementById("list-films");
const speciesList = document.getElementById("list-species");
const vehiclesList = document.getElementById("list-vehicles");
const starshipsList = document.getElementById("list-starships");
const loader = document.querySelector(".loader")
const InfoLists = document.getElementById("InfoLists")
const backdrop = document.querySelector(".backdrop")
const modal = document.querySelector(".modal")
const base_url = 'https://swapi.dev/api';

const getInformation = async () => {
    try {
        await fetchAndRender(`${base_url}/people`, peopleList, peopleRenderList);
        await fetchAndRender(`${base_url}/films`, filmsList, filmsRenderList);
        await fetchAndRender(`${base_url}/planets`, planetsList, plantesRenderList);
        await fetchAndRender(`${base_url}/species`, speciesList, speciesRenderList);
        await fetchAndRender(`${base_url}/starships`, starshipsList, starshipsRenderList);
        await fetchAndRender(`${base_url}/vehicles`, vehiclesList, vehiclesRenderList);
    } catch (error) {
        console.log(error);
    }
}

const fetchAndRender = async (url, listElement, renderFunction) => {
    loader.classList.remove("hide");
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderFunction(data, listElement);
    } catch (error) {
        console.log(error);
    } finally {
    loader.classList.add("hide");
    }
}
const peopleRenderList = (data) => {
    peopleList.innerHTML = data.results.map(item => 
        `<li class="item pointer item--people">
            <span class="item__span">${item.name}</span>
        </li>`).join('');
    const itemsOpenModal = document.querySelectorAll(".item--people")
    itemsOpenModal.forEach(element => {
    element.addEventListener("click", (e)=>{
        console.log("people",e)
        const itemSpan = element.getElementsByTagName("span")[0]
        openModal("people",itemSpan.textContent)
    })
});
};
const plantesRenderList = (data) => {
    planetsList.innerHTML = data.results.map(item => 
        `<li class="item pointer item--planets">
            <span class="item__span">${item.name}</span>
        </li>`).join('');
    const itemsOpenModal = document.querySelectorAll(".item--planets")
    itemsOpenModal.forEach(element => {
    element.addEventListener("click", (e)=>{
        console.log("planets",e)
        const itemSpan = element.getElementsByTagName("span")[0]
        openModal("planets",itemSpan.textContent)
    })
});
};
const filmsRenderList = (data) => {
    filmsList.innerHTML = data.results.map(item => 
        `<li class="item pointer item--films">
            <span class="item__span text-dark">${item.title}</span>
        </li>`).join('');
    const itemsOpenModal = document.querySelectorAll(".item--films")
    itemsOpenModal.forEach(element => {
    element.addEventListener("click", (e)=>{
        console.log("films",e)
        const itemSpan = element.getElementsByTagName("span")[0]
        openModal("films",itemSpan.textContent)
    })
});
};
const speciesRenderList = (data) => {
    speciesList.innerHTML = data.results.map(item => 
        `<li class="item pointer item--species">
            <span class="item__span text-dark">${item.name}</span>
        </li>`).join('');
    const itemsOpenModal = document.querySelectorAll(".item--species")
    itemsOpenModal.forEach(element => {
    element.addEventListener("click", (e)=>{
        console.log("species",e)
        const itemSpan = element.getElementsByTagName("span")[0]
        openModal("species",itemSpan.textContent)
    })
});
};
const vehiclesRenderList = (data) => {
    vehiclesList.innerHTML = data.results.map(item => 
        `<li class="item pointer item--vehicles">
            <span class="item__span text-dark">${item.name}</span>
        </li>`).join('');
    const itemsOpenModal = document.querySelectorAll(".item--vehicles")
    itemsOpenModal.forEach(element => {
    element.addEventListener("click", (e)=>{
        console.log("vehicles",e)
        const itemSpan = element.getElementsByTagName("span")[0]
        openModal("vehicles",itemSpan.textContent)
    })
});
};
const starshipsRenderList = (data) => {
    starshipsList.innerHTML = data.results.map(item => 
        `<li class="item pointer item--starchips">
            <span class="item__span">${item.name}</span>
        </li>`).join('');
    const itemsOpenModal = document.querySelectorAll(".item--starchips")
    itemsOpenModal.forEach(element => {
    element.addEventListener("click", (e)=>{
        console.log("starships",e)
        const itemSpan = element.getElementsByTagName("span")[0]
        openModal("starships",itemSpan.textContent)
    })
});
};

backdrop.addEventListener("click",()=>{
    backdrop.classList.add('hide');  
})

const openModal = async (type,search) => {
    console.log(search)
    modal.innerHTML = ""
    backdrop.classList.remove("hide")
    const response = await fetch(`${base_url}/${type}/?search=${search}`)
    const data = await response.json()
    const results = data.results[0]
    modal.innerHTML = `<h1>${results?.name || results.title}</h1>`
    // modalTitle.textContent= `${search} Details`;  
}

getInformation()

