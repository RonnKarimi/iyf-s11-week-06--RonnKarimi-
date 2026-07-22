const runBtn = document.getElementById("runBtn");

runBtn.addEventListener("click", () => {

    console.clear();

    // -----------------------------
    // Promise Functions
    // -----------------------------

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

        return new Promise((resolve) => {

            setTimeout(() => {

                resolve([
                    { id: 1, title: "Learning JavaScript" },
                    { id: 2, title: "Understanding Promises" }
                ]);

            }, 1000);

        });

    }

    function getPostComments(postId) {

        return new Promise((resolve) => {

            setTimeout(() => {

                resolve([
                    { id: 1, text: "Awesome!" },
                    { id: 2, text: "Very helpful." }
                ]);

            }, 1000);

        });

    }

    // ============================
    // Exercise 1 - Promise Chaining
    // ============================

    console.log("Exercise 1 - Promise Chaining");

    getUserData(1)
        .then(user => {
            console.log("User:", user);
            return getUserPosts(user.id);
        })
        .then(posts => {
            console.log("Posts:", posts);
            return getPostComments(posts[0].id);
        })
        .then(comments => {
            console.log("Comments:", comments);
        })
        .catch(error => {
            console.error(error);
        });


    // ============================
    // Exercise 2 - Promise.all()
    // ============================

    console.log("Exercise 2 - Promise.all");

    Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ])
    .then(users => {
        console.log("All Users:", users);
    })
    .catch(error => {
        console.error(error);
    });


    // ============================
    // Exercise 3 - Promise.race()
    // ============================

    console.log("Exercise 3 - Promise.race");

    const fast = new Promise(resolve => {

        setTimeout(() => {

            resolve("Fast!");

        }, 100);

    });

    const slow = new Promise(resolve => {

        setTimeout(() => {

            resolve("Slow!");

        }, 500);

    });

    Promise.race([fast, slow])

    .then(result => {

        console.log("Winner:", result);

    });


    // ============================
    // Build - Fetch 3 Users Together
    // ============================

    console.log("Build Task");

    Promise.all([
        getUserData(1),
        getUserData(2),
        getUserData(3)
    ])

    .then(users => {

        console.log("Fetched Users:");
        console.table(users);

    })

    .catch(error => {

        console.error(error);

    });

});
