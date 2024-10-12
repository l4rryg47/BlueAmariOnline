// Project coded vanilla from scratch by SNK for CMC||RIP FL3XY

const hamburger = document.querySelector('#hamburger');
const hamburgerMenu = document.querySelector('.hamburgerMenu');
const close = document.querySelector('.close');
const registerform1 = document.querySelector('.formContainer');
const registerform2 = document.querySelector('.formContainer2');
const registerform3 = document.querySelector('.formContainer3');
// const register = document.querySelector('#accessButton2');


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

function login () {
    location.href = 'login/index.html'
    console.log("login")
}

function login1 () {
    location.href = '../login/index.html'
    console.log("login")
}

function register () {
    location.href = 'register/index.html'
    console.log("register")
}

function register1 () {
    location.href = '../register/index.html'
    console.log("register")
}

function next () {
    registerform1.style.display = 'none'
    registerform2.style.display = 'flex'
    console.log("register")
}

function back () {
    registerform2.style.display = 'none'
    registerform1.style.display = 'flex'
    console.log("register")
}

function next2 () {
    registerform2.style.display = 'none'
    registerform3.style.display = 'flex'
    console.log("register")
}

