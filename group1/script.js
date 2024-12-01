document.getElementById('shuffle-btn').addEventListener('click', shuffleCards);

function shuffleCards() {
    const cards = document.querySelectorAll('.card');
    const container = document.querySelector('.card-container');

    // 随机化卡牌顺序
    const shuffledCards = Array.from(cards).sort(() => Math.random() - 0.5);

    // 清空容器
    container.innerHTML = '';

    // 随机旋转和排列卡牌
    shuffledCards.forEach(card => {
        // 随机旋转180度或不旋转
        const rotate = Math.random() < 0.5 ? 'rotate(180deg)' : 'rotate(0deg)';
        
        // 克隆卡片并设置旋转
        const clonedCard = card.cloneNode(true);
        clonedCard.style.transform = rotate; // 设置旋转角度
        
        // 监听点击事件
        clonedCard.addEventListener('click', function () {
            const rotation = getRotationAngle(clonedCard);
            const link = rotation === 180
                ? clonedCard.dataset.linkB
                : clonedCard.dataset.linkA;
            window.location.href = link;
        });

        // 插入容器
        container.appendChild(clonedCard);
    });
}

// 获取元素旋转角度
function getRotationAngle(element) {
    const matrix = window.getComputedStyle(element).transform;
    if (matrix !== 'none') {
        const values = matrix.split('(')[1].split(')')[0].split(',');
        const angle = Math.round(
            Math.atan2(values[1], values[0]) * (180 / Math.PI)
        );
        return (angle < 0 ? angle + 360 : angle) % 360; // 角度为0或180
    }
    return 0;
}
