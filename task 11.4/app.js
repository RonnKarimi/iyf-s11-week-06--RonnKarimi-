const runBtn = document.getElementById("runBtn");

runBtn.addEventListener("click", async () => {

    console.clear();

    // ==========================
    // Promise Functions
    // ==========================

    function getUserData(userId) {
        return new Promise((resolve, reject) => {

            setTimeout(() => {

                if (userId > 0) {
                    resolve({
                        id: userId,
                        name: "John"
                    });
                } else {
                    reject("Invalid User ID");
                }

            }, 1000);

        });
    }

    function getUserPosts(userId) {
        return new Promise(resolve => {

            setTimeout(() => {

                resolve([
                    { id: 1, title: "Learning Async/Await" },
                    { id: 2, title: "JavaScript Promises" }
                ]);

            }, 1000);

        });
    }

    function getPostComments(postId) {
        return new Promise(resolve => {

            setTimeout(() => {

                resolve([
                    { id: 1, text: "Excellent!" },
                    { id: 2, text: "Very useful." }
                ]);

            }, 1000);

        });
    }

    // ==========================
    // Exercise 1
    // Converting to Async/Await
    // ==========================

    console.log("Exercise 1");

    async function getDataWithAsync() {

        const user = await getUserData(1);
        const posts = await getUserPosts(user.id);
        const comments = await getPostComments(posts[0].id);

        return comments;
    }

    const comments = await getDataWithAsync();

    console.log("Comments:", comments);


    // ==========================
    // Exercise 2
    // Try/Catch
    // ==========================

    console.log("Exercise 2");

    async function fetchUserData(userId) {

        try {

            const user = await getUserData(userId);
            const posts = await getUserPosts(user.id);

            return {
                user,
                posts
            };

        } catch (error) {

            console.error("Failed to fetch:", error);

        }

    }

    const result = await fetchUserData(1);

    console.log(result);


    // ==========================
    // Exercise 3
    // Parallel Async/Await
    // ==========================

    console.log("Exercise 3");

    async function getAllUsers() {

        const users = await Promise.all([
            getUserData(1),
            getUserData(2),
            getUserData(3)
        ]);

        return users;

    }

    const allUsers = await getAllUsers();

    console.table(allUsers);


    // ==========================
    // Build Task
    // Rewrite Callback Hell
    // ==========================

    console.log("Build Task");

    async function loadEverything() {

        try {

            const user = await getUserData(1);
            console.log("User:", user);

            const posts = await getUserPosts(user.id);
            console.log("Posts:", posts);

            const comments = await getPostComments(posts[0].id);
            console.log("Comments:", comments);

        } catch (error) {

            console.error(error);

        }

    }

    await loadEverything();

});
