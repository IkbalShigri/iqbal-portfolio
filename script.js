document.addEventListener('DOMContentLoaded', function(){
  // Footer year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Nav toggle for small screens
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.querySelector('.nav-list');
  if(navToggle && navList){
    navToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = expanded ? '' : 'flex';
    });

    // Close nav when clicking outside (mobile)
    document.addEventListener('click', function(e){
      if(window.innerWidth <= 640){
        if(!navList.contains(e.target) && !navToggle.contains(e.target)){
          navList.style.display = '';
          navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  }

  // Animate progress bars (skills page)
  const progressEls = document.querySelectorAll('.progress');
  progressEls.forEach(function(progress){
    const value = progress.getAttribute('data-value');
    const bar = progress.querySelector('.progress-bar');
    if(bar && value){
      // Use timeout so animation can be visible after load
      setTimeout(function(){
        bar.style.width = value + '%';
      }, 300);
    }
  });

  // Contact form behavior (no backend)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const statusText = document.getElementById('form-status-text');
  const clearBtn = document.getElementById('clear-btn');

  if(clearBtn){
    clearBtn.addEventListener('click', function(){
      if(form) form.reset();
      if(status){ status.hidden = true; statusText.textContent = ''; }
    });
  }

  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if(!name || !email || !message){
        showStatus('Please fill all required fields.', false);
        return;
      }

      // Simulate success (since no backend). In real use, connect to an endpoint / email service.
      showStatus('Message sent successfully (simulation). Thank you!', true);
      form.reset();
    });
  }

  function showStatus(text, ok){
    if(!status || !statusText) return;
    statusText.textContent = text;
    status.hidden = false;
    status.style.borderColor = ok ? 'rgba(110,231,183,0.15)' : 'rgba(255,100,100,0.12)';
  }

  // Smooth-scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor){
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        const dest = document.querySelector(href);
        if(dest){
          e.preventDefault();
          dest.scrollIntoView({behavior:'smooth'});
        }
      }
    });
  });

});
