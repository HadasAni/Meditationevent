//גדלים של האובייקטים
let sizesX = [700, 300, 1800, 500, 700, 800, 400, 1800, 700, 600, 500, 200, 300, 200, 200, 300]; // Image sizes
let sizesY = [700, 300, 600, 500, 1100, 1200, 1000, 400, 700, 700, 400, 200, 400, 200, 200, 300]; // Image sizes
//מיקומים
let widths = [2 , 3, 3, 3, 1.2, 8, 1, 2, 1.1, 12, 2, 2.5, 3, 1.5, 2, 1.2]; // X positions
let heights = [1.2, 3, 7, 7, 1.5, 1.5, 1.3, 1.1, 6.7, 4.9, 2, 1.5, 1.2, 3, 3, 2, 2];
// משתנים של תמונה, ספירה לאחור, תנועת ריחוף, טקסטים, רקע, גיף
let images = [];
let count = 8;
let title = "Exhale";
let customFont;
let yOffset;
let backgroundImage;
let gif;
let restartButtonImg;
let originalSizesX; // Array to store the original sizesX
let originalSizesY; // Array to store the original sizesY
let originalWidths; // Array to store the original widths
let originalHeights; // Array to store the original heights

// העלאת הפונט, גיף רקע
function preload() {
  customFont = loadFont('SVN-Aire Pro Regular.otf');
  for (let i = 1; i <= 16; i++) {
    let img = loadImage(i + ".png");
    images.push(img);
  }
  backgroundImage = loadImage('BGS.png');
  gif = loadGif('gifs.gif');
}
// גודל טקסטֿ קנבס, פונט, הפעלת הטיימר, הצבת הגדלים בתוך משתני אחסון, כפתור ריסטארט
function setup() {
  createCanvas(1728, 1117);
  textSize(64);
  textAlign(CENTER);
  textFont(customFont);
  setInterval(updateCountdown, 1000);
  originalSizesX = [...sizesX]; // Store the original sizesX
  originalSizesY = [...sizesY]; // Store the original sizesY
  originalWidths = [...widths]; // Store the original widths
  originalHeights = [...heights]; // Store the original heights
  // Create the restart button
  let restartButton = createImg("restart.png");
  restartButton.position(1400, 950);
  restartButton.size(180, 70);
  restartButton.mouseClicked(restart);
  
}
// מיקום האלמנטים
function draw() {
  image(backgroundImage, 400, 300);
  imageMode(CENTER);
  image(gif, width/2, height/3, 600, 400);
  
  for (let i = 0; i < images.length; i++) {
    let img = images[i];

    // Calculate the vertical offset using the sin function
    let yOffset = sin(frameCount * 0.05 + i * 10) * 10; // Adjust the amplitude as needed

    // Draw the image with the offset
    image(img, width / widths[i], height / heights[i] + yOffset, sizesX[i], sizesY[i]);

  }
  // שורות הטקסט

  fill(255);
  text(title, width / 2, height / 1.7);
  text(count, width / 2, height / 2 + 200);
  text("You are invited to clear your mind", width / 2, height / 2 + 300);
}
// תפעול הטיימר
function updateCountdown() {
  count--;

  if (count === 0) {
    if (title === "Exhale") {
      title = "Inhale";
      count = 4;
    } else {
      title = "Exhale";
      count = 8;
    }
  }

  if (count === 0 && title === "Exhale") {
    clearInterval();
    count = 8;
    title = "Exhale";
    setInterval(updateCountdown, 1000);
  }
}
// לחיצה על האלמנטים והעלמתם
function mouseClicked() {
  // Check if the mouse is clicked within the bounds of each image
  for (let i = images.length - 1; i >= 0; i--) {
    let imgX = width / widths[i];
    let imgY = height / heights[i] + sin(frameCount * 0.05 + i * 0.1) * 10;
    let imgWidth = sizesX[i];
    let imgHeight = sizesY[i];

    // Check if the mouse is clicked within the bounds of the image
    if (
      mouseX >= imgX - imgWidth / 2 &&
      mouseX <= imgX + imgWidth / 2 &&
      mouseY >= imgY - imgHeight / 2 &&
      mouseY <= imgY + imgHeight / 2
    ) {
      // Remove the clicked image from the images array
      if (i > -1) {
      images.splice(i, 1);
      heights.splice(i, 1);
      widths.splice(i, 1);
      sizesY.splice(i, 1);
      sizesX.splice(i, 1);
      }
      break; // Exit the loop after removing the image
    }
  }
}
// הפעלת כפתור ריסטראט
function restart() {
  // Reset the positions of the images to their original values
  sizesX = [...originalSizesX];
  sizesY = [...originalSizesY];
  widths = [...originalWidths];
  heights = [...originalHeights];
  images = [];
  for (let i = 1; i <= 16; i++) {
    let img = loadImage(i + ".png");
    images.push(img);
  }
}