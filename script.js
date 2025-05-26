// 初始化 AOS 動畫庫
AOS.init({
    duration: 1000,
    once: true
});

// 初始化 Fancybox
Fancybox.bind("[data-fancybox]", {
    // 自訂選項
});

// 語言切換功能
let currentLang = localStorage.getItem('language') || 'zh-TW';

function updateLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
    document.title = translations[lang]['title'];
    
    // 更新所有翻譯文字
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // 更新 Fancybox 圖片說明
    document.querySelectorAll('[data-caption-i18n]').forEach(element => {
        const key = element.getAttribute('data-caption-i18n');
        if (translations[lang][key]) {
            element.setAttribute('data-caption', translations[lang][key]);
        }
    });

    // 更新語言按鈕狀態
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
}

// 初始化語言
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage(currentLang);
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

// 添加語言切換按鈕事件監聽
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        updateLanguage(lang);
    });
});