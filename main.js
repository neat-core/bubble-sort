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

function drawArrayOnCanvas(canvasId, array) {
  const canvas = document.querySelector(`#${canvasId}`);
  let canvasXPoint = 0;

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    // Move y point of reference point
    ctx.translate(0, canvasHeight);
    // Reverse y graph direction.
    ctx.scale(1, -1);
    const graphWidth = canvasWidth / array.length;

    for (const item of array) {
      const graphHeight = (canvasHeight * item) / Math.max(...array);
      ctx.fillRect(canvasXPoint, 0, graphWidth, graphHeight);
      canvasXPoint = canvasXPoint + graphWidth;
    }
  }
}

const arrayLength = 10;
const sampleArray = new Array(arrayLength);
for (i = 0; i < arrayLength; i++) {
  sampleArray[i] = Math.round(Math.random() * 10);
}
const sortedArray = bubbleSort(sampleArray);

drawArrayOnCanvas("beforeSorting", sampleArray);
drawArrayOnCanvas("afterSorting", sortedArray);
