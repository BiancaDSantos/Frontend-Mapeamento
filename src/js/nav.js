function loadNavbar() {
    fetch('/src/html/nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
        })
        .catch(error => console.error('Erro ao Carregar a navbar:', error));
}
document.addEventListener('DOMContentLoaded', loadNavbar);

