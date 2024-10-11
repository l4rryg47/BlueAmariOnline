const hamburger = document.querySelector('#hamburger');
const hamburgerMenu = document.querySelector('.hamburgerMenu');
const close = document.querySelector('.close');
console.log(hamburger)

hamburger.addEventListener('click', (e) =>{
    e.preventDefault();
    hamburgerMenu.style.display = 'flex';
    console.log('clicked')
})

close.addEventListener('click', (e) =>{
    e.preventDefault();
    hamburgerMenu.style.display = 'none';
    console.log('closed')
})