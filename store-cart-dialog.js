document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const isMobile = window.innerWidth <= 768; // Adjust this breakpoint as needed
  
    function disableBodyScroll() {
      if (isMobile) {
        body.classList.add('no-scroll');
        if (window.SScroll && window.SScroll.call) {
          window.SScroll.call.stop();
        }
      }
    }
  
    function enableBodyScroll() {
      if (isMobile) {
        body.classList.remove('no-scroll');
        if (window.SScroll && window.SScroll.call) {
          window.SScroll.call.start();
        }
      }
    }
  
    document.addEventListener('click', (e) => {
      // Check if the clicked element is an open button
      if (e.target.matches('[element="cart-button"]')) {
        // Find the next dialog sibling and open it
        const nextDialog = e.target.nextElementSibling;
        if (nextDialog) {
          nextDialog.showModal();
          disableBodyScroll();
        }
      }
      // Check if the clicked element is a close button inside a dialog
      else if (e.target.matches('[element="close-cart-button"]')) {
        // Find the closest dialog parent and close it
        const dialog = e.target.closest('[element="cart"]');
        if (dialog) {
          dialog.close();
          enableBodyScroll();
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
          enableBodyScroll();
        }
      }
    });
  });