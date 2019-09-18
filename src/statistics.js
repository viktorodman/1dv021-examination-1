/**
 * Module for obtaining descriptive information about a set of data.
 *
 * @author Viktor Ödman
 * @version 1.0.0
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
  notJustNumbers(numbers)
  errorHandling(numbers)
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
 * Returns the maximum value of the passed array
 * @param {number[]} array An array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} The maximum value of the passed array.
 */
function maximum (array) {
  notJustNumbers(array)
  errorHandling(array)
  const arrayCopy = array.slice()
  return Math.max(...arrayCopy)
}
/**
 * Returns the mean of the numbers in the passed array
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the mean of the passed array.
 */
function mean (array) {
  notJustNumbers(array)
  errorHandling(array)
  const arrayCopy = array.slice()
  const sum = arrayCopy.reduce((acc, numbers) => acc + numbers, 0)
  return sum / arrayCopy.length
}

/**
 * Returns the median of the numbers in the passed array
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the median of the passed array.
 */
function median (array) {
  notJustNumbers(array)
  errorHandling(array)
  const arrayCopy = array.slice()
  const sortedArray = sortNumbers(arrayCopy)
  // used the example in the answer on how to find the middle of an odd array
  // https://stackoverflow.com/questions/20904368/javascript-finding-the-most-middle-value-in-an-array
  const oddMedian = sortedArray[Math.round((sortedArray.length - 1) / 2)]
  const evenMedian = []
  const secondMiddleNumber = sortedArray[oddMedian]
  const firstMiddleNumber = sortedArray[secondMiddleNumber - 1]
  // puts the two middle numbers of sortedArray into evenMedian
  evenMedian.push(sortedArray[firstMiddleNumber], sortedArray[secondMiddleNumber])
  // return the number in middle of the array
  if (sortedArray.length % 2 !== 0) {
    return oddMedian
  } else {
    return mean(evenMedian)
  }
}
/**
 * Returns the minimum of the numbers in the passed array.
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the minimum of the passed array.
 */
function minimum (array) {
  notJustNumbers(array)
  errorHandling(array)
  const arrayCopy = array.slice()
  return Math.min(...arrayCopy)
}
/**
 *Returns an array of the mode of the numbers in the passed array.
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number[]} Returns the mode of the passed array.
 */
// CLEAN UP
function mode (array) {
  notJustNumbers(array)
  errorHandling(array)
  const arrayCopy = array.slice()
  const arrayMode = []
  const numberOcc = occurrencesInArray(arrayCopy).map(function (number) {
    return number.occurrences
  })
  const newArray = occurrencesInArray(arrayCopy).filter(function (numbers) {
    return numbers.occurrences === maximum(numberOcc)
  })
  for (const numbers of newArray) {
    arrayMode.push(numbers.number)
  }
  return sortNumbers(arrayMode)
}
/**
 *Returns the range of the numbers in the passed array.
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the range of the passed array.
 */
function range (array) {
  errorHandling(array)
  notJustNumbers(array)
  const arrayCopy = array.slice()
  return (maximum(arrayCopy)) - (minimum(arrayCopy))
}
/**
 *Returns the standard deviation of the numbers in the passed array.
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the standard deviation of the passed array.
 */
function standardDeviation (array) {
  errorHandling(array)
  notJustNumbers(array)
  const arrayCopy = array.slice()
  // Check the mean of the array
  const meanDev = mean(arrayCopy)
  let tempRangeDev = []
  const rangeDev = []
  const squareDev = []
  // Check the range for each number in the array against the mean of the array
  for (const num of arrayCopy) {
    tempRangeDev.push(num, meanDev)
    rangeDev.push(range(tempRangeDev))
    tempRangeDev = []
  }
  // Square all numbers
  for (const num of rangeDev) {
    squareDev.push(Math.pow(num, 2))
  }
  // Checks the mean of all numbers
  const newMean = mean(squareDev)
  // Check the square root of the sum
  const deviation = Math.sqrt(newMean)
  return deviation
}

/**
 *Throws TypeError if the passed the passed argument is not an array
 *or if the passed array contains no elements.
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 */
function errorHandling (array) {
  if (!Array.isArray(array)) {
    throw TypeError('The passed argument is not an array.')
  }
  if (array.length === 0) {
    throw Error('The passed array contains no elements.')
  }
}
/**
 *Throws error if the passed array contains not just numbers.
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed array contains not just numbers.
 */
function notJustNumbers (array) {
  for (let i = 0; i < array.length; i++) {
    if (typeof (array[i]) !== 'number') {
      throw TypeError('The passed array contains not just numbers.')
    }
  }
}

/**
 * Sort the passed arrays values from min to max.
 * @param {number[]} array An array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @returns {array[]} returns a sorted version of the passed array.
 */
function sortNumbers (array) {
  errorHandling(array)
  notJustNumbers(array)
  const arrayCopy = array.slice()
  const sortedArray = arrayCopy.sort(function (a, b) {
    return a - b
  })
  return sortedArray
}
/**
 * Returns a version of the passed array but an elements value
 * can only exist ones in the returned array.
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number[]} Returns the passed array but with no duplicates.
 */
function numbersInArray (array) {
  errorHandling(array)
  notJustNumbers(array)
  const arrayCopy = array.slice()
  const result = []
  for (let i = 0; i < arrayCopy.length; i++) {
    if (!result.includes(arrayCopy[i])) {
      result.push(arrayCopy[i])
    }
  }
  return result
}
/**
 * Returns an array with multiple objects.
 * The objects show how many times a certain number in
 * the passed array occurs.
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {object[]} Returns an array with objects that shows the occurrence of the numbers in the passed array.
 */
function occurrencesInArray (array) {
  errorHandling(array)
  notJustNumbers(array)
  const arrayCopy = array.slice()
  const result = []
  let count = 0
  const compare = numbersInArray(arrayCopy)
  for (let i = 0; i < compare.length; i++) {
    for (let x = 0; x < arrayCopy.length; x++) {
      if (compare[i] === arrayCopy[x]) {
        count++
      }
    }
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
