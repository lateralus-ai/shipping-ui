import React from "react";

export default function CloseSidebarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13 1C14.6569 1 16 2.34315 16 4V12L15.9961 12.1543C15.9158 13.7394 14.6051 15 13 15H3L2.8457 14.9961C1.31166 14.9184 0.0816253 13.6883 0.00390625 12.1543L0 12V4C1.28853e-07 2.34315 1.34315 1 3 1H13ZM3 2.5C2.17157 2.5 1.5 3.17157 1.5 4V12C1.5 12.8284 2.17157 13.5 3 13.5H13C13.8284 13.5 14.5 12.8284 14.5 12V4C14.5 3.17157 13.8284 2.5 13 2.5H3ZM3.75 3.5C4.16421 3.5 4.5 3.83579 4.5 4.25V11.75C4.5 12.1642 4.16421 12.5 3.75 12.5C3.33579 12.5 3 12.1642 3 11.75V4.25C3 3.83579 3.33579 3.5 3.75 3.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
