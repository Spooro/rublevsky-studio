document.addEventListener('DOMContentLoaded', () => {
    const isMobile = () => window.innerWidth <= 767; // Adjust this breakpoint as needed
  
    document.addEventListener('click', (e) => {
      // Check if the clicked element is an open button
      if (e.target.matches('[element="cart-button"]')) {
        // Find the next dialog sibling and open it
        const nextDialog = e.target.nextElementSibling;
        if (nextDialog) {
          nextDialog.showModal();
          if (isMobile()) {
            document.body.classList.add('no-scroll');
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
      else if (e.target.matches('[element="cart"]')) {
        const dialogDimensions = e.target.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          e.target.close();
          if (isMobile()) {
            document.body.classList.remove('no-scroll');
          }
        }
      }
    });
  });