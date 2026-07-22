const loadBtn = document.getElementById("loadBtn");
const output = document.getElementById("output");

const urls = [

    "https://jsonplaceholder.typicode.com/users/1",

    "https://jsonplaceholder.typicode.com/posts/1",

    "https://jsonplaceholder.typicode.com/todos/1"

];

async function fetchData(url) {

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch data.");
    }

    return response.json();

}

async function loadAllData() {

    output.innerHTML = "<p>Loading...</p>";

    const promises = urls.map(url => fetchData(url));

    const results = await Promise.allSettled(promises);

    output.innerHTML = "";

    results.forEach((result, index) => {

        const card = document.createElement("div");

        card.className = "card";

        if (result.status === "fulfilled") {

            card.innerHTML = `
                <h3>Request ${index + 1}</h3>
                <pre>${JSON.stringify(result.value, null, 2)}</pre>
            `;

        } else {

            card.innerHTML = `
                <h3>Request ${index + 1}</h3>
                <p style="color:red;">
                    ${result.reason.message}
                </p>
            `;

        }

        output.appendChild(card);

    });

}

loadBtn.addEventListener("click", loadAllData);
