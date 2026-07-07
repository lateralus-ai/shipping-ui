import { createIllustration } from "./createIllustration";

export const QuestionsDoneIllustration = createIllustration({
  name: "Questions done",
  children: (
    <>
      <rect x="32" y="28" width="56" height="64" rx="8" fill="var(--grey-50)" stroke="var(--grey-300)" strokeWidth="1.5" />
      <circle cx="44" cy="48" r="6" fill="var(--green-100)" stroke="var(--green-700)" strokeWidth="1.5" />
      <path d="M42 48l1.5 1.5 3-3" stroke="var(--green-700)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="56" y="44" width="24" height="4" rx="2" fill="var(--grey-200)" />
      <circle cx="44" cy="68" r="6" fill="var(--green-100)" stroke="var(--green-700)" strokeWidth="1.5" />
      <path d="M42 68l1.5 1.5 3-3" stroke="var(--green-700)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="56" y="64" width="20" height="4" rx="2" fill="var(--grey-200)" />
    </>
  ),
});
