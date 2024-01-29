document.addEventListener('DOMContentLoaded', function () {
    getHop();
});

function getHop() {
    document.body.style.backgroundImage = `url('img/hop02.gif')`;
    document.body.style.backgroundRepeat = 'no-repeat'; 
    document.body.style.backgroundSize = 'cover'; 

}
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('authForm').addEventListener('submit', function (event) {
        event.preventDefault();
        play();
    });
});

function play() {
    const authKey = document.getElementById('authKey').value.trim();
    const platform = document.getElementById('platform').value;

    if (authKey && platform) {
        if (platform === 'vk' && authKey.startsWith('https://markus.rmart.ru/engine/preloader/preloader.html?api_url=')) {
            const symbols = authKey.replace('https://markus.rmart.ru/engine/preloader/preloader.html?api_url=', '');
            const decodedSymbols = decodeURIComponent(symbols);
            window.location.href = `winner/vk/preloader.html?api_url=${decodedSymbols}`;
        } else {
            alert('Invalid Auth-key or platform selection.');
        }
    } else {
        alert('Please enter Auth-key and choose a platform.');
    }
}

