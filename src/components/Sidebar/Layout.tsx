import { Provider } from "./Provider"
import { Container, type ContainerProps } from "./Container"
import { ReactNode } from "react"
import { SideContainer } from "./SideContainer"

interface LayoutProps extends ContainerProps {
  isCollapsed?: boolean
  sideContainer?: ReactNode
  sideClassName?: string
  onSwitchLayout?: (isCollapsed: boolean) => void
}

export const Layout = ({
  className,
  children,
  isCollapsed,
  sideContainer,
  sideClassName,
  onSwitchLayout,
  ...props
}: LayoutProps) => {
  return (
    <Provider isCollapsed={isCollapsed} onSwitchLayout={onSwitchLayout}>
      {sideContainer && (
        <SideContainer className={sideClassName}>{sideContainer}</SideContainer>
      )}
      <Container className={className} {...props}>
        {children}
      </Container>
    </Provider>
  )
}
