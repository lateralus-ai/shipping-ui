import { createIllustration } from "./createIllustration";

export const WorkflowsIllustration = createIllustration({
  name: "Workflows",
  children: (
    <>
      <rect x="20" y="24" width="32" height="24" rx="6" fill="var(--blue-50)" stroke="var(--blue-600)" strokeWidth="1.5" />
      <rect x="68" y="24" width="32" height="24" rx="6" fill="var(--blue-50)" stroke="var(--blue-600)" strokeWidth="1.5" />
      <rect x="44" y="72" width="32" height="24" rx="6" fill="var(--blue-100)" stroke="var(--blue-600)" strokeWidth="1.5" />
      <path d="M52 48v12M68 48v12M52 60h16" stroke="var(--blue-400)" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
});
