const container = document.querySelector('.container');
const heading = document.createElement('h1');
heading.innerText = 'Etch-A-Sketch';
heading.className = 'heading';
container.appendChild(heading);

const canvas = document.createElement('div');
container.appendChild(canvas);
canvas.className = 'canvas';

let pixelList = '';

const initializeDiv = (size) => {
    let length = Math.sqrt(size);
    for(let n = 0; n < size; n++) {
        const element = document.createElement('div');
        canvas.appendChild(element);
        element.className = 'pixel';
    }
    pixelList = document.querySelectorAll('.pixel')
    pixelList.forEach(e => {
        e.style.flexBasis = `${(1/length) * 100}%`;
    })
}

const buttons = document.createElement('div');
container.appendChild(buttons);
buttons.className = 'buttons'

const sliderLabel = document.createElement('label');

const slider = document.createElement('input');
buttons.appendChild(slider);
const sliderAttribute = {
    class: 'slider',
    type: 'range',
    name: 'pixel-slider',
    min: '4',
    max: '16',
    step: '4',
    value: '4'
}
for(let [className, attribute] of Object.entries(sliderAttribute)){
    slider.setAttribute(className, attribute);
}

//change color of div if mouse is pressed and hovered over a pixel
//change color on event (for mousedown & mouseover only)
let isMousePressed = false;
canvas.onmousedown = (e)=> {
    e.preventDefault()
    isMousePressed = true;
};
window.onmouseup = () => {
    isMousePressed = false;
}

canvas.addEventListener('mouseover', e => {
    const eventElement = e.target;
    if(eventElement.className !== 'canvas'){
        if(isMousePressed) { 
            eventElement.style.backgroundColor = 'red';
            eventElement.style.cursor = 'grabbing';
        }
        eventElement.onmousedown = ()=> {
            e.stopPropagation();
            eventElement.style.backgroundColor = 'red';
        }
    };
})

slider.addEventListener('change', (e)=> {
    canvas.innerHTML = '';
    const value = e.target.value;
    if(value) {
        value == 4 ? length = 16 : '';
        value == 8 ? length = 32 : '';
        value == 12 ? length = 64 : '';
        value == 16 ? length = 100 : '';
        initializeDiv(length ** 2);
    }
    pixelList.forEach(e => e.style.border = '1px solid black')
})

const changeEvent = new Event('change');
slider.dispatchEvent(changeEvent);

slider.onmousedown = () => {
    slider.dispatchEvent(changeEvent);
} 

canvas.onmouseup = () => {
    pixelList.forEach(e => {
        e.style.border = 'none'
    })
}