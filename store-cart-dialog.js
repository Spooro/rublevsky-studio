document.addEventListener('DOMContentLoaded', () => {
    const isMobile = () => window.innerWidth <= 767; // Adjust this breakpoint as needed
    
    document.addEventListener('click', (e) => {
        // Check if the clicked element is an open button
        if (e.target.matches('[element="cart-button"]')) {
            // Find the next dialog sibling and toggle it
            const nextDialog = e.target.nextElementSibling;
            if (nextDialog) {
                if (nextDialog.hasAttribute('open')) {
                    nextDialog.close();
                } else {
                    nextDialog.show();
                }
                if (isMobile()) {
                    document.body.classList.toggle('no-scroll');
                }
            }
        }
        // Check if the clicked element is a close button inside a dialog
        else if (e.target.matches('[element="close-cart-button"]')) {
            // Find the closest dialog parent and close it
            const dialog = e.target.closest('[element="cart"]');
            if (dialog) {
                dialog.close();
                if (isMobile()) {
                    document.body.classList.remove('no-scroll');
                }
            }
        }
        // Check if the click is outside the dialog
        else if (!e.target.closest('[element="cart"]')) {
            const openDialog = document.querySelector('[element="cart"][open]');
            if (openDialog) {
                openDialog.close();
                if (isMobile()) {
                    document.body.classList.remove('no-scroll');
                }
            }
        }
    });
});