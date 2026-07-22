const usersContainer = document.getElementById("users-container");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sort");
const cityFilter = document.getElementById("cityFilter");

let allUsers = [];

async function fetchUsers() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if(!response.ok){
            throw new Error("Failed to fetch users.");
        }

        allUsers = await response.json();

        loadCities();

        displayUsers(allUsers);

    } catch(error){

        usersContainer.innerHTML = `
            <h2>${error.message}</h2>
        `;

    }

}

function displayUsers(users){

    usersContainer.innerHTML = users.map(user => `

        <div class="user-card">

            <h2>${user.name}</h2>

            <p><strong>Email:</strong> ${user.email}</p>

            <p><strong>City:</strong> ${user.address.city}</p>

            <p><strong>Company:</strong> ${user.company.name}</p>

        </div>

    `).join("");

}

function loadCities(){

    const cities = [...new Set(allUsers.map(user => user.address.city))];

    cities.sort();

    cities.forEach(city =>{

        const option = document.createElement("option");

        option.value = city;

        option.textContent = city;

        cityFilter.appendChild(option);

    });

}

function updateDisplay(){

    let filteredUsers = [...allUsers];

    const searchText = searchInput.value.toLowerCase();

    filteredUsers = filteredUsers.filter(user =>

        user.name.toLowerCase().includes(searchText) ||

        user.email.toLowerCase().includes(searchText)

    );

    const selectedCity = cityFilter.value;

    if(selectedCity !== "all"){

        filteredUsers = filteredUsers.filter(user =>

            user.address.city === selectedCity

        );

    }

    if(sortSelect.value === "az"){

        filteredUsers.sort((a,b)=>

            a.name.localeCompare(b.name)

        );

    }else{

        filteredUsers.sort((a,b)=>

            b.name.localeCompare(a.name)

        );

    }

    displayUsers(filteredUsers);

}

searchInput.addEventListener("input", updateDisplay);

sortSelect.addEventListener("change", updateDisplay);

cityFilter.addEventListener("change", updateDisplay);

fetchUsers();
