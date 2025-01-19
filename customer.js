// Toggle between login and sign-up forms
document.getElementById('login-btn').addEventListener('click', function() {
  document.getElementById('login-form').style.display = 'block';
  document.getElementById('signup-form').style.display = 'none';
  document.getElementById('login-btn').classList.add('active');
  document.getElementById('signup-btn').classList.remove('active');
});

document.getElementById('signup-btn').addEventListener('click', function() {
  document.getElementById('signup-form').style.display = 'block';
  document.getElementById('login-form').style.display = 'none';
  document.getElementById('signup-btn').classList.add('active');
  document.getElementById('login-btn').classList.remove('active');
});
