/**
 * 保存页面 schema 的时候用到
 * @param schema
 * @returns
 */
export default function saveJson(schema: object | string) {
  return JSON.stringify(schema, function (key, value) {
    if (typeof value === 'function') {
      return '/Function(' + value.toString() + ')/';
    }
    return value;
  });
}
