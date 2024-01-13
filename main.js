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

const canvasWidth = 600;
const canvasHeight = 300;
let isCartesianCoordinateSystemSet = false;

function drawArrayOnCanvas(canvasId, array, pointerIndex) {
  const canvas = document.querySelector(`#${canvasId}`);
  let canvasXPoint = 0;

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    if (isCartesianCoordinateSystemSet === false) {
      // Move y point of reference point
      ctx.translate(0, canvasHeight);
      // Reverse y graph direction.
      ctx.scale(1, -1);
    }
      const graphWidth = canvasWidth / array.length;
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for (const [index, item] of array.entries()) {
      const graphHeight = (canvasHeight * item) / Math.max(...array);
      ctx.save();
      if (index === pointerIndex) {
        ctx.fillStyle = "blue";
      }
      else if (index === pointerIndex + 1) {
        ctx.fillStyle = "red";
      }
      ctx.fillRect(canvasXPoint, 0, graphWidth, graphHeight);
      ctx.restore();
      canvasXPoint = canvasXPoint + graphWidth;
    }
  }
}


async function drawBubbleSort(canvasId, arrayInput) {
  let array = [...arrayInput];
  let endIndex = array.length - 1;
  let temp = 0;
  const wait = (timeToDelay) =>
    new Promise((resolve) => setTimeout(resolve, timeToDelay));

  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < endIndex; j++) {
      await wait(100);
      drawArrayOnCanvas(canvasId, array, j);
      isCartesianCoordinateSystemSet = true;
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

const arrayLength = 10;
const sampleArray = new Array(arrayLength);
for (i = 0; i < arrayLength; i++) {
  sampleArray[i] = Math.round(Math.random() * 10);
}
const sortedArray = bubbleSort(sampleArray);

isCartesianCoordinateSystemSet = false;
drawBubbleSort("sortingAnimation", sampleArray);
isCartesianCoordinateSystemSet = false;
drawArrayOnCanvas("beforeSorting", sampleArray);
isCartesianCoordinateSystemSet = false;
drawArrayOnCanvas("afterSorting", sortedArray);
