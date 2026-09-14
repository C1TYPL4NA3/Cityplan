// Minimal vanilla JS — mobile menu toggle and project filter (no framework needed).

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-menu-toggle]');
    const mobileNav = document.querySelector('[data-mobile-nav]');

    if (toggle && mobileNav) {
        toggle.addEventListener('click', () => {
            const open = mobileNav.classList.toggle('is-open');
            toggle.classList.toggle('is-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            toggle.setAttribute('aria-label', open ? 'Menü schliessen' : 'Menü öffnen');
        });
    }

    // Projekte overview: client-side category filter.
    const filterNav = document.querySelector('[data-project-filters]');
    if (filterNav) {
        const projects = document.querySelectorAll('[data-project-item]');

        filterNav.addEventListener('click', (event) => {
            const link = event.target.closest('[data-filter]');
            if (!link) return;
            event.preventDefault();

            filterNav.querySelectorAll('[data-filter]').forEach((el) => el.classList.remove('is-active'));
            link.classList.add('is-active');

            const filter = link.dataset.filter;

            projects.forEach((item) => {
                const categories = (item.dataset.categories || '').split(',');
                const visible = filter === 'all' || categories.includes(filter);
                item.hidden = !visible;
            });
        });
    }
});
