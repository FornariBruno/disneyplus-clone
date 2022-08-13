const btnControls = document.querySelectorAll('[data-banner="btn-control"]')
const btnNext = document.querySelector('[data-banner="btn-next"]')
const btnPrevius = document.querySelector('[data-banner="btn-previous"]')
const imgTitles = document.querySelectorAll('[data-banner="img-title"]')
const slider = document.querySelector('[data-banner="slider"]')
const sliderItems = document.querySelectorAll('[data-banner="item"]')



const state = {
    currentSliderPosition: 0,
    currentSlideIndex: 0,
    mouseDownPosition: 0,
    movimentPosition: 0,
    lastTranslatePosition: 0
}

function activeControlButton(index) {
    btnControls.forEach(function(item) {
        item.classList.remove('active')
    })
    const btnControl = btnControls[index]
    btnControl.classList.add('active')
}

function activeImageTitle(index) {
    imgTitles.forEach(function(item) {
        item.classList.remove('active')
    })
    const imgTitle = imgTitles[index]
    imgTitle.classList.add('active')
}

function animateTransition(active) {
    if(active){
        slider.style.transition = 'transform .3s'
    } else {
        slider.style.removeProperty('transition')
    }
}

function backwardSlide() {
    if(state.currentSlideIndex > 0){
        setVisibleSlide(state.currentSlideIndex - 1)
    }else {
        setVisibleSlide(state.currentSlideIndex)
    }
}

export default {
    init
}

function forwardSlide() {
    if(state.currentSlideIndex < sliderItems.length - 1){
        setVisibleSlide(state.currentSlideIndex + 1)
    }else{
        setVisibleSlide(state.currentSlideIndex)        
    }
}

function getCenterPosition(index) {
    const slide = sliderItems[index]
    const margin = (window.innerWidth - slide.offsetWidth) / 2
    const centerPosition = margin - (slide.offsetWidth * index)
    
    
    
    return centerPosition
}

function init() {
    setListeners()
    setVisibleSlide(2)
}

function onControlButtonClick(event, index) {
    setVisibleSlide(index)
}

function onMouseDown(event, index) {
    const slide = event.currentTarget
    state.mouseDownPosition = event.clientX
    state.currentSliderPosition = event.clientX - state.lastTranslatePosition
    state.currentSlideIndex = index
    animateTransition(false)
    slide.addEventListener('mousemove', onMouseMove)
}

function onMouseLeave(event){
    const slide = event.currentTarget
    slide.removeEventListener('mousemove', onMouseMove)
}


function onMouseMove(event) {
    state.movimentPosition = event.clientX - state.mouseDownPosition
    translateSlide(event.clientX - state.currentSliderPosition)
}


function onMouseUp(event) {
    const slide = event.currentTarget
    if(state.movimentPosition > 150) {
        backwardSlide()
    } else if (state.movimentPosition < -150){
        forwardSlide()
    } else {
        const calc = getCenterPosition(state.currentSlideIndex)
        translateSlide(calc)
    }
    slide.removeEventListener('mousemove', onMouseMove)
}

function preventDefault(event) {
    event.preventDefault()
}

function setListeners(){
    btnNext.addEventListener('click', forwardSlide)
    btnPrevius.addEventListener('click', backwardSlide)

    sliderItems.forEach(function (slide, index) {
        const link = slide.querySelector('.banner-slider__link')
        link.addEventListener('click', preventDefault)

        slide.addEventListener('dragstart', preventDefault)
        slide.addEventListener('mousedown', function(event) {
            onMouseDown(event, index)
        })
        slide.addEventListener('mouseup', onMouseUp)
        slide.addEventListener('mouseleave', onMouseLeave)
        btnControls[index].addEventListener('click', function(event) {
            onControlButtonClick(event,index)
        })
    })
}

function setVisibleSlide(index){
    const position = getCenterPosition(index)
    state.currentSlideIndex = index
    activeImageTitle(index)
    activeControlButton(index)
    animateTransition(true)
    translateSlide(position)
    
}

function translateSlide(position) {
    state.lastTranslatePosition = position
    slider.style.transform = `translateX(${position}px)`
}


