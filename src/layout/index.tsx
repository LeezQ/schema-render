import React from 'react';
import styles from './index.less';

import { saveJson } from '@/schemaRender/utils';

const layoutComponentMap = {
  Layout: (props: any) => {
    const { store, id } = props;

    const contentStyle = props.style || {};

    return (
      <div className={styles.wrap}>
        {JSON.stringify(store.data[id])}
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
