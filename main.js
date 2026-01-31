document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('draw-button');
    const winningNumbersContainer = document.getElementById('winning-numbers');
    const historyList = document.getElementById('history-list');
    let round = 0;

    function getRange(n) {
        if (n <= 10) return 'range-1';
        if (n <= 20) return 'range-10';
        if (n <= 30) return 'range-20';
        if (n <= 40) return 'range-30';
        return 'range-40';
    }

    drawButton.addEventListener('click', () => {
        drawNumbers();
    });

    function drawNumbers() {
        drawButton.disabled = true;
        winningNumbersContainer.innerHTML = '';
        round++;

        const numbers = Array.from({ length: 45 }, (_, i) => i + 1);
        const shuffled = numbers.sort(() => Math.random() - 0.5);
        const winning = shuffled.slice(0, 6).sort((a, b) => a - b);

        winning.forEach((num, i) => {
            const el = document.createElement('div');
            el.classList.add('number', getRange(num));
            el.textContent = num;
            winningNumbersContainer.appendChild(el);

            setTimeout(() => {
                el.classList.add('drawn');
            }, i * 200 + 100);
        });

        setTimeout(() => {
            drawButton.disabled = false;
            addHistory(winning);
        }, winning.length * 200 + 300);
    }

    function addHistory(nums) {
        const item = document.createElement('div');
        item.classList.add('history-item');

        const roundLabel = document.createElement('span');
        roundLabel.classList.add('round');
        roundLabel.textContent = `#${round}`;

        const numsContainer = document.createElement('div');
        numsContainer.classList.add('nums');

        nums.forEach(n => {
            const ball = document.createElement('span');
            ball.classList.add('mini-ball', getRange(n));
            ball.textContent = n;
            numsContainer.appendChild(ball);
        });

        item.appendChild(roundLabel);
        item.appendChild(numsContainer);
        historyList.prepend(item);
    }
});
