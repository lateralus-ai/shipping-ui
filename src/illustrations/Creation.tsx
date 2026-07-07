import { createIllustration } from "./createIllustration";

export const CreationIllustration = createIllustration({
  name: "Creation",
  children: (
    <>
      <rect x="32" y="28" width="56" height="64" rx="8" fill="var(--grey-50)" stroke="var(--grey-300)" strokeWidth="1.5" />
      <path d="M44 48h32M44 60h24M44 72h28" stroke="var(--grey-300)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="84" cy="36" r="12" fill="var(--blue-600)" />
      <path d="M84 30v12M78 36h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
});
