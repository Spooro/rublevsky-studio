const docks = document.querySelectorAll('[data-dock="dock"]');

docks.forEach(dock => {
    const items = dock.querySelectorAll('[data-dock="item"]');
    const strength = dock.getAttribute('data-dock-strength');
    const maxScale = dock.getAttribute('data-dock-max-scale');
    let initialWidths = Array.from(items, item => item.offsetWidth);

    dock.addEventListener('mousemove', (e) => {
        const {
            clientX,
            clientY
        } = e;
        const {
            left,
            top
        } = dock.getBoundingClientRect();
        items.forEach((item, index) => {
            const {
                offsetLeft,
                offsetTop,
                offsetWidth
            } = item;
            const cx = left + offsetLeft + offsetWidth / 2;
            const cy = top + offsetTop + offsetWidth / 2;
            const dx = clientX - cx;
            const dy = clientY - cy;

            const distance = Math.sqrt(dx * dx + dy * dy);
            const scale = Math.max(Math.min(maxScale - distance / strength, maxScale), 1);

            item.style.width = `${initialWidths[index] * scale}px`;
            const image = item.querySelector('[data-dock="image"]');
            if (image) {
                image.style.transform = `scale(${scale}, ${scale})`;
            }
        });
    });

    dock.addEventListener('mouseleave', () => {
        items.forEach((item, index) => {
            item.style.width = `${initialWidths[index]}px`;
            const image = item.querySelector('[data-dock="image"]');
            if (image) {
                image.style.transform = 'scale(1, 1)';
            }
        });
    });
});