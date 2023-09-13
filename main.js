const peopleList = document.getElementById("list-people");
const planetsList = document.getElementById("list-planets");
const filmsList = document.getElementById("list-films");
const speciesList = document.getElementById("list-species");
const vehiclesList = document.getElementById("list-vehicles");
const starshipsList = document.getElementById("list-starships");
const loader = document.querySelector(".loader")
const loaderModal = document.querySelector(".modal__loader")
const closeModal = document.querySelector(".modal__button-close")
const InfoLists = document.getElementById("InfoLists")
const backdrop = document.querySelector(".backdrop")
const modal = document.querySelector(".modal-description")
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
        alert("API request error check your internet");
    }
}

const fetchAndRender = async (url, listElement, renderFunction) => {
    loader.classList.remove("hide");
    try {
        const response = await fetch(url);
        const data = await response.json();
        renderFunction(data, listElement);
    } catch (error) {
        alert("API request error check your internet");
    } finally {
    loader.classList.add("hide");
    }
}
const renderList = (data, listElement, type) => {
    listElement.innerHTML = data.results.map(item => `
        <li class="item pointer item--${type}">
            <span class="item__span">${item.name || item.title}</span>
        </li>`).join('');

    const itemsOpenModal = document.querySelectorAll(`.item--${type}`);
    itemsOpenModal.forEach(element => {
        element.addEventListener("click", (e) => {
            const itemSpan = element.getElementsByTagName("span")[0];
            openModal(type, itemSpan.textContent);
        });
    });
};
const peopleRenderList = (data) => {
    renderList(data, peopleList, "people");
};
const plantesRenderList = (data) => {
    renderList(data, planetsList, "planets");
};
const filmsRenderList = (data) => {
    renderList(data, filmsList, "films");
};
const speciesRenderList = (data) => {
    renderList(data, speciesList, "species");
};
const vehiclesRenderList = (data) => {
    renderList(data, vehiclesList, "vehicles");
};
const starshipsRenderList = (data) => {
    renderList(data, starshipsList, "starships");
};
const closeModalFunction = () => {
    backdrop.classList.add('hide'); 
}

backdrop.addEventListener("click", () => {
    closeModalFunction() 
})

closeModal.addEventListener("click", () => {
    closeModalFunction()
})

const openModal = async (type,search) => {
    loaderModal.classList.remove("hide")
    backdrop.classList.remove("hide")
    modal.innerHTML = "";
    try {
        const response = await fetch(`${base_url}/${type}/?search=${search}`)
        const data = await response.json()
        const results = data.results[0]
        let newElements = '';
        switch(type.toLowerCase()){
            case "people":
                const eyeColors = results?.eye_color.split("-")
            newElements = `
            <h1 class="modal__title">${results?.name || ''}</h1>
            <ul class="modal__list">
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Height:</span>
                    <span class="modal__especifications-value">${results?.height || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Hair Color:</span>
                    <span class="modal__especifications-value">${results?.hair_color || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Skin Color:</span>
                    <span class="modal__especifications-value">${results?.skin_color || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Eye Color:</span>
                    <span class="modal__especifications-value modal__especifications--eye-color">${results?.eye_color || ''} 
                        <div class="eye-color" style="background: linear-gradient(to right, ${eyeColors[0]}, ${eyeColors[1] || eyeColors[0]});"></div>
                    </span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Birth Year:</span>
                    <span class="modal__especifications-value">${results?.birth_year || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Gender:</span>
                    <span class="modal__especifications-value modal__especifications--gender">${results?.gender || ''} 
                        <svg class="svg-gender" width="25" height="25"><use href="./images/icons/svg.defs.svg#${results?.gender || ''}"></use></svg>
                    </span>
                </li>
            </ul>   
            `
            modal.innerHTML = newElements;
            break;
            case "films":
            newElements = `
            <h1 class="modal__title">${results?.title || ''}</h1>
            <ul class="modal__list">
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Director:</span>
                    <span class="modal__especifications-value">${results?.director || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Producer:</span>
                    <span class="modal__especifications-value">${results?.producer || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Release Date:</span>
                    <span class="modal__especifications-value">${results?.release_date || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Epode Id:</span>
                    <span class="modal__especifications-value">${results?.episode_id || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Opening crawl:</span>
                    <span class="modal__especifications-value modal__especifications--opening_crawl-small">${results?.opening_crawl || ''}</span>
                </li>
            </ul>    
            `
            modal.innerHTML = newElements;
            const especifications = document.querySelector(".modal__especifications--opening_crawl-small")
            especifications.addEventListener("mouseenter", ()=>{
                especifications.classList.add("modal__especifications--opening_crawl")
            })
            especifications.addEventListener("mouseleave", ()=>{
                especifications.classList.remove("modal__especifications--opening_crawl")
            })
            break;
            case "planets":
                newElements = `
            <h1 class="modal__title">${results?.name || ''}</h1>
            <ul class="modal__list">
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Director:</span>
                    <span class="modal__especifications-value">${results?.rotation_period || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Producer:</span>
                    <span class="modal__especifications-value">${results?.orbital_period || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Release Date:</span>
                    <span class="modal__especifications-value">${results?.diameter || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Epode Id:</span>
                    <span class="modal__especifications-value">${results?.climate || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Gravity:</span>
                    <span class="modal__especifications-value">${results?.gravity || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Terrain:</span>
                    <span class="modal__especifications-value">${results?.terrain || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Surface Water:</span>
                    <span class="modal__especifications-value">${results?.surface_water || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Population:</span>
                    <span class="modal__especifications-value">${results?.population || ''}</span>
                </li>
            </ul>    
            `
            modal.innerHTML = newElements;
            break;
            case "species":
                newElements = `
            <h1 class="modal__title">${results?.name || ''}</h1>
            <ul class="modal__list">
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Classification:</span>
                    <span class="modal__especifications-value">${results?.classification || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Designation:</span>
                    <span class="modal__especifications-value">${results?.designation || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Average Height:</span>
                    <span class="modal__especifications-value">${results?.average_height || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Skin Colors:</span>
                    <span class="modal__especifications-value">${results?.skin_colors || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Hair Colors:</span>
                    <span class="modal__especifications-value">${results?.hair_colors || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Eye Colors:</span>
                    <span class="modal__especifications-value">${results?.eye_colors || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Average Lifespan:</span>
                    <span class="modal__especifications-value">${results?.average_lifespan || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Language:</span>
                    <span class="modal__especifications-value">${results?.language || ''}</span>
                </li>
            </ul>    
            `
            modal.innerHTML = newElements;
            break;
            case "starships":
                newElements = `
            <h1 class="modal__title">${results?.name || ''}</h1>
            <ul class="modal__list">
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Model:</span>
                    <span class="modal__especifications-value">${results?.model || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Manufacturer:</span>
                    <span class="modal__especifications-value">${results?.manufacturer || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Cost In Credits:</span>
                    <span class="modal__especifications-value">${results?.cost_in_credits || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Length:</span>
                    <span class="modal__especifications-value">${results?.length || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">max atmosphering speed:</span>
                    <span class="modal__especifications-value">${results?.max_atmosphering_speed || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">crew:</span>
                    <span class="modal__especifications-value">${results?.crew || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">passengers:</span>
                    <span class="modal__especifications-value">${results?.passengers || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">cargo capacity:</span>
                    <span class="modal__especifications-value">${results?.cargo_capacity || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">consumables:</span>
                    <span class="modal__especifications-value">${results?.consumables || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">hyperdrive rating:</span>
                    <span class="modal__especifications-value">${results?.hyperdrive_rating || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">MGLT:</span>
                    <span class="modal__especifications-value">${results?.MGLT || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">starship class:</span>
                    <span class="modal__especifications-value">${results?.starship_class || ''}</span>
                </li>
            </ul>    
            `
            modal.innerHTML = newElements;
            break;
            case "vehicles":
                newElements = `
                <h1 class="modal__title">${results?.name || ''}</h1>
                <ul class="modal__list">
                    <li class="modal__especifications">
                        <span class="modal__especifications-key">Model:</span>
                        <span class="modal__especifications-value">${results?.model || ''}</span>
                    </li>
                    <li class="modal__especifications">
                        <span class="modal__especifications-key">Manufacturer:</span>
                        <span class="modal__especifications-value">${results?.manufacturer || ''}</span>
                    </li>
                    <li class="modal__especifications">
                        <span class="modal__especifications-key">Cost In Credits:</span>
                        <span class="modal__especifications-value">${results?.cost_in_credits || ''}</span>
                    </li>
                    <li class="modal__especifications">
                        <span class="modal__especifications-key">Length:</span>
                        <span class="modal__especifications-value">${results?.length || ''}</span>
                    </li>
                    <li class="modal__especifications">
                        <span class="modal__especifications-key">max atmosphering speed:</span>
                        <span class="modal__especifications-value">${results?.max_atmosphering_speed || ''}</span>
                    </li>
                    <li class="modal__especifications">
                        <span class="modal__especifications-key">crew:</span>
                        <span class="modal__especifications-value">${results?.crew || ''}</span>
                    </li>
                    <li class="modal__especifications">
                        <span class="modal__especifications-key">passengers:</span>
                        <span class="modal__especifications-value">${results?.passengers || ''}</span>
                    </li>
                    <li class="modal__especifications">
                        <span class="modal__especifications-key">cargo capacity:</span>
                        <span class="modal__especifications-value">${results?.cargo_capacity || ''}</span>
                    </li>
                    <li class="modal__especifications">
                        <span class="modal__especifications-key">consumables:</span>
                        <span class="modal__especifications-value">${results?.consumables || ''}</span>
                    </li>
                    <li class="modal__especifications">
                        <span class="modal__especifications-key">vehicle class:</span>
                        <span class="modal__especifications-value">${results?.vehicle_class || ''}</span>
                    </li>
                </ul>    
                `
                modal.innerHTML = newElements;
            break;
        }
    }catch(err){
        alert("There was an error bringing the API information, check your internet connection")
    }finally{
        loaderModal.classList.add("hide")
    }
    // modalTitle.textContent= `${search} Details`;  
}
getInformation()

