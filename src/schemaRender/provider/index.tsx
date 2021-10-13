import React, { createContext, useContext } from 'react';

const PageStoreContext = createContext<any>({});

const PageStoreProvider = ({
  store,
  children,
}: {
  store: any;
  children: any;
}) => {
  return (
    <PageStoreContext.Provider value={store}>
      {children}
    </PageStoreContext.Provider>
  );
};

const usePageStore = () => {
  return useContext(PageStoreContext);
};

export { PageStoreProvider, usePageStore };
