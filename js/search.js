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

searchFilterItems.forEach(item=>( item.addEventListener("click", (e)=>{
    optionSelect = e.srcElement.innerText
    spanFilter.textContent = optionSelect
    searchFilterMenu.classList.add("hide")
    svgOpenFilter.classList.remove("svg-open-filter--rotate")
})))

const searchFunction = async () => {
    try {
        counterFilter.classList.add("hide")
        filterDescription.innerHTML = "";
        filterDescription.removeAttribute('class')
        searchFilterMenu.classList.add("hide")
        svgOpenFilter.classList.remove("svg-open-filter--rotate")
        loaderSearch.classList.remove("hide")
        if(!searchInput.value || !optionSelect) return alert("You must fill out the entry and/or choose an option")
        const response = await fetch(`${baseUrl}/${optionSelect.toLocaleLowerCase()}/?search=${searchInput.value}`)
        const data = await response.json();
        if(data.results.length <= 0) return alert("nothing was found with those specifications")
        switchContent(optionSelect, data.results)
    } catch (error) {
        console.log(error)
    }finally{
        searchInput.value = ""
        loaderSearch.classList.add("hide")
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
            `
        <h1 class="modal__title">${result?.name || ''}</h1>
        <ul class="modal__list">
            <li class="modal__especifications">
                <span class="modal__especifications-key">Height:</span>
                <span class="modal__especifications-value">${result?.height || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Hair Color:</span>
                <span class="modal__especifications-value">${result?.hair_color || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Skin Color:</span>
                <span class="modal__especifications-value">${result?.skin_color || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Eye Color:</span>
                <span class="modal__especifications-value modal__especifications--eye-color">${result?.eye_color || ''} 
                    <div class="eye-color" style="background: linear-gradient(to right, ${eyeColors[0]}, ${eyeColors[1] || eyeColors[0]});"></div>
                </span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Birth Year:</span>
                <span class="modal__especifications-value">${result?.birth_year || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Gender:</span>
                <span class="modal__especifications-value modal__especifications--gender">${result?.gender || ''} 
                    <svg class="svg-gender" width="25" height="25"><use href="./images/icons/svg.defs.svg#${result?.gender || ''}"></use></svg>
                </span>
            </li>
        </ul>    
        `
        ))
        newNode.innerHTML = newElementFilter;
        filterDescription.appendChild(newNode)
        break;
        case "films":
            newElementFilter = results.map(result => ( `
        <h1 class="modal__title">${result?.title || ''}</h1>
        <ul class="modal__list">
            <li class="modal__especifications">
                <span class="modal__especifications-key">Director:</span>
                <span class="modal__especifications-value">${result?.director || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Producer:</span>
                <span class="modal__especifications-value">${result?.producer || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Release Date:</span>
                <span class="modal__especifications-value">${result?.release_date || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Epode Id:</span>
                <span class="modal__especifications-value">${result?.episode_id || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Opening crawl:</span>
                <span class="modal__especifications-value modal__especifications--opening_crawl-small">${result?.opening_crawl || ''}</span>
            </li>
        </ul>    
        `))
        newNode.innerHTML = newElementFilter;
        filterDescription.appendChild(newNode)
        const especifications = document.querySelectorAll(".modal__especifications--opening_crawl-small")
        especifications.forEach(element => (
            element.addEventListener("mouseenter", ()=>{
                element.classList.add("modal__especifications--opening_crawl")
            }),
            element.addEventListener("mouseleave", ()=>{
                element.classList.remove("modal__especifications--opening_crawl")
            })
        ))
        
        break;
        case "planets":
            newElementFilter = results.map(result => ( `
        <h1 class="modal__title">${result?.name || ''}</h1>
        <ul class="modal__list">
            <li class="modal__especifications">
                <span class="modal__especifications-key">Director:</span>
                <span class="modal__especifications-value">${result?.rotation_period || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Producer:</span>
                <span class="modal__especifications-value">${result?.orbital_period || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Release Date:</span>
                <span class="modal__especifications-value">${result?.diameter || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Epode Id:</span>
                <span class="modal__especifications-value">${result?.climate || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Gravity:</span>
                <span class="modal__especifications-value">${result?.gravity || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Terrain:</span>
                <span class="modal__especifications-value">${result?.terrain || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Surface Water:</span>
                <span class="modal__especifications-value">${result?.surface_water || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Population:</span>
                <span class="modal__especifications-value">${result?.population || ''}</span>
            </li>
        </ul>    
        `))
        newNode.innerHTML = newElementFilter;
        filterDescription.appendChild(newNode)
        break;
        case "species":
            newElementFilter = results.map(result => ( `
        <h1 class="modal__title">${result?.name || ''}</h1>
        <ul class="modal__list">
            <li class="modal__especifications">
                <span class="modal__especifications-key">Classification:</span>
                <span class="modal__especifications-value">${result?.classification || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Designation:</span>
                <span class="modal__especifications-value">${result?.designation || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Average Height:</span>
                <span class="modal__especifications-value">${result?.average_height || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Skin Colors:</span>
                <span class="modal__especifications-value">${result?.skin_colors || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Hair Colors:</span>
                <span class="modal__especifications-value">${result?.hair_colors || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Eye Colors:</span>
                <span class="modal__especifications-value">${result?.eye_colors || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Average Lifespan:</span>
                <span class="modal__especifications-value">${result?.average_lifespan || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Language:</span>
                <span class="modal__especifications-value">${result?.language || ''}</span>
            </li>
        </ul>    
        `))
        newNode.innerHTML = newElementFilter;
        filterDescription.appendChild(newNode)
        break;
        case "starships":
            newElementFilter = results.map(result => ( `
        <h1 class="modal__title">${result?.name || ''}</h1>
        <ul class="modal__list">
            <li class="modal__especifications">
                <span class="modal__especifications-key">Model:</span>
                <span class="modal__especifications-value">${result?.model || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Manufacturer:</span>
                <span class="modal__especifications-value">${result?.manufacturer || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Cost In Credits:</span>
                <span class="modal__especifications-value">${result?.cost_in_credits || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">Length:</span>
                <span class="modal__especifications-value">${result?.length || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">max atmosphering speed:</span>
                <span class="modal__especifications-value">${result?.max_atmosphering_speed || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">crew:</span>
                <span class="modal__especifications-value">${result?.crew || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">passengers:</span>
                <span class="modal__especifications-value">${result?.passengers || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">cargo capacity:</span>
                <span class="modal__especifications-value">${result?.cargo_capacity || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">consumables:</span>
                <span class="modal__especifications-value">${result?.consumables || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">hyperdrive rating:</span>
                <span class="modal__especifications-value">${result?.hyperdrive_rating || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">MGLT:</span>
                <span class="modal__especifications-value">${result?.MGLT || ''}</span>
            </li>
            <li class="modal__especifications">
                <span class="modal__especifications-key">starship class:</span>
                <span class="modal__especifications-value">${result?.starship_class || ''}</span>
            </li>
        </ul>    
        `))
        newNode.innerHTML = newElementFilter;
        filterDescription.appendChild(newNode)
        break;
        case "vehicles":
            newElementFilter = results.map(result => ( `
            <h1 class="modal__title">${result?.name || ''}</h1>
            <ul class="modal__list">
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Model:</span>
                    <span class="modal__especifications-value">${result?.model || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Manufacturer:</span>
                    <span class="modal__especifications-value">${result?.manufacturer || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Cost In Credits:</span>
                    <span class="modal__especifications-value">${result?.cost_in_credits || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">Length:</span>
                    <span class="modal__especifications-value">${result?.length || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">max atmosphering speed:</span>
                    <span class="modal__especifications-value">${result?.max_atmosphering_speed || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">crew:</span>
                    <span class="modal__especifications-value">${result?.crew || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">passengers:</span>
                    <span class="modal__especifications-value">${result?.passengers || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">cargo capacity:</span>
                    <span class="modal__especifications-value">${result?.cargo_capacity || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">consumables:</span>
                    <span class="modal__especifications-value">${result?.consumables || ''}</span>
                </li>
                <li class="modal__especifications">
                    <span class="modal__especifications-key">vehicle class:</span>
                    <span class="modal__especifications-value">${result?.vehicle_class || ''}</span>
                </li>
            </ul>    
            `))
            newNode.innerHTML = newElementFilter;
            filterDescription.appendChild(newNode)
        break;
    }
}

