const header = document.querySelector('[data-header]')
const openNavSubmenu = document.querySelector('[data-open-navsubmenu]')
const navsubmenu = document.querySelector('[data-navsubmenu]')
const usermenu = document.querySelector('[data-usermenu]')
const openUsermenu = document.querySelector('[data-open-usermenu]')

//função que faz o header mudar de cor
function onWindowScroll() {
    if(window.scrollY > 20){
        header.style.backgroundColor = '#0C0D14'
    } else {
        header.style.backgroundColor = 'transparent'
    }
}

//função que muda a classe do elemento nav-submenu
function onTouchOpenNavSubmenu (event) {
    event.preventDefault()
    navsubmenu.classList.toggle('active')
}

//função que muda a classe do elemento user-menu
function onTouchOpenUserMenu (event) {
    event.preventDefault()
    usermenu.classList.toggle('active')
}

//função que aplica os eventos das funções acima
function setListeners() {
    window.addEventListener('scroll', onWindowScroll)
    openNavSubmenu.addEventListener('touchstart', onTouchOpenNavSubmenu)
    usermenu.addEventListener('touchstart', onTouchOpenUserMenu)
}

//função que inicializa as funções.
function init() {
    setListeners()
}

export default {
    init
}