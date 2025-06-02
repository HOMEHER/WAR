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

    // 更新時間軸內容
    Object.keys(translations[lang].timeline).forEach(key => {
        const element = document.querySelector(`[data-timeline="${key}"]`);
        if (element) {
            element.textContent = translations[lang].timeline[key];
        }
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

// 社群分享功能
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.querySelector('[data-i18n="title"]').textContent);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${title}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.querySelector('[data-i18n="og:description"]').content);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareOnLine() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://social-plugins.line.me/lineit/share?url=${url}`, '_blank');
}

// Loading 控制
window.addEventListener('load', () => {
    document.getElementById('loading').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('loading').style.display = 'none';
    }, 300);
});

// Lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
        img.decoding = 'async';
    });
});

// 圖片載入錯誤處理
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.onerror = function() {
            console.error(`圖片載入失敗: ${img.src}`);
            this.style.display = 'none';
            this.parentElement.innerHTML += '<div style="padding: 20px; background: #f8d7da; color: #721c24; border-radius: 10px;">圖片載入失敗</div>';
        };
    });
});

// 時間軸的動畫效果
function checkTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (itemTop < windowHeight * 0.8) {
            item.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkTimelineItems);
window.addEventListener('load', checkTimelineItems);