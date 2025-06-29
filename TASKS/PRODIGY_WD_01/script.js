// Add scroll event listener
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  // Add class when scrolling down
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});
