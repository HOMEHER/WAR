// 初始化 AOS 動畫庫
AOS.init({
    duration: 1000,
    once: true
});

// 初始化 Fancybox
Fancybox.bind("[data-fancybox]", {
    // 自訂選項
});

// 數字計數動畫
function animateNumber(element, target) {
    let current = 0;
    const duration = 2000; // 動畫持續時間（毫秒）
    const step = target / (duration / 16); // 每16ms更新一次
    
    function update() {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
        } else {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(update);
        }
    }
    
    update();
}

// 當元素進入視窗時開始動畫
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.dataset.counter);
            const numberElement = element.querySelector('.number');
            animateNumber(numberElement, target);
            observer.unobserve(element);
        }
    });
}, {
    threshold: 0.5
});

// 監聽所有數字元素
document.querySelectorAll('.fact').forEach(fact => {
    observer.observe(fact);
});