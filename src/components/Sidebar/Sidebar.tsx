import type { ReactNode } from "react";
import { Provider } from "./Provider";
import { Container, type ContainerProps } from "./Container";

interface SidebarProps extends ContainerProps {
  isCollapsed?: boolean;
  onSwitchLayout?: (isCollapsed: boolean) => void;
}

export const Sidebar = ({
  className,
  children,
  isCollapsed,
  onSwitchLayout,
  ...props
}: SidebarProps) => {
  return (
    <Provider isCollapsed={isCollapsed} onSwitchLayout={onSwitchLayout}>
      <Container className={className} {...props}>
        {children}
      </Container>
    </Provider>
  );
};
