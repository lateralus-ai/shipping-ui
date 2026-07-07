import { createIllustration } from "./createIllustration";

export const InviteIllustration = createIllustration({
  name: "Invite",
  children: (
    <>
      <circle cx="48" cy="52" r="16" fill="var(--green-100)" stroke="var(--green-700)" strokeWidth="1.5" />
      <circle cx="76" cy="52" r="12" fill="var(--blue-100)" stroke="var(--blue-600)" strokeWidth="1.5" />
      <path d="M64 52h8M68 48v8" stroke="var(--grey-700)" strokeWidth="2" strokeLinecap="round" />
      <rect x="32" y="76" width="56" height="20" rx="6" fill="var(--grey-100)" stroke="var(--grey-200)" strokeWidth="1.5" />
    </>
  ),
});
