const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");

// Returns a Promise that resolves after the given time
function delay(ms) {

    return new Promise(resolve => {

        setTimeout(() => {

            resolve();

        }, ms);

    });

}

startBtn.addEventListener("click", async () => {

    message.textContent = "Waiting 2 seconds...";

    console.log("Waiting 2 seconds...");

    await delay(2000);

    console.log("This prints after 2 seconds");

    message.textContent = "This prints after 2 seconds";

});
