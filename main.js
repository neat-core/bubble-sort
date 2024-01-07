function bubbleSort(arrayInput) {
  let array = [...arrayInput];
  const arrayLength = array.length;

  let temp = 0;
  for (let i = 0; i < arrayLength - 1; i++) {
    for (let j = i + 1; j < arrayLength; j++) {
      if (array[i] < array[j]) {
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
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
      ctx.strokeRect(canvasXPoint, 0, graphWidth, graphHeight);
      canvasXPoint = canvasXPoint + graphWidth;
    }
  }
}

const arrayLength = 20;
const sampleArray = new Array(20);
for (i = 0; i < arrayLength; i++) {
  sampleArray[i] = Math.round(Math.random() * 10);
}
const sortedArray = bubbleSort(sampleArray);

drawArrayOnCanvas("beforeSorting", sampleArray);
drawArrayOnCanvas("afterSorting", sortedArray);
