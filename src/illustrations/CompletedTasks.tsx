import { createIllustration } from "./createIllustration";

export const CompletedTasksIllustration = createIllustration({
  name: "Completed tasks",
  children: (
    <>
      <rect x="28" y="32" width="64" height="12" rx="4" fill="var(--green-100)" />
      <rect x="28" y="52" width="64" height="12" rx="4" fill="var(--green-100)" />
      <rect x="28" y="72" width="48" height="12" rx="4" fill="var(--grey-100)" />
      <circle cx="36" cy="38" r="4" fill="var(--green-700)" />
      <circle cx="36" cy="58" r="4" fill="var(--green-700)" />
      <circle cx="36" cy="78" r="4" fill="var(--grey-300)" />
      <path d="M34 38l1.5 1.5 3-3M34 58l1.5 1.5 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
});
