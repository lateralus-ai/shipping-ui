import { createIllustration } from "./createIllustration";

export const PortStateControlIllustration = createIllustration({
  name: "Port state control",
  children: (
    <>
      <path d="M24 80h72" stroke="var(--blue-400)" strokeWidth="2" strokeLinecap="round" />
      <path d="M36 80V52l24-16 24 16v28" fill="var(--blue-50)" stroke="var(--blue-600)" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x="52" y="60" width="16" height="20" rx="2" fill="var(--blue-100)" stroke="var(--blue-600)" strokeWidth="1.5" />
      <circle cx="72" cy="44" r="8" fill="var(--orange-50)" stroke="var(--orange-700)" strokeWidth="1.5" />
    </>
  ),
});
