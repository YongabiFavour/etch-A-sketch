const gridContainer = document.getElementById('grid-container');
const resetBtn = document.getElementById('resetBtn');

let gridSize = 16; // Default 16x16 grid

// Generate random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Parse RGB string and darken it by 10%
function darkenColor(rgbString) {
    const match = rgbString.match(/\d+/g);
    if (!match || match.length < 3) return rgbString;
    
    let r = parseInt(match[0]);
    let g = parseInt(match[1]);
    let b = parseInt(match[2]);
    
    // Reduce each component by 10%
    r = Math.floor(r * 0.9);
    g = Math.floor(g * 0.9);
    b = Math.floor(b * 0.9);
    
    return `rgb(${r}, ${g}, ${b})`;
}

// Add hover effect to a square
function addHoverEffect(square) {
    let currentColor = null;
    let hoverCount = 0;
    
    square.addEventListener('mouseover', () => {
        if (hoverCount === 0) {
            // First hover: set random color
            currentColor = getRandomColor();
            square.style.backgroundColor = currentColor;
        } else if (hoverCount < 10) {
            // Subsequent hovers: darken by 10%
            currentColor = darkenColor(currentColor);
            square.style.backgroundColor = currentColor;
        }
        hoverCount++;
    });
}

// Create grid with specified size
function createGrid(size) {
    gridContainer.innerHTML = ''; // Clear existing grid
    const squareSize = 100 / size; // Calculate percentage size
    
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.flex = `1 1 calc(${squareSize}% - 0px)`;
        
        addHoverEffect(square);
        gridContainer.appendChild(square);
    }
}

// Handle reset button click
resetBtn.addEventListener('click', () => {
    let newSize = prompt('How many squares per side?', '16');
    
    // Validate input
    if (newSize === null) return; // User cancelled
    
    newSize = parseInt(newSize);
    
    if (isNaN(newSize) || newSize < 1 || newSize > 100) {
        alert('Please enter a valid number between 1 and 100');
        return;
    }
    
    gridSize = newSize;
    createGrid(gridSize);
});

// Initialize grid on page load
createGrid(gridSize);