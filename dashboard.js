document.addEventListener('DOMContentLoaded', () => {

    // ۱. سیستم ثبت داینامیک زمان ورود کاربر
    const entryTimeElement = document.getElementById('entry-timestamp');
    if (entryTimeElement) {
        const now = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const persianDate = now.toLocaleDateString('fa-IR', dateOptions);

        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');
        entryTimeElement.textContent = `${persianDate} - ساعت ${hours}:${minutes}:${seconds}`;
    }

    // ۲. مدیریت پاپ‌آپ تغییر رمز عبور و اعتبارسنجی
    const changePasswordLink = document.querySelector('.settings-link');
    const modalOverlay = document.getElementById('password-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const passwordForm = document.getElementById('change-password-form');

    if (changePasswordLink && modalOverlay) {
        changePasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('modal-active');
            // بستن منوی موبایل در صورت باز شدن مودال
            document.querySelector('.glass-sidebar').classList.remove('sidebar-open');
        });

        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('modal-active');
            passwordForm.reset();
        });

        // اعتبارسنجی فرم تغییر رمز عبور
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newPass = document.getElementById('new-pass').value;

            if (newPass.length < 8) {
                alert('رمز عبور جدید باید حداقل ۸ کاراکتر باشد!');
                return;
            }

            // شبیه‌سازی موفقیت‌آمیز بودن
            alert('رمز عبور شما با موفقیت تغییر یافت.');
            modalOverlay.classList.remove('modal-active');
            passwordForm.reset();
        });
    }

    // ۳. منوی همبرگری برای حالت موبایل
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.glass-sidebar');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('sidebar-open');
        });

        // بستن منو با کلیک روی خارج از آن در حالت موبایل
        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('sidebar-open')) {
                sidebar.classList.remove('sidebar-open');
            }
        });
    }

    // ۴. اتصال سیستم ذخیره‌سازی پوسته شب/روز
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        darkModeToggle.checked = true;
    }

    darkModeToggle.addEventListener('change', () => {
        localStorage.setItem('theme', darkModeToggle.checked ? 'dark' : 'light');
    });
});