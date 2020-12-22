/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size ) {
//     size = Math.max(toInteger(size), 0)
    // 保证size是正数
    const length = array == null ? 0 : array.length
    if (!length || size < 1) {
      return [] // 边界排查
    }
    let index = 0 // 原数组下标
    let resIndex = 0  // 新数组下标
    const result = new Array(Math.ceil(length / size))
    // 新数组需要多大的长度
  
    while (index < length) {
      result[resIndex++] = array.slice(index, (index += size))
    }
    // 存放到新数组中，每次复制指定的步长，这样就可以切片分组了！
    return result
  }
  
  export default chunk
  
