// Check if the screen width is greater than or equal to 768px (typical tablet breakpoint)
if (window.innerWidth >= 768) {
    let currentPixel = window.pageYOffset;
    const blurSVG = document.createElement('svg');
    blurSVG.innerHTML = `
      <filter id="blur">
        <feGaussianBlur stdDeviation="0 0" />
      </filter>
    `;
    document.body.appendChild(blurSVG);
  
    const looper = function() {
      const newPixel = window.pageYOffset;
      const diff = newPixel - currentPixel;
      const speed = diff * 0.1;
      const blur = speed < 0 ? speed * -1 : speed;
      const stdDeviation = `${blur * 1} ${blur * 1}`;
      blurSVG.firstChild.setAttribute('stdDeviation', stdDeviation);
      currentPixel = newPixel;
      requestAnimationFrame(looper);
    };
  
    looper();
  }