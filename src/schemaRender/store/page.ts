import { STORE_KEY_PREFIX } from '../constant';
import { makeAutoObservable, makeObservable, observable } from 'mobx';
import { saveJson } from '../utils';

class PageStore {
  // @observable rowData: {
  //   [key: string]: object;
  // } = {};

  @observable rowData: any = observable.map({});

  constructor() {
    makeObservable(this);
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

  updateData = (key: string, data: { [key: string]: object }) => {
    console.log('update data');

    this.rowData[key] = data;
  };
}

export default PageStore;
