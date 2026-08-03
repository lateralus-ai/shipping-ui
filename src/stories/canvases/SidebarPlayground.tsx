import { SidebarShell, type Chief } from "../../patterns/Sidebar";
import { SidebarDemo } from "./SidebarDemo";

export type SidebarPlaygroundProps = {
  chief?: Chief;
  activity?: boolean;
  ships?: boolean;
  collapsed?: boolean;
};

export const SidebarPlayground = ({
  chief = "technical",
  activity = true,
  ships = true,
  collapsed = false,
}: SidebarPlaygroundProps) => (
  <SidebarShell
    sidebar={
      <SidebarDemo
        key={`${chief}-${activity}-${ships}-${collapsed}`}
        chief={chief}
        activity={activity}
        ships={ships}
        collapsed={collapsed}
      />
    }
  >
    <div className="flex min-h-full flex-col items-center justify-center gap-2 p-8 text-display-on-light-tertiary">
      <p className="text-caption-1 text-display-on-light-secondary">Sidebar playground</p>
      <p className="max-w-sm text-center text-caption-2">
        Click the Ships chevron to expand or collapse the fleet list. Use the footer
        button to collapse the sidebar — hover the collapsed sidebar to expand it again.
      </p>
    </div>
  </SidebarShell>
);
