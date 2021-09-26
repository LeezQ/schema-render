import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IComponent {
  id: any;
  component: any;
  className?: any;
  style?: any;
  children?: any;
}

const PAGE_KEY_PREFIX = '$P.';
const COMPONENT_KEY_PREFIX = '$C.';
const EVENT_KEY_PREFIX = '$E.';

(window as any).PAGE_EVENT = {};

export default function SchemaRender(props: {
  schema: string;
  componentMap: any;
}) {
  let { schema = '{}', componentMap = {} } = props;
  schema = JSON.stringify(schema, function (key, value) {
    if (typeof value === 'function') {
      return '/Function(' + value.toString() + ')/';
    }
    return value;
  });

  const { structure, data, event } = JSON.parse(schema, function (key, value) {
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

  /**
   * 解析获取组件
   * @param child 组件 schema
   * @returns
   */
  function resolveComponent(child: IComponent) {
    let Component = null;
    if (child.component === Object(child.component)) {
      Component = child.component;
    } else if (componentMap?.[child.component]) {
      Component = componentMap[child.component];
    } else {
      Component = child.component;
    }

    return Component;
  }

  function renderChildren(children: any, compData: { [x: string]: any }): any {
    return children.map((child: IComponent) => {
      const Component = resolveComponent(child);
      const { id, className, style } = child;

      return React.createElement(
        Component,
        {
          key: id || uuidv4(),
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
    <>
      <div key={structure.id}>{renderChildren(structure.children, data)}</div>
    </>
  );
}
