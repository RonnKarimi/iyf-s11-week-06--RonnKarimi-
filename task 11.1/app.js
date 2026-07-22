const button = document.getElementById("runBtn");

button.addEventListener("click", () => {

    console.clear();

    console.log("===== Exercise 1 =====");

    console.log("A");

    setTimeout(() => {
        console.log("B");
    }, 0);

    console.log("C");

    setTimeout(() => {
        console.log("D");
    }, 100);

    console.log("E");

    console.log("----------------------");
    console.log("Expected Output:");
    console.log("A");
    console.log("C");
    console.log("E");
    console.log("B");
    console.log("D");

    console.log("\n===== Exercise 2 =====");

    function loadUser(userId, callback) {

        setTimeout(() => {

            const user = {
                id: userId,
                name: "John Doe",
                age: 22,
                email: "john@example.com"
            };

            callback(user);

        }, 1500);

    }

    loadUser(1, function(user) {
        console.log("User loaded successfully:");
        console.log(user);
    });

});
