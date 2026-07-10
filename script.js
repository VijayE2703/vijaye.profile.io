document.addEventListener('DOMContentLoaded', () => {
  // Theme Manager
  const themeToggleBtn = document.getElementById('theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  let activeTheme = localStorage.getItem('theme') || 'dark'; // Default to dark as requested

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    activeTheme = theme;
  };

  // Set initial theme
  applyTheme(activeTheme);

  themeToggleBtn.addEventListener('click', () => {
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  // Mobile Menu Toggling
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  const navLinkItems = document.querySelectorAll('.nav-links a');

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change menu icon to close icon if active
    const menuIcon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      menuIcon.setAttribute('data-lucide', 'x');
    } else {
      menuIcon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
  });

  navLinkItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const menuIcon = menuBtn.querySelector('i');
      menuIcon.setAttribute('data-lucide', 'menu');
      lucide.createIcons();
    });
  });

  // Typing Carousel Animation
  const typingElement = document.querySelector('.typed-text');
  const words = ["Senior Software Developer", "ASP.NET Specialist", "Full-Stack Engineer", "Database Optimizer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  const type = () => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster deleting
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal typing
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typingSpeed = 2000; // Pause at the end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(type, typingSpeed);
  };

  if (typingElement) {
    setTimeout(type, 1000);
  }

  // Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Scroll Spy (Highlight active nav link)
  const sections = document.querySelectorAll('section');
  
  const scrollSpy = () => {
    let scrollPosition = window.scrollY + 120; // offset

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinkItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', scrollSpy);
  scrollSpy(); // Trigger once on load

  // Contact Form Submission Handling
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      
      // Visual feedback: sending state
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span> <i data-lucide="loader" class="animate-spin"></i>`;
      lucide.createIcons();
      
      // Simulate API call
      setTimeout(() => {
        submitBtn.innerHTML = `<span>Message Sent!</span> <i data-lucide="check"></i>`;
        lucide.createIcons();
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)'; // Green gradient
        
        contactForm.reset();
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
          submitBtn.style.background = ''; // Restore original
          lucide.createIcons();
        }, 3000);
      }, 1500);
    });
  }

  // Initialize Lucide Icons
  lucide.createIcons();
});
