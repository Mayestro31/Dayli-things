import { useId } from "react";

type DaysiProps = {
  size?: number;
  className?: string;
};

export function Daysi({ size = 80, className }: DaysiProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const skin = `skin-${uid}`;
  const overall = `overall-${uid}`;
  const helmet = `helmet-${uid}`;
  const wing = `wing-${uid}`;
  const drop = `drop-${uid}`;
  const wingBlur = `wingBlur-${uid}`;

  return (
    <svg
      viewBox="0 0 240 300"
      width={size}
      height={size * 1.25}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Daysi, das DayliThings Bienen-Maskottchen"
    >
      <defs>
        <radialGradient id={skin} cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#FFE08A" />
          <stop offset="100%" stopColor="#F5A800" />
        </radialGradient>
        <radialGradient id={overall} cx="40%" cy="25%" r="65%">
          <stop offset="0%" stopColor="#FF8C5A" />
          <stop offset="100%" stopColor="#D94F10" />
        </radialGradient>
        <radialGradient id={helmet} cx="35%" cy="25%" r="60%">
          <stop offset="0%" stopColor="#FFAA44" />
          <stop offset="100%" stopColor="#FF6B2B" />
        </radialGradient>
        <radialGradient id={wing} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#D6F0FF" stopOpacity="0.6" />
        </radialGradient>
        <filter id={drop}>
          <feDropShadow dx="1" dy="4" stdDeviation="5" floodColor="#00000018" />
        </filter>
        <filter id={wingBlur}>
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#00000010" />
        </filter>
      </defs>

      <ellipse cx="120" cy="292" rx="52" ry="7" fill="#00000010" />

      <ellipse cx="72" cy="130" rx="35" ry="20" fill={`url(#${wing})`} stroke="#A8DCEE" strokeWidth="1.3" filter={`url(#${wingBlur})`} transform="rotate(-32 72 130)" />
      <ellipse cx="66" cy="158" rx="24" ry="14" fill={`url(#${wing})`} stroke="#A8DCEE" strokeWidth="1" filter={`url(#${wingBlur})`} transform="rotate(-18 66 158)" />
      <ellipse cx="168" cy="130" rx="35" ry="20" fill={`url(#${wing})`} stroke="#A8DCEE" strokeWidth="1.3" filter={`url(#${wingBlur})`} transform="rotate(32 168 130)" />
      <ellipse cx="174" cy="158" rx="24" ry="14" fill={`url(#${wing})`} stroke="#A8DCEE" strokeWidth="1" filter={`url(#${wingBlur})`} transform="rotate(18 174 158)" />

      <ellipse cx="120" cy="196" rx="46" ry="52" fill={`url(#${skin})`} stroke="#E09800" strokeWidth="1.5" filter={`url(#${drop})`} />

      <path d="M76 178 Q120 170 164 178" stroke="#2A1400" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.75" />
      <path d="M75 196 Q120 188 165 196" stroke="#2A1400" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.75" />
      <path d="M77 214 Q120 207 163 214" stroke="#2A1400" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.6" />

      <rect x="88" y="166" width="64" height="56" rx="14" fill={`url(#${overall})`} filter={`url(#${drop})`} />
      <ellipse cx="106" cy="178" rx="10" ry="6" fill="#FFFFFF" opacity="0.18" transform="rotate(-15 106 178)" />
      <rect x="102" y="176" width="30" height="20" rx="6" fill="#C94A10" stroke="#A03508" strokeWidth="1" />
      <rect x="104" y="178" width="26" height="16" rx="4" fill="#FF6B2B" />
      <text x="117" y="190" textAnchor="middle" fontSize="8.5" fontFamily="Arial Rounded MT Bold, Arial" fontWeight="900" fill="#FFE066" letterSpacing="0.5">
        DAYSI
      </text>
      <rect x="93" y="156" width="14" height="32" rx="7" fill="#D94F10" stroke="#A03508" strokeWidth="1" />
      <rect x="133" y="156" width="14" height="32" rx="7" fill="#D94F10" stroke="#A03508" strokeWidth="1" />
      <rect x="94" y="164" width="12" height="8" rx="3" fill="#FFD84D" stroke="#C9A000" strokeWidth="1" />
      <rect x="134" y="164" width="12" height="8" rx="3" fill="#FFD84D" stroke="#C9A000" strokeWidth="1" />

      <rect x="84" y="214" width="30" height="52" rx="12" fill={`url(#${overall})`} />
      <rect x="126" y="214" width="30" height="52" rx="12" fill={`url(#${overall})`} />
      <line x1="99" y1="224" x2="99" y2="258" stroke="#A03508" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,3" />
      <line x1="141" y1="224" x2="141" y2="258" stroke="#A03508" strokeWidth="1.5" opacity="0.4" strokeDasharray="4,3" />

      <rect x="80" y="212" width="80" height="11" rx="5" fill="#6B3F1E" stroke="#3D2210" strokeWidth="1" />
      <rect x="112" y="210" width="16" height="14" rx="4" fill="#FFD84D" stroke="#B89000" strokeWidth="1.2" />
      <rect x="115" y="213" width="10" height="8" rx="2" fill="none" stroke="#B89000" strokeWidth="1.2" />
      <rect x="86" y="211" width="5" height="15" rx="2" fill="#888" stroke="#555" strokeWidth="0.7" />
      <rect x="149" y="211" width="5" height="15" rx="2" fill="#888" stroke="#555" strokeWidth="0.7" />

      <rect x="108" y="143" width="24" height="18" rx="8" fill={`url(#${skin})`} stroke="#E09800" strokeWidth="1" />

      <ellipse cx="120" cy="112" rx="38" ry="46" fill={`url(#${skin})`} stroke="#E09800" strokeWidth="1.8" filter={`url(#${drop})`} />
      <ellipse cx="104" cy="94" rx="11" ry="7" fill="#FFFFFF" opacity="0.22" transform="rotate(-25 104 94)" />

      <ellipse cx="120" cy="80" rx="46" ry="10" fill="#FF6B2B" stroke="#C94A10" strokeWidth="1.3" />
      <path d="M78 80 Q78 42 120 38 Q162 42 162 80 Z" fill={`url(#${helmet})`} stroke="#C94A10" strokeWidth="1.5" />
      <path d="M88 70 Q104 50 122 46" stroke="#FFFFFF" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.28" />
      <path d="M80 75 Q120 69 160 75" stroke="#C94A10" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="104" y="54" width="32" height="16" rx="5" fill="#FFD84D" stroke="#C9A000" strokeWidth="1.2" />
      <text x="120" y="66" textAnchor="middle" fontSize="9" fontFamily="Arial Rounded MT Bold, Arial" fontWeight="900" fill="#D94F10">
        🌼 DT
      </text>

      <path d="M106 68 Q98 52 90 42" stroke="#2A1400" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <circle cx="89" cy="39" r="6" fill="#FF6B2B" stroke="#C94A10" strokeWidth="1.3" />
      <circle cx="89" cy="39" r="2.5" fill="#FFE066" />

      <path d="M134 68 Q142 52 150 42" stroke="#2A1400" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <circle cx="151" cy="39" r="6" fill="#FF6B2B" stroke="#C94A10" strokeWidth="1.3" />
      <circle cx="151" cy="39" r="2.5" fill="#FFE066" />

      <ellipse cx="106" cy="110" rx="11" ry="13" fill="white" stroke="#2A1400" strokeWidth="1.3" />
      <ellipse cx="107" cy="112" rx="7" ry="8.5" fill="#3D2000" />
      <ellipse cx="109" cy="109" rx="2.5" ry="3" fill="white" />
      <ellipse cx="105" cy="115" rx="1.2" ry="1.5" fill="white" opacity="0.5" />
      <path d="M97 103 Q100 99 105 100" stroke="#2A1400" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M95 107 Q96 103 100 104" stroke="#2A1400" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      <ellipse cx="134" cy="110" rx="11" ry="13" fill="white" stroke="#2A1400" strokeWidth="1.3" />
      <ellipse cx="135" cy="112" rx="7" ry="8.5" fill="#3D2000" />
      <ellipse cx="137" cy="109" rx="2.5" ry="3" fill="white" />
      <ellipse cx="133" cy="115" rx="1.2" ry="1.5" fill="white" opacity="0.5" />
      <path d="M135 100 Q139 99 143 103" stroke="#2A1400" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M140 104 Q144 103 145 107" stroke="#2A1400" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      <path d="M96 97 Q106 92 116 95" stroke="#2A1400" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M124 95 Q134 92 144 97" stroke="#2A1400" strokeWidth="2.5" fill="none" strokeLinecap="round" />

      <ellipse cx="120" cy="124" rx="5" ry="3.5" fill="#E09800" opacity="0.5" />
      <circle cx="117" cy="124" r="1.5" fill="#C07800" opacity="0.6" />
      <circle cx="123" cy="124" r="1.5" fill="#C07800" opacity="0.6" />

      <path d="M107 133 Q120 145 133 133" stroke="#2A1400" strokeWidth="2.8" fill="none" strokeLinecap="round" />
      <path d="M110 136 Q120 143 130 136" fill="white" stroke="none" />
      <path d="M110 136 Q120 143 130 136" stroke="#2A1400" strokeWidth="1" fill="none" />
      <ellipse cx="96" cy="128" rx="9" ry="6" fill="#FF9060" opacity="0.38" />
      <ellipse cx="144" cy="128" rx="9" ry="6" fill="#FF9060" opacity="0.38" />

      <path d="M80 175 Q58 168 44 155" stroke={`url(#${skin})`} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M80 175 Q58 168 44 155" stroke="#E09800" strokeWidth="1" fill="none" strokeLinecap="round" />
      <ellipse cx="41" cy="152" rx="11" ry="10" fill={`url(#${skin})`} stroke="#E09800" strokeWidth="1.2" />
      <line x1="34" y1="140" x2="22" y2="112" stroke="#7A4F2A" strokeWidth="5" strokeLinecap="round" />
      <rect x="12" y="105" width="26" height="12" rx="4" fill="#666" stroke="#333" strokeWidth="1" transform="rotate(-20 12 105)" />
      <rect x="14" y="107" width="12" height="8" rx="2" fill="#888" transform="rotate(-20 14 107)" />

      <path d="M160 175 Q180 162 194 148" stroke={`url(#${skin})`} strokeWidth="18" fill="none" strokeLinecap="round" />
      <path d="M160 175 Q180 162 194 148" stroke="#E09800" strokeWidth="1" fill="none" strokeLinecap="round" />
      <ellipse cx="197" cy="145" rx="11" ry="10" fill={`url(#${skin})`} stroke="#E09800" strokeWidth="1.2" />
      <path d="M197 135 Q196 126 197 120" stroke="#E09800" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M204 137 Q207 129 208 123" stroke="#E09800" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M190 137 Q187 129 186 123" stroke="#E09800" strokeWidth="4" fill="none" strokeLinecap="round" />

      <rect x="80" y="256" width="36" height="22" rx="10" fill="#5C3A1E" stroke="#3A2010" strokeWidth="1.3" />
      <rect x="76" y="268" width="44" height="12" rx="6" fill="#3A2010" />
      <line x1="88" y1="262" x2="108" y2="262" stroke="#FFD84D" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="88" y1="268" x2="108" y2="268" stroke="#FFD84D" strokeWidth="1.8" strokeLinecap="round" />

      <rect x="124" y="256" width="36" height="22" rx="10" fill="#5C3A1E" stroke="#3A2010" strokeWidth="1.3" />
      <rect x="120" y="268" width="44" height="12" rx="6" fill="#3A2010" />
      <line x1="132" y1="262" x2="152" y2="262" stroke="#FFD84D" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="132" y1="268" x2="152" y2="268" stroke="#FFD84D" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function DaysiIcon({ size = 32, className }: { size?: number; className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#FFF0E8",
        border: "2px solid #FF6B2B",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.5,
        boxShadow: "0 2px 8px #FF6B2B40",
        flexShrink: 0,
      }}
    >
      🌼
    </div>
  );
}

export function DaysiBubble({ text, size = 52 }: { text: string; size?: number }) {
  return (
    <div className="flex items-end gap-2.5">
      <Daysi size={size} />
      <div className="max-w-[240px] rounded-2xl rounded-bl-md border-2 border-brand-500 bg-white px-3.5 py-2.5 text-sm leading-relaxed text-foreground shadow-[0_4px_12px_rgba(255,107,43,0.12)]">
        {text}
      </div>
    </div>
  );
}
