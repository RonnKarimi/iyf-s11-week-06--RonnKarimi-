const startBtn = document.getElementById("startBtn");
const message = document.getElementById("message");

// Generates a random delay between 500ms and 2000ms
function randomDelay() {
    return Math.floor(Math.random() * 1500) + 500;
}

function taskOne() {

    return new Promise(resolve => {

        const delay = randomDelay();

        setTimeout(() => {

            console.log("Task 1 completed after", delay, "ms");

            resolve();

        }, delay);

    });

}

function taskTwo() {

    return new Promise(resolve => {

        const delay = randomDelay();

        setTimeout(() => {

            console.log("Task 2 completed after", delay, "ms");

            resolve();

        }, delay);

    });

}

function taskThree() {

    return new Promise(resolve => {

        const delay = randomDelay();

        setTimeout(() => {

            console.log("Task 3 completed after", delay, "ms");

            resolve();

        }, delay);

    });

}

startBtn.addEventListener("click", () => {

    console.clear();

    message.textContent = "Running Promise Chain...";

    const startTime = performance.now();

    taskOne()

        .then(() => taskTwo())

        .then(() => taskThree())

        .then(() => {

            const endTime = performance.now();

            const totalTime = ((endTime - startTime) / 1000).toFixed(2);

            console.log("Total execution time:", totalTime, "seconds");

            message.textContent =
                `Finished in ${totalTime} seconds`;

        });

});
