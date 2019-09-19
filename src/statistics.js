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
  errorHandling(array)
  // const arrayCopy = array.slice()
  return Math.max(...array)
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
  errorHandling(array)
  const arrayCopy = array.slice()
  const sum = arrayCopy.reduce(function (acc, numbers) {
    return acc + numbers
  }, 0)
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
  errorHandling(array)
  const arrayCopy = array.slice()
  const sortedArray = sortNumbers(arrayCopy)
  // used the example in the answer on how to find the middle of an odd array
  // https://stackoverflow.com/questions/20904368/javascript-finding-the-most-middle-value-in-an-array
  const oddMedian = sortedArray[Math.round((sortedArray.length - 1) / 2)]
  const secondMiddleNumber = sortedArray[oddMedian]
  const firstMiddleNumber = sortedArray[secondMiddleNumber - 1]
  const evenMedian = [firstMiddleNumber, secondMiddleNumber]
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
function mode (array) {
  errorHandling(array)
  const arrayCopy = array.slice()
  // Puts all the occurrences property values in an array
  const numberOcc = occurrencesInArray(arrayCopy).map(function (number) {
    return number.occurrences
  })
  // Checks for the max value of the property 'occurrences' and saves
  // all objects in an array thats equal to the max value.
  const newArray = occurrencesInArray(arrayCopy).filter(function (numbers) {
    return numbers.occurrences === maximum(numberOcc)
  })
  // Saves the property value of the property number in a new array.
  const arrayMode = newArray.map(function (numbers) {
    return numbers.number
  })
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
  const arrayCopy = array.slice()
  // Check the range for each number in the array against the mean of the array
  const rangeDev = arrayCopy.map(function (number) {
    return range([number, mean(arrayCopy)])
  })
  // Square all numbers
  const squareDev = rangeDev.map(function (numbers) {
    return Math.pow(numbers, 2)
  })
  // Returns the square root of the mean of squareDev.
  // This is the standardDeviation of the array
  return Math.sqrt(mean(squareDev))
}

/**
 *Throws TypeError if the passed the passed argument is not an array
 *or if the passed array contains no elements.
 * @param {number[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 */
function errorHandling (array) {
  if (!Array.isArray(array)) {
    throw TypeError('The passed argument is not an array.')
  } else if (array.length === 0) {
    throw Error('The passed array contains no elements.')
  } else {
    for (let i = 0; i < array.length; i++) {
      if (typeof (array[i]) !== 'number') {
        throw TypeError('The passed array contains not just numbers.')
      }
    }
  }
}
/**
 * Sort the passed arrays values from min to max.
 * @param {number[]} array An array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {array[]} returns a sorted version of the passed array.
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
  const arrayCopy = array.slice()
  /* const result = []
  for (let i = 0; i < arrayCopy.length; i++) {
    if (!result.includes(arrayCopy[i])) {
      result.push(arrayCopy[i])
    }
  } */

  const result = [...new Set(arrayCopy)]
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
