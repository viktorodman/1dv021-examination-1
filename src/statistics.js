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
  errorHandling(numbers)
  const descriptiveStatisticsObject = {
    maximum: maximum(numbers),
    mean: mean(numbers),
    median: median(numbers),
    minimum: minimum(numbers),
    mode: mode(numbers),
    range: range(numbers),
    standardDeviation: standardDeviation(numbers)
  }
  return descriptiveStatisticsObject
}
/**
 * Returns the maximum value of the passed array
 *
 * @param {number[]} array An array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} The maximum value of the passed array.
 */
function maximum (array) {
  errorHandling(array)
  const arrayCopy = array.slice()
  return Math.max(...arrayCopy)
}

/**
 * Returns the mean of the numbers in the passed array
 *
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the mean of the passed array.
 */
function mean (array) {
  errorHandling(array)
  const arrayCopy = array.slice()
  const sum = arrayCopy.reduce(function (acc, numbers) {
    return acc + numbers
  }, 0)
  return sum / arrayCopy.length
}

/**
 * Returns the median of the numbers in the passed array
 *
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the median of the passed array.
 */
function median (array) {
  errorHandling(array)
  const arrayCopy = array.slice()
  const sortedArray = sortNumbers(arrayCopy)
  let theMedian
  // Used the example from the lecture.
  // https://youtu.be/nlZ9PX1zfbI?t=5938
  const middleOfArray = Math.round(sortedArray.length / 2)
  if (sortedArray.length % 2 !== 0) {
    theMedian = sortedArray[middleOfArray - 1]
  } else {
    theMedian = mean([sortedArray[middleOfArray - 1], sortedArray[middleOfArray]])
  }
  return theMedian
}
/**
 * Returns the minimum of the numbers in the passed array.
 *
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the minimum of the passed array.
 */
function minimum (array) {
  errorHandling(array)
  const arrayCopy = array.slice()
  return Math.min(...arrayCopy)
}
/**
 * Returns an array of the mode of the numbers in the passed array.
 *
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number[]} Returns an array of the mode of the passed array.
 */
function mode (array) {
  errorHandling(array)
  const arrayCopy = array.slice()
  const freqInArray = frequenciesInArray(arrayCopy)
  // Puts all the frequency property values in an array
  const numberFrequency = freqInArray.map(function (number) {
    return number.frequency
  })
  // Checks for the max value of the property 'frequency' and saves
  // all objects in an array thats equal to the max value.
  const mostFrequentNumbers = freqInArray.filter(function (numbers) {
    return numbers.frequency === maximum(numberFrequency)
  })
  // Saves the property value of the property number in a new array.
  const modeOfArray = mostFrequentNumbers.map(function (numbers) {
    return numbers.number
  })
  return sortNumbers(modeOfArray)
}
/**
 * Returns the range of the numbers in the passed array.
 *
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the range of the passed array.
 */
function range (array) {
  errorHandling(array)
  const arrayCopy = array.slice()
  return (maximum(arrayCopy)) - (minimum(arrayCopy))
}
/**
 * Returns the standard deviation of the numbers in the passed array.
 *
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the standard deviation of the passed array.
 */
function standardDeviation (array) {
  errorHandling(array)
  const arrayCopy = array.slice()
  const meanOfArray = mean(arrayCopy)
  // Check the range for each number in the array against the mean of the array
  const checkRange = arrayCopy.map(function (number) {
    return range([number, meanOfArray])
  })
  // Square all numbers
  const squareNumbers = checkRange.map(function (numbers) {
    return Math.pow(numbers, 2)
  })
  // Returns the square root of the mean of the numbers in squareNumbers
  // This is the standardDeviation of the array
  return Math.sqrt(mean(squareNumbers))
}

/**
 * Throws a TypeError if the passed array is not an array
 * or if the passed array contains not just numbers.
 * Throw an Error if the passed array contains no elements.
 *
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 */
function errorHandling (array) {
  if (!Array.isArray(array)) {
    throw new TypeError('The passed argument is not an array.')
  } else if (array.length === 0) {
    throw new Error('The passed array contains no elements.')
  } else {
    array.forEach(function (element) {
      if (typeof (element) !== 'number') {
        throw new TypeError('The passed array contains not just numbers.')
      }
    })
  }
}
/**
 * Sort the passed arrays values from min to max.
 *
 * @param {number[]} array An array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {array[]} Returns a sorted version of the passed array.
 */
function sortNumbers (array) {
  errorHandling(array)
  const arrayCopy = array.slice()
  const sortedArray = arrayCopy.sort(function (a, b) {
    return a - b
  })
  return sortedArray
}
/**
 * Returns an array with multiple objects.
 * The objects shows the frequency of the numbers in the passed array.
 *
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {object[]} Returns an array with objects that shows the frequency of the numbers in the passed array.
 */
function frequenciesInArray (array) {
  errorHandling(array)
  const arrayCopy = array.slice()
  const result = []
  let count = 0
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set#Remove_duplicate_elements_from_the_array
  // Used this to remove duplicate values from arrayCopy
  // to make it easier to compare it against arrayCopy
  const setObject = new Set(arrayCopy)
  const compare = [...setObject]
  compare.forEach(function (number) {
    arrayCopy.forEach(function (number2) {
      if (number === number2) {
        count++
      }
    })
    result.push({
      number: number,
      frequency: count
    })
    count = 0
  })
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
