document.addEventListener('DOMContentLoaded', () => {
    // ۱. حذف لودر اولیه پس از بارگذاری کامل صفحه
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 500);
        });
    }

    // ۲. مدیریت منوی همبرگری موبایل
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const glassSidebar = document.getElementById('glass-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (mobileMenuToggle && glassSidebar && sidebarOverlay) {
        mobileMenuToggle.addEventListener('click', () => {
            glassSidebar.classList.add('menu-open');
        });

        sidebarOverlay.addEventListener('click', () => {
            glassSidebar.classList.remove('menu-open');
        });
    }

    // ۳. مدیریت پاپ‌آپ (Modal) تغییر رمز عبور
    const openModalBtn = document.getElementById('open-change-password');
    const closeModalBtn = document.getElementById('close-modal');
    const modalOverlay = document.getElementById('modal-overlay');

    if (openModalBtn && closeModalBtn && modalOverlay) {
        openModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalOverlay.classList.add('modal-active');
        });

        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('modal-active');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('modal-active');
            }
        });
    }

    // ۴. سینک کردن وضعیت تم‌پوسته در داشبورد
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            darkModeToggle.checked = true;
        }

        darkModeToggle.addEventListener('change', () => {
            if (darkModeToggle.checked) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ۵. رندر و ترسیم نمودار تحصیلی ریسپانسیو
    const ctx = document.getElementById('academicChart');
    if (ctx) {
        const isMobile = window.innerWidth < 768;

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['ترم اول', 'ترم دوم', 'ترم سوم', 'ترم جاری'],
                datasets: [{
                    label: 'معدل ترمی',
                    data: [16.50, 17.20, 18.10, 19.00],
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.05)',
                    borderWidth: isMobile ? 2 : 3,
                    tension: 0.3,
                    fill: true,
                    pointBackgroundColor: '#2563eb',
                    pointRadius: isMobile ? 3 : 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        min: 12, max: 20,
                        grid: { color: 'rgba(255, 255, 255, 0.05)' },
                        ticks: {
                            color: '#475569',
                            font: { family: 'Vazirmatn', size: isMobile ? 10 : 12 }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            color: '#475569',
                            font: { family: 'Vazirmatn', size: isMobile ? 10 : 12 }
                        }
                    }
                }
            }
        });
    }
});