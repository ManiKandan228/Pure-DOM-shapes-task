const appContainer = document.getElementById('app');

function initializeShapes() {
    appContainer.innerHTML = ''; 

    const shapeDiv = document.createElement('div');
    shapeDiv.classList.add('shape-div');

    const shapes = ['triangle', 'square', 'circle'];
    shapes.forEach(shape => {
        const shapeElement = document.createElement('div');
        shapeElement.classList.add('shape', shape);
        shapeElement.id = shape;
        shapeElement.addEventListener('click', () => chooseShape(shape));
        shapeDiv.appendChild(shapeElement);
    });

    appContainer.appendChild(shapeDiv);
}

function chooseShape(selectedShape) {
    appContainer.innerHTML = ''; 
    const shapeHighlight = document.createElement('div');
    shapeHighlight.classList.add('shape', selectedShape, 'highlight');
    shapeHighlight.id = selectedShape;
    appContainer.appendChild(shapeHighlight);

    const inputGroup = document.createElement('div');
    inputGroup.classList.add('input-group');

    const dimension1 = document.createElement('input');
    dimension1.type = 'text';
    dimension1.classList.add('input-field');
    dimension1.id = 'dimension1';

    const dimension2 = document.createElement('input');
    dimension2.type = 'text';
    dimension2.classList.add('input-field');
    dimension2.id = 'dimension2';

    if (selectedShape === 'triangle') {
        dimension1.placeholder = 'Enter base';
        dimension2.placeholder = 'Enter height';
        dimension2.style.display = 'block';
    } else if (selectedShape === 'square') {
        dimension1.placeholder = 'Enter side length';
        dimension2.style.display = 'none';
    } else if (selectedShape === 'circle') {
        dimension1.placeholder = 'Enter radius';
        dimension2.style.display = 'none';
    }

    inputGroup.appendChild(dimension1);
    inputGroup.appendChild(dimension2);

    const calcButton = document.createElement('button');
    calcButton.innerText = 'Calculate Area';
    calcButton.addEventListener('click', () => calculateArea(selectedShape, dimension1.value, dimension2.value));
    appContainer.appendChild(inputGroup);
    appContainer.appendChild(calcButton);

    const backButton = document.createElement('button');
    backButton.innerText = 'Back to Shapes';
    backButton.addEventListener('click', initializeShapes);
    appContainer.appendChild(backButton);
}

function calculateArea(shape, dimension1, dimension2) {
    let area = 0;

    if (shape === 'triangle') {
        const base = parseFloat(dimension1);
        const height = parseFloat(dimension2);
        if (!isNaN(base) && !isNaN(height)) {
            area = 0.5 * base * height;
        } else {
            alert('Please enter valid number');
            return;
        }
    } else if (shape === 'square') {
        const side = parseFloat(dimension1);
        if (!isNaN(side)) {
            area = side * side;
        } else {
            alert('Please enter a valid number ');
            return;
        }
    } else if (shape === 'circle') {
        const radius = parseFloat(dimension1);
        if (!isNaN(radius)) {
            area = Math.PI * radius * radius;
        } else {
            alert('Please enter a valid number');
            return;
        }
    }

    showResult(shape, area);
}

function showResult(shape, area) {
    appContainer.innerHTML = ''; 
    const resultShape = document.createElement('div');
    resultShape.classList.add('shape', shape, 'highlight');
    resultShape.id = shape;

    const resultField = document.createElement('input');
    resultField.type = 'text';
    resultField.classList.add('input-field');
    resultField.value = `Area: ${area.toFixed(2)}`;
    resultField.disabled = true;

    const backButton = document.createElement('button');
    backButton.innerText = 'Back to Shapes';
    backButton.addEventListener('click', initializeShapes);

    appContainer.appendChild(resultShape);
    appContainer.appendChild(resultField);
    appContainer.appendChild(backButton);
}

window.onload = initializeShapes;
