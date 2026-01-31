document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('draw-button');
    const setsContainer = document.getElementById('winning-numbers');
    const historyList = document.getElementById('history-list');
    let round = 0;

    // 한국 로또 6/45 역대 당첨 번호 빈도 (2002~2026, 약 1160회차 기준)
    const frequency = {
        1:166, 2:151, 3:169, 4:159, 5:151, 6:163, 7:167, 8:154, 9:132,
        10:158, 11:163, 12:177, 13:174, 14:169, 15:162, 16:166, 17:167,
        18:172, 19:165, 20:166, 21:164, 22:141, 23:145, 24:163, 25:148,
        26:163, 27:176, 28:151, 29:152, 30:155, 31:163, 32:141, 33:172,
        34:181, 35:159, 36:161, 37:170, 38:166, 39:164, 40:171, 41:146,
        42:153, 43:162, 44:159, 45:171
    };

    // 가중치 기반 번호 선택
    function weightedPick(count) {
        const pool = [];
        for (let n = 1; n <= 45; n++) {
            for (let i = 0; i < frequency[n]; i++) {
                pool.push(n);
            }
        }
        const picked = new Set();
        while (picked.size < count) {
            const idx = Math.floor(Math.random() * pool.length);
            picked.add(pool[idx]);
        }
        return [...picked].sort((a, b) => a - b);
    }

    function getRange(n) {
        if (n <= 10) return 'range-1';
        if (n <= 20) return 'range-10';
        if (n <= 30) return 'range-20';
        if (n <= 40) return 'range-30';
        return 'range-40';
    }

    drawButton.addEventListener('click', drawNumbers);

    function drawNumbers() {
        drawButton.disabled = true;
        setsContainer.innerHTML = '';
        round++;

        const sets = [];
        for (let s = 0; s < 5; s++) {
            sets.push(weightedPick(6));
        }

        sets.forEach((nums, setIdx) => {
            const row = document.createElement('div');
            row.classList.add('set-row');

            const label = document.createElement('span');
            label.classList.add('set-label');
            label.textContent = String.fromCharCode(65 + setIdx); // A~E
            row.appendChild(label);

            const numsWrap = document.createElement('div');
            numsWrap.classList.add('set-nums');

            nums.forEach((num, i) => {
                const el = document.createElement('div');
                el.classList.add('number', getRange(num));
                el.textContent = num;
                numsWrap.appendChild(el);

                setTimeout(() => {
                    el.classList.add('drawn');
                }, setIdx * 400 + i * 120 + 100);
            });

            row.appendChild(numsWrap);
            setsContainer.appendChild(row);
        });

        setTimeout(() => {
            drawButton.disabled = false;
            addHistory(sets);
        }, 5 * 400 + 6 * 120 + 400);
    }

    function addHistory(sets) {
        const group = document.createElement('div');
        group.classList.add('history-group');

        const roundLabel = document.createElement('div');
        roundLabel.classList.add('history-round');
        roundLabel.textContent = `#${round}`;
        group.appendChild(roundLabel);

        sets.forEach((nums, idx) => {
            const item = document.createElement('div');
            item.classList.add('history-item');

            const label = document.createElement('span');
            label.classList.add('round');
            label.textContent = String.fromCharCode(65 + idx);

            const numsContainer = document.createElement('div');
            numsContainer.classList.add('nums');

            nums.forEach(n => {
                const ball = document.createElement('span');
                ball.classList.add('mini-ball', getRange(n));
                ball.textContent = n;
                numsContainer.appendChild(ball);
            });

            item.appendChild(label);
            item.appendChild(numsContainer);
            group.appendChild(item);
        });

        historyList.prepend(group);
    }
});
