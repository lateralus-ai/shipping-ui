import type { ReactNode } from "react";
import { Provider } from "./Provider";
import { Container, type ContainerProps } from "./Container";

interface LayoutProps extends ContainerProps {
  isCollapsed?: boolean;
  onSwitchLayout?: (isCollapsed: boolean) => void;
}

export const Layout = ({
  className,
  children,
  isCollapsed,
  onSwitchLayout,
  ...props
}: LayoutProps) => {
  return (
    <Provider isCollapsed={isCollapsed} onSwitchLayout={onSwitchLayout}>
      <Container className={className} {...props}>
        {children}
      </Container>
    </Provider>
  );
};
