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
  let canvasYPoint = 0;

  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const graphWidth = canvasWidth / array.length;

    for (const item of array) {
      const graphHeight = canvasHeight * item / Math.max(...array);
      ctx.fillRect(canvasXPoint, canvasYPoint, graphWidth, graphHeight);
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

// 필요 동작 기능
// 1. 배열을 입력받아 배열 정보에 해당되는 그래프를 canvas에 그리는 함수를 생성
// TODO: 1번에서 생성한 함수에서 그래프 그리는 로직을 다른 함수로 뺀다. 
