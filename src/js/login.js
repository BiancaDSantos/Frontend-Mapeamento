async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://127.0.0.1:8080/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    const loginSuccessful = await response.json();
    if (loginSuccessful) {
        window.location.href = '/admin/index.html';
    } else {
        document.getElementById('result').textContent = 'Usuario ou Senha Invalida!';
    }
}