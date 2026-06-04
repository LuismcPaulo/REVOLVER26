document.addEventListener('DOMContentLoaded', () => {
  // SCROLL REVEAL (timeline)
  const blocks = document.querySelectorAll('.block');
  function onScroll() {
    const trigger = window.innerHeight * 0.8;
    blocks.forEach(block => {
      const rect = block.getBoundingClientRect();
      if (rect.top < trigger) {
        block.classList.add('visible');
      }
    });
  }
  onScroll();
  window.addEventListener('scroll', onScroll);

  // SCROLL COUNTER
  let scrollCount = 0;
  const counter = document.querySelector('.scroll-counter') || document.createElement('div');
  if (!counter.className) {
    counter.className = 'scroll-counter';
    document.body.appendChild(counter);
  }

  function updateCounter() {
    scrollCount++;
    const index = Math.floor(scrollCount / 15);
    counter.textContent = `scroll: ${index}px`;
  }
  window.addEventListener('scroll', updateCounter);

  // RESISTÊNCIA AO ÊXODO (.next-link)
  let exitAttempts = 0;
  const exitLinks = document.querySelectorAll('.next-link');
  exitLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      exitAttempts++;
      if (exitAttempts < 3) {
        e.preventDefault();
        link.textContent = exitAttempts === 1 
          ? 'you tried to leave' 
          : exitAttempts === 2 
          ? 'still here' 
          : 'one more try';
        setTimeout(() => {
          link.textContent = '↓ continua';
        }, 1500);
      }
    });
  });

  // 👇 PÁGINA 2 (mechanisms.html) 
  if (document.body.classList.contains('page2')) {
    console.log('🚀 PÁGINA 2 DETETADA - Contadores ativos!');
    
    // ADDICTION INDEX (centro)
    const addictionCounter = document.getElementById('addiction-index');
    if (addictionCounter) {
      let addictionLevel = 0;
      const addictionInterval = setInterval(() => {
        addictionLevel += 0.5;
        addictionCounter.textContent = Math.floor(addictionLevel);
        if (addictionLevel >= 230) { // Para em 8%
          clearInterval(addictionInterval);
        }
      }, 300);
    }

    // MÉTRICAS (direita)
    const metrics = document.querySelectorAll('.metric-number');
    metrics.forEach(metric => {
      const target = parseInt(metric.getAttribute('data-target'), 10) || 0;
      let current = 0;
      const speed = target / 100; // Duração da animação
      
      const interval = setInterval(() => {
        current += speed;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        metric.textContent = Math.floor(current);
      }, 30);
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {

});

