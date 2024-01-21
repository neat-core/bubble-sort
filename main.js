const canvasWidth = 600;
const canvasHeight = 300;
let isCartesianCoordinateSystemSet = false;
const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

function bubbleSort(arrayInput) {
  let array = [...arrayInput];
  let endIndex = array.length - 1;
  let temp = 0;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < endIndex; j++) {
      if (array[j] > array[j + 1]) {
        temp = array[j + 1];
        array[j + 1] = array[j];
        array[j] = temp;
      }
    }
    endIndex = endIndex - 1;
  }

  return array;
}

// Draw array instantly.
async function drawArrayOnCanvas(canvasId, array) {
  const canvas = document.querySelector(`#${canvasId}`);
  let canvasXPoint = 0;

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    // if (isCartesianCoordinateSystemSet === false) {
    //   // Move y point of reference point
    //   ctx.translate(0, canvasHeight);
    //   // Reverse y graph direction.
    //   ctx.scale(1, -1);
    // }
    const graphWidth = canvasWidth / array.length;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (const [index, item] of array.entries()) {
      const graphHeight = (canvasHeight * item) / Math.max(...array);
      ctx.fillRect(canvasXPoint, 0, graphWidth, graphHeight);
      canvasXPoint = canvasXPoint + graphWidth;
    }
  }

  return new Promise((resolve) => resolve(1));
}

async function drawBubbleSortAnimation(canvasId, arrayInput) {
  let array = [...arrayInput];
  let endIndex = array.length - 1;
  let temp = 0;

  const canvas = document.querySelector(`#${canvasId}`);
  const graphWidth = canvasWidth / array.length;

  // Start to draw animation on canvas
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");

    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < endIndex; j++) {
        if (array[j] > array[j + 1]) {
          const tallerGraphHeight = (canvasHeight * array[j]) / Math.max(...array);
          const shorterGraphHeight = (canvasHeight * array[j + 1]) / Math.max(...array);
          const canvasXPointStart = graphWidth * j;
          let tallerXPoint = canvasXPointStart;
          let shorterXPoint = canvasXPointStart + graphWidth;
          ctx.clearRect(canvasXPointStart, 0, graphWidth * 2, canvasHeight);

          // Draw graph before animating.
          ctx.restore();
          drawArrayOnCanvas(canvasId, array);

          //Draw changing animation.
          const animationMS = 2000;
          ctx.save();
          while (shorterXPoint >= canvasXPointStart) {
            // TODO: Add function to pause animation using await.

            // Draw taller graph item.
            ctx.fillStyle = "blue";
            ctx.fillRect(tallerXPoint, 0, graphWidth, tallerGraphHeight);
            ctx.restore();
            ctx.save();
            // Move x grid to left.
            tallerXPoint = tallerXPoint + 1;

            // Draw shorter graph item.
            ctx.fillStyle = "red";
            ctx.fillRect(shorterXPoint, 0, graphWidth, shorterGraphHeight);
            ctx.restore();
            ctx.save();
            // Moving x grid to right.
            shorterXPoint = shorterXPoint - 1;

            ctx.clearRect(canvasXPointStart, 0, graphWidth * 2, canvasHeight);
          }

          // Do real sorting.
          temp = array[j + 1];
          array[j + 1] = array[j];
          array[j] = temp;
        }
      }
      endIndex = endIndex - 1;
    }

    drawArrayOnCanvas(canvasId, array);
  }
}

const arrayLength = 6;
const sampleArray = new Array(arrayLength);
for (i = 0; i < arrayLength; i++) {
  sampleArray[i] = Math.round(Math.random() * 5);
}
const sortedArray = bubbleSort(sampleArray);

// isCartesianCoordinateSystemSet = false;
drawBubbleSortAnimation("sortingAnimation", sampleArray);
// isCartesianCoordinateSystemSet = false;
drawArrayOnCanvas("beforeSorting", sampleArray);
// isCartesianCoordinateSystemSet = false;
drawArrayOnCanvas("afterSorting", sortedArray);
