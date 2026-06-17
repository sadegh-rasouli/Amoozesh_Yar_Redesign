document.addEventListener('DOMContentLoaded', () => {
    // حذف لودر اولیه
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 500);
        });
    }
    // ایجاد ظرف اعلان‌ها در صفحه
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    // تابع عمومی ساخت اعلان شیشه‌ای
    window.showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `glass-toast ${type}`;
        toast.innerHTML = `
            <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}"></i>
            <span>${toast.innerText = message}</span>
        `;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 50);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3500);
    };

    // ۱. مدیریت نمایش/پنهان‌سازی کلمه عبور
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('toggle-password');
    const eyeIcon = document.getElementById('eye-icon');

    if (togglePasswordButton && passwordInput && eyeIcon) {
        togglePasswordButton.addEventListener('click', () => {
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
            eyeIcon.className = isPassword ? "bi bi-eye-slash" : "bi bi-eye";
        });
    }

    // ۲. سیستم پیشرفته کپچای داینامیک
    const captchaBox = document.querySelector('.captcha-box');
    const captchaInput = document.getElementById('captcha-input'); // نیاز به افزودن آیدی در HTML دارد
    let currentCaptcha = "";

    function generateCaptcha() {
        currentCaptcha = Math.floor(10000 + Math.random() * 90000).toString();
        if (captchaBox) {
            captchaBox.innerHTML = `${currentCaptcha} <button type="button" class="refresh-captcha" title="تغییر کد"><i class="bi bi-arrow-clockwise"></i></button>`;
            captchaBox.querySelector('.refresh-captcha').addEventListener('click', generateCaptcha);
        }
    }
    if (captchaBox) generateCaptcha();

    // ۳. سیستم ذخیره سازی پوسته (Local Storage)
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') darkModeToggle.checked = true;
        darkModeToggle.addEventListener('change', () => {
            localStorage.setItem('theme', darkModeToggle.checked ? 'dark' : 'light');
        });
    }

    // ۴. سیستم ولیدیشن زنده و کنترل ورود به سایت
    const loginForm = document.querySelector('.login-form');
    const usernameInput = document.getElementById('username');

    if (loginForm && usernameInput) {
        loginForm.addEventListener('submit', (e) => {
            let hasError = false;

            // تست طول نام کاربری
            if (usernameInput.value.trim().length < 8) {
                e.preventDefault();
                usernameInput.classList.add('shake-error');
                showToast('نام کاربری باید حداقل ۸ کاراکتر باشد!', 'error');
                hasError = true;
                setTimeout(() => usernameInput.classList.remove('shake-error'), 300);
                return;
            }

            // تست صحت کد کپچا
            if (captchaInput && captchaInput.value.trim() !== currentCaptcha) {
                e.preventDefault();
                captchaInput.classList.add('shake-error');
                showToast('کد امنیتی وارد شده صحیح نیست!', 'error');
                hasError = true;
                setTimeout(() => captchaInput.classList.remove('shake-error'), 300);
                generateCaptcha(); // نوسازی کپچا پس از خطا
                return;
            }
        });
    }
});