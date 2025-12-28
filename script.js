const container = document.querySelector('.container');
const canvas = document.createElement('div');
container.appendChild(canvas);
canvas.className = 'canvas';

const initializeDiv = (length, type) => {
    for(let n = 0; n < length; n++) {
        const element = document.createElement(type);
        canvas.appendChild(element);
        element.className = 'pixel';
    }
}

initializeDiv(10000, 'div');

//change color of div if mouse is pressed and hovered over a pixel
//change color on event (for mousedown & mouseover only)
let isMousePressed = false;
canvas.onmousedown = ()=> isMousePressed = true;
document.onmouseup = () => {
    isMousePressed = false
    console.log('up')    
}

canvas.addEventListener('mousemove', e => {
    const eventElement = e.target;
    if(eventElement.className !== 'canvas'){
        if(isMousePressed) {
            eventElement.style.backgroundColor = 'red';
            eventElement.style.cursor = 'grabbing';
        }
        eventElement.onmousedown = ()=> {
            eventElement.style.backgroundColor = 'red';
            eventElement.style.cursor = 'grabbing';s
        }
    };

})

