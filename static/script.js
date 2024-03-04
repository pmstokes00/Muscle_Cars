// Define image descriptions and initialize the game with descriptions
const descriptions = {
    "1969_Chevrolet_Camaro_Z28.jpeg": {
        showName: "CAMARO_Z28",
        description: "Introduced in 1967, this model was a high-performance version of the Camaro. It featured a powerful V8 engine, upgraded suspension, and other performance enhancements, making it a popular choice among muscle car enthusiasts."
    },
    "1969_Ford_Mustang_Boss_429.jpeg": {
        showName: "MUSTANG_BOSS_429",
        description: "Produced in 1969, this limited-production high-performance variant was powered by a massive 429 cubic inch V8 engine and featured distinctive styling cues, making it a highly sought-after collectible today."
    },
    "1969_Dodge_Charger_RT.jpeg": {
        showName: "DODGE_CHARGER_RT",
        description: "The 1969 Dodge Charger R/T (Road/Track) was a high-performance version introduced in 1968. It was available with a range of powerful V8 engines and featured aggressive styling, making it one of the most iconic muscle cars of the era."
    },
    "1969_Plymouth_Road_Runner.jpeg": {
        showName: "PLYMOUTH_ROAD_RUNNER",
        description: "The 1968 Plymouth Road Runner was a no-frills, high-performance muscle car powered by a range of potent V8 engines and featuring a distinctive horn that mimicked the sound of the famous cartoon character, making it a unique and memorable addition to the muscle car lineup."
    },
    "1967_Shelby_GT500.jpeg": {
        showName: "SHELBY_GT500",
        description: "The 1967 Shelby GT500 was a high-performance variant of the Ford Mustang, modified by Carroll Shelby. It featured a powerful V8 engine and distinctive styling cues, making it a legendary muscle car of the era."
    },
    "1969_Chevelle_SS_396.jpeg": {
        showName: "CHEVELLE_SS_396",
        description: "The 1969 Chevrolet Chevelle SS 396 was a powerful muscle car powered by a 396 cubic inch V8 engine. It featured aggressive styling and strong performance, cementing its place in muscle car history."
    },
    "1967_Pontiac_GTO.jpeg": {
        showName: "PONTIAC_GTO",
        description: "The 1966 Pontiac GTO, often considered the first true muscle car, was powered by a range of potent V8 engines. It featured bold styling and strong performance, setting the standard for muscle cars to come."
    },
    "1969_Oldsmobile_442.jpeg": {
        showName: "OLDSMOBILE_442",
        description: "The 1969 Oldsmobile 442 was a high-performance variant of the Oldsmobile Cutlass. It featured a powerful V8 engine, sporty styling, and impressive performance, making it a favorite among muscle car enthusiasts."
    },
    "1965_Dodge_Coronet_A990.jpeg": {
        showName: "DODGE_CORONET_A990",
        description: "The 1965 Dodge Coronet A990 was a purpose-built drag racing machine. It featured lightweight construction, a powerful V8 engine, and stripped-down interior, making it a dominant force on the drag strip."
    },
    "1969_Plymouth_Baracuda.jpeg": {
        showName: "PLYMOUTH_BARRACUDA",
        description: "The 1969 Plymouth Barracuda was a sporty muscle car known for its sleek styling and strong performance. It was available with a range of powerful V8 engines, appealing to a wide range of buyers."
    }
};

// Initialize the game with descriptions
initializeGame(descriptions);

// Initialize the game with descriptions
initializeGame(descriptions);

// Function to initialize the game with descriptions
	function initializeGame(descriptions) {
		// Define image data
		const images = Object.keys(descriptions).map(imagePath => ({
			image_path: `static/Images/${imagePath}`,
			show_name: descriptions[imagePath].showName,
			description: descriptions[imagePath].description
		}));

		// Initialize index to track current image, score, and total attempts counter
		let currentIndex = 0;
		let score = 0;
		let totalAttempts = 0; // Add variable to track total attempts
		let incorrectAttempts = 0;
		let soundPlayed = false; // Flag to track whether sound has been played

		// Update total count of images
		document.getElementById('total-count').textContent = images.length;

		// Function to display current image, description, and choices
		function displayImage(index) {
			const image = images[index];
			const currentImage = document.getElementById('current-image');
			currentImage.src = image.image_path;
			currentImage.alt = image.show_name;
			document.getElementById('description').textContent = image.description;
			generateChoices(image.show_name);
		}

    // Function to generate multiple choices
    function generateChoices(correctShowName) {
        const choicesContainer = document.getElementById('choices');
        choicesContainer.innerHTML = ''; // Clear previous choices
        const allShowNames = images.map(image => image.show_name);
        const shuffledShowNames = shuffleArray(allShowNames);
        const correctIndex = shuffledShowNames.indexOf(correctShowName);
        shuffledShowNames.splice(correctIndex, 1); // Remove correct answer from the array
        shuffledShowNames.sort(() => Math.random() - 0.5); // Shuffle remaining options
        shuffledShowNames.splice(Math.floor(Math.random() * 4), 0, correctShowName); // Insert correct answer at a random position
        shuffledShowNames.forEach((showName, index) => {
            if (index < 4) {
                const choiceButton = document.createElement('button');
                choiceButton.textContent = showName;
                choiceButton.classList.add('choice-button');
				choiceButton.addEventListener('click', () => {
					totalAttempts++; // Increment total attempts on each choice
					document.getElementById('attempt-count').textContent = totalAttempts; // Update attempts display
                    if (showName === correctShowName) {
                        choiceButton.style.color = 'white'; // Change text color to white for the correct answer
                        document.getElementById('result').textContent = 'Correct!';
                        document.getElementById('result').style.display = 'block'; // Show result message
                        score++; // Increase score
                        document.getElementById('score-value').textContent = score; // Update score display
                        setTimeout(() => {
                            document.getElementById('result').style.display = 'none'; // Hide result message after 2 seconds
                        }, 2000); // Hide message after 2 seconds
                        nextImage(); // Move to next image
                    } else {
						// Code for incorrect choice
						document.getElementById('result').textContent = 'Incorrect. Try again';
						document.getElementById('result').style.display = 'block'; // Show result message
						incorrectAttempts++; // Increment incorrect attempts
						setTimeout(() => {
							document.getElementById('result').style.display = 'none'; // Hide result message after 2 seconds
						}, 2000); // Hide message after 2 seconds
						if (incorrectAttempts === 3) {
							nextImage(); // Move to next image after 3 incorrect attempts
							incorrectAttempts = 0; // Reset incorrect attempts counter
						}
					}
                });
                choicesContainer.appendChild(choiceButton);
            }
        });
    }

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to move to the next image
    function nextImage() {
        currentIndex++;
        if (currentIndex >= images.length) {
            document.getElementById('game-over').innerHTML = 'Game Over<br>Restart?<br>Click here.';
            document.getElementById('game-over').style.display = 'block'; // Show game over message
            document.getElementById('game-over').addEventListener('click', restartGame);
        } else {
            displayImage(currentIndex);
        }
    }

    // Function to restart the game
    function restartGame() {
        currentIndex = 0; // Reset index
        incorrectAttempts = 0; // Reset incorrect attempts counter
        totalIncorrectAttempts = 0; // Reset total incorrect attempts counter
        score = 0; // Reset score
        document.getElementById('score-value').textContent = score; // Reset score display
        document.getElementById('attempt-count').textContent = totalIncorrectAttempts; // Reset total incorrect attempts display
        displayImage(currentIndex); // Display first image
        document.getElementById('game-over').style.display = 'none'; // Hide game over message
    }

    // Function to move to the next image
    function nextImage() {
        currentIndex++;
        if (currentIndex >= images.length) {
            document.getElementById('game-over').innerHTML = 'Game Over<br>Restart?<br>Click here.';
            document.getElementById('game-over').style.display = 'block'; // Show game over message
            document.getElementById('game-over').addEventListener('click', restartGame);
        } else {
            displayImage(currentIndex);
        }
    }

    // Function to restart the game
    function restartGame() {
        currentIndex = 0; // Reset index
        incorrectAttempts = 0; // Reset incorrect attempts counter
		incorrect =0;
        score = 0; // Reset score
        document.getElementById('score-value').textContent = score; // Reset score display
        displayImage(currentIndex); // Display first image
        document.getElementById('game-over').style.display = 'none'; // Hide game over message
    }

    // Event listener for the play sound button
    document.getElementById('play-sound-button').addEventListener('click', function() {
        // Logic to play the sound when the button is clicked
        const audio = new Audio('static/default_sound.mp3');
        audio.play();
        // Set the flag to true indicating the sound has been played
        soundPlayed = true;
        // Hide the play sound button after playing sound
        document.getElementById('play-sound-button').style.display = 'none';
        // Enable the choice buttons after sound is played
        enableChoiceButtons();
        // Display the first image after the sound is played
        displayImage(currentIndex);
    });

    // Function to enable choice buttons
    function enableChoiceButtons() {
        const choiceButtons = document.querySelectorAll('.choice-button');
        choiceButtons.forEach(button => {
            button.disabled = false; // Enable each choice button
        });
    }

    // Initial display
    // Since we're removing the sound button, we need to call displayImage directly
    displayImage(currentIndex);
	
    // Optional: Add event listeners for keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1; // Wrap around to the last image
            }
            displayImage(currentIndex);
        } else if (event.key === 'ArrowRight') {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0; // Wrap around to the first image
            }
            displayImage(currentIndex);
        }
    });
}
