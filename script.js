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

initializeDiv(100, 'div');

//change color of div if mouse is pressed and hovered over a pixel
//change color on event (for mousedown & mouseover only)

document.querySelectorAll('.pixel').forEach( pixel => {
    pixel.addEventListener('mouseover', e =>{
        if(e.type == 'mousedown'){
            e.target.style.backgroundColor = 'red';
        }
    })
})
