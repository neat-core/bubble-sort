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

function printComparedArraies(array1, array2) {
  console.log(`array1: ${array1}`);
  console.log(`array2: ${array2}`);
}

const arrayLength = 20;
const sampleArray = new Array(20);
for (i = 0; i < arrayLength; i++) {
  sampleArray[i] = Math.round(Math.random() * 10);
}

const sortedArray = bubbleSort(sampleArray);

printComparedArraies(sampleArray, sortedArray);
