document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');

  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menu.setAttribute('aria-expanded', open);
      menu.innerHTML = `<i class="fa-solid fa-${open ? 'xmark' : 'bars'}"></i>`;
    });
  }

  const pages = {
    home: 'index.html',
    about: 'index2.html',
    activities: 'index3.html',
    success: 'index4.html',
    contact: 'index5.html',
  };

  document
    .querySelector(`.site-nav a[href="${pages[document.body.dataset.page]}"]`)
    ?.classList.add('active');

  document.querySelectorAll('.year').forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('shown');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

  document.querySelectorAll('.photo-grid img, .cert-grid img').forEach((image) => {
    image.addEventListener('click', () => {
      const modal = document.createElement('div');
      modal.className = 'lightbox';
      modal.innerHTML = `
        <button aria-label="Mbyll foton"><i class="fa-solid fa-xmark"></i></button>
        <img src="${image.src}" alt="${image.alt}">
      `;
      document.body.append(modal);

      const close = () => modal.remove();

      modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.closest('button')) {
          close();
        }
      });

      document.addEventListener(
        'keydown',
        (event) => {
          if (event.key === 'Escape') {
            close();
          }
        },
        { once: true },
      );
    });
  });
});
