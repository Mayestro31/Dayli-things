import { useState } from "react";

const theme = {
  orange: "#FF6B2B", orangeLight: "#FF8C5A", orangePale: "#FFF0E8",
  orangeDark: "#E55A1C", white: "#FFFFFF", offWhite: "#FAFAFA",
  gray: "#F4F4F4", grayMid: "#E0E0E0", grayText: "#9B9B9B",
  dark: "#1A1A1A", darkMid: "#3D3D3D", green: "#2E7D32", greenPale: "#E8F5E9",
};

// ── Daysi Mascot ─────────────────────────────────────────────
function DaysiMascot({ size = 80, style = {} }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 300" width={size} height={size * 1.25} style={style}>
      <defs>
        <radialGradient id="dSkin" cx="40%" cy="30%" r="65%"><stop offset="0%" stopColor="#FFE08A"/><stop offset="100%" stopColor="#F5A800"/></radialGradient>
        <radialGradient id="dOverall" cx="40%" cy="25%" r="65%"><stop offset="0%" stopColor="#FF8C5A"/><stop offset="100%" stopColor="#D94F10"/></radialGradient>
        <radialGradient id="dHelmet" cx="35%" cy="25%" r="60%"><stop offset="0%" stopColor="#FFAA44"/><stop offset="100%" stopColor="#FF6B2B"/></radialGradient>
        <radialGradient id="dWing" cx="50%" cy="40%" r="55%"><stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95"/><stop offset="100%" stopColor="#D6F0FF" stopOpacity="0.6"/></radialGradient>
      </defs>
      <ellipse cx="72" cy="130" rx="35" ry="20" fill="url(#dWing)" stroke="#A8DCEE" strokeWidth="1.3" transform="rotate(-32 72 130)"/>
      <ellipse cx="168" cy="130" rx="35" ry="20" fill="url(#dWing)" stroke="#A8DCEE" strokeWidth="1.3" transform="rotate(32 168 130)"/>
      <ellipse cx="120" cy="196" rx="46" ry="52" fill="url(#dSkin)" stroke="#E09800" strokeWidth="1.5"/>
      <path d="M76 178 Q120 170 164 178" stroke="#2A1400" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.75"/>
      <path d="M75 196 Q120 188 165 196" stroke="#2A1400" strokeWidth="9" fill="none" strokeLinecap="round" opacity="0.75"/>
      <rect x="88" y="166" width="64" height="56" rx="14" fill="url(#dOverall)"/>
      <rect x="104" y="178" width="26" height="16" rx="4" fill="#FF6B2B"/>
      <text x="117" y="190" textAnchor="middle" fontSize="8.5" fontFamily="Arial" fontWeight="900" fill="#FFE066">DAYSI</text>
      <rect x="93" y="156" width="14" height="32" rx="7" fill="#D94F10"/>
      <rect x="133" y="156" width="14" height="32" rx="7" fill="#D94F10"/>
      <rect x="84" y="214" width="30" height="52" rx="12" fill="url(#dOverall)"/>
      <rect x="126" y="214" width="30" height="52" rx="12" fill="url(#dOverall)"/>
      <rect x="80" y="212" width="80" height="11" rx="5" fill="#6B3F1E"/>
      <rect x="108" y="143" width="24" height="18" rx="8" fill="url(#dSkin)" stroke="#E09800" strokeWidth="1"/>
      <ellipse cx="120" cy="112" rx="38" ry="46" fill="url(#dSkin)" stroke="#E09800" strokeWidth="1.8"/>
      <ellipse cx="120" cy="80" rx="46" ry="10" fill="#FF6B2B" stroke="#C94A10" strokeWidth="1.3"/>
      <path d="M78 80 Q78 42 120 38 Q162 42 162 80 Z" fill="url(#dHelmet)" stroke="#C94A10" strokeWidth="1.5"/>
      <rect x="104" y="54" width="32" height="16" rx="5" fill="#FFD84D" stroke="#C9A000" strokeWidth="1.2"/>
      <text x="120" y="66" textAnchor="middle" fontSize="9" fontFamily="Arial" fontWeight="900" fill="#D94F10">🌼 DT</text>
      <path d="M106 68 Q98 52 90 42" stroke="#2A1400" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <circle cx="89" cy="39" r="6" fill="#FF6B2B"/><circle cx="89" cy="39" r="2.5" fill="#FFE066"/>
      <path d="M134 68 Q142 52 150 42" stroke="#2A1400" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <circle cx="151" cy="39" r="6" fill="#FF6B2B"/><circle cx="151" cy="39" r="2.5" fill="#FFE066"/>
      <ellipse cx="106" cy="110" rx="11" ry="13" fill="white" stroke="#2A1400" strokeWidth="1.3"/>
      <ellipse cx="107" cy="112" rx="7" ry="8.5" fill="#3D2000"/>
      <ellipse cx="109" cy="109" rx="2.5" ry="3" fill="white"/>
      <ellipse cx="134" cy="110" rx="11" ry="13" fill="white" stroke="#2A1400" strokeWidth="1.3"/>
      <ellipse cx="135" cy="112" rx="7" ry="8.5" fill="#3D2000"/>
      <ellipse cx="137" cy="109" rx="2.5" ry="3" fill="white"/>
      <path d="M96 97 Q106 92 116 95" stroke="#2A1400" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M124 95 Q134 92 144 97" stroke="#2A1400" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M107 133 Q120 145 133 133" stroke="#2A1400" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      <ellipse cx="96" cy="128" rx="9" ry="6" fill="#FF9060" opacity="0.38"/>
      <ellipse cx="144" cy="128" rx="9" ry="6" fill="#FF9060" opacity="0.38"/>
      <path d="M80 175 Q58 168 44 155" stroke="#F5A800" strokeWidth="18" fill="none" strokeLinecap="round"/>
      <ellipse cx="41" cy="152" rx="11" ry="10" fill="url(#dSkin)" stroke="#E09800" strokeWidth="1.2"/>
      <line x1="34" y1="140" x2="22" y2="112" stroke="#7A4F2A" strokeWidth="5" strokeLinecap="round"/>
      <rect x="12" y="105" width="26" height="12" rx="4" fill="#666" stroke="#333" strokeWidth="1" transform="rotate(-20 12 105)"/>
      <path d="M160 175 Q180 162 194 148" stroke="#F5A800" strokeWidth="18" fill="none" strokeLinecap="round"/>
      <ellipse cx="197" cy="145" rx="11" ry="10" fill="url(#dSkin)" stroke="#E09800" strokeWidth="1.2"/>
      <path d="M197 135 Q196 126 197 120" stroke="#E09800" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <path d="M204 137 Q207 129 208 123" stroke="#E09800" strokeWidth="4" fill="none" strokeLinecap="round"/>
      <rect x="80" y="256" width="36" height="22" rx="10" fill="#5C3A1E"/>
      <rect x="76" y="268" width="44" height="12" rx="6" fill="#3A2010"/>
      <rect x="124" y="256" width="36" height="22" rx="10" fill="#5C3A1E"/>
      <rect x="120" y="268" width="44" height="12" rx="6" fill="#3A2010"/>
    </svg>
  );
}

function DaysiIcon({ size = 32 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: theme.orangePale, border: `2px solid ${theme.orange}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.5, boxShadow: `0 2px 8px ${theme.orange}40` }}>🌼</div>
  );
}

function DaysiBubble({ text, style = {} }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, ...style }}>
      <DaysiMascot size={52} />
      <div style={{ background: theme.white, border: `2px solid ${theme.orange}`, borderRadius: "16px 16px 16px 4px", padding: "10px 14px", fontSize: 13, color: theme.dark, lineHeight: 1.5, maxWidth: 210, boxShadow: `0 4px 12px ${theme.orange}20` }}>{text}</div>
    </div>
  );
}

// ── Shared UI ─────────────────────────────────────────────────
function OrangeButton({ children, onClick, style = {}, outline = false, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{ width: "100%", padding: "14px 20px", borderRadius: 14, border: outline ? `2px solid ${theme.orange}` : "none", background: disabled ? theme.grayMid : outline ? "transparent" : `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, color: disabled ? theme.grayText : outline ? theme.orange : theme.white, fontSize: 15, fontWeight: 700, cursor: disabled ? "default" : "pointer", boxShadow: outline || disabled ? "none" : `0 6px 20px ${theme.orange}40`, fontFamily: "inherit", ...style }}>
      {children}
    </button>
  );
}

function Input({ label, placeholder, value, onChange, type = "text", icon }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <label style={{ fontSize: 13, fontWeight: 600, color: theme.darkMid, display: "block", marginBottom: 5 }}>{label}</label>}
      <div style={{ position: "relative" }}>
        {icon && <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>{icon}</span>}
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{ width: "100%", padding: icon ? "13px 15px 13px 40px" : "13px 15px", borderRadius: 12, border: `2px solid ${theme.grayMid}`, fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: theme.offWhite, color: theme.dark }} />
      </div>
    </div>
  );
}

function Tag({ label, icon, selected, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: "9px 13px", borderRadius: 12, border: `2px solid ${selected ? theme.orange : theme.grayMid}`, background: selected ? theme.orangePale : theme.white, color: selected ? theme.orangeDark : theme.darkMid, fontSize: 13, fontWeight: selected ? 700 : 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
      <span>{icon}</span>{label}
    </button>
  );
}

function ProgressBar({ step, total }) {
  return (
    <div style={{ display: "flex", gap: 6, padding: "0 24px" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i < step ? theme.orange : theme.grayMid }} />
      ))}
    </div>
  );
}

function TopBar({ title, onBack, rightEl }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 12px", background: theme.white, borderBottom: `1px solid ${theme.grayMid}` }}>
      {onBack ? (
        <button onClick={onBack} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: theme.orange, padding: 0 }}>←</button>
      ) : <div style={{ width: 32 }} />}
      <span style={{ fontSize: 16, fontWeight: 800, color: theme.dark }}>{title}</span>
      {rightEl || <div style={{ width: 32 }} />}
    </div>
  );
}

function BadgePill({ label, color = theme.orange }) {
  return (
    <span style={{ background: color + "18", color, fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 20, border: `1px solid ${color}40` }}>{label}</span>
  );
}

function StarRating({ value, onChange }) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n} onClick={() => onChange && onChange(n)} style={{ fontSize: 28, cursor: onChange ? "pointer" : "default", opacity: n <= value ? 1 : 0.25 }}>⭐</span>
      ))}
    </div>
  );
}

function BottomNav({ active, onNavigate }) {
  const items = [{ icon: "🏠", label: "Home", key: "home" }, { icon: "🔍", label: "Suche", key: "search" }, { icon: "💬", label: "Chats", key: "chats" }, { icon: "👤", label: "Profil", key: "profile" }];
  return (
    <div style={{ background: theme.white, borderTop: `1px solid ${theme.grayMid}`, display: "flex", padding: "8px 0", flexShrink: 0 }}>
      {items.map(({ icon, label, key }) => (
        <div key={key} onClick={() => onNavigate(key)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, cursor: "pointer" }}>
          <span style={{ fontSize: 20 }}>{icon}</span>
          <span style={{ fontSize: 10, color: active === key ? theme.orange : theme.grayText, fontWeight: active === key ? 700 : 400 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────
const alltagOptions = [
  { icon: "🌿", label: "Rasenmähen" }, { icon: "🪵", label: "Holz machen" },
  { icon: "✂️", label: "Hecken schneiden" }, { icon: "🐕", label: "Gassi gehen" },
  { icon: "🛒", label: "Einkaufen" }, { icon: "🧹", label: "Putzen" },
  { icon: "👶", label: "Babysitting" }, { icon: "🚗", label: "Fahrdienst" },
  { icon: "🔧", label: "Reparaturen" }, { icon: "📦", label: "Umzugshilfe" },
  { icon: "🍳", label: "Kochen" }, { icon: "💊", label: "Apothekengang" },
];
const hobbyOptions = [
  { icon: "🎾", label: "Tennis" }, { icon: "🏖️", label: "Beachvolleyball" },
  { icon: "🚴", label: "Radfahren" }, { icon: "🥾", label: "Wandern" },
  { icon: "⚽", label: "Fußball" }, { icon: "🏊", label: "Schwimmen" },
  { icon: "🎨", label: "Malen" }, { icon: "📸", label: "Fotografie" },
  { icon: "🎸", label: "Musik" }, { icon: "🧘", label: "Yoga" },
  { icon: "♟️", label: "Schach" }, { icon: "🏃", label: "Laufen" },
];
const mockResults = [
  { id: 1, name: "Maria S.", distance: "1.2 km", category: "Alltag", need: "Rasenmähen", bio: "Suche jemanden der mir 1x pro Woche beim Rasenmähen hilft.", rating: 4.8, reviews: 12, badges: ["📱 Tel. verifiziert", "⭐ Top-Daysi"], avatar: "👵", verified: true, idVerified: false },
  { id: 2, name: "Tom K.", distance: "0.8 km", category: "Hobby", need: "Tennis", bio: "Suche 4. Spieler für Doppel am Wochenende. Niveau: Mittel.", rating: 4.5, reviews: 7, badges: ["📱 Tel. verifiziert"], avatar: "🧑", verified: true, idVerified: false },
  { id: 3, name: "Familie Müller", distance: "2.1 km", category: "Alltag", need: "Babysitting", bio: "Suchen verlässliche Babysitterin für 2 Kinder (3 & 6 Jahre).", rating: 5.0, reviews: 3, badges: ["📱 Tel. verifiziert", "✅ Ausweis geprüft"], avatar: "👨‍👩‍👧‍👦", verified: true, idVerified: true },
];

// ══════════════════════════════════════════════════════════════
// SCREENS
// ══════════════════════════════════════════════════════════════

function SplashScreen({ onLogin, onRegister }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: `linear-gradient(160deg, ${theme.orange} 0%, ${theme.orangeDark} 100%)`, alignItems: "center", justifyContent: "center", padding: 32 }}>
      <div style={{ textAlign: "center", color: theme.white, width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
          <DaysiMascot size={120} />
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 900, margin: "0 0 4px", letterSpacing: -1 }}>DayliThings</h1>
        <p style={{ fontSize: 14, opacity: 0.85, margin: "6px 0 40px", lineHeight: 1.5 }}>
          Deine Community. Dein Alltag.<br/>
          <span style={{ fontSize: 12, opacity: 0.7 }}>Willkommen bei den Daysi's 🌼</span>
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button onClick={onRegister} style={{ padding: "15px", borderRadius: 14, border: "none", background: theme.white, color: theme.orange, fontSize: 16, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}>Jetzt kostenlos starten</button>
          <button onClick={onLogin} style={{ padding: "15px", borderRadius: 14, border: "2px solid rgba(255,255,255,0.5)", background: "transparent", color: theme.white, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Bereits Daysi? Anmelden</button>
        </div>
        <p style={{ fontSize: 11, opacity: 0.5, marginTop: 24 }}>Mit der Registrierung stimmst du unseren AGB & Datenschutzbestimmungen zu.</p>
      </div>
    </div>
  );
}

function LoginScreen({ onBack, onSuccess }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: theme.white }}>
      <TopBar title="Anmelden" onBack={onBack} />
      <div style={{ padding: "32px 24px", flex: 1 }}>
        <DaysiBubble text="Schön dass du wieder da bist! 🌼" style={{ marginBottom: 28 }} />
        <Input label="E-Mail" placeholder="deine@email.de" value={email} onChange={e => setEmail(e.target.value)} type="email" icon="✉️" />
        <Input label="Passwort" placeholder="••••••••" value={pw} onChange={e => setPw(e.target.value)} type="password" icon="🔒" />
        <div style={{ textAlign: "right", marginBottom: 24 }}>
          <span style={{ fontSize: 13, color: theme.orange, cursor: "pointer", fontWeight: 600 }}>Passwort vergessen?</span>
        </div>
        <OrangeButton onClick={onSuccess}>Anmelden</OrangeButton>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <span style={{ fontSize: 13, color: theme.grayText }}>Noch kein Konto? </span>
          <span onClick={onBack} style={{ fontSize: 13, color: theme.orange, fontWeight: 700, cursor: "pointer" }}>Registrieren</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "24px 0" }}>
          <div style={{ flex: 1, height: 1, background: theme.grayMid }} />
          <span style={{ fontSize: 12, color: theme.grayText }}>oder</span>
          <div style={{ flex: 1, height: 1, background: theme.grayMid }} />
        </div>
        {["🍎  Mit Apple anmelden", "🔵  Mit Facebook anmelden", "🔴  Mit Google anmelden"].map(label => (
          <button key={label} onClick={onSuccess} style={{ width: "100%", padding: "13px", borderRadius: 12, border: `2px solid ${theme.grayMid}`, background: theme.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 10, fontFamily: "inherit", color: theme.dark }}>{label}</button>
        ))}
      </div>
    </div>
  );
}

function RegisterScreen({ onBack, onNext }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: theme.white }}>
      <TopBar title="Registrieren" onBack={onBack} />
      <div style={{ padding: "24px 24px", flex: 1 }}>
        <DaysiBubble text="Willkommen! Ich bin Daysi 🌼 Gleich bist du dabei!" style={{ marginBottom: 24 }} />
        <Input label="Vorname" placeholder="z.B. Maria" value={name} onChange={e => setName(e.target.value)} icon="👤" />
        <Input label="E-Mail" placeholder="deine@email.de" value={email} onChange={e => setEmail(e.target.value)} type="email" icon="✉️" />
        <Input label="Passwort" placeholder="Mindestens 8 Zeichen" value={pw} onChange={e => setPw(e.target.value)} type="password" icon="🔒" />
        <div style={{ background: theme.orangePale, borderRadius: 12, padding: "12px 14px", marginBottom: 20, border: `1px solid ${theme.orange}30` }}>
          <p style={{ fontSize: 12, color: theme.orangeDark, margin: 0, lineHeight: 1.5 }}>
            🔒 Deine Daten sind sicher. Wir geben sie niemals weiter.
          </p>
        </div>
        <OrangeButton onClick={onNext}>Weiter →</OrangeButton>
        <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "20px 0" }}>
          <div style={{ flex: 1, height: 1, background: theme.grayMid }} />
          <span style={{ fontSize: 12, color: theme.grayText }}>oder</span>
          <div style={{ flex: 1, height: 1, background: theme.grayMid }} />
        </div>
        {["🍎  Mit Apple registrieren", "🔴  Mit Google registrieren"].map(label => (
          <button key={label} onClick={onNext} style={{ width: "100%", padding: "13px", borderRadius: 12, border: `2px solid ${theme.grayMid}`, background: theme.white, fontSize: 14, fontWeight: 600, cursor: "pointer", marginBottom: 10, fontFamily: "inherit", color: theme.dark }}>{label}</button>
        ))}
      </div>
    </div>
  );
}

function VerifyPhoneScreen({ onNext }) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: theme.white }}>
      <TopBar title="Telefon verifizieren" />
      <div style={{ padding: "24px", flex: 1 }}>
        <DaysiBubble text="Für deine Sicherheit verifizieren wir deine Handynummer 📱" style={{ marginBottom: 24 }} />
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 70, height: 70, borderRadius: "50%", background: theme.orangePale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 12px", border: `3px solid ${theme.orange}` }}>📱</div>
          <h3 style={{ margin: 0, fontWeight: 800, color: theme.dark }}>Handynummer bestätigen</h3>
          <p style={{ fontSize: 13, color: theme.grayText, margin: "6px 0 0" }}>Wir senden dir einen 6-stelligen Code</p>
        </div>
        {!sent ? (
          <>
            <Input label="Handynummer" placeholder="+49 170 1234567" value={phone} onChange={e => setPhone(e.target.value)} icon="📱" />
            <OrangeButton onClick={() => setSent(true)}>SMS-Code senden</OrangeButton>
          </>
        ) : (
          <>
            <div style={{ background: theme.greenPale, borderRadius: 12, padding: "12px 14px", marginBottom: 20, border: `1px solid ${theme.green}30` }}>
              <p style={{ fontSize: 13, color: theme.green, margin: 0 }}>✅ Code wurde an {phone} gesendet</p>
            </div>
            <Input label="6-stelliger Code" placeholder="z.B. 123456" value={code} onChange={e => setCode(e.target.value)} icon="🔢" />
            <OrangeButton onClick={onNext} disabled={code.length < 4}>Bestätigen ✓</OrangeButton>
            <p onClick={() => setSent(false)} style={{ textAlign: "center", fontSize: 13, color: theme.orange, cursor: "pointer", marginTop: 14, fontWeight: 600 }}>Code erneut senden</p>
          </>
        )}
        <button onClick={onNext} style={{ width: "100%", background: "none", border: "none", color: theme.grayText, fontSize: 13, cursor: "pointer", marginTop: 12, fontFamily: "inherit" }}>Überspringen (später)</button>
      </div>
    </div>
  );
}

function ProfileSetupScreen({ onNext }) {
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: 24, background: theme.white }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 20, fontWeight: 900, color: theme.dark }}>Dayli<span style={{ color: theme.orange }}>Things</span></span>
        <DaysiIcon size={34} />
      </div>
      <ProgressBar step={1} total={4} />
      <div style={{ marginTop: 24, flex: 1 }}>
        <DaysiBubble text="Lass uns dein Profil einrichten! Wie sollen andere Daysi's dich kennenlernen?" style={{ marginBottom: 20 }} />
        <h2 style={{ fontSize: 21, fontWeight: 800, color: theme.dark, margin: "0 0 20px" }}>Dein Profil 👋</h2>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: theme.orangePale, border: `3px dashed ${theme.orange}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, cursor: "pointer" }}>📷</div>
        </div>
        <Input label="Stadt / Ort" placeholder="z.B. München" value={city} onChange={e => setCity(e.target.value)} icon="📍" />
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: theme.darkMid, display: "block", marginBottom: 5 }}>Über mich</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} placeholder="Kurze Beschreibung von dir..." rows={3} style={{ width: "100%", padding: "13px 15px", borderRadius: 12, border: `2px solid ${theme.grayMid}`, fontSize: 15, outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "none", background: theme.offWhite }} />
        </div>
        <div style={{ background: theme.orangePale, borderRadius: 12, padding: "12px 14px", marginBottom: 16, border: `1px solid ${theme.orange}30` }}>
          <p style={{ fontSize: 12, color: theme.orangeDark, margin: 0 }}>💡 Ein vollständiges Profil bekommt 3x mehr Anfragen!</p>
        </div>
      </div>
      <OrangeButton onClick={onNext}>Weiter →</OrangeButton>
    </div>
  );
}

function AlltagScreen({ onNext }) {
  const [selected, setSelected] = useState([]);
  const toggle = l => setSelected(s => s.includes(l) ? s.filter(x => x !== l) : [...s, l]);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: 24, background: theme.white }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 20, fontWeight: 900, color: theme.dark }}>Dayli<span style={{ color: theme.orange }}>Things</span></span>
        <DaysiIcon size={34} />
      </div>
      <ProgressBar step={2} total={4} />
      <div style={{ marginTop: 24, flex: 1 }}>
        <DaysiBubble text="Was kannst du anbieten oder wobei brauchst du Hilfe?" style={{ marginBottom: 20 }} />
        <h2 style={{ fontSize: 21, fontWeight: 800, color: theme.dark, margin: "0 0 6px" }}>Alltag & Hilfen 🏡</h2>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: theme.orangePale, borderRadius: 8, padding: "4px 10px", marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: theme.orangeDark, fontWeight: 600 }}>⭐ Premium: Unbegrenzte Auswahl</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {alltagOptions.map(({ icon, label }) => (
            <Tag key={label} icon={icon} label={label} selected={selected.includes(label)} onClick={() => toggle(label)} />
          ))}
        </div>
        <p style={{ fontSize: 12, color: theme.grayText, marginTop: 10 }}>{selected.length} ausgewählt</p>
      </div>
      <OrangeButton onClick={onNext} style={{ marginTop: 14 }}>Weiter →</OrangeButton>
    </div>
  );
}

function HobbyScreen({ onNext }) {
  const [selected, setSelected] = useState([]);
  const toggle = l => setSelected(s => s.includes(l) ? s.filter(x => x !== l) : [...s, l]);
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: 24, background: theme.white }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 20, fontWeight: 900, color: theme.dark }}>Dayli<span style={{ color: theme.orange }}>Things</span></span>
        <DaysiIcon size={34} />
      </div>
      <ProgressBar step={3} total={4} />
      <div style={{ marginTop: 24, flex: 1 }}>
        <DaysiBubble text="Super! Jetzt noch deine Hobbys – finde Gleichgesinnte in deiner Nähe 🎾" style={{ marginBottom: 20 }} />
        <h2 style={{ fontSize: 21, fontWeight: 800, color: theme.dark, margin: "0 0 6px" }}>Deine Hobbys 🎾</h2>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: theme.orangePale, borderRadius: 8, padding: "4px 10px", marginBottom: 14 }}>
          <span style={{ fontSize: 11, color: theme.orangeDark, fontWeight: 600 }}>⭐ Premium: Unbegrenzte Auswahl</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {hobbyOptions.map(({ icon, label }) => (
            <Tag key={label} icon={icon} label={label} selected={selected.includes(label)} onClick={() => toggle(label)} />
          ))}
        </div>
        <p style={{ fontSize: 12, color: theme.grayText, marginTop: 10 }}>{selected.length} ausgewählt</p>
      </div>
      <OrangeButton onClick={onNext} style={{ marginTop: 14 }}>Weiter →</OrangeButton>
    </div>
  );
}

function AlbumScreen({ onNext }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", padding: 24, background: theme.white }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 20, fontWeight: 900, color: theme.dark }}>Dayli<span style={{ color: theme.orange }}>Things</span></span>
        <DaysiIcon size={34} />
      </div>
      <ProgressBar step={4} total={4} />
      <div style={{ marginTop: 24, flex: 1 }}>
        <DaysiBubble text="Fast fertig! Lade Bilder hoch und zeig was du drauf hast 📸" style={{ marginBottom: 20 }} />
        <h2 style={{ fontSize: 21, fontWeight: 800, color: theme.dark, margin: "0 0 20px" }}>Dein Album 📸</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
          {["🌿", "🎾", "🚴"].map((img, i) => (
            <div key={i} style={{ aspectRatio: "1", borderRadius: 12, background: theme.orangePale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, border: `2px solid ${theme.grayMid}` }}>{img}</div>
          ))}
          <div style={{ aspectRatio: "1", borderRadius: 12, border: `2px dashed ${theme.orange}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, cursor: "pointer", color: theme.orange, background: theme.orangePale }}>+</div>
        </div>
        <p style={{ fontSize: 13, color: theme.grayText, textAlign: "center" }}>Du kannst jederzeit weitere Bilder hinzufügen</p>
      </div>
      <OrangeButton onClick={onNext}>Profil abschließen 🎉</OrangeButton>
    </div>
  );
}

// ── Home ──────────────────────────────────────────────────────
function HomeScreen({ onProfile, onNavigate }) {
  const [mode, setMode] = useState("suchen");
  const [filter, setFilter] = useState("alle");
  const [radius, setRadius] = useState(10);
  const [showResults, setShowResults] = useState(false);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: theme.white }}>
      <div style={{ background: theme.white, padding: "14px 20px 12px", borderBottom: `1px solid ${theme.grayMid}`, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <DaysiMascot size={34} />
            <span style={{ fontSize: 19, fontWeight: 900, color: theme.dark }}>Dayli<span style={{ color: theme.orange }}>Things</span></span>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 20, cursor: "pointer" }}>🔔</span>
            <div onClick={() => onNavigate("profile")} style={{ width: 34, height: 34, borderRadius: "50%", background: theme.orangePale, border: `2px solid ${theme.orange}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, cursor: "pointer" }}>👤</div>
          </div>
        </div>
        <div style={{ display: "flex", background: theme.gray, borderRadius: 12, padding: 4, marginBottom: 11 }}>
          {["suchen", "anbieten"].map(m => (
            <button key={m} onClick={() => setMode(m)} style={{ flex: 1, padding: "9px", borderRadius: 10, border: "none", background: mode === m ? theme.orange : "transparent", color: mode === m ? theme.white : theme.grayText, fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", boxShadow: mode === m ? `0 4px 12px ${theme.orange}40` : "none" }}>
              {m === "suchen" ? "🔍 Suchen" : "📣 Anbieten"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 9 }}>
          <input placeholder="Was suchst du?" style={{ flex: 2, padding: "11px 13px", borderRadius: 12, border: `2px solid ${theme.grayMid}`, fontSize: 14, outline: "none", fontFamily: "inherit", background: theme.offWhite }} />
          <input placeholder="📍 Ort" style={{ flex: 1, padding: "11px 10px", borderRadius: 12, border: `2px solid ${theme.grayMid}`, fontSize: 13, outline: "none", fontFamily: "inherit", background: theme.offWhite }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <span style={{ fontSize: 12, color: theme.grayText }}>Radius:</span>
          <input type="range" min={1} max={50} value={radius} onChange={e => setRadius(e.target.value)} style={{ flex: 1, accentColor: theme.orange }} />
          <span style={{ fontSize: 13, fontWeight: 700, color: theme.orange }}>{radius} km</span>
        </div>
        <div style={{ display: "flex", gap: 7 }}>
          {[{ key: "alle", label: "🔍 Alle" }, { key: "alltag", label: "🏡 Alltag" }, { key: "hobby", label: "🎾 Hobby" }].map(({ key, label }) => (
            <button key={key} onClick={() => setFilter(key)} style={{ padding: "7px 12px", borderRadius: 20, border: `2px solid ${filter === key ? theme.orange : theme.grayMid}`, background: filter === key ? theme.orangePale : theme.white, color: filter === key ? theme.orangeDark : theme.grayText, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{label}</button>
          ))}
          <button onClick={() => setShowResults(true)} style={{ marginLeft: "auto", padding: "7px 16px", borderRadius: 20, border: "none", background: theme.orange, color: theme.white, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Los →</button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 20px" }}>
        {!showResults ? (
          <div style={{ textAlign: "center", paddingTop: 24 }}>
            <DaysiMascot size={90} style={{ margin: "0 auto 10px" }} />
            <h3 style={{ color: theme.dark, fontWeight: 800, margin: "0 0 6px" }}>Hallo Daysi! 🌼</h3>
            <p style={{ color: theme.grayText, fontSize: 14, margin: 0 }}>Wähle was du suchst und finde<br/>Daysi's in deiner Nähe.</p>
          </div>
        ) : (
          <>
            <p style={{ fontSize: 13, color: theme.grayText, marginBottom: 12 }}>{mockResults.length} Daysi's gefunden · {radius} km</p>
            {mockResults.map(r => (
              <div key={r.id} onClick={() => onProfile(r)} style={{ background: theme.white, borderRadius: 16, border: `1px solid ${theme.grayMid}`, padding: 14, marginBottom: 10, cursor: "pointer", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: theme.orangePale, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, border: `2px solid ${theme.orange}` }}>{r.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontWeight: 700, fontSize: 15, color: theme.dark }}>{r.name}</span>
                      <span style={{ fontSize: 12, color: theme.grayText }}>{r.distance}</span>
                    </div>
                    <div style={{ display: "flex", gap: 6, margin: "4px 0" }}>
                      <span style={{ background: r.category === "Hobby" ? theme.greenPale : theme.orangePale, color: r.category === "Hobby" ? theme.green : theme.orangeDark, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>{r.category}</span>
                      <span style={{ background: theme.gray, color: theme.darkMid, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20 }}>{r.need}</span>
                      {r.idVerified && <span style={{ background: "#E3F2FD", color: "#1565C0", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20 }}>✅ ID</span>}
                    </div>
                    <p style={{ fontSize: 13, color: theme.darkMid, margin: "5px 0 6px", lineHeight: 1.4 }}>{r.bio}</p>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {r.badges.map(b => <span key={b} style={{ fontSize: 10, color: theme.grayText }}>{b}</span>)}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 700, color: theme.orange }}>⭐ {r.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}

// ── Profile Detail ────────────────────────────────────────────
function ProfileDetailScreen({ person, onBack, onRate }) {
  const [chatOpen, setChatOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState([{ from: "them", text: `Hallo! Ich bin ${person.name}. Schreib mir gerne! 😊` }]);
  const [showRating, setShowRating] = useState(false);
  const send = () => { if (!msg.trim()) return; setMessages(m => [...m, { from: "me", text: msg }]); setMsg(""); };
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: theme.white }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, padding: "16px 20px 24px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: theme.white, borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}>← Zurück</button>
          <DaysiIcon size={30} />
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 62, height: 62, borderRadius: "50%", background: "rgba(255,255,255,0.2)", fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid rgba(255,255,255,0.5)" }}>{person.avatar}</div>
          <div style={{ color: theme.white }}>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{person.name}</h2>
            <p style={{ margin: "3px 0 0", opacity: 0.85, fontSize: 13 }}>📍 {person.distance} · {person.category}</p>
            <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
              {person.badges.map(b => <span key={b} style={{ background: "rgba(255,255,255,0.2)", fontSize: 10, color: "white", padding: "2px 8px", borderRadius: 20 }}>{b}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {/* Rating */}
        <div style={{ background: theme.offWhite, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${theme.grayMid}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: 11, color: theme.grayText, margin: "0 0 2px", fontWeight: 600 }}>BEWERTUNG</p>
              <StarRating value={Math.round(person.rating)} />
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 26, fontWeight: 900, color: theme.orange }}>{person.rating}</span>
              <p style={{ fontSize: 11, color: theme.grayText, margin: 0 }}>{person.reviews} Bewertungen</p>
            </div>
          </div>
        </div>
        {/* Bio */}
        <div style={{ background: theme.offWhite, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${theme.grayMid}` }}>
          <p style={{ fontSize: 11, color: theme.grayText, margin: "0 0 4px", fontWeight: 600 }}>GESUCH / ANGEBOT</p>
          <p style={{ fontSize: 14, color: theme.dark, margin: 0, lineHeight: 1.5 }}>{person.bio}</p>
        </div>
        {/* Verification badges */}
        <div style={{ background: theme.offWhite, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${theme.grayMid}` }}>
          <p style={{ fontSize: 11, color: theme.grayText, margin: "0 0 10px", fontWeight: 600 }}>VERIFIKATION</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <BadgePill label="📱 Telefon verifiziert" color={theme.green} />
            {person.idVerified && <BadgePill label="✅ Ausweis geprüft" color="#1565C0" />}
            {!person.idVerified && <BadgePill label="🪪 Ausweis ausstehend" color={theme.grayText} />}
          </div>
        </div>
        {/* Rate button */}
        <button onClick={() => setShowRating(!showRating)} style={{ width: "100%", padding: "11px", borderRadius: 12, border: `2px solid ${theme.orange}`, background: "transparent", color: theme.orange, fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 12, fontFamily: "inherit" }}>
          ⭐ Bewertung abgeben
        </button>
        {showRating && <RatingWidget onDone={() => setShowRating(false)} name={person.name} />}
        {/* Daysi tip */}
        <DaysiBubble text="Schreib eine nette Nachricht und stell dich vor! 😊" style={{ marginBottom: 14 }} />
        {/* Chat */}
        {!chatOpen ? (
          <OrangeButton onClick={() => setChatOpen(true)}>💬 Nachricht schreiben</OrangeButton>
        ) : (
          <div style={{ background: theme.offWhite, borderRadius: 16, border: `1px solid ${theme.grayMid}`, overflow: "hidden" }}>
            <div style={{ padding: "11px 15px", background: theme.orangePale, borderBottom: `1px solid ${theme.grayMid}`, fontSize: 13, fontWeight: 700, color: theme.orangeDark }}>💬 Chat mit {person.name}</div>
            <div style={{ padding: 12, minHeight: 90, maxHeight: 160, overflowY: "auto" }}>
              {messages.map((m, i) => (
                <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start", marginBottom: 6 }}>
                  <div style={{ background: m.from === "me" ? theme.orange : theme.white, color: m.from === "me" ? theme.white : theme.dark, padding: "7px 12px", borderRadius: 12, fontSize: 13, maxWidth: "75%", border: m.from === "me" ? "none" : `1px solid ${theme.grayMid}` }}>{m.text}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, padding: 10, borderTop: `1px solid ${theme.grayMid}` }}>
              <input value={msg} onChange={e => setMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Schreib eine Nachricht..." style={{ flex: 1, padding: "9px 12px", borderRadius: 10, border: `2px solid ${theme.grayMid}`, fontSize: 13, outline: "none", fontFamily: "inherit" }} />
              <button onClick={send} style={{ padding: "9px 14px", borderRadius: 10, background: theme.orange, border: "none", color: theme.white, fontWeight: 700, cursor: "pointer", fontSize: 15 }}>→</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RatingWidget({ onDone, name }) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  return (
    <div style={{ background: theme.white, borderRadius: 16, border: `2px solid ${theme.orange}`, padding: 16, marginBottom: 14 }}>
      <h4 style={{ margin: "0 0 12px", fontWeight: 800, color: theme.dark }}>Wie war deine Erfahrung mit {name}?</h4>
      <StarRating value={stars} onChange={setStars} />
      <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Schreib einen Kommentar..." rows={2} style={{ width: "100%", padding: "11px 13px", borderRadius: 10, border: `2px solid ${theme.grayMid}`, fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "inherit", resize: "none", marginTop: 12 }} />
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <OrangeButton onClick={onDone} disabled={stars === 0} style={{ flex: 1 }}>Bewertung absenden</OrangeButton>
        <button onClick={onDone} style={{ padding: "12px 16px", borderRadius: 12, border: `2px solid ${theme.grayMid}`, background: "transparent", color: theme.grayText, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>Abbrechen</button>
      </div>
    </div>
  );
}

// ── Chats Screen ──────────────────────────────────────────────
function ChatsScreen({ onNavigate }) {
  const convos = [
    { id: 1, name: "Maria S.", avatar: "👵", last: "Wäre nächste Woche möglich?", time: "14:32", unread: 2 },
    { id: 2, name: "Tom K.", avatar: "🧑", last: "Super, dann Samstag um 10!", time: "Gestern", unread: 0 },
    { id: 3, name: "Familie Müller", avatar: "👨‍👩‍👧‍👦", last: "Vielen Dank für deine Hilfe!", time: "Mo", unread: 0 },
  ];
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: theme.white }}>
      <div style={{ padding: "16px 20px 14px", borderBottom: `1px solid ${theme.grayMid}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0, fontWeight: 900, fontSize: 20, color: theme.dark }}>💬 Nachrichten</h2>
        <DaysiIcon size={32} />
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {convos.map(c => (
          <div key={c.id} style={{ display: "flex", gap: 14, padding: "14px 20px", borderBottom: `1px solid ${theme.grayMid}`, cursor: "pointer", alignItems: "center" }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: theme.orangePale, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", border: `2px solid ${theme.orange}`, flexShrink: 0 }}>{c.avatar}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: theme.dark }}>{c.name}</span>
                <span style={{ fontSize: 11, color: theme.grayText }}>{c.time}</span>
              </div>
              <p style={{ margin: "3px 0 0", fontSize: 13, color: theme.grayText, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>{c.last}</p>
            </div>
            {c.unread > 0 && <div style={{ width: 20, height: 20, borderRadius: "50%", background: theme.orange, color: "white", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{c.unread}</div>}
          </div>
        ))}
      </div>
      <BottomNav active="chats" onNavigate={onNavigate} />
    </div>
  );
}

// ── Profile Screen ────────────────────────────────────────────
function MyProfileScreen({ onNavigate, onPremium, onVerify }) {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: theme.white }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, padding: "20px 20px 28px", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <span style={{ fontSize: 20, cursor: "pointer" }}>⚙️</span>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.25)", fontSize: 34, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid rgba(255,255,255,0.6)" }}>😊</div>
          <div style={{ color: "white" }}>
            <h2 style={{ margin: 0, fontSize: 21, fontWeight: 900 }}>Dein Name</h2>
            <p style={{ margin: "3px 0 0", opacity: 0.85, fontSize: 13 }}>📍 München · Mitglied seit 2024</p>
            <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
              <span style={{ background: "rgba(255,255,255,0.2)", fontSize: 11, color: "white", padding: "3px 10px", borderRadius: 20 }}>📱 Verifiziert</span>
              <span style={{ background: "rgba(255,255,255,0.2)", fontSize: 11, color: "white", padding: "3px 10px", borderRadius: 20 }}>⭐ 4.9</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
          {[{ val: "12", label: "Treffen" }, { val: "4.9", label: "Bewertung" }, { val: "8", label: "Bewertungen" }].map(({ val, label }) => (
            <div key={label} style={{ background: theme.offWhite, borderRadius: 12, padding: "12px 8px", textAlign: "center", border: `1px solid ${theme.grayMid}` }}>
              <p style={{ margin: 0, fontSize: 20, fontWeight: 900, color: theme.orange }}>{val}</p>
              <p style={{ margin: 0, fontSize: 11, color: theme.grayText }}>{label}</p>
            </div>
          ))}
        </div>
        {/* Premium Banner */}
        <div onClick={onPremium} style={{ background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, borderRadius: 16, padding: 16, marginBottom: 14, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "white" }}>
            <p style={{ margin: 0, fontWeight: 800, fontSize: 15 }}>⭐ Daysi Premium</p>
            <p style={{ margin: "3px 0 0", opacity: 0.85, fontSize: 12 }}>Unbegrenzte Präferenzen & mehr</p>
          </div>
          <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 20 }}>Upgrade →</span>
        </div>
        {/* Verification */}
        <div style={{ background: theme.offWhite, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${theme.grayMid}` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: theme.dark, margin: "0 0 10px" }}>🔐 Verifikation</p>
          {[
            { label: "📱 Telefon", done: true },
            { label: "✉️ E-Mail", done: true },
            { label: "🪪 Ausweis", done: false },
            { label: "📋 Führungszeugnis", done: false },
          ].map(({ label, done }) => (
            <div key={label} onClick={!done ? onVerify : undefined} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${theme.grayMid}`, cursor: done ? "default" : "pointer" }}>
              <span style={{ fontSize: 13, color: theme.dark }}>{label}</span>
              <span style={{ fontSize: 12, fontWeight: 700, color: done ? theme.green : theme.orange }}>{done ? "✅ Verifiziert" : "Jetzt verifizieren →"}</span>
            </div>
          ))}
        </div>
        {/* Album */}
        <div style={{ background: theme.offWhite, borderRadius: 14, padding: 14, marginBottom: 14, border: `1px solid ${theme.grayMid}` }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: theme.dark, margin: "0 0 10px" }}>📸 Mein Album</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {["🌿", "🎾", "🚴", "+"].map((img, i) => (
              <div key={i} style={{ aspectRatio: "1", borderRadius: 10, background: i === 3 ? "transparent" : theme.orangePale, border: i === 3 ? `2px dashed ${theme.orange}` : `1px solid ${theme.grayMid}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: i === 3 ? 22 : 28, color: i === 3 ? theme.orange : "inherit", cursor: "pointer" }}>{img}</div>
            ))}
          </div>
        </div>
        {/* Settings */}
        <div style={{ background: theme.offWhite, borderRadius: 14, border: `1px solid ${theme.grayMid}`, overflow: "hidden", marginBottom: 14 }}>
          {[{ icon: "🔔", label: "Benachrichtigungen" }, { icon: "🔒", label: "Datenschutz & Sicherheit" }, { icon: "📋", label: "AGB & Impressum" }, { icon: "🚪", label: "Abmelden" }].map(({ icon, label }, i, arr) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: i < arr.length - 1 ? `1px solid ${theme.grayMid}` : "none", cursor: "pointer" }}>
              <span style={{ fontSize: 18 }}>{icon}</span>
              <span style={{ fontSize: 14, color: label === "Abmelden" ? "#E53935" : theme.dark, fontWeight: 500 }}>{label}</span>
              <span style={{ marginLeft: "auto", color: theme.grayText }}>›</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="profile" onNavigate={onNavigate} />
    </div>
  );
}

// ── Premium Screen ────────────────────────────────────────────
function PremiumScreen({ onBack }) {
  const [selected, setSelected] = useState("monthly");
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: theme.white }}>
      <div style={{ background: `linear-gradient(135deg, ${theme.orange}, ${theme.orangeDark})`, padding: "20px 20px 36px", flexShrink: 0, textAlign: "center" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: theme.white, borderRadius: 10, padding: "6px 12px", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", display: "block", marginBottom: 16 }}>← Zurück</button>
        <DaysiMascot size={80} style={{ margin: "0 auto 10px" }} />
        <h2 style={{ color: "white", margin: "0 0 4px", fontSize: 22, fontWeight: 900 }}>Daysi Premium ⭐</h2>
        <p style={{ color: "rgba(255,255,255,0.85)", margin: 0, fontSize: 14 }}>Hol das Beste aus deiner Community raus</p>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 20px" }}>
        {[
          { icon: "🏷️", title: "Unbegrenzte Präferenzen", desc: "Wähle so viele Alltag & Hobby-Tags wie du willst" },
          { icon: "🔍", title: "Erweiterte Suche", desc: "Filter nach Badges, Bewertung, Verfügbarkeit" },
          { icon: "📣", title: "Top-Platzierung", desc: "Dein Profil erscheint ganz oben in den Ergebnissen" },
          { icon: "💬", title: "Unbegrenzte Chats", desc: "Schreib so vielen Daysi's wie du möchtest" },
          { icon: "⭐", title: "Premium-Badge", desc: "Zeig dass du ein echtes Community-Mitglied bist" },
          { icon: "📊", title: "Profilstatistiken", desc: "Sieh wer dein Profil besucht hat" },
        ].map(({ icon, title, desc }) => (
          <div key={title} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: theme.orangePale, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{icon}</div>
            <div>
              <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: theme.dark }}>{title}</p>
              <p style={{ margin: "2px 0 0", fontSize: 13, color: theme.grayText }}>{desc}</p>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, marginTop: 8 }}>
          {[{ key: "monthly", label: "Monatlich", price: "4,99 €", sub: "pro Monat" }, { key: "yearly", label: "Jährlich", price: "39,99 €", sub: "3,33 €/Monat · spare 33%" }].map(({ key, label, price, sub }) => (
            <div key={key} onClick={() => setSelected(key)} style={{ flex: 1, padding: 14, borderRadius: 14, border: `2px solid ${selected === key ? theme.orange : theme.grayMid}`, background: selected === key ? theme.orangePale : theme.white, cursor: "pointer", textAlign: "center" }}>
              {key === "yearly" && <div style={{ background: theme.orange, color: "white", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, marginBottom: 6, display: "inline-block" }}>BELIEBT</div>}
              <p style={{ margin: 0, fontWeight: 800, fontSize: 15, color: theme.dark }}>{label}</p>
              <p style={{ margin: "4px 0 0", fontWeight: 900, fontSize: 20, color: theme.orange }}>{price}</p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: theme.grayText }}>{sub}</p>
            </div>
          ))}
        </div>
        <OrangeButton onClick={onBack}>Jetzt Premium werden ⭐</OrangeButton>
        <p style={{ textAlign: "center", fontSize: 11, color: theme.grayText, marginTop: 10 }}>Jederzeit kündbar · Keine versteckten Kosten</p>
      </div>
    </div>
  );
}

// ── Verify ID Screen ──────────────────────────────────────────
function VerifyIDScreen({ onBack }) {
  const [step, setStep] = useState(0);
  const steps = ["Ausweis Vorderseite", "Ausweis Rückseite", "Selfie mit Ausweis"];
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", background: theme.white }}>
      <TopBar title="Ausweis verifizieren" onBack={onBack} />
      <div style={{ flex: 1, overflowY: "auto", padding: "24px 20px" }}>
        <DaysiBubble text="Deine Daten werden sicher verarbeitet und niemals weitergegeben 🔒" style={{ marginBottom: 24 }} />
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: i <= step ? theme.orange : theme.grayMid, color: "white", fontSize: 14, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 4px" }}>{i < step ? "✓" : i + 1}</div>
              <span style={{ fontSize: 10, color: i <= step ? theme.orange : theme.grayText, fontWeight: i <= step ? 700 : 400 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ background: theme.offWhite, borderRadius: 20, border: `2px dashed ${theme.orange}`, height: 180, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", marginBottom: 20 }}>
          <span style={{ fontSize: 48, marginBottom: 8 }}>📷</span>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: theme.dark }}>Foto aufnehmen</p>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: theme.grayText }}>{steps[step]}</p>
        </div>
        <OrangeButton onClick={() => step < 2 ? setStep(step + 1) : onBack()}>
          {step < 2 ? "Weiter →" : "Verifizierung abschließen ✓"}
        </OrangeButton>
        {step > 0 && <button onClick={() => setStep(step - 1)} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "none", background: "transparent", color: theme.grayText, cursor: "pointer", marginTop: 8, fontFamily: "inherit", fontSize: 13 }}>← Zurück</button>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// APP SHELL
// ══════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("splash");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [prevScreen, setPrevScreen] = useState(null);

  const go = (s) => { setPrevScreen(screen); setScreen(s); };
  const goBack = () => setScreen(prevScreen || "home");

  const navigate = (key) => {
    const map = { home: "home", search: "home", chats: "chats", profile: "myprofile" };
    go(map[key] || key);
  };

  const screens = {
    splash: <SplashScreen onLogin={() => go("login")} onRegister={() => go("register")} />,
    login: <LoginScreen onBack={() => go("splash")} onSuccess={() => go("home")} />,
    register: <RegisterScreen onBack={() => go("splash")} onNext={() => go("verifyphone")} />,
    verifyphone: <VerifyPhoneScreen onNext={() => go("profilesetup")} />,
    profilesetup: <ProfileSetupScreen onNext={() => go("alltag")} />,
    alltag: <AlltagScreen onNext={() => go("hobby")} />,
    hobby: <HobbyScreen onNext={() => go("album")} />,
    album: <AlbumScreen onNext={() => go("home")} />,
    home: <HomeScreen onProfile={p => { setSelectedProfile(p); go("detail"); }} onNavigate={navigate} />,
    detail: selectedProfile ? <ProfileDetailScreen person={selectedProfile} onBack={goBack} /> : null,
    chats: <ChatsScreen onNavigate={navigate} />,
    myprofile: <MyProfileScreen onNavigate={navigate} onPremium={() => go("premium")} onVerify={() => go("verifyid")} />,
    premium: <PremiumScreen onBack={goBack} />,
    verifyid: <VerifyIDScreen onBack={goBack} />,
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", background: "#FAFAFA", minHeight: "100vh", maxWidth: 420, margin: "0 auto" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      {screens[screen]}
    </div>
  );
}
