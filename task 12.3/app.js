const postForm = document.getElementById("postForm");
const result = document.getElementById("result");

async function createPost(title, body, userId) {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title,
                body,
                userId
            })
        }
    );

    if (!response.ok) {
        throw new Error("Failed to create post.");
    }

    return response.json();
}

postForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;

    try {

        const newPost = await createPost(title, body, 1);

        result.innerHTML = `
            <h2>Post Created Successfully!</h2>

            <p><strong>ID:</strong> ${newPost.id}</p>

            <p><strong>Title:</strong> ${newPost.title}</p>

            <p><strong>Body:</strong> ${newPost.body}</p>

            <p><strong>User ID:</strong> ${newPost.userId}</p>
        `;

        console.log("Created Post:", newPost);

        postForm.reset();

    } catch (error) {

        result.innerHTML = `
            <p style="color:red;">
                ${error.message}
            </p>
        `;

        console.error(error);

    }

});
