import { createIllustration } from "./createIllustration";

export const WorkflowCreatedIllustration = createIllustration({
  name: "Workflow created",
  children: (
    <>
      <rect x="24" y="40" width="72" height="40" rx="8" fill="var(--blue-50)" stroke="var(--blue-600)" strokeWidth="1.5" />
      <path d="M40 60h40M52 48v24" stroke="var(--blue-400)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="84" cy="32" r="14" fill="var(--green-100)" stroke="var(--green-700)" strokeWidth="1.5" />
      <path d="M79 32l3 3 6-6" stroke="var(--green-700)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
});
