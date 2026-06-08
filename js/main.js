/* MedCare Clinic - Main JavaScript */
document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    });
    
    // Close menu on link click
    navMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        navMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // Doctor Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const doctorCards = document.querySelectorAll('.doctor-card');
  
  if (filterBtns.length > 0) {
    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        doctorCards.forEach(function(card) {
          if (filter === 'all' || card.getAttribute('data-specialty') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // Appointment Form Validation & Submission
  const appointmentForm = document.getElementById('appointmentForm');
  const successMessage = document.getElementById('successMessage');
  
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = appointmentForm.querySelectorAll('[required]');
      
      requiredFields.forEach(function(field) {
        const group = field.closest('.form-group');
        const error = group ? group.querySelector('.form-error') : null;
        
        if (!field.value.trim()) {
          isValid = false;
          if (group) group.classList.add('has-error');
          if (error) error.style.display = 'block';
        } else {
          if (group) group.classList.remove('has-error');
          if (error) error.style.display = 'none';
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            if (group) group.classList.add('has-error');
            if (error) {
              error.textContent = 'Please enter a valid email address';
              error.style.display = 'block';
            }
          }
        }
        
        // Phone validation
        if (field.type === 'tel' && field.value.trim()) {
          const phoneRegex = /^[\d\s\-\+\(\)]{7,}$/;
          if (!phoneRegex.test(field.value.trim())) {
            isValid = false;
            if (group) group.classList.add('has-error');
            if (error) {
              error.textContent = 'Please enter a valid phone number';
              error.style.display = 'block';
            }
          }
        }
        
        // Date validation - must be future
        if (field.type === 'date' && field.value) {
          const selectedDate = new Date(field.value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) {
            isValid = false;
            if (group) group.classList.add('has-error');
            if (error) {
              error.textContent = 'Please select a future date';
              error.style.display = 'block';
            }
          }
        }
      });
      
      if (isValid) {
        appointmentForm.style.display = 'none';
        if (successMessage) {
          successMessage.classList.add('show');
        }
      }
    });
    
    // Real-time validation on blur
    appointmentForm.querySelectorAll('[required]').forEach(function(field) {
      field.addEventListener('blur', function() {
        const group = field.closest('.form-group');
        const error = group ? group.querySelector('.form-error') : null;
        
        if (!field.value.trim()) {
          if (group) group.classList.add('has-error');
          if (error) error.style.display = 'block';
        } else {
          if (group) group.classList.remove('has-error');
          if (error) error.style.display = 'none';
        }
      });
    });
  }
  
  // Contact Form
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(function(field) {
        const group = field.closest('.form-group');
        const error = group ? group.querySelector('.form-error') : null;
        
        if (!field.value.trim()) {
          isValid = false;
          if (group) group.classList.add('has-error');
          if (error) error.style.display = 'block';
        } else {
          if (group) group.classList.remove('has-error');
          if (error) error.style.display = 'none';
        }
        
        if (field.type === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            if (group) group.classList.add('has-error');
            if (error) {
              error.textContent = 'Please enter a valid email address';
              error.style.display = 'block';
            }
          }
        }
      });
      
      if (isValid) {
        contactForm.style.display = 'none';
        if (contactSuccess) {
          contactSuccess.classList.add('show');
        }
      }
    });
  }
  
  // Scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.service-card, .doctor-card, .stat, .value-card, .award-item, .contact-card').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});
