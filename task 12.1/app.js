const fetchBtn = document.getElementById("fetchBtn");

fetchBtn.addEventListener("click", async () => {

    console.clear();

    console.log("===== Exercise 1: Basic Fetch =====");

    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(response => {

            console.log("Response Object:", response);
            console.log("Status:", response.status);
            console.log("OK:", response.ok);

            return response.json();

        })
        .then(data => {

            console.log("User Data:", data);

        })
        .catch(error => {

            console.error("Fetch Error:", error);

        });


    console.log("===== Exercise 2: Async/Await =====");

    async function getUser(id){

        try{

            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users/${id}`
            );

            if(!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const data = await response.json();

            return data;

        }catch(error){

            console.error("Failed to fetch user:", error);

        }

    }

    const user = await getUser(1);

    console.log("Fetched User:", user);


    console.log("===== Practice 1 =====");

    const singleUser = await getUser(1);

    console.log(singleUser);


    console.log("===== Practice 2 =====");

    const usersResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    const users = await usersResponse.json();

    console.log(users);


    console.log("===== Practice 3 =====");

    const postsResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users/1/posts"
    );

    const posts = await postsResponse.json();

    console.log(posts);

});
