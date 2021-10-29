import { makeAutoObservable } from 'mobx';
import { STORE_KEY_PREFIX } from '../constant';
import { saveJson } from '../utils';

class PageStore {
  rowData: {
    [key: string]: object;
  } = {};

  constructor() {
    makeAutoObservable(this);
  }

  resolveData(data: { [key: string]: object }) {
    // 解析 data 中的 $S
    this.rowData = data;
  }

  get data() {
    let _data = JSON.parse(saveJson(this.rowData), (key, value) => {
      if (
        // 匹配 store
        typeof value === 'string' &&
        value.startsWith(STORE_KEY_PREFIX)
      ) {
        return this.rowData[value.replace(STORE_KEY_PREFIX, '')];
      }
      return value;
    });
    return _data;
  }

  updateData(key: string, data: { [key: string]: object }) {
    this.rowData[key] = data;
  }
}

export default PageStore;
