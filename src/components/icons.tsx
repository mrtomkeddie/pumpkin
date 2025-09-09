import type { FC, SVGProps } from 'react';

export const AlpacaIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 17.38c.5.84 1.52 1.62 3 1.62s2.5-.78 3-1.62" />
    <path d="M14 18.5c0 .83.67 1.5 1.5 1.5H20c.83 0 1.5-.67 1.5-1.5" />
    <path d="M10 16.5c0 .83.67 1.5 1.5 1.5h.5" />
    <path d="M14 12.5c0 .83.67 1.5 1.5 1.5h.5" />
    <path d="M10 5.5c0 .83.67 1.5 1.5 1.5H12" />
    <path d="M17 2H9.13a2.5 2.5 0 0 0-2.3 3.5l1.37 4A2.5 2.5 0 0 0 10.5 11H13v1" />
    <path d="M17.5 2a2.5 2.5 0 0 1 2.5 2.5V11" />
    <path d="M4.5 11.5A2.5 2.5 0 0 1 7 9h1" />
    <path d="m7 15-1-1" />
    <path d="m10 15-1-1" />
    <path d="M7 22v-3.5" />
    <path d="M10 22v-3.5" />
  </svg>
);
