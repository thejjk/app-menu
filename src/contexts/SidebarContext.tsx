import { createContext, FC, useEffect, useState } from 'react';
type SidebarContext = {
  sidebarToggle: any;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const SidebarContext = createContext<SidebarContext>(
  {} as SidebarContext
);

export const SidebarProvider: FC = ({ children }) => {
  const [sidebarToggle, setSidebarToggle] = useState(false);  
  const toggleSidebar = () => {
    setSidebarToggle(!sidebarToggle);
  };


  function emitEvent(name, data) {
    dispatchEvent(new CustomEvent(name, {
      detail: data,
    }))
  }

  const toggleSidebarx = () => {
    emitEvent('@mc/react-route/todo/add-task', false)
  }

  const closeSidebar = () => {
    toggleSidebarx()
    setSidebarToggle(false);
  }


  function listenEvent(name, cb) {
    window.addEventListener(name, cb)
  }

  useEffect(() => {
    listenEvent('@mc/react-route/todo/add-task', event => {
      setSidebarToggle(event.detail)
    })
  }, [])


  return (
    <SidebarContext.Provider
      value={{ sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
