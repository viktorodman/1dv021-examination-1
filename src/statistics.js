/**
 * Module for obtaining descriptive information about a set of data.
 *
 * @author TODO: Write your name here.
 * @version 1.2.0
 */

'use strict'

/**
 * Returns the descriptive information (maximum, mean, median, minimum,
 * mode, range and standard deviation) from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {{maximum: number, mean: number, median: number, minimum: number, mode: number[], range: number, standardDeviation: number}}
 */
function descriptiveStatistics (numbers) {
  // TODO: Write your code here.
  /* return 'maximum = ' + maximum(numbers) +
  ' ' + 'mean = ' + mean(numbers) +
  ' ' + 'median = ' + median(numbers) +
  ' ' + 'minimum = ' + minimum(numbers) +
  ' ' + 'mode = ' + mode(numbers) +
  ' ' + 'range = ' + range(numbers) +
  ' ' + 'standardDeviation = ' + standardDeviation(numbers) */
  const descriptiveObject = {
    maximum: maximum(numbers),
    mean: mean(numbers),
    median: median(numbers),
    minimum: minimum(numbers),
    mode: mode(numbers),
    range: range(numbers),
    standardDeviation: standardDeviation(numbers)
  }
  return descriptiveObject
}
/**
 * Returns the maximum value of an array
 * @param {array[]} array The array .. .. ..
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} The maximum value of the passed array
 */
function maximum (array) {
  // TODO: Check for the max value in the array
  errorHandling(array)
  const sortedArray = sortNumbers(array)
  return sortedArray[sortedArray.length - 1]
}
/**
 * Returns the mean of the sum of all numbers in the passed array
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the mean of the array
 */
function mean (array) {
  // TODO: Check the mean value of the array
  errorHandling(array)
  const sum = array.reduce((acc, numbers) => acc + numbers, 0)
  return sum / array.length
}

/**
 *
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @throws {number} Returns the median of the array
 */
function median (array) {
  errorHandling(array)
  const sortedArray = sortNumbers(array)
  // used the example in the answer on how to find the middle of an odd array
  // https://stackoverflow.com/questions/20904368/javascript-finding-the-most-middle-value-in-an-array
  const oddMedian = sortedArray[Math.round((sortedArray.length - 1) / 2)]
  const evenMedian = []
  const secondMiddleNumber = Math.round(((sortedArray.length) / 2))
  const firstMiddleNumber = secondMiddleNumber - 1

  // puts the two middle numbers of sortedArray into evenMedian
  evenMedian.push(sortedArray[firstMiddleNumber], sortedArray[secondMiddleNumber])
  // return the number in middle of the array
  if (sortedArray.length % 2 !== 0) {
    return oddMedian
  } else {
    return mean(evenMedian)
  }
}
// TODO: ADD JSDOC-COMMENTS
function minimum (array) {
  errorHandling(array)
  const sortedArray = sortNumbers(array)
  return sortedArray[0]
}
// TODO: ADD JSDOC-COMMENTS
// CLEAN UP
function mode (array) {
  errorHandling(array)
  const occurrences = occurrencesInArray(array)
  // TODO:
  // const sortedArray = sortNumbers(array)
  const arrayMode = []
  occurrences.sort(function (a, b) {
    return b.occurrences - a.occurrences
  })
  const newArray = occurrences.filter(function (numbers) {
    return numbers.occurrences === occurrences[0].occurrences
  })
  for (const numbers of newArray) {
    arrayMode.push(numbers.number)
  }
  // console.log(sortedArray)
  // console.log(arrayMode)
  return arrayMode
}
// TODO: ADD JSDOC-COMMENTS
function range (array) {
  errorHandling(array)
  return (maximum(array)) - (minimum(array))
}
function standardDeviation (array) {
  errorHandling(array)
  // TODO: Check the mean of the array
  const meanDev = mean(array)
  let tempRangeDev = []
  const rangeDev = []
  const squareDev = []
  // TODO: Check the range for each number in the array against the mean of the array
  for (const num of array) {
    tempRangeDev.push(num, meanDev)

    rangeDev.push(range(tempRangeDev))
    tempRangeDev = []
  }
  // console.log(rangeDev)
  // TODO: Square all numbers
  for (const num of rangeDev) {
    squareDev.push(Math.pow(num, 2))
  }
  // console.log(squareDev)
  // TODO: Check the mean of all numbers
  const newMean = mean(squareDev)
  // console.log(newMean)
  // TODO: Check the square root of the sum
  const deviation = Math.sqrt(newMean)
  // console.log(deviation)
  return deviation
}
// TODO: Write your code here.
// TODO: ADD JSDOC-COMMENTS
function errorHandling (array) {
  if (!Array.isArray(array)) {
    throw TypeError('The passed argument is not an array.')
  }
  // TODO: Check if the passed argument is empty
  if (array.length === 0) {
    throw Error('The passed array contains no elements.')
  }
  // TODO: Check if the passed argument is an array only with numbers
}
// TODO: ADD JSDOC-COMMENTS
function sortNumbers (array) {
  const sortedArray = array.sort(function (a, b) {
    return a - b
  })
  return sortedArray
}
// TODO: ADD JSDOC-COMMENTS
function numbersInArray (array) {
  // TODO: Checks what numbers is the passed array
  // Only one of each number will be returned
  const result = []
  for (let i = 0; i < array.length; i++) {
    if (!result.includes(array[i])) {
      result.push(array[i])
    }
  }
  return sortNumbers(result)
}
// TODO: ADD JSDOC-COMMENTS
function occurrencesInArray (array) {
  const result = []
  let count = 0
  const sortedArray = sortNumbers(array)
  const compare = numbersInArray(array)
  for (let i = 0; i < compare.length; i++) {
    for (let x = 0; x < sortedArray.length; x++) {
      if (compare[i] === sortedArray[x]) {
        count++
      }
    }
    // and push the result of have many times number occurs into result
    result.push({
      number: compare[i],
      occurrences: count
    })
    count = 0
  }
  return result
}

// Exports
exports.descriptiveStatistics = descriptiveStatistics
exports.maximum = maximum
exports.mean = mean
exports.median = median
exports.minimum = minimum
exports.mode = mode
exports.range = range
exports.standardDeviation = standardDeviation
