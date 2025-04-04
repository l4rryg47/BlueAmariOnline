// Project coded vanilla from scratch by SNK for CMC||RIP FL3XY

document.addEventListener('DOMContentLoaded', () => {

const login = document.querySelector('#loginBtn');
const login1 = document.querySelector('#loginBtn1');
const register = document.querySelector('#registerBtn');
const register1 = document.querySelector('#registerBtn1');
const hamburger = document.querySelector('#hamburger');
const hamburgerMenu = document.querySelector('.hamburgerMenu');
const close = document.querySelector('.close');

login.addEventListener('click', (e) =>{
    e.preventDefault();
    location.href = '/login/index.html'
    console.log('clicked')
})

login1.addEventListener('click', (e) =>{
    e.preventDefault();
    location.href = '/login/index.html'
    console.log('clicked')
})

register.addEventListener('click', (e) =>{
    e.preventDefault();
    location.href = '/register/index.html'
    console.log('clicked')
})

register1.addEventListener('click', (e) =>{
    e.preventDefault();
    location.href = '/register/index.html'
    console.log('clicked')
})

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

})

