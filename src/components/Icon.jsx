export default function Icon({ name, className = "" }) {
  const paths = {
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    moon: <path d="M20.7 13.1A9 9 0 0 1 10.9 3.3a9 9 0 1 0 9.8 9.8Z" />,
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </>
    ),
    arrowUp: <path d="M6 18 18 6M6 6h12v12" />,
    arrowDown: <path d="M12 4v16m-6-6 6 6 6-6" />,
    arrowRight: <path d="M4 12h16m-6-6 6 6-6 6" />,
    github: (
      <path d="M9 19c-4.3 1.3-4.3-2.2-6-2.7m12 5v-3.4a3 3 0 0 0-.8-2.4c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 6a4.3 4.3 0 0 0-.1-3.2S17.3 2.5 15 4a11 11 0 0 0-6 0C6.7 2.5 5.7 2.8 5.7 2.8A4.3 4.3 0 0 0 5.6 6a4.7 4.7 0 0 0-1.3 3.5c0 4.7 2.8 5.7 5.5 6A3 3 0 0 0 9 18v3.3" />
    ),
    linkedin: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M7 10v7m0-10v.1M11 17v-7m0 3a3 3 0 0 1 6 0v4" />
      </>
    ),
    code: <path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" />,
    terminal: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="m7 9 3 3-3 3m6 0h4" />
      </>
    ),
    file: (
      <>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8m-8 4h5" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" />
      </>
    ),
    layers: <path d="m12 3 10 5-10 5L2 8zm-9 9 9 5 9-5m-18 5 9 5 9-5" />,
    spark: (
      <>
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5zM20 2v4m-2-2h4" />
      </>
    ),
    gitMerge: (
      <>
        <circle cx="6" cy="5" r="2" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="18" r="2" />
        <path d="M6 7v10m0-8c0 6 12 2 12 7" />
      </>
    ),
    gitPull: (
      <>
        <circle cx="6" cy="5" r="2" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
        <path d="M6 7v10m12 0V8a3 3 0 0 0-3-3h-2m2-2-2 2 2 2" />
      </>
    ),
    award: (
      <>
        <circle cx="12" cy="9" r="6" />
        <path d="m8 14-1 8 5-3 5 3-1-8" />
      </>
    ),
    graduation: <path d="m2 8 10-5 10 5-10 5zm4 2v7c4 4 8 4 12 0v-7m4-2v9" />,
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    menu: <path d="M4 6h16M4 12h16M4 18h16" />,
    close: <path d="m5 5 14 14M5 19 19 5" />,
    check: <path d="m5 12 4 4L19 6" />,
    copy: (
      <>
        <rect x="8" y="8" width="12" height="13" rx="2" />
        <path d="M15 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" />
      </>
    ),
    globe: (
      <>
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <path d="M3 12h18" />
      </>
    ),
    cloud: <path d="M7 18a5 5 0 1 1 0-10 7 7 0 0 1 13 3 3.5 3.5 0 0 1 0 7z" />,
  };
  return (
    <svg
      className={`icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.code}
    </svg>
  );
}
