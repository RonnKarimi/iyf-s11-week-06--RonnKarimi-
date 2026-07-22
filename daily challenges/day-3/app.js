const fetchBtn = document.getElementById("fetchBtn");
const output = document.getElementById("output");

const defaultUser = {
    id: 0,
    name: "Default User",
    email: "default@example.com",
    company: {
        name: "No Company"
    }
};

async function fetchUser(userId) {

    try {

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );

        if (!response.ok) {
            throw new Error("User not found");
        }

        const user = await response.json();

        if (!user.id) {
            throw new Error("User not found");
        }

        return user;

    } catch (error) {

        console.log("Returning default user.");

        return defaultUser;

    }

}

function displayUser(user) {

    output.innerHTML = `
        <h3>${user.name}</h3>

        <p><strong>ID:</strong> ${user.id}</p>

        <p><strong>Email:</strong> ${user.email}</p>

        <p><strong>Company:</strong> ${user.company.name}</p>
    `;

}

fetchBtn.addEventListener("click", async () => {

    // Use a non-existent user ID to demonstrate the fallback
    const user = await fetchUser(999);

    displayUser(user);

});
