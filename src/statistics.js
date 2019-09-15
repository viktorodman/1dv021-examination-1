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
 * @param {array[]} array An array of numbers.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} The maximum value of the passed array.
 */
function maximum (array) {
  notJustNumbers(array)
  errorHandling(array)
  const arrayCopy = array.slice()
  const sortedArray = sortNumbers(arrayCopy)
  return sortedArray[sortedArray.length - 1]
}
/**
 * Returns the mean of the numbers in the passed array
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the mean of the passed array.
 */
function mean (array) {
  notJustNumbers(array)
  errorHandling(array)
  const sum = array.reduce((acc, numbers) => acc + numbers, 0)
  return sum / array.length
}

/**
 * Returns the median of the numbers in the passed array
 * @param {array[]} array An array of numbers
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
/**
 *Returns the minimum of the numbers in the passed array.
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the minimum of the passed array.
 */
function minimum (array) {
  notJustNumbers(array)
  errorHandling(array)
  const arrayCopy = array.slice()
  const sortedArray = sortNumbers(arrayCopy)
  return sortedArray[0]
}
/**
 *Returns an array of the mode of the numbers in the passed array.
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {array[]} Returns the mode of the passed array.
 */
// CLEAN UP
function mode (array) {
  notJustNumbers(array)
  errorHandling(array)
  const arrayCopy = array.slice()
  let timesInArray = occurrencesInArray(arrayCopy)
  const arrayMode = []
  // TODO: Check if i can change the sortNumbers so that i can
  // sort an array with objects
  timesInArray = sortNumbers(timesInArray)
  const newArray = timesInArray.filter(function (numbers) {
    return numbers.occurrences === timesInArray[0].occurrences
  })
  for (const numbers of newArray) {
    arrayMode.push(numbers.number)
  }
  return arrayMode
}
/**
 *Returns the range of the numbers in the passed array.
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the range of the passed array.
 */
function range (array) {
  errorHandling(array)
  return (maximum(array)) - (minimum(array))
}
/**
 *Returns the standard deviation of the numbers in the passed array.
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the standard deviation of the passed array.
 */
function standardDeviation (array) {
  errorHandling(array)
  // Check the mean of the array
  const meanDev = mean(array)
  let tempRangeDev = []
  const rangeDev = []
  const squareDev = []
  // Check the range for each number in the array against the mean of the array
  for (const num of array) {
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
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {TypeError} The passed array contains not just numbers.
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
 * @param {array[]} array An array of numbers
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
 *Returns a sorted version of the passed array. Sorted from min to max.
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {array[]} returns a sorted version of the passed array
 */
function sortNumbers (array) {
  // errorHandling(array)
  // notJustNumbers(array)
  if (typeof (array[0]) === 'object' && !Array.isArray(array[0]) && array !== null) {
    const sortedObject = array.sort(function (a, b) {
      return b.occurrences - a.occurrences
    })
    return sortedObject
  } else {
    const sortedArray = array.sort(function (a, b) {
      return a - b
    })
    return sortedArray
  }
}
/**
 *Returns a version of the passed array but the elemnts cant have duplicates.
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {array[]} Returns the passed array but with no duplicates.
 */
function numbersInArray (array) {
  errorHandling(array)
  const result = []
  for (let i = 0; i < array.length; i++) {
    if (!result.includes(array[i])) {
      result.push(array[i])
    }
  }
  return sortNumbers(result)
}
/**
 *Returns an array with multiple objects.
 *The objects show how many times a certain number in
 *the passed array occurs.
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {array[{}]} Returns the occurrence of the numbers in the passed array
 */
function occurrencesInArray (array) {
  errorHandling(array)
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
