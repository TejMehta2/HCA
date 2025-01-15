// context/InPageNavigationContext.tsx
import { NavigableComponent } from 'components/TableOfContents/TableOfContents.types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface InPageNavigationContextProps {
  components: NavigableComponent[];
  addComponent: (component: NavigableComponent) => void;
  removeComponent: (componentName: string) => void;
}

const InPageNavigationContext = createContext<
  InPageNavigationContextProps | undefined
>(undefined);

export const InPageNavigationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [components, setComponents] = useState<NavigableComponent[]>([]);

  const addComponent = (component: NavigableComponent) => {
    setComponents((prev) => {
      if (!prev.find((c) => c.Id === component.Id)) {
        return [...prev, component];
      }
      return prev;
    });
  };

  const removeComponent = (componentId: string) => {
    setComponents((prev) =>
      prev.filter((component) => component.Id !== componentId)
    );
  };

  return (
    <InPageNavigationContext.Provider
      value={{ components, addComponent, removeComponent }}
    >
      {children}
    </InPageNavigationContext.Provider>
  );
};

export const useInPageNavigationContext = (): InPageNavigationContextProps => {
  const context = useContext(InPageNavigationContext);
  if (!context) {
    throw new Error(
      'useInPageNavigation must be used within an InPageNavigationProvider'
    );
  }
  return context;
};
