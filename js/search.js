const searchInput = document.getElementById("search")
const searchButton = document.getElementById("searchButton")
const searchFilterButton = document.getElementById("buttonFilter");
const searchFilterMenu = document.querySelector(".search__filter-menu");
const searchFilterItems = document.querySelectorAll(".search_filter-item");
const spanFilter = document.getElementById("spanFilter")
const baseUrl = 'https://swapi.dev/api';
const loaderSearch = document.querySelector(".loader-search");
const filterDescription = document.getElementById("filterDescription")
const counterFilter = document.querySelector(".counter-filter")
const svgOpenFilter = document.getElementById("svgOpenFilter")
let optionSelect = "";
let newElementFilter = "";

searchInput.addEventListener("click", () => {
    searchFilterMenu.classList.add("hide")
    svgOpenFilter.classList.remove("svg-open-filter--rotate")
})

searchButton.addEventListener("click", () => {
    searchFunction()
})

searchFilterButton.addEventListener("click", () => {
    searchFilterMenu.classList.toggle("hide")
    svgOpenFilter.classList.toggle("svg-open-filter--rotate")
})

filterDescription.addEventListener("click", () => {
    searchFilterMenu.classList.add("hide")
})

searchFilterItems.forEach(item=>( item.addEventListener("click", (e)=>{
    optionSelect = e.srcElement.innerText
    spanFilter.textContent = optionSelect
    searchFilterMenu.classList.add("hide")
    svgOpenFilter.classList.remove("svg-open-filter--rotate")
})))

const searchFunction = async () => {
    try {
        counterFilter.classList.add("hide");
        filterDescription.innerHTML = "";
        filterDescription.removeAttribute('class');
        searchFilterMenu.classList.add("hide");
        svgOpenFilter.classList.remove("svg-open-filter--rotate");
        loaderSearch.classList.remove("hide");
        
        if (!searchInput.value || !optionSelect) return alert("You must fill out the entry and/or choose an option");

        const timeout = 10000;

        if (Math.random() < 0.1) { //0.05 pq fallaran el 10% de las peticiones
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        if (Math.random() < 0.05) { //0.05 pq fallaran el 5% de las peticiones
            throw new Error();
        }

        const controller = new AbortController(); 
        const signal = controller.signal;

        const timeoutId = setTimeout(() => {
            controller.abort();
            alert("The request has timed out check your internet");
        }, timeout);

        const response = await fetch(`${baseUrl}/${optionSelect.toLowerCase()}/?search=${searchInput.value}`, { signal });
        clearTimeout(timeoutId);

        const data = await response.json();

        if (data.results.length <= 0) {
            alert("Nothing was found with those specifications");
        } else {
            switchContent(optionSelect, data.results);
        }
    } catch (error) {
        alert("API request error check your internet");
    } finally {
        searchInput.value = "";
        loaderSearch.classList.add("hide");
    }
}

const switchContent = (type, results) => {
    counterFilter.classList.remove("hide")
    counterFilter.querySelector(".counter__number").textContent = results.length
    filterDescription.classList.add(`filter--${type.toLocaleLowerCase()}`);
    const newNode = document.createElement("div");
    newNode.classList.add('container-info-filter');
    switch(type.toLowerCase()){
        case "people":
            let eyeColors = '';
            newElementFilter = results.map(result => (
            eyeColors = result?.eye_color.split("-"),
            `<div>
        <h1 class="search-description__title">${result?.name || ''}</h1>
        <ul class="search-description__list">
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Height:</span>
                <span class="search-description__especifications-value">${result?.height || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Hair Color:</span>
                <span class="search-description__especifications-value">${result?.hair_color || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Skin Color:</span>
                <span class="search-description__especifications-value">${result?.skin_color || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Eye Color:</span>
                <span class="search-description__especifications-value search-description__especifications--eye-color">${result?.eye_color || ''} 
                    <div class="eye-color" style="background: linear-gradient(to right, ${eyeColors[0]}, ${eyeColors[1] || eyeColors[0]});"></div>
                </span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Birth Year:</span>
                <span class="search-description__especifications-value">${result?.birth_year || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Gender:</span>
                <span class="search-description__especifications-value search-description__especifications--gender">${result?.gender || ''} 
                    <svg class="svg-gender" width="25" height="25"><use href="./images/icons/svg.defs.svg#${result?.gender || ''}"></use></svg>
                </span>
            </li>
            ${result.films.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">films:</span>
                <select name="films" class="search-description__especifications-value search-description__especifications-value--select select-people">
                    <option disabled selected>Select film</option>
                    ${result.films.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>`: ''}
            ${result.species.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">species:</span>
                <select name="species" class="search-description__especifications-value search-description__especifications-value--select select-people">
                    <option disabled selected>Select specie</option>
                    ${result.species.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>` : ''}
            ${result.starships.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">starships:</span>
                <select name="starships" class="search-description__especifications-value search-description__especifications-value--select select-people">
                    <option disabled selected>Select starship</option>
                    ${result.starships.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>` : ''}
            ${result.vehicles.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">vehicles:</span>
                <select name="vehicles" class="search-description__especifications-value search-description__especifications-value--select select-people">
                    <option disabled selected>Select vehicle</option>
                    ${result.vehicles.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>` : ''}
        </ul>
        </div>    
        `
        ))
        newNode.innerHTML = newElementFilter.join(" ");
        filterDescription.appendChild(newNode)
        break;
        case "films":
            newElementFilter = results.map(result => ( `<div>
        <h1 class="search-description__title">${result?.title || ''}</h1>
        <ul class="search-description__list">
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Director:</span>
                <span class="search-description__especifications-value">${result?.director || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Producer:</span>
                <span class="search-description__especifications-value">${result?.producer || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Release Date:</span>
                <span class="search-description__especifications-value">${result?.release_date || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Epode Id:</span>
                <span class="search-description__especifications-value">${result?.episode_id || ''}</span>
            </li>
            ${result.planets.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">planets:</span>
                <select name="planets" class="search-description__especifications-value search-description__especifications-value--select select-films">
                    <option disabled selected>Select planet</option>
                    ${result.planets.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>`: ''}
            ${result.species.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">species:</span>
                <select name="species" class="search-description__especifications-value search-description__especifications-value--select select-films">
                    <option disabled selected>Select specie</option>
                    ${result.species.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>` : ''}
            ${result.starships.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">starships:</span>
                <select name="starships" class="search-description__especifications-value search-description__especifications-value--select select-films">
                    <option disabled selected>Select starship</option>
                    ${result.starships.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>` : ''}
            ${result.vehicles.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">vehicles:</span>
                <select name="vehicles" class="search-description__especifications-value search-description__especifications-value--select select-films">
                    <option disabled selected>Select vehicle</option>
                    ${result.vehicles.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>` : ''}
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Opening crawl:</span>
                <span class="search-description__especifications-value search-description__especifications--opening_crawl-small">${result?.opening_crawl || ''}</span>
            </li>
        </ul>    
        </div>
        `))
        newNode.innerHTML = newElementFilter.join(" ");
        filterDescription.appendChild(newNode)
        const especifications = document.querySelectorAll(".search-description__especifications--opening_crawl-small")
        especifications.forEach(element => (
            element.addEventListener("mouseenter", ()=>{
                element.classList.add("search-description__especifications--opening_crawl")
            }),
            element.addEventListener("mouseleave", ()=>{
                element.classList.remove("search-description__especifications--opening_crawl")
            })
        ))
        
        break;
        case "planets":
            newElementFilter = results.map(result => ( `<div>
        <h1 class="search-description__title">${result?.name || ''}</h1>
        <ul class="search-description__list">
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Director:</span>
                <span class="search-description__especifications-value">${result?.rotation_period || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Producer:</span>
                <span class="search-description__especifications-value">${result?.orbital_period || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Release Date:</span>
                <span class="search-description__especifications-value">${result?.diameter || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Epode Id:</span>
                <span class="search-description__especifications-value">${result?.climate || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Gravity:</span>
                <span class="search-description__especifications-value">${result?.gravity || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Terrain:</span>
                <span class="search-description__especifications-value">${result?.terrain || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Surface Water:</span>
                <span class="search-description__especifications-value">${result?.surface_water || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Population:</span>
                <span class="search-description__especifications-value">${result?.population || ''}</span>
            </li>
            ${result.residents.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">residents:</span>
                <select name="people" class="search-description__especifications-value search-description__especifications-value--select select-planets">
                    <option disabled selected>Select planet</option>
                    ${result.residents.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>`: ''}
            ${result.films.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">films:</span>
                <select name="films" class="search-description__especifications-value search-description__especifications-value--select select-planets">
                    <option disabled selected>Select film</option>
                    ${result.films.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>` : ''}
        </ul>    
        </div>
        `))
        newNode.innerHTML = newElementFilter.join(" ");
        filterDescription.appendChild(newNode)
        break;
        case "species":
            newElementFilter = results.map(result => ( `<div>
        <h1 class="search-description__title">${result?.name || ''}</h1>
        <ul class="search-description__list">
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Classification:</span>
                <span class="search-description__especifications-value">${result?.classification || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Designation:</span>
                <span class="search-description__especifications-value">${result?.designation || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Average Height:</span>
                <span class="search-description__especifications-value">${result?.average_height || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Skin Colors:</span>
                <span class="search-description__especifications-value">${result?.skin_colors || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Hair Colors:</span>
                <span class="search-description__especifications-value">${result?.hair_colors || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Eye Colors:</span>
                <span class="search-description__especifications-value">${result?.eye_colors || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Average Lifespan:</span>
                <span class="search-description__especifications-value">${result?.average_lifespan || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Language:</span>
                <span class="search-description__especifications-value">${result?.language || ''}</span>
            </li>
            ${result.people.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">people:</span>
                <select name="people" class="search-description__especifications-value search-description__especifications-value--select select-species">
                    <option disabled selected>Select person</option>
                    ${result.people.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>`: ''}
            ${result.films.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">films:</span>
                <select name="films" class="search-description__especifications-value search-description__especifications-value--select select-species">
                    <option disabled selected>Select film</option>
                    ${result.films.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>` : ''}
        </ul>    
        </div>
        `))
        newNode.innerHTML = newElementFilter.join(" ");
        filterDescription.appendChild(newNode)
        break;
        case "starships":
            newElementFilter = results.map(result => ( `<div>
        <h1 class="search-description__title">${result?.name || ''}</h1>
        <ul class="search-description__list">
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Model:</span>
                <span class="search-description__especifications-value">${result?.model || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Manufacturer:</span>
                <span class="search-description__especifications-value">${result?.manufacturer || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Cost In Credits:</span>
                <span class="search-description__especifications-value">${result?.cost_in_credits || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">Length:</span>
                <span class="search-description__especifications-value">${result?.length || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">max atmosphering speed:</span>
                <span class="search-description__especifications-value">${result?.max_atmosphering_speed || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">crew:</span>
                <span class="search-description__especifications-value">${result?.crew || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">passengers:</span>
                <span class="search-description__especifications-value">${result?.passengers || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">cargo capacity:</span>
                <span class="search-description__especifications-value">${result?.cargo_capacity || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">consumables:</span>
                <span class="search-description__especifications-value">${result?.consumables || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">hyperdrive rating:</span>
                <span class="search-description__especifications-value">${result?.hyperdrive_rating || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">MGLT:</span>
                <span class="search-description__especifications-value">${result?.MGLT || ''}</span>
            </li>
            <li class="search-description__especifications">
                <span class="search-description__especifications-key">starship class:</span>
                <span class="search-description__especifications-value">${result?.starship_class || ''}</span>
            </li>
            ${result.films.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">films:</span>
                <select name="films" class="search-description__especifications-value search-description__especifications-value--select select-starships">
                    <option disabled selected>Select film</option>
                    ${result.films.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>`: ''}
            ${result.pilots.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">pilots:</span>
                <select name="people" class="search-description__especifications-value search-description__especifications-value--select select-starships">
                    <option disabled selected>Select pilot</option>
                    ${result.pilots.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>` : ''}
        </ul>    
        </div>
        `))
        newNode.innerHTML = newElementFilter.join(" ");
        filterDescription.appendChild(newNode)
        break;
        case "vehicles":
            newElementFilter = results.map(result => ( `<div>
            <h1 class="search-description__title">${result?.name || ''}</h1>
            <ul class="search-description__list">
                <li class="search-description__especifications">
                    <span class="search-description__especifications-key">Model:</span>
                    <span class="search-description__especifications-value">${result?.model || ''}</span>
                </li>
                <li class="search-description__especifications">
                    <span class="search-description__especifications-key">Manufacturer:</span>
                    <span class="search-description__especifications-value">${result?.manufacturer || ''}</span>
                </li>
                <li class="search-description__especifications">
                    <span class="search-description__especifications-key">Cost In Credits:</span>
                    <span class="search-description__especifications-value">${result?.cost_in_credits || ''}</span>
                </li>
                <li class="search-description__especifications">
                    <span class="search-description__especifications-key">Length:</span>
                    <span class="search-description__especifications-value">${result?.length || ''}</span>
                </li>
                <li class="search-description__especifications">
                    <span class="search-description__especifications-key">max atmosphering speed:</span>
                    <span class="search-description__especifications-value">${result?.max_atmosphering_speed || ''}</span>
                </li>
                <li class="search-description__especifications">
                    <span class="search-description__especifications-key">crew:</span>
                    <span class="search-description__especifications-value">${result?.crew || ''}</span>
                </li>
                <li class="search-description__especifications">
                    <span class="search-description__especifications-key">passengers:</span>
                    <span class="search-description__especifications-value">${result?.passengers || ''}</span>
                </li>
                <li class="search-description__especifications">
                    <span class="search-description__especifications-key">cargo capacity:</span>
                    <span class="search-description__especifications-value">${result?.cargo_capacity || ''}</span>
                </li>
                <li class="search-description__especifications">
                    <span class="search-description__especifications-key">consumables:</span>
                    <span class="search-description__especifications-value">${result?.consumables || ''}</span>
                </li>
                <li class="search-description__especifications">
                    <span class="search-description__especifications-key">vehicle class:</span>
                    <span class="search-description__especifications-value">${result?.vehicle_class || ''}</span>
                </li>
                ${result.films.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">films:</span>
                <select name="films" class="search-description__especifications-value search-description__especifications-value--select select-vehicles">
                    <option disabled selected>Select film</option>
                    ${result.films.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>`: ''}
            ${result.pilots.length >= 1 ? `<li class="search-description__especifications">
                <span class="search-description__especifications-key">pilots:</span>
                <select name="people" class="search-description__especifications-value search-description__especifications-value--select select-vehicles">
                    <option disabled selected>Select pilot</option>
                    ${result.pilots.map(element => `<option value="${element}">${element}</option>`)}
                </select>
            </li>` : ''}
            </ul>  
            </div>  
            `))
            newNode.innerHTML = newElementFilter.join(" ");
            filterDescription.appendChild(newNode)
        break;
    }
    const selectors = document.querySelectorAll(".search-description__especifications-value--select")
    selectors.forEach(element => {
        element.addEventListener("change", (e) => {
            openModalSearch(e.target.name, e.target.value)
        });
    });
}

const backdropSearch = document.querySelector(".backdrop")
const modalSearch = document.querySelector(".modal-description")
const loaderModalSearch = document.querySelector(".modal__loader")


const openModalSearch = async (type, search) => {
    loaderModalSearch.classList.remove("hide")
    backdropSearch.classList.remove("hide")
    modalSearch.innerHTML = "";
    try {
        const response = await fetch(search)
        console.log(response)
        const results = await response.json()
        let newElements = '';
        console.log(type, results)
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
            modalSearch.innerHTML = newElements;
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
            modalSearch.innerHTML = newElements;
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
            modalSearch.innerHTML = newElements;
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
            modalSearch.innerHTML = newElements;
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
            modalSearch.innerHTML = newElements;
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
                modalSearch.innerHTML = newElements;
            break;
        }
    }catch(err){
        console.log(err)
        alert("There was an error bringing the API information, check your internet connection")
    }finally{
        loaderModalSearch.classList.add("hide")
    }
    // modalTitle.textContent= `${search} Details`;  
}

