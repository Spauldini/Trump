// Initialize the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Define the mini Trump image and initial position
const trumpImage = new Image();
trumpImage.onload = () => {
    let trumpX = 100;
    let trumpY = canvas.height - trumpImage.height;

    // Define the angle and force variables
    let angle = document.getElementById("angle").value;
    let force = document.getElementById("force").value;

    // Update the angle and force labels when the controls are adjusted
    document.getElementById("angle").addEventListener("input", () => {
        angle = document.getElementById("angle").value;
        document.getElementById("angle-value").innerHTML = angle;
    });

    document.getElementById("force").addEventListener("input", () => {
        force = document.getElementById("force").value;
        document.getElementById("force-value").innerHTML = force;
    });

    // Define the punt function
    function punt() {
        // Calculate the horizontal and vertical components of the velocity
        const velocityX = force * Math.cos(angle * Math.PI / 180);
        const velocityY = -force * Math.sin(angle * Math.PI / 180);

        // Define the update function that will be called every frame
        function update() {
            // Update the position of the mini Trump based on the velocity
            trumpX += velocityX;
            trumpY += velocityY;

            // Update the velocity based on gravity
            velocityY += 0.5;

            // Redraw the canvas with the updated position of the mini Trump
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(trumpImage, trumpX, trumpY);

            // Check if the mini Trump has gone over the wall
            if (trumpX > canvas.width || trumpY > canvas.height - 100) {
                alert("You made it over the wall!");
                clearInterval(updateInterval);
            }
        }

        // Call the update function every 10 milliseconds
        const updateInterval = setInterval(update, 10);
    }

    // Add a click event listener to the punt button
    document.getElementById("punt-btn").addEventListener("click", punt);
};
trumpImage.src =
