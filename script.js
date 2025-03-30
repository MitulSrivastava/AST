// Wait for DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
  // Animate hero section elements
  animateHeroElements();

  // Initialize animations for elements when they come into view
  initScrollAnimations();

  // Handle navbar color change on scroll
  handleNavbarScroll();

  // Handle active nav links on scroll
  handleActiveNavLinks();

  // Initialize contact form submission
  initContactForm();

  // Initialize smooth scrolling for anchor links
  initSmoothScroll();
});

// Function to animate hero elements on page load
function animateHeroElements() {
  const heroElements = [
    document.querySelector(".hero-subtitle"),
    document.querySelector(".hero-section h1"),
    document.querySelector(".hero-section p"),
    document.querySelector(".hero-buttons"),
    document.querySelector(".hero-stats"),
  ];

  // Apply staggered animation with delay
  heroElements.forEach((element, index) => {
    if (element) {
      setTimeout(() => {
        element.classList.add("fade-in");
      }, 300 * index);
    }
  });

  // Add click event to scroll down button
  const scrollDownBtn = document.querySelector(".hero-scroll-down a");
  if (scrollDownBtn) {
    scrollDownBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const targetSection = document.querySelector(this.getAttribute("href"));
      const headerHeight = document.querySelector(".navbar").offsetHeight;

      window.scrollTo({
        top: targetSection.offsetTop - headerHeight,
        behavior: "smooth",
      });
    });
  }
}

// Function to handle navbar color/style change on scroll
function handleNavbarScroll() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("shadow-sm", "py-2");
      navbar.classList.remove("py-3");
    } else {
      navbar.classList.remove("shadow-sm", "py-2");
      navbar.classList.add("py-3");
    }
  });
}

// Function to initialize animations when elements come into view
function initScrollAnimations() {
  // Select all sections that should be animated
  const sections = document.querySelectorAll(
    ".section-heading, .service-card, .process-card, .testimonial-card, .before-after-container, .contact-info, .contact-form"
  );

  // Create the Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          // Once the animation is triggered, we don't need to observe this element anymore
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  ); // Trigger when at least 10% of the element is visible

  // Observe each section
  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Initialize the contact form submission
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    // Add input animation effects
    const formControls = contactForm.querySelectorAll(
      ".form-control, .form-select"
    );
    formControls.forEach((input) => {
      // Add focus class for animation
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("input-focused");
      });

      input.addEventListener("blur", function () {
        this.parentElement.classList.remove("input-focused");

        // Add filled class if input has value
        if (this.value.trim() !== "") {
          this.classList.add("is-filled");
        } else {
          this.classList.remove("is-filled");
        }
      });
    });

    // Form submission
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const serviceType = document.getElementById("service-type").value;
      const message = document.getElementById("message").value;
      const privacyPolicy = document.getElementById("privacy-policy").checked;

      // Simple validation
      if (!name || !email || !message) {
        showAlert("Please fill out all required fields.", "danger");
        highlightEmptyRequiredFields();
        return;
      }

      if (!validateEmail(email)) {
        showAlert("Please enter a valid email address.", "danger");
        document.getElementById("email").classList.add("is-invalid");
        return;
      }

      if (!privacyPolicy) {
        showAlert("Please agree to the Privacy Policy to proceed.", "danger");
        return;
      }

      // Here you would normally send the form data to a server
      const formData = {
        name,
        email,
        phone,
        serviceType,
        message,
      };

      console.log("Form data to be sent:", formData);

      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Sending...';

      // Simulate server request with timeout
      setTimeout(() => {
        // Remove loading state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Show success message
        showAlert(
          "Thank you for your message! We will get back to you soon.",
          "success"
        );

        // Reset the form
        contactForm.reset();
        formControls.forEach((input) => {
          input.classList.remove("is-filled");
        });
      }, 1500);
    });
  }
}

// Validate email format
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Highlight empty required fields
function highlightEmptyRequiredFields() {
  const requiredFields = document.querySelectorAll("[required]");
  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      field.classList.add("is-invalid");

      // Remove invalid class on input
      field.addEventListener(
        "input",
        function () {
          if (this.value.trim() !== "") {
            this.classList.remove("is-invalid");
          }
        },
        { once: true }
      );
    }
  });
}

// Function to display alert messages
function showAlert(message, type) {
  // Create alert element
  const alertEl = document.createElement("div");
  alertEl.className = `alert alert-${type} alert-dismissible fade show mt-3`;
  alertEl.role = "alert";
  alertEl.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

  // Get the form container and insert the alert before the form
  const formContainer = document.querySelector(".contact-form");
  formContainer.insertBefore(alertEl, document.getElementById("contactForm"));

  // Automatically dismiss after 5 seconds
  setTimeout(() => {
    alertEl.classList.remove("show");
    setTimeout(() => {
      alertEl.remove();
    }, 300);
  }, 5000);
}

// Initialize smooth scrolling for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");

        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }

        // Calculate header height for offset
        const headerHeight = document.querySelector(".navbar").offsetHeight;

        // Scroll to target with offset for fixed header
        window.scrollTo({
          top: targetElement.offsetTop - headerHeight,
          behavior: "smooth",
        });
      }
    });
  });
}

// Before and After Image Comparison functionality
document.addEventListener("DOMContentLoaded", function () {
  // Initialize testimonial carousel with the correct timing for auto-transition
  const testimonialCarousel = new bootstrap.Carousel(
    document.getElementById("testimonialCarousel"),
    {
      interval: 5000, // Change slides every 5 seconds
      wrap: true, // Loop back to the beginning when reaching the end
    }
  );
});

// Function to handle active nav links on scroll
function handleActiveNavLinks() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  window.addEventListener("scroll", function () {
    let current = "";
    const scrollPosition = window.scrollY + 200; // Offset to trigger the active state earlier

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}
