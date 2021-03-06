import {
  COMPONENT_KEY_PREFIX,
  EVENT_KEY_PREFIX,
  PAGE_KEY_PREFIX,
} from './constant';

import PageStore from './store/page';
import { PageStoreProvider } from './provider';
import React from 'react';
import { observer } from 'mobx-react';
import { saveJson } from './utils';
import { v4 as uuidv4 } from 'uuid';

const pageStore = new PageStore();

interface IComponent {
  id: any;
  component: any;
  className?: any;
  style?: any;
  children?: any;
}

export interface ICommonProps extends IComponent {
  store: any;
}

(window as any).PAGE_EVENT = {};

function SchemaRender(props: { schema: string; componentMap: any }) {
  let { schema = '{}', componentMap = {} } = props;
  schema = saveJson(schema);

  let { structure, data, event } = JSON.parse(schema, function (key, value) {
    // 匹配关键字
    if (typeof value === 'string' && value.startsWith(PAGE_KEY_PREFIX)) {
      // 匹配页面
      return function () {};
    } else if (
      typeof value === 'string' &&
      value.startsWith(COMPONENT_KEY_PREFIX)
    ) {
      // 匹配自定义组件
      return componentMap[value.replace(COMPONENT_KEY_PREFIX, '')];
    } else if (
      typeof value === 'string' &&
      value.startsWith(EVENT_KEY_PREFIX)
    ) {
      // 匹配事件
      // PAGE_EVENT[EVENT_KEY_PREFIX] = PAGE_EVENT[key];
      return (window as any).PAGE_EVENT[value.replace(EVENT_KEY_PREFIX, '')];
    } else if (
      typeof value === 'string' &&
      value.startsWith('/Function(') &&
      value.endsWith(')/')
    ) {
      value = value.substring(10, value.length - 2);
      (window as any).PAGE_EVENT[key] = (0, eval)('(' + value + ')');
      // return (0, eval)('(' + value + ')');
    }

    return value;
  });

  pageStore.resolveData(data);

  /**
   * 解析获取组件
   * @param child 组件 schema
   * @returns
   */
  function resolveComponent(child: IComponent) {
    let Component: any = null;
    if (child.component === Object(child.component)) {
      Component = child.component;
    } else if (componentMap?.[child.component]) {
      Component = componentMap[child.component];
    } else {
      Component = child.component;
    }
    return Component;
  }

  /**
   * 添加observer
   * @param Component 传入组件
   * @returns
   */
  function wrapObserver(Component: any) {
    return observer(Component);
  }

  function renderChildren(children: any, compData: { [x: string]: any }): any {
    return children.map((child: IComponent) => {
      const Component = wrapObserver(resolveComponent(child));
      const { id, className, style } = child;

      return React.createElement(
        Component,
        {
          key: id || uuidv4(),
          id,
          className,
          style,
          ...(compData[child.id] || {}),
        },
        Array.isArray(child.children)
          ? renderChildren(child.children, data || {})
          : child.children || null,
      );
    });
  }

  if (!structure) return null;

  return (
    <PageStoreProvider store={pageStore}>
      <div key={structure.id} data-pageid={structure.id}>
        {renderChildren(structure.children || [], data)}
      </div>
    </PageStoreProvider>
  );
}

export default observer(SchemaRender);
