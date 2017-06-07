/**
 * 用 flag 填充指定 length 长度的数组
 * @param length 填充数组的长度
 * @param flag true / false
 * @returns {Array.<*>}
 */
export function fill (length, flag) {
  // return Array(length).fill(flag)
  return Array.from({ length }).fill(flag)
}