const canvasWidth = 600;
const canvasHeight = 300;
const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay));

function bubbleSortKeyFeature(arrayInput, index) {
  let array = [...arrayInput];
  let temp = 0;
  temp = array[index + 1];
  array[index + 1] = array[index];
  array[index] = temp;

  return array;
}

function bubbleSort(arrayInput) {
  let array = [...arrayInput];
  let endIndex = array.length - 1;

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < endIndex; j++) {
      if (array[j] > array[j + 1]) {
        const tempArray = [...array];
        array = bubbleSortKeyFeature(tempArray, j);
      }
    }
    endIndex = endIndex - 1;
  }

  return array;
}

// Draw array instantly.
function drawArrayOnCanvas(canvasId, array) {
  const canvas = document.querySelector(`#${canvasId}`);
  let canvasXPoint = 0;

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const graphWidth = canvasWidth / array.length;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (const [index, item] of array.entries()) {
      const graphHeight = (canvasHeight * item) / Math.max(...array);
      ctx.fillRect(canvasXPoint, 0, graphWidth, graphHeight);
      canvasXPoint = canvasXPoint + graphWidth;
    }
  }
}

async function drawBubbleSortAnimation(canvasId, arrayInput) {
  let array = [...arrayInput];
  let endIndex = array.length - 1;

  const canvas = document.querySelector(`#${canvasId}`);
  const graphWidth = canvasWidth / array.length;

  // Start to draw animation on canvas
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    // Set graph to cartesianCoordinateSystem
    ctx.translate(0, canvasHeight);
    ctx.scale(1, -1);

    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < endIndex; j++) {
        if (array[j] > array[j + 1]) {
          const tallerGraphHeight =
            (canvasHeight * array[j]) / Math.max(...array);
          const shorterGraphHeight =
            (canvasHeight * array[j + 1]) / Math.max(...array);
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
            // Draw taller graph item.
            ctx.fillStyle = "blue";
            ctx.translate(tallerXPoint, 0);
            ctx.fillRect(0, 0, graphWidth, tallerGraphHeight);
            ctx.restore();
            ctx.save();
            // Move x grid to left.
            tallerXPoint = tallerXPoint + 1;

            // Draw shorter graph item.
            ctx.fillStyle = "red";
            ctx.translate(shorterXPoint, 0);
            ctx.fillRect(0, 0, graphWidth, shorterGraphHeight);
            ctx.restore();
            ctx.save();
            // Moving x grid to right.
            shorterXPoint = shorterXPoint - 1;

            await wait(5);
            ctx.clearRect(canvasXPointStart, 0, graphWidth * 2, canvasHeight);
          }

          // Do real sorting.
          const tempArray = [...array];
          array = bubbleSortKeyFeature(tempArray, j);
        }
      }
      endIndex = endIndex - 1;
    }

    drawArrayOnCanvas(canvasId, array);
  }
}

function drawGraph() {
  const arrayLength = 10;
  const sampleArray = new Array(arrayLength);
  for (i = 0; i < arrayLength; i++) {
    sampleArray[i] = Math.round(Math.random() * 10);
  }
  const sortedArray = bubbleSort(sampleArray);
  
  drawBubbleSortAnimation("sortingAnimation", sampleArray);
}

drawGraph();