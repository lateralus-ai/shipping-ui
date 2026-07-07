import { createIllustration } from "./createIllustration";

export const ProcessingIllustration = createIllustration({
  name: "Processing",
  children: (
    <>
      <circle cx="60" cy="60" r="28" fill="var(--blue-50)" stroke="var(--blue-100)" strokeWidth="1.5" />
      <path
        d="M60 36a24 24 0 0 1 20.78 12"
        stroke="var(--blue-600)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="60" cy="60" r="4" fill="var(--blue-600)" />
    </>
  ),
});
