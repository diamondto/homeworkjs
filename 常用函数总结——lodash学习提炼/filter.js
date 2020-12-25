/**
 * Iterates over elements of `array`, returning an array of all elements
 * `predicate` returns truthy for. The predicate is invoked with three
 * arguments: (value, index, array).
 *
 * **Note:** Unlike `remove`, this method returns a new array.
 *
 * @since 5.0.0
 * @category Array
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 * @see pull, pullAll, pullAllBy, pullAllWith, pullAt, remove, reject
 * @example
 *
 * const users = [
 *   { 'user': 'barney', 'active': true },
 *   { 'user': 'fred',   'active': false }
 * ]
 *
 * filter(users, ({ active }) => active)
 * // => objects for ['barney']
 */
function filter(array, predicate) {
    let index = -1
    let resIndex = 0
    const length = array == null ? 0 : array.length
    const result = []
  
    while (++index < length) {
      const value = array[index] // 对每一个值调用函数判断
      if (predicate(value, index, array)) {
        result[resIndex++] = value
      }
      // 条件成立就放入到结果中，不成立不做操作，帅选出要的返回结果
    }
    return result
  }
  
  export default filter
  