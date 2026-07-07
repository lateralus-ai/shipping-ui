import { createIllustration } from "./createIllustration";

export const UploadIllustration = createIllustration({
  name: "Upload",
  children: (
    <>
      <rect x="28" y="36" width="64" height="48" rx="8" fill="var(--grey-100)" stroke="var(--grey-300)" strokeWidth="1.5" />
      <path d="M60 52v20M52 60l8-8 8 8" stroke="var(--blue-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="36" y="28" width="48" height="8" rx="4" fill="var(--grey-200)" />
    </>
  ),
});
