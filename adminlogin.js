document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if (!username || !password) {
        document.getElementById('message').innerText = 'Both fields are required!';
        return;
    }

    const loginData = {
        username: username,
        password: password
    };


    fetch('http://your-backend-endpoint.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('message').innerText = 'Login successful!';
            window.location.href = '/admin/page';
        } else {
            document.getElementById('message').innerText = 'Invalid username or password.';
        }
    })
    .catch(error => {
        document.getElementById('message').innerText = 'Error occurred. Please try again.';
        console.error('Error:', error);
    });
});
