document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('draw-button');
    const winningNumbersContainer = document.querySelector('.winning-numbers');

    drawButton.addEventListener('click', () => {
        drawNumbers();
    });

    function drawNumbers() {
        winningNumbersContainer.innerHTML = '';
        const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
        const shuffledNumbers = numbers.sort(() => Math.random() - 0.5);
        const winningNumbers = shuffledNumbers.slice(0, 6).sort((a, b) => a - b);

        winningNumbers.forEach((number, index) => {
            setTimeout(() => {
                const numberElement = document.createElement('div');
                numberElement.classList.add('number');
                numberElement.textContent = number;
                winningNumbersContainer.appendChild(numberElement);
                setTimeout(() => {
                    numberElement.classList.add('drawn');
                }, 100); // Add a slight delay for the animation to be noticeable
            }, index * 500); // Stagger the appearance of each number
        });
    }
});
