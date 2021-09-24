import React from 'react';

export default function SchemaPage(props: {
  schema: string;
  componentMap: any;
}) {
  const { schema = '{}', componentMap = {} } = props;
  const { structure, data } = JSON.parse(schema);

  //   let components = {};
  function resolveComponent(schema: { component: PropertyKey }) {
    let Component = null;
    if (schema.component === Object(schema.component)) {
      Component = schema.component;
    } else if (componentMap?.[schema.component]) {
      Component = componentMap[schema.component];
    } else {
      Component = schema.component;
    }

    return Component;
  }

  function renderChildren(children: any, compData: { [x: string]: any }): any {
    return children.map(
      (child: { children: any; id: string; component: any }) => {
        const Component = resolveComponent(child);
        const { id, className, style } = child;

        if (child.children && Array.isArray(child.children)) {
          return React.createElement(
            Component,
            {
              key: id,
              className,
              style,
              'data-id': id,
              ...(compData[child.id] || {}),
            },
            Array.isArray(child.children)
              ? renderChildren(child.children, data || {})
              : child.children || null,
          );
        } else {
          console.log(222, child, compData[child.id], compData[child.id] || {});

          return React.createElement(
            Component,
            {
              key: id,
              className,
              style,
              'data-id': id,
              ...(compData[child.id] || {}),
            },
            child.children,
          );
        }
      },
    );
  }

  if (!structure) return null;

  return (
    <>
      <div key={structure.id}>{renderChildren(structure.children, data)}</div>
    </>
  );
}
