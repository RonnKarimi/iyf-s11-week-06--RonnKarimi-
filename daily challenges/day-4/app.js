const loadBtn = document.getElementById("loadBtn");
const output = document.getElementById("output");

// Original callback-style function
function loadUserCallback(userId, callback) {

    setTimeout(() => {

        const user = {
            id: userId,
            name: "John Doe",
            email: "john@example.com"
        };

        callback(user);

    }, 1500);

}

// Rewritten using Promise
function loadUser(userId) {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve({
                id: userId,
                name: "John Doe",
                email: "john@example.com"
            });

        }, 1500);

    });

}

// Async/Await version
async function getUser() {

    try {

        output.innerHTML = "<p>Loading user...</p>";

        const user = await loadUser(1);

        output.innerHTML = `
            <h3>User Loaded Successfully</h3>

            <p><strong>ID:</strong> ${user.id}</p>

            <p><strong>Name:</strong> ${user.name}</p>

            <p><strong>Email:</strong> ${user.email}</p>
        `;

        console.log(user);

    } catch (error) {

        output.innerHTML = `
            <p style="color:red;">
                Failed to load user.
            </p>
        `;

        console.error(error);

    }

}

loadBtn.addEventListener("click", getUser);
