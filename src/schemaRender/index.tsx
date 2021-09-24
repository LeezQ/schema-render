import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IComponent {
  id: any;
  component: any;
  className?: any;
  style?: any;
  children?: any;
}

export default function SchemaRender(props: {
  schema: string;
  componentMap: any;
}) {
  const { schema = '{}', componentMap = {} } = props;
  const { structure, data } = JSON.parse(schema, function (k, v) {
    if (typeof v === 'string' && v.startsWith('$page')) {
      return function () {
        console.log(123);
      };
    } else if (typeof v === 'string' && v.startsWith('$C')) {
      return componentMap[v.substr(3)];
    }
    return v;
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
