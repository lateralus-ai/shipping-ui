import { createIllustration } from "./createIllustration";

export const AuditPreparationIllustration = createIllustration({
  name: "Audit preparation",
  children: (
    <>
      <rect x="36" y="24" width="48" height="64" rx="6" fill="var(--grey-50)" stroke="var(--grey-300)" strokeWidth="1.5" />
      <rect x="44" y="36" width="32" height="4" rx="2" fill="var(--orange-50)" />
      <rect x="44" y="48" width="24" height="4" rx="2" fill="var(--grey-200)" />
      <rect x="44" y="60" width="28" height="4" rx="2" fill="var(--grey-200)" />
      <path d="M28 88h64" stroke="var(--grey-300)" strokeWidth="2" strokeLinecap="round" />
      <path d="M52 76v12M68 76v12" stroke="var(--grey-400)" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
});
