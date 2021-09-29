import React from 'react';
import styles from './index.less';

import { saveJson } from '@/schemaRender/utils';

const layoutComponentMap = {
  Layout: (props: any) => {
    const { store, id } = props;

    const contentStyle = props.style || {};

    const data = JSON.parse(saveJson(store.pageData), function (key, value) {
      if (
        // 匹配 store
        typeof value === 'string' &&
        value.startsWith('$S.')
      ) {
        return store.pageData[value.replace('$S.', '')];
      }
      return value;
    });

    return (
      <div className={styles.wrap}>
        {JSON.stringify(data[id])}
        <div className={styles.header}>
          <h2>聚水潭开放平台</h2>
          <ul className={styles.list}>
            <li>
              <a href="">首页</a>
            </li>
            <li>
              <a href="">首页</a>
            </li>
            <li>
              <a href="">首页</a>
            </li>
            <li>
              <a href="">登录</a>
            </li>
          </ul>
        </div>
        <div className={styles.content} style={contentStyle}>
          {props.children}
        </div>
      </div>
    );
  },
};

export default layoutComponentMap;
