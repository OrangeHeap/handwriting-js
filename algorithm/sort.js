// 冒泡排序
function bubbleSort(arr) {
  const length = arr.length;

  for (let i = 0; i < length; i++) {
    let flag = false;
    for (let j = 0; j < length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j+1] + arr[j]];

        flag = true;
      }
    }

    if (!flag) return arr;
  }

  return arr;
}

// 选择排序
function selectSort(arr) {
  const length = arr.length

  let minIndex;

  for (let i = 0; i < length - 1; i++) {
    minIndex = i;

    for (let j = i; i < length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr
}

// 插入排序
function insertSort(arr) {
  const length = arr.length;

  let tmp;

  for (let i = 1; i < length; i++) {
    let j = i;
    tmp = arr[i];

    while (j > 0 && arr[j - 1] > tmp) {
      arr[j] = arr[j - 1];
      j--;
    }

    arr[j] = tmp;
  }

  return arr
}

// 归并排序
function mergeSort(arr) {
  const length = arr.length;

  if (length <= 1) return arr;

  const middle = Math.floor(length / 2);
  const leftArray = mergeSort(arr.slice(0, middle));
  const rightArray = mergeSort(arr.slice(middle, length));

  arr = mergeArray(leftArray, rightArray)

  function mergeArray(arr1, arr2) {
    let i = 0, j = 0;
    const result = []
    const length1 = arr1.length;
    const length2 = arr2.length;
    while (i < length1 && j < length2) {
      if (arr1[i] < arr2[j]) {
        result.push(arr1[i]);
        i++;
      } else {
        result.push(arr2[j]);
        j++;
      }
    }

    if (i < length1) {
      return result.concat(arr1.slice(i))
    } else {
      return result.concat(arr2.slice(j))
    }
  }

  return arr
}

// 快速排序
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (arr.length > 1) {
    const nextPivot = partition(arr, left, right);

    if (left < nextPivot - 1) {
      quickSort(arr, left, nextPivot - 1);
    }
    if (right > nextPivot) {
      quickSort(arr, nextPivot, right);
    }
  }

  // 寻找基准值
  function partition (arr, left, right) {
    let pivotValue = arr[Math.floor(left + (right - left) / 2)]
    let i = left;
    let j = right;

    // 当左右指针不越界时，执行以下循环
    while (i <= j) {
      while (arr[i] < pivotValue) {
        i++;
      }
      while (arr[j] > pivotValue) {
        j--;
      }

      if (i <= j) {
        swap(arr, i, j);
        i++;
        j--;
      }
    }

    return i
  }
// 交换数组内元素
  function swap(arr, i, j) {
    return [arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr;
}
