export default function NearblocksLogo({ height }: { height: string }) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 300 55"
    >
      <rect x="10" y="10" width="30" height="30" fill="#4A90E2" rx="5" />
      <rect x="50" y="10" width="30" height="30" fill="#50E3C2" rx="5" />
      <rect x="90" y="10" width="30" height="30" fill="#F5A623" rx="5" />
      <text
        x="130"
        y="35"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fill="#333"
      >
        REDACTED
      </text>
      <text
        x="190"
        y="55"
        fontFamily="Arial, sans-serif"
        fontSize="18"
        fill="#333"
      >
        blocks
      </text>
    </svg>
  );
}
