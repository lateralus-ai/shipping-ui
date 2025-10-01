import { createContext, useState, type ReactNode } from "react";

export const collapsedContext = createContext<
  | {
      isCollapsed: boolean;
      toggleCollapsed: () => void;
      isHovered: boolean;
      setIsHovered: (value: boolean) => void;
    }
  | undefined
>(undefined);

interface ProviderProps {
  children: ReactNode;
  isCollapsed?: boolean;
  onSwitchLayout?: (isCollapsed: boolean) => void;
}

export const Provider = ({
  children,
  isCollapsed: controlledIsCollapsed,
  onSwitchLayout,
}: ProviderProps) => {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isCollapsed =
    controlledIsCollapsed !== undefined
      ? controlledIsCollapsed
      : internalIsCollapsed;

  const toggleCollapsed = (value?: boolean) => {
    const newValue = value ?? !isCollapsed;
    if (controlledIsCollapsed === undefined) {
      setInternalIsCollapsed(newValue);
    }
    onSwitchLayout?.(newValue);
  };

  return (
    <collapsedContext.Provider
      value={{ isCollapsed, toggleCollapsed, isHovered, setIsHovered }}
    >
      {children}
    </collapsedContext.Provider>
  );
};
