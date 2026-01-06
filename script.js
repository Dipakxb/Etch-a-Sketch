const container = document.querySelector('.container');
const heading = document.createElement('h1');
heading.innerText = 'Etch-A-Sketch';
heading.className = 'heading';
container.appendChild(heading);
let brushColor = '#DD0303';
const canvasColor = '#F5F2F2';

const canvasContainer = document.createElement('div');
canvasContainer.className = "canvas-container";
container.appendChild(canvasContainer);

const canvas = document.createElement('div');
canvasContainer.appendChild(canvas);
canvas.className = 'canvas';

let pixelList = '';

const initializeDiv = (size) => {
    let length = Math.sqrt(size);
    for(let n = 0; n < size; n++) {
        const element = document.createElement('div');
        canvas.appendChild(element);
        element.className = 'pixel';
    }
    pixelList = document.querySelectorAll('.pixel');
    pixelList.forEach(e => {
        e.style.flexBasis = `${(1/length) * 100}%`;
    })
}

//buttons container
const buttonsContainer = document.createElement('div');
container.appendChild(buttonsContainer);
buttonsContainer.className = 'buttons-container';

//slider label
const sliderLabel = document.createElement('label');
buttonsContainer.appendChild(sliderLabel);
sliderLabel.className = 'slider-label';

//buttons
const buttons = document.createElement('div');
buttonsContainer.appendChild(buttons);
buttons.className = 'buttons';

//slider container
const sliderContainer = document.createElement('div');
buttons.appendChild(sliderContainer);
sliderContainer.className = 'slider-container';

//slider
const slider = document.createElement('input');
sliderContainer.appendChild(slider);
const sliderAttribute = {
    class: 'slider',
    type: 'range',
    name: 'pixel-slider',
    min: '4',
    max: '16',
    step: '4',
    value: '4'
}

function addAttribute(element, attribute) {
    for(let [className, at] of Object.entries(attribute)){
        element.setAttribute(className, at);
    }
}

addAttribute(slider, sliderAttribute)

//change color of div if mouse is pressed and hovered over a pixel
//change color on event (for mousedown & mouseover only)
let isMousePressed = false;
let hasPixelClicked = false;

canvas.onmousedown = (e)=> {
    e.preventDefault();
    isMousePressed = true;
    colorPicker.dispatchEvent(changeEvent);
}

window.onmouseup = () => {
    isMousePressed = false;
    hasPixelClicked = false;
}

canvas.addEventListener('mouseover', e => {
    const eventElement = e.target;
    if(eventElement.className !== 'canvas'){
        const elementStyle = eventElement.style;
        if(isMousePressed) { 
            if(isPaintSelected) {
                eventElement.classList.add(1.1);
                let emp = eventElement.classList[1];      
                elementStyle.backgroundColor = brushColor;
                elementStyle.filter = `brightness(calc(${emp} - 0.1))`;
                eventElement.classList.replace(emp, emp - 0.1);
            }
            if(isEraserSelected) {
                let emp = eventElement.classList[1];
                elementStyle.backgroundColor = canvasColor;
                elementStyle.filter = `brightness(1)`;
                eventElement.classList.replace(emp, 1)
            }
        } 
        eventElement.onmousedown = () =>  {
            if(isPaintSelected) {
                eventElement.classList.add(1.1);
                let emp = eventElement.classList[1];           
                elementStyle.backgroundColor = brushColor;
                elementStyle.filter = `brightness(calc(${emp} - 0.1))`;
                eventElement.classList.replace(emp, emp - 0.1);
            }
            if(isEraserSelected) {
                let emp = eventElement.classList[1];
                elementStyle.backgroundColor = canvasColor;
                elementStyle.filter = `brightness(1)`;
                eventElement.classList.replace(emp, 1);
            }
        }

    }
})

// add slider to change the pixel density, showing the grid before using canvas.

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
    sliderLabel.innerText = `${length}x${length}`;
    pixelList.forEach(e => e.style.border = '1px solid black');
})

const changeEvent = new Event('change');
slider.dispatchEvent(changeEvent);

slider.onmousedown = () => {
    slider.dispatchEvent(changeEvent);
} 

canvas.onmouseup = () => {
    pixelList.forEach(e => {
        e.style.border = 'none';
    });
}

// Add Eraser with eraser tool selected erase the pixel.

//paint button
const paint = document.createElement('img');
buttons.appendChild(paint);
const paintAttribute = {
    class: 'paint button',
    src: 'images/paint.png',
    alt: 'Paint Button'
}
addAttribute(paint, paintAttribute)

let isPaintSelected = true;
paint.onclick = () => { 
    isPaintSelected = !isPaintSelected;
    isEraserSelected = false;
    paint.style.filter = isPaintSelected ? 'invert(40%)' : 'invert(0%)';
    eraser.style.filter = 'invert(0%)';
}

//eraser button
const eraser = document.createElement('img');
buttons.appendChild(eraser);
const eraserAttribute = {
    class: 'eraser button',
    src: 'images/eraser.png',
    alt: 'Eraser Button'
}
addAttribute(eraser, eraserAttribute);

let isEraserSelected = false;
eraser.onclick = () => { 
    isEraserSelected = !isEraserSelected;
    isPaintSelected = false;
    eraser.style.filter = isEraserSelected ? 'invert(40%)' : 'invert(0%)';
    paint.style.filter = 'invert(0%)';
}

//Color wheel
const colorPicker = document.createElement('input');
const colorPickerAtr = {
    type: 'color',
    name: 'color picker',
    value: brushColor,
    class: 'color-picker',
}

colorPicker.onchange = (e) => {
    brushColor = e.target.value;
}

//color container
const colorContainer = document.createElement('div');
colorContainer.className = 'color-container';
canvasContainer.appendChild(colorContainer);

//color picker
addAttribute(colorPicker, colorPickerAtr);
colorContainer.appendChild(colorPicker);

//color pointer 
const colorPointer = document.createElement('img');
const colorPointerAtr = {
    class: 'color-pointer',
    src: 'images/pointer.png',
    alt: 'arrow pointing to color picker'
}

addAttribute(colorPointer, colorPointerAtr);
colorContainer.appendChild(colorPointer);

// color label
const colorLabel = document.createElement('img');
const colorLabelAtr = {
    class: 'color-label',
    src: 'images/color-label.png',
    alt: 'arrow pointing to color picker'
}

addAttribute(colorLabel, colorLabelAtr);
colorContainer.appendChild(colorLabel);