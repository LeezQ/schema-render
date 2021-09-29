import { makeAutoObservable } from 'mobx';

class PageStore {
  pageData: {
    [key: string]: object;
  } = {};

  constructor() {
    makeAutoObservable(this);
  }

  resolveData(data: { [key: string]: object }) {
    this.pageData = data;
  }

  updateData(key: string, data: { [key: string]: object }) {
    this.pageData[key] = data;
  }
}

export default PageStore;
