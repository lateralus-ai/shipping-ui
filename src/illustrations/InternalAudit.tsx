import { createIllustration } from "./createIllustration";

export const InternalAuditIllustration = createIllustration({
  name: "Internal audit",
  children: (
    <>
      <circle cx="60" cy="52" r="24" fill="var(--purple-100)" stroke="var(--purple-700)" strokeWidth="1.5" />
      <path d="M60 40v16M52 52h16" stroke="var(--purple-700)" strokeWidth="2" strokeLinecap="round" />
      <rect x="32" y="80" width="56" height="8" rx="4" fill="var(--grey-200)" />
      <rect x="40" y="72" width="40" height="4" rx="2" fill="var(--grey-300)" />
    </>
  ),
});
