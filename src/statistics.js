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
  return maximum(numbers) + ' ' + mean(numbers) + ' ' + median(numbers)
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

  return sortedArray[array.length - 1]
}
/**
 * Returns the mean of the sum of all numbers in the passed array
 * @param {array[]} array An array of numbers
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} Returns the mean of the sum of the array
 */
function mean (array) {
  // TODO: Check the mean value of the array
  errorHandling(array)
  const sum = array.reduce((acc, numbers) => acc + numbers, 0)
  return sum / array.length
}
function median (array) {
  // TODO: Check for errors
  errorHandling(array)
  // TODO: Sort the numbers in the array
  const sortedArray = sortNumbers(array)
  // used the example in the answer on how to find the middle of an odd array
  // https://stackoverflow.com/questions/20904368/javascript-finding-the-most-middle-value-in-an-array
  const oddMedian = Math.round((sortedArray.length - 1) / 2)
  // TODO: If the the amount of numbers in the array are odd
  if (sortedArray.length % 2 !== 0) {
    return oddMedian
  }
  // take the number in middle of the array
  // IF 'even' Call the mean function with the two middle numbers.
  // TODO: Return the median of the array
  return oddMedian
}
// TODO: Write your code here.
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
function sortNumbers (array) {
  const sortedArray = array.sort(function (a, b) {
    return a - b
  })
  return sortedArray
}

// Exports
exports.descriptiveStatistics = descriptiveStatistics
exports.maximum = maximum
exports.mean = mean
exports.median = median
exports.minimum = undefined
exports.mode = undefined
exports.range = undefined
exports.standardDeviation = undefined
