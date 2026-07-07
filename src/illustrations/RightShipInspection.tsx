import { createIllustration } from "./createIllustration";

export const RightShipInspectionIllustration = createIllustration({
  name: "RightShip inspection",
  children: (
    <>
      <path
        d="M30 72c0-16 13.5-28 30-28s30 12 30 28"
        fill="var(--blue-50)"
        stroke="var(--blue-600)"
        strokeWidth="1.5"
      />
      <rect x="46" y="44" width="28" height="16" rx="4" fill="var(--blue-100)" stroke="var(--blue-600)" strokeWidth="1.5" />
      <path d="M42 72h36" stroke="var(--grey-400)" strokeWidth="2" strokeLinecap="round" />
      <circle cx="78" cy="36" r="6" fill="var(--green-700)" />
    </>
  ),
});
