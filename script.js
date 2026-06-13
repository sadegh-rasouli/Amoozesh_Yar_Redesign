const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('toggle-password');
const eyeIcon = document.getElementById('eye-icon');

// مدیریت نمایش/پنهان‌سازی کلمه عبور با تغییر کلاس آیکون رسمی
togglePasswordButton.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

    // سوییچ بین آیکون چشم باز و چشم بسته رسمی
    if (isPassword) {
        eyeIcon.className = "bi bi-eye-slash";
    } else {
        eyeIcon.className = "bi bi-eye";
    }
});

// سیستم ذخیره سازی پیشرفته پوسته (Local Storage)
const darkModeToggle = document.getElementById('dark-mode-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
    localStorage.setItem('theme', darkModeToggle.checked ? 'dark' : 'light');
});

// سیستم ولیدیشن زنده با لرزش فیلد خطادار
const loginForm = document.querySelector('.login-form');
const usernameInput = document.getElementById('username');

loginForm.addEventListener('submit', (e) => {
    let hasError = false;

    if (usernameInput.value.trim().length < 8) {
        e.preventDefault();
        usernameInput.classList.add('shake-error');
        hasError = true;

        setTimeout(() => {
            usernameInput.classList.remove('shake-error');
        }, 300);
    }
});