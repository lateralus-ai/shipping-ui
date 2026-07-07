import { Button } from "../../primitives";
import { Avatar } from "../../primitives";
import { cn } from "../../utils/cn";
import type { Chief } from "../Sidebar/Switcher";

export type ModalFooterProps = {
  chief?: Chief;
  className?: string;
};

const chiefLabels: Record<Chief, string> = {
  technical: "Technical Chief",
  compliance: "Compliance Chief",
};

export const ModalFooter = ({
  chief = "technical",
  className,
}: ModalFooterProps) => (
  <footer
    className={cn(
      "flex items-center justify-between gap-3 border-t border-divider-primary bg-background-secondary px-4 py-3",
      className,
    )}
    data-chief={chief}
  >
    <div className="flex items-center gap-2">
      <Avatar chief={chief} size={24} />
      <span className="text-caption-2 text-display-on-light-secondary">
        {chiefLabels[chief]}
      </span>
    </div>

    <div className="flex items-center gap-2">
      <Button hierarchy="secondary">Cancel</Button>
      <Button hierarchy="primary">Confirm</Button>
    </div>
  </footer>
);
