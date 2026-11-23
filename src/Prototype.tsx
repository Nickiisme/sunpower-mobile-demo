import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import {
  ArchiveIcon,
  ArrowLeftIcon,
  BackpackIcon,
  BellIcon,
  CalendarIcon,
  CheckCircledIcon,
  ChevronRightIcon,
  Cross2Icon,
  DownloadIcon,
  EnvelopeClosedIcon,
  ExclamationTriangleIcon,
  ExternalLinkIcon,
  FileTextIcon,
  GearIcon,
  GlobeIcon,
  HomeIcon,
  LightningBoltIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  PersonIcon,
  PlusIcon,
  RocketIcon,
  SewingPinIcon,
  VideoIcon,
  ReaderIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import {
  KeyboardInput as MobileTextField,
  KeyboardTextarea,
  MobileScroll,
  BottomSheet,
  Carousel,
  useKeyboard,
  useKeyboardInsets,
} from "./mobile";
import module515 from "./assets/module-515.png";
import module500 from "./assets/module-500.png";
import reserveKit from "./assets/reserve-kit.png";

type Tab = "home" | "warranty" | "leads" | "products" | "fieldops";
type Page =
  | Tab
  | "marketing"
  | "training"
  | "academy"
  | "profile"
  | "users"
  | "messages"
  | "benefits"
  | "news"
  | "faq";
type Warranty = {
  id: string;
  serial: string;
  owner: string;
  email: string;
  date: string;
  quantity: number;
  country: string;
  city: string;
  address: string;
  postal: string;
  lead: string;
  consent: boolean;
  status: "Draft" | "Submitted" | "Completed";
};
type Lead = {
  id: string;
  name: string;
  email: string;
  city: string;
  country: string;
  phone: string;
  source: string;
  type: string;
  status: string;
  owner: string;
  created: string;
  updated: string;
  notes: { time: string; text: string }[];
};
type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  enabled: boolean;
  permissions: string[];
};
type Request = {
  id: string;
  date: string;
  items: Record<number, number>;
  status: string;
  delivery: string;
  note: string;
};
type HomeConfig = {
  applicationSubmitted: boolean;
  level: string;
  accountType: string;
  purchasedKw: number;
  essKits: number;
  targetKw: number;
  targetKits: number;
  reviewDate: string;
  banner: boolean;
  bannerTitle: boolean;
  bannerExplore: boolean;
  content: boolean;
  notification: "None" | "Invitation" | "Rejected";
};
const defaultHome = (): HomeConfig => ({
  applicationSubmitted: false,
  level: "Authorized", accountType: "Admin",
  purchasedKw: 112, essKits: 7, targetKw: 500, targetKits: 24,
  reviewDate: "2026-12-31", banner: true, bannerTitle: true,
  bannerExplore: true, content: true, notification: "None",
});
type RouteIntent = { leadStage?: string; editProfile?: boolean };
type Store = {
  home: HomeConfig;
  warranties: Warranty[];
  leads: Lead[];
  users: User[];
  cart: Record<number, number>;
  requests: Request[];
  reminders: string[];
  read: string[];
  profile: {
    name: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    language: string;
  };
  policy: {
    mode: string;
    role: string;
    permission: string;
    recycle: boolean;
    pending: number;
    claimed: number;
  };
  jobs: { id: string; name: string; city: string; stage: string }[];
};
const PORTAL = "https://portal.partners.sunpowerglobal.com/#/";
const KEY = "sunpower-partner-app-v2";
const today = () =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
const now = () => new Date().toLocaleString("en-GB");
const initial = (): Store => ({
  home: defaultHome(),
  warranties: [
    {
      id: "W001",
      serial: "SPR-460-0182",
      owner: "Sophie Martin",
      email: "sophie@example.com",
      date: "2026-08-22",
      quantity: 12,
      country: "France",
      city: "Lyon",
      address: "24 Avenue des Fleurs",
      postal: "69001",
      lead: "LD202610001",
      consent: true,
      status: "Completed",
    },
    {
      id: "W002",
      serial: "SPR-515-0047",
      owner: "Pending owner",
      email: "noah@example.com",
      date: "2026-08-12",
      quantity: 8,
      country: "Norway",
      city: "Oslo",
      address: "",
      postal: "",
      lead: "",
      consent: true,
      status: "Submitted",
    },
    {
      id: "W003",
      serial: "SP-RH-8831",
      owner: "Pending owner",
      email: "",
      date: "2026-07-29",
      quantity: 1,
      country: "United Kingdom",
      city: "Bristol",
      address: "",
      postal: "",
      lead: "",
      consent: false,
      status: "Draft",
    },
  ],
  leads: [
    {
      id: "LD202610001",
      name: "Emma Wilson",
      email: "emma@example.com",
      phone: "+44 7700 900123",
      city: "Bristol",
      country: "United Kingdom",
      source: "Website",
      type: "Residential",
      status: "Pending Claim",
      owner: "Xin Wang",
      created: "2026-10-23",
      updated: "2026-10-23",
      notes: [
        {
          time: "23 Oct 2026",
          text: "Interested in residential solar + storage. Assigned to Xin Wang.",
        },
      ],
    },
    {
      id: "LD202610002",
      name: "Noah Jensen",
      email: "noah@example.com",
      phone: "+47 00000000",
      city: "Oslo",
      country: "Norway",
      source: "Referral",
      type: "Residential",
      status: "Claimed",
      owner: "Sophie Martin",
      created: "2026-10-20",
      updated: "2026-10-24",
      notes: [
        {
          time: "24 Oct 2026",
          text: "Homeowner contacted. Roof survey requested.",
        },
      ],
    },
    {
      id: "LD202610003",
      name: "Clara Rossi",
      email: "clara@example.com",
      phone: "+39 00000000",
      city: "Milan",
      country: "Italy",
      source: "Campaign",
      type: "Commercial",
      status: "Qualified",
      owner: "",
      created: "2026-10-18",
      updated: "2026-10-24",
      notes: [
        {
          time: "24 Oct 2026",
          text: "Qualified opportunity. Available in the shared pool.",
        },
      ],
    },
  ],
  users: [
    {
      id: "U1",
      name: "Xin Wang",
      email: "xin@example.com",
      phone: "",
      role: "Partner admin",
      status: "Active",
      enabled: true,
      permissions: [
        "Warranty",
        "Lead",
        "Marketing",
        "Live training",
        "Academy",
        "Monitoring",
        "Products",
      ],
    },
    {
      id: "U2",
      name: "Sophie Martin",
      email: "sophie@example.com",
      phone: "+33 000000000",
      role: "Sales representative",
      status: "Active",
      enabled: true,
      permissions: ["Warranty", "Lead", "Products"],
    },
  ],
  cart: {},
  requests: [],
  reminders: [],
  read: [],
  profile: {
    name: "Xin Wang",
    email: "xin@example.com",
    phone: "",
    company: "SunPower Partner",
    country: "United Kingdom",
    language: "English",
  },
  policy: {
    mode: "Random assignment",
    role: "Sales representative",
    permission: "Owner & admin",
    recycle: true,
    pending: 3,
    claimed: 7,
  },
  jobs: [
    {
      id: "I1",
      name: "Wilson Residence",
      city: "Bristol · 8.2 kW + storage",
      stage: "Commissioning",
    },
    {
      id: "I2",
      name: "Jensen Residence",
      city: "Oslo · 10.3 kW",
      stage: "Site survey",
    },
    {
      id: "I3",
      name: "Rossi Residence",
      city: "Milan · 6.9 kW + storage",
      stage: "Ready",
    },
  ],
});
function restore(): Store {
  try {
    const value = JSON.parse(localStorage.getItem(KEY) || "null");
    return value?.version === 2 ? { ...initial(), ...value.data, home: Object.fromEntries(Object.entries(defaultHome()).map(([key, fallback]) => [key, value.data.home?.[key] ?? fallback])) as HomeConfig } : initial();
  } catch {
    return initial();
  }
}
const AppContext = createContext<{
  data: Store;
  setData: React.Dispatch<React.SetStateAction<Store>>;
  go: (p: Page, intent?: RouteIntent) => void;
  intent: RouteIntent;
  notify: (s: string) => void;
}>(null!);
const useApp = () => useContext(AppContext);
function live(path: string) {
  window.open(PORTAL + path, "_blank", "noopener,noreferrer");
}
function file(name: string, body: string, type = "text/plain;charset=utf-8") {
  const url = URL.createObjectURL(new Blob([body], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
function csv(rows: (string | number)[][]) {
  return (
    "\ufeff" +
    rows
      .map((row) =>
        row.map((v) => '"' + String(v).replaceAll('"', '""') + '"').join(","),
      )
      .join("\r\n")
  );
}
function parseCSV(text: string) {
  const rows: string[][] = [];
  let row: string[] = [],
    cell = "",
    quoted = false;
  const s = text.replace(/^\ufeff/, "");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '"') {
      if (quoted && s[i + 1] === '"') {
        cell += '"';
        i++;
      } else quoted = !quoted;
    } else if (c === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((c === "\n" || c === "\r") && !quoted) {
      if (c === "\r" && s[i + 1] === "\n") i++;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else cell += c;
  }
  if (quoted) throw Error("Unclosed quote in CSV");
  row.push(cell);
  if (row.some(Boolean)) rows.push(row);
  return rows;
}
function AppSheet({ footer, ...props }: ComponentProps<typeof BottomSheet> & { footer?: ReactNode }) {
  const keyboard = useKeyboard();
  const { bottomInset } = useKeyboardInsets();
  useEffect(() => {
    if (!props.open) keyboard.hide();
  }, [props.open]);
  const close = () => { keyboard.hide(); props.onOpenChange(false); };
  return (
    <BottomSheet {...props} onOpenChange={(open) => {
      if (!open) keyboard.hide();
      props.onOpenChange(open);
    }}>
      <button className="app-sheet-close" aria-label="Close panel" onPointerDown={e => e.preventDefault()} onClick={close}><Cross2Icon /></button>
      {footer ? <div className="app-sheet-layout">
        <div className="app-sheet-scroll">{props.children}</div>
        <div className="app-sheet-footer" onPointerDownCapture={e => { if (e.target instanceof Element && e.target.closest("button")) e.preventDefault(); }} style={{paddingBottom:12 + (keyboard.visible ? 0 : bottomInset)}}>{footer}</div>
      </div> : props.children}
    </BottomSheet>
  );
}
function Field({
  label,
  value,
  set,
  type = "text",
  required = false,
  placeholder = "",
}: {
  label: string;
  value: string;
  set: (s: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  const keyboard = useKeyboard();
  return (
    <label className="form-field">
      <span>
        {label}
        {required && <em> *</em>}
      </span>
      <MobileTextField
        aria-label={label}
        type={type}
        value={value}
        onChange={(e) => set(e.target.value)}
        onBlur={(e) => {
          const next = e.relatedTarget;
          if (!(next instanceof HTMLInputElement || next instanceof HTMLTextAreaElement)) keyboard.hide();
        }}
        placeholder={placeholder || label}
        required={required}
      />
    </label>
  );
}
function Select({
  label,
  value,
  set,
  options,
  disabled = false,
}: {
  label: string;
  value: string;
  set: (s: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      <select
        aria-label={label}
        disabled={disabled}
        value={value}
        onChange={(e) => set(e.target.value)}
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
function Search({
  value,
  set,
  placeholder,
}: {
  value: string;
  set: (s: string) => void;
  placeholder: string;
}) {
  return (
    <div className="search">
      <MagnifyingGlassIcon />
      <MobileTextField
        aria-label={placeholder}
        value={value}
        onChange={(e) => set(e.target.value)}
        placeholder={placeholder}
      />
      {value && (
        <button aria-label="Clear search" onClick={() => set("")}>
          <Cross2Icon />
        </button>
      )}
    </div>
  );
}
function Chips({
  options,
  value,
  set,
}: {
  options: string[];
  value: string;
  set: (s: string) => void;
}) {
  return (
    <Carousel
      ariaLabel="Filters"
      className="filter-carousel"
      contentClassName="chip-row"
    >
      {options.map((o) => (
        <button
          key={o}
          className={o === value ? "selected" : ""}
          aria-pressed={o === value}
          onClick={() => set(o)}
        >
          {o}
        </button>
      ))}
    </Carousel>
  );
}
function Empty({
  children = "No results match your filters.",
}: {
  children?: ReactNode;
}) {
  return (
    <div className="empty compact-empty">
      <MagnifyingGlassIcon />
      <h3>No results</h3>
      <p>{children}</p>
    </div>
  );
}
function Status({ value }: { value: string }) {
  return (
    <span
      className={
        "pill " +
        (/Completed|Qualified|Active|Ready|Normal|Authorized/.test(value)
          ? "completed"
          : /Emergency/.test(value)
            ? "emergency"
            : /Draft|Pending|Major|No device/.test(value)
              ? "draft"
              : "submitted")
      }
    >
      {value}
    </span>
  );
}
function Back({
  onClick,
  label = "Back",
}: {
  onClick: () => void;
  label?: string;
}) {
  return (
    <button className="back-link" onClick={onClick}>
      <ArrowLeftIcon />
      {label}
    </button>
  );
}
function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="form-section">
      <h2 className="panel-title">{title}</h2>
      {children}
    </section>
  );
}
function PortalLink({
  path,
  label = "Open in Partner Portal",
}: {
  path: string;
  label?: string;
}) {
  return (
    <button className="portal-link" onClick={() => live(path)}>
      <ExternalLinkIcon />
      {label}
    </button>
  );
}
function MenuRow({
  icon,
  title,
  sub,
  onClick,
  end,
}: {
  icon: ReactNode;
  title: string;
  sub?: string;
  onClick: () => void;
  end?: ReactNode;
}) {
  return (
    <button className="menu-row" onClick={onClick}>
      <span className="record-icon">{icon}</span>
      <span>
        <b>{title}</b>
        {sub && <small>{sub}</small>}
      </span>
      {end}
      <ChevronRightIcon />
    </button>
  );
}
const tabs: { id: Tab; label: string; icon: React.ComponentType }[] = [
  { id: "home", label: "Home", icon: HomeIcon },
  { id: "warranty", label: "Warranty", icon: FileTextIcon },
  { id: "leads", label: "Leads", icon: PersonIcon },
  { id: "products", label: "Products", icon: BackpackIcon },
  { id: "fieldops", label: "Field Ops", icon: GearIcon },
];
function Header() {
  const { go, data } = useApp();
  return (
    <header className="topbar">
      <div className="brand">
        <b>TCL</b>
        <i />
        SUNPOWER
      </div>
      <div className="header-actions">
        <button
          className="bell-button"
          aria-label="Messages"
          onClick={() => go("messages")}
        >
          <BellIcon />
          {data.read.length < 2 && <i />}
        </button>
        <button
          className="avatar"
          aria-label="Profile"
          onClick={() => go("profile")}
        >
          XW
        </button>
      </div>
    </header>
  );
}
const isEntryAccount = (data: Store) => ["Entry", "N/A"].includes(data.home.level);
const allowedPage = (data: Store, page: Page) => !(isEntryAccount(data) && ["leads", "products"].includes(page));
function BottomNav({ tab }: { tab: Tab }) {
  const { go, data } = useApp();
  const { bottomInset, isKeyboardVisible } = useKeyboardInsets();
  const count = Object.values(data.cart).reduce((a, b) => a + b, 0);
  return (
    <nav
      className="bottom-nav"
      style={{ bottom: isKeyboardVisible ? bottomInset : Math.max(0, bottomInset - 16) }}
      aria-label="Main navigation"
    >
      {tabs.filter(t => allowedPage(data, t.id)).map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          aria-current={id === tab ? "page" : undefined}
          className={id === tab ? "active" : ""}
          onClick={() => go(id)}
        >
          <span className="nav-icon">
            <Icon />
            {id === "products" && count > 0 && <em>{count}</em>}
          </span>
          {label}
        </button>
      ))}
    </nav>
  );
}
const trainingEvents = [
  {
    id: "e1",
    day: "28",
    month: "OCT",
    title: "Unlock the Full Potential of Your Partner Portal",
    date: "2026-10-28",
    kind: "Webinar",
    description:
      "Discover the tools and resources available in your Partner Portal.",
  },
  {
    id: "e2",
    day: "18",
    month: "JUN",
    title: "Shingle Shade Management: More Energy Production on Real Roofs",
    date: "2026-06-18 to 2026-12-31",
    kind: "On demand",
    description: "Learn about energy production and performance on real roofs.",
  },
  {
    id: "e3",
    day: "01",
    month: "JUL",
    title: "Winning with Back Contact: TCL SunPower Panel Advantages",
    date: "2026-07-01 to 2026-12-31",
    kind: "On demand",
    description: "Explore back contact technology and panel advantages.",
  },
  {
    id: "e4",
    day: "23",
    month: "OCT",
    title: "Want to see X5 explained in more depth?",
    date: "2026-10-23",
    kind: "Past webinar",
    description: "11:00–12:00 · Online. Registration has closed.",
  },
];
const news = [
  {
    title: "SunPower Origin: sell the benefits",
    date: "21 October 2026",
    body: "Empower your sales teams with the tools to sell smarter: communicate the full value of SunPower Origin, reinforce every claim with credible data, and confidently address customer objections.",
    link: "https://learn.ahaslides.com/l/course/01a15d5a-19b6-781c-908d-d5ceba8d4852",
    action: "Start the course",
  },
  {
    title: "SunPower Origin is Here!",
    date: "20 October 2026",
    body: "SunPower Origin is now available for orders. Find the price list in Partner Resources → Marketing.",
    link: PORTAL + "marketing/service?name=disitalAssets",
    action: "Marketing assets",
  },
];
// Local fixtures mirror the Portal response shape; no production session is used.
function homeRole(level: string, country: string) {
  if (["Authorized", "Premier", "Elite"].includes(level)) return "partner";
  if (["Entry", "N/A"].includes(level)) return ["United Kingdom", "Italy", "Spain", "Germany"].includes(country) ? "entry1" : "entry2";
  return null;
}
const localDate = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
type HomeMessage = { id: string; title: string; body: string; start: string; end: string; countries: string[]; levels: string[]; kind: "Latest News" | "Partner Benefits" | "Marketing Event"; enabled: boolean; location?: string; format?: string };
const sampleMessages = (): HomeMessage[] => {
  const date = new Date();
  const day = (offset: number) => localDate(new Date(date.getFullYear(), date.getMonth(), date.getDate() + offset));
  return [
    ...news.map((n, i): HomeMessage => ({ id: `news-${i}`, title: n.title, body: n.body, start: localDate(new Date(date.getFullYear(), date.getMonth(), Math.max(1, date.getDate() - i))), end: day(30), countries: [], levels: [], kind: "Latest News", enabled: true })),
    { id: "benefits", title: "Grow with SunPower", body: "Discover the partner program, sales resources, training and opportunities available to your business.", start: day(-365), end: day(365), countries: [], levels: [], kind: "Partner Benefits", enabled: true },
    { id: "event-1", title: "Unlock your Partner Portal", body: "Explore partner tools, warranty registration and lead management. Sample event · confirm timing and register in Portal.", start: day(0), end: day(0), countries: [], levels: [], kind: "Marketing Event", enabled: true, format: "Online", location: "Online" },
    { id: "event-2", title: "Solar & storage partner workshop", body: "A regional workshop covering solar and storage solutions. Sample event · confirm availability in Portal.", start: day(7), end: day(7), countries: ["United Kingdom", "Germany", "Italy", "Spain"], levels: ["Authorized", "Premier", "Elite"], kind: "Marketing Event", enabled: true, format: "Offline", location: "Regional partner centre" },
  ];
};
function visibleHomeMessages(data: Store, kind: HomeMessage["kind"]) {
  return data.home.content ? sampleMessages().filter(m => m.kind === kind && m.enabled && (!m.countries.length || m.countries.includes(data.profile.country)) && (!m.levels.length || m.levels.includes(data.home.level))) : [];
}
function relativeLeadDate(value: string) {
  const diff = Math.max(0, Date.now() - new Date(value.replace(" ", "T")).getTime());
  if (!Number.isFinite(diff)) return "";
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)} minutes ago`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
  if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
  return `On ${new Date(value).toLocaleDateString("en-GB")}`;
}
function TierCard() {
  const { data } = useApp();
  const h = data.home;
  const highest = h.level === "Elite";
  const next = ({ Entry: "Authorized", Authorized: "Premier", Premier: "Elite" } as Record<string, string>)[h.level] || "Authorized";
  return <article className="hero-card" data-testid="current-tier">
    <span className="eyebrow">CURRENT TIER · SAMPLE PROGRESS</span>
    <div className="tier-head"><div className="tier-badge"><RocketIcon /></div><div><h2>{h.level}</h2><p>{highest ? "You’ve reached the highest tier" : `Your next milestone: ${next}`}</p></div></div>
    {([["Purchased solar", h.purchasedKw, h.targetKw, "kW"], ["ESS kits", h.essKits, h.targetKits, "kits"]] as const).map(([label, current, target, unit]) => {
      const percent = target > 0 ? Math.round(Math.max(0, Math.min(100, current / target * 100))) : 0;
      return <div key={label} className="home-metric"><div className="progress-label"><span>{label}</span><b>{highest ? `${current} ${unit}` : `${percent}%`}</b></div>{!highest && <div className="progress" role="progressbar" aria-label={label} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><i style={{width: `${percent}%`}} /></div>}{!highest && <p>{current} {unit} / {target} {unit} · {Math.max(0, target - current)} remaining</p>}</div>;
    })}
    <div className="home-tier-review">{highest ? "Elite partner" : `Target: ${h.targetKw} kW or ${h.targetKits} ESS kits`}<span>Review · {h.reviewDate}</span></div>
  </article>;
}
function HomeNews({ items, open }: { items: HomeMessage[]; open: (m: HomeMessage) => void }) {
  const root = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = setInterval(() => {
      const rail = root.current?.querySelector<HTMLElement>(".home-news-carousel");
      if (!rail || !rail.clientWidth) return;
      const next = (Math.round(rail.scrollLeft / (rail.clientWidth + 12)) + 1) % items.length;
      rail.scrollLeft = next * (rail.clientWidth + 12);
    }, 2500);
    return () => clearInterval(timer);
  }, [paused, items.length]);
  return <div ref={root} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }} onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}>
    <Carousel ariaLabel="Latest news" className="home-news-carousel" contentClassName="home-news-track">{items.map(n => <button key={n.id} className="news-card" onClick={() => open(n)}><img src={module515} alt="SunPower solar module" /><span className="news-copy"><span className="news-meta"><em>Latest news</em><time>{n.start}</time></span><b>{n.title}</b><small>{n.body}</small><span className="news-link">Read story<ChevronRightIcon /></span></span></button>)}</Carousel>
  </div>;
}
function HomeScreen() {
  const { go, data, setData } = useApp();
  const role = homeRole(data.home.level, data.profile.country);
  const pending = data.leads.filter(l => l.status === "Pending Claim");
  const latest = [...pending].sort((a,b) => b.created.localeCompare(a.created))[0];
  const [message, setMessage] = useState<HomeMessage | null>(null);
  const [profilePrompt, setProfilePrompt] = useState(() => ![data.profile.name, data.profile.email, data.profile.phone, data.profile.company, data.profile.country].every(v => v.trim()));
  const [notification, setNotification] = useState(data.home.notification);
  const [agreement, setAgreement] = useState(false);
  const [application, setApplication] = useState<"confirm" | "success" | "pending" | null>(null);
  const [month, setMonth] = useState(localDate(new Date()).slice(0,7));
  const [date, setDate] = useState("");
  const [limit, setLimit] = useState(10);
  const [range, setRange] = useState(false);
  const [year, monthNo] = month.split("-").map(Number);
  const validMonth = !!year && monthNo >= 1 && monthNo <= 12;
  const start = localDate(new Date(year, monthNo - (range ? 1 : 2), 1));
  const end = localDate(new Date(year, monthNo + (range ? 0 : 1), 0));
  const activities = visibleHomeMessages(data, "Marketing Event").filter(m => m.start <= (date || end) && m.end >= (date || start)).sort((a,b) => a.start.localeCompare(b.start));
  const allActivities = visibleHomeMessages(data, "Marketing Event");
  const firstOfMonth = today().slice(0,7) + "-01";
  const stories = visibleHomeMessages(data, "Latest News").filter(m => m.start <= today() && m.end >= firstOfMonth).sort((a,b) => b.start.localeCompare(a.start)).slice(0,5);
  const benefit = visibleHomeMessages(data, "Partner Benefits")[0];
  const closeNotification = () => { setNotification("None"); setAgreement(false); setData(d => ({...d, home: {...d.home, notification: "None"}})); };
  return <section className="content home-content" data-home-role={role || "unmatched"}>
    <p className="preview-note">Local preview · {data.profile.country} · {data.home.level}</p>
    {data.home.banner && <article className="home-banner"><span className="eyebrow">TCL SUNPOWER</span>{data.home.bannerTitle && <h2>Power your next opportunity.</h2>}{data.home.bannerExplore && <button onClick={() => live("dashboard/home")}>Explore more <ExternalLinkIcon /></button>}</article>}
    {!isEntryAccount(data) && pending.length > 0 && <button className="home-lead-notice" onClick={() => go("leads", {leadStage: "Pending Claim"})}><span className="record-icon"><PersonIcon /></span><span><b>{pending.length} new {pending.length === 1 ? "lead needs" : "leads need"} your attention</b><small>{latest && relativeLeadDate(latest.created)}</small></span><ChevronRightIcon /></button>}
    {!role && <Section title="Homepage unavailable"><p>No homepage matches this account level. Check your account in Portal.</p><PortalLink path="dashboard/home" /></Section>}
    {role === "partner" && <><TierCard /><div className="hero-links"><button onClick={() => go("benefits")}>Partner benefits<ChevronRightIcon /></button><button onClick={() => live("dashboard/home")}><DownloadIcon />Certification</button></div></>}
    {role && role !== "partner" && (benefit || (role === "entry1")) && <article className="article-card"><span className="eyebrow">PARTNER BENEFITS</span><h2>{role === "entry1" ? "Become a SunPower partner" : benefit?.title}</h2><p>{role === "entry1" ? "Join the partner program to grow your business with SunPower." : benefit?.body}</p><button className="primary wide" onClick={() => role === "entry1" ? setApplication(data.home.applicationSubmitted ? "pending" : "confirm") : benefit && setMessage(benefit)}>{role === "entry1" ? "Apply now" : "Explore partner benefits"}<ChevronRightIcon /></button></article>}
      <h3 className="section-title">Quick actions</h3>
      <div className="quick-grid">
        <button onClick={() => go("warranty")}>
          <span className="quick-icon yellow">
            <FileTextIcon />
          </span>
          <b>Register warranty</b>
          <small>Protect a new install</small>
          <ChevronRightIcon />
        </button>
        {!isEntryAccount(data) && <button onClick={() => go("leads")}>
          <span className="quick-icon blue">
            <PersonIcon />
          </span>
          <b>View leads</b>
          <small>
            {data.leads.filter((l) => l.status === "Pending Claim").length} need
            your attention
          </small>
          <ChevronRightIcon />
        </button>}
        {isEntryAccount(data) && <button onClick={() => go("fieldops")}><span className="quick-icon blue"><GearIcon /></span><b>Monitoring</b><small>View your systems</small><ChevronRightIcon /></button>}
      </div>
      <div className="section-row">
        <h3 className="section-title">Partner resources</h3>
      </div>
      <div className="resource-shortcuts">
        <MenuRow
          icon={<ArchiveIcon />}
          title="Marketing"
          sub="Partner resources & digital assets"
          onClick={() => go("marketing")}
        />
        <MenuRow
          icon={<VideoIcon />}
          title="Live training"
          sub="Webinars, seminars & event calendar"
          onClick={() => go("training")}
        />
        <MenuRow
          icon={<ReaderIcon />}
          title="Academy"
          sub="Study, exams & classes"
          onClick={() => go("academy")}
        />
        <MenuRow icon={<QuestionMarkCircledIcon />} title="FAQ" sub="Frequently asked questions & help" onClick={() => go("faq")} />
      </div>

    {role && <>
      <div className="section-row"><h3 className="section-title">Event calendar</h3><button className="text-btn" onClick={() => go("training")}>View all</button></div>
      <div className="calendar-card"><div className="calendar-heading"><b>{date ? "Selected date" : "Partner activities"}</b><MobileTextField type="month" aria-label="Home calendar month" value={month} onChange={e => {if (e.target.value) {setMonth(e.target.value);setRange(true);setDate("");setLimit(10);}}} /></div><div className="calendar-grid">{["M","T","W","T","F","S","S"].map((d,i) => <span key={`w${i}`}>{d}</span>)}{Array.from({length: validMonth ? (new Date(year,monthNo-1,1).getDay()+6)%7 : 0},(_,i) => <span key={`o${i}`} />)}{Array.from({length: validMonth ? new Date(year,monthNo,0).getDate() : 0},(_,i) => {const key = `${month}-${String(i+1).padStart(2,"0")}`;const hasEvent = allActivities.some(m => m.start <= key && m.end >= key);return <button key={key} aria-label={`Events on ${key}`} aria-pressed={date === key} className={`${hasEvent ? "has-event" : ""} ${date === key ? "selected-day" : ""}`} onClick={() => {setDate(key);setLimit(10);}}>{i+1}</button>;})}</div>{date && <button className="text-btn" onClick={() => {setDate("");setLimit(10);}}>Clear date filter</button>}</div>
      <div className="record-list">{activities.slice(0,limit).map(m => <button className="event-card" key={m.id} onClick={() => setMessage(m)}><div className="date"><b>{new Date(m.start+"T12:00:00").getDate()}</b><span>{new Date(m.start+"T12:00:00").toLocaleString("en",{month:"short"}).toUpperCase()}</span></div><div><b>{m.title}</b><p>{m.start} · {m.format === "Offline" ? m.location : "Online"}</p></div><ChevronRightIcon /></button>)}</div>
      {!activities.length && <div className="home-empty"><CalendarIcon /><b>{date ? "No events on this date" : "No upcoming events"}</b><p>Stay tuned for trainings, webinars and partner activities.</p></div>}
      {activities.length > limit && <button className="outline wide" onClick={() => setLimit(v => v + 10)}>Load more events</button>}
      {!!stories.length && <><div className="section-row"><h3 className="section-title">Latest news</h3><button className="text-btn" onClick={() => go("news")}>View all</button></div><HomeNews items={stories} open={setMessage} /></>}
      {role === "partner" && <><article className="support-card"><div className="support-icon"><PersonIcon /></div><div><b>Contact us</b><p>{data.profile.country} partner support</p></div><button onClick={() => go("profile")}>Contact</button></article>{data.home.accountType.toLowerCase() === "admin" && <MenuRow icon={<PersonIcon />} title="User management" sub="Invite users, roles & permissions" onClick={() => go("users")} />}</>}
    </>}
    <AppSheet
      open={application !== null}
      onOpenChange={open => { if (!open) setApplication(null); }}
      title={application === "confirm" ? "Become a partner" : application === "success" ? "Application saved" : "Application pending"}
      description="Local preview · no real application is submitted"
      snap={0.48}
      footer={application === "confirm" ? (
        <button className="primary wide" onClick={() => {
          if (data.home.applicationSubmitted) { setApplication("pending"); return; }
          setData(d => ({...d, home:{...d.home,applicationSubmitted:true}}));
          setApplication("success");
        }}>Confirm application</button>
      ) : <button className="primary wide" onClick={() => setApplication(null)}>Done</button>}
    >
      <div className="sheet-body">
        {application === "confirm" ? <>
          <p>Would you like to apply to become a SunPower partner using your current account?</p>
          <div className="detail-list"><div><span>Name</span><b>{data.profile.name}</b></div><div><span>Company</span><b>{data.profile.company}</b></div><div><span>Country</span><b>{data.profile.country}</b></div></div>
          <p className="helper">Confirming records a sample application in this browser only.</p>
        </> : <>
          <p>{application === "success" ? "Your sample application has been saved. The preview now shows it as pending review." : "You already have a sample application awaiting review. Please wait before applying again."}</p>
          <p className="helper">Your membership level stays unchanged. Use Partner Portal to submit or check a real application.</p>
        </>}
      </div>
    </AppSheet>
    <AppSheet open={profilePrompt} onOpenChange={setProfilePrompt} title="Complete your profile" description="Add your contact details to complete your partner profile."><div className="sheet-body"><p>Some personal or company information is missing in this local preview.</p><button className="primary wide" onClick={() => {setProfilePrompt(false);go("profile",{editProfile:true});}}>Complete profile</button><button className="outline wide" onClick={() => setProfilePrompt(false)}>{notification !== "None" ? "Next" : "Later"}</button></div></AppSheet>
    <AppSheet open={!profilePrompt && notification !== "None"} onOpenChange={o => {if (!o) closeNotification();}} title={notification === "Rejected" ? "Application update" : agreement ? "Partner agreement" : "You’re invited"} description="Local preview notification"><div className="sheet-body"><p>{notification === "Rejected" ? "Your sample application needs attention. View the details in Partner Portal." : agreement ? "Review and accept the real agreement securely in Partner Portal. No invitation or agreement is submitted by this preview." : "You have a sample invitation to the partner program."}</p>{notification !== "Rejected" && !agreement ? <button className="primary wide" onClick={() => setAgreement(true)}>Review invitation</button> : <PortalLink path="dashboard/home" label="Review in Partner Portal" />}<button className="outline wide" onClick={closeNotification}>Dismiss</button></div></AppSheet>
    <AppSheet open={!!message} onOpenChange={o => {if (!o) setMessage(null);}} title={message?.kind || "Message"} description={message?.start}>{message && <div className="sheet-body"><h3>{message.title}</h3><p>{message.body}</p>{message.kind === "Marketing Event" && <p>{message.format === "Offline" ? message.location : "Online"} · {message.start}</p>}<PortalLink path={message.kind === "Marketing Event" ? "livingTrain/list" : "homePage/msgList"} label={message.kind === "Marketing Event" ? "View event & register in Portal" : "View in Partner Portal"} /></div>}</AppSheet>
  </section>;
}
function WarrantyScreen() {
  const { data, setData, notify } = useApp();
  const keyboard = useKeyboard();
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("All countries");
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [form, setForm] = useState<Warranty | null>(null);
  const [detail, setDetail] = useState<Warranty | null>(null);
  const [bulk, setBulk] = useState(false);
  const [error, setError] = useState("");
  const [pendingDelete, setPendingDelete] = useState(false);
  const rows = data.warranties.filter(
    (w) =>
      (filter === "All" || w.status === filter) &&
      (!query ||
        [w.serial, w.email, w.owner]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())) &&
      (country === "All countries" || w.country === country) &&
      (!from || w.date >= from) &&
      (!until || w.date <= until),
  );
  const edit = (w?: Warranty) => {
    keyboard.hide();
    setDetail(null);
    setError("");
    setForm(
      w
        ? { ...w }
        : {
            id: "W" + Date.now(),
            serial: "",
            email: "",
            owner: "Pending owner",
            date: "",
            quantity: 1,
            country: "United Kingdom",
            city: "",
            address: "",
            postal: "",
            lead: "",
            consent: false,
            status: "Draft",
          },
    );
  };
  const save = (status: "Draft" | "Submitted") => {
    if (!form) return;
    if (!form.serial.trim() || !form.date || form.quantity < 1)
      return setError(
        "Enter an installation date, serial number and quantity.",
      );
    if (
      data.warranties.some(
        (w) =>
          w.id !== form.id &&
          w.serial.trim().toLowerCase() === form.serial.trim().toLowerCase(),
      )
    )
      return setError("This serial number is already registered.");
    if (
      status === "Submitted" &&
      (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.consent)
    )
      return setError("Enter a valid homeowner email and confirm the consent.");
    const next = { ...form, serial: form.serial.trim(), status };
    setData((d) => ({
      ...d,
      warranties: [next, ...d.warranties.filter((w) => w.id !== next.id)],
    }));
    keyboard.hide();
    setForm(null);
    notify(
      status === "Draft"
        ? "Draft saved in this preview."
        : "Submission saved in this preview. No email was sent.",
    );
  };
  const importCSV = async (f?: File) => {
    if (!f) return;
    try {
      const records = parseCSV(await f.text());
      const header = records.shift()?.map((s) => s.trim().toLowerCase());
      if (
        !header ||
        !["serial", "date", "email", "quantity"].every((x) =>
          header.includes(x),
        )
      )
        throw Error("CSV needs serial, date, email and quantity columns.");
      if (!records.length || records.length > 500)
        throw Error("Import between 1 and 500 records.");
      const seen = new Set(data.warranties.map((w) => w.serial.toLowerCase()));
      const added: Warranty[] = records.map((r, i) => {
        const get = (k: string) => (r[header.indexOf(k)] || "").trim();
        const serial = get("serial");
        const date = get("date");
        const quantity = Number(get("quantity"));
        if (!serial || seen.has(serial.toLowerCase()))
          throw Error(`Row ${i + 2}: serial number is missing or duplicated.`);
        if (
          !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
          Number.isNaN(Date.parse(date)) ||
          !Number.isInteger(quantity) ||
          quantity < 1
        )
          throw Error(
            `Row ${i + 2}: use a valid YYYY-MM-DD date and positive whole quantity.`,
          );
        seen.add(serial.toLowerCase());
        return {
          id: "W" + Date.now() + "-" + i,
          serial,
          date,
          quantity,
          email: get("email"),
          owner: "Pending owner",
          country: get("country") || "United Kingdom",
          city: get("city"),
          address: get("address"),
          postal: get("postal"),
          lead: "",
          consent: false,
          status: "Draft",
        };
      });
      setData((d) => ({ ...d, warranties: [...added, ...d.warranties] }));
      setBulk(false);
      setError("");
      notify(`${added.length} warranty drafts imported.`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to read CSV.");
    }
  };
  if (form)
    return (
      <section className="content register-form">
        <Back
          onClick={() => {
            keyboard.hide();
            setForm(null);
          }}
          label="Back to warranties"
        />
        <Section title="1 · Installation information">
          <Field
            label="Installation date"
            type="date"
            required
            value={form.date}
            set={(date) => setForm({ ...form, date })}
          />
          <Field
            label="Serial number"
            required
            value={form.serial}
            set={(serial) => setForm({ ...form, serial })}
          />
          <label className="form-field">
            <span>Quantity *</span>
            <div className="quantity">
              <button
                aria-label="Decrease quantity"
                onClick={() =>
                  setForm({ ...form, quantity: Math.max(1, form.quantity - 1) })
                }
              >
                <MinusIcon />
              </button>
              <b>{form.quantity}</b>
              <button
                aria-label="Increase quantity"
                onClick={() =>
                  setForm({ ...form, quantity: form.quantity + 1 })
                }
              >
                <PlusIcon />
              </button>
            </div>
          </label>
          <p className="helper">
            Product name is verified by the portal when the serial is submitted.
          </p>
        </Section>
        <Section title="2 · Homeowner information">
          <Field
            label="Homeowner email"
            type="email"
            value={form.email}
            set={(email) => setForm({ ...form, email })}
          />
          <div className="form-row">
            <Field
              label="Postal code"
              value={form.postal}
              set={(postal) => setForm({ ...form, postal })}
            />
            <Field
              label="City"
              value={form.city}
              set={(city) => setForm({ ...form, city })}
            />
          </div>
          <Select
            label="Country"
            value={form.country}
            set={(country) => setForm({ ...form, country })}
            options={[
              "United Kingdom",
              "France",
              "Norway",
              "Italy",
              "Germany",
              "Czechia",
              "Spain",
            ]}
          />
          <Field
            label="Detailed address"
            value={form.address}
            set={(address) => setForm({ ...form, address })}
          />
          <label className="check-row">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            />
            <span>
              I’ve informed the owner that their email will be shared with TCL
              SunPower Global.
            </span>
          </label>
        </Section>
        <Section title="3 · Lead information">
          <Select
            label="Related lead"
            value={form.lead}
            set={(lead) => setForm({ ...form, lead })}
            options={["", ...data.leads.map((l) => l.id)]}
          />
          <p className="helper">
            Match by lead number. The homeowner can complete their information
            later.
          </p>
        </Section>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <div className="form-actions">
          <button className="outline" onClick={() => save("Draft")}>
            Save as draft
          </button>
          <button className="primary" onClick={() => save("Submitted")}>
            Send to homeowner
          </button>
        </div>
        <p className="preview-note">
          Preview only · Sending records a local submission.
        </p>
      </section>
    );
  return (
    <section className="content">
      <div className="summary-strip">
        {["All", "Draft", "Submitted", "Completed"].map((s, i) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={filter === s ? "selected" : ""}
          >
            <b>
              {
                data.warranties.filter((w) => s === "All" || w.status === s)
                  .length
              }
            </b>
            {i === 0 ? "Total" : s}
          </button>
        ))}
      </div>
      <button className="primary wide" onClick={() => edit()}>
        <PlusIcon />
        Register warranty
      </button>
      <div className="section-row">
        <h3 className="section-title">Registrations</h3>
        <button
          className="text-btn"
          onClick={() => {
            setQuery("");
            setFilter("All");
            setFrom("");
            setUntil("");
            setCountry("All countries");
          }}
        >
          Reset
        </button>
      </div>
      <Search
        value={query}
        set={setQuery}
        placeholder="Search serial, homeowner or email"
      />
      <details className="filter-details">
        <summary>Advanced filters</summary>
        <div className="form-row">
          <Field
            label="Installed from"
            type="date"
            value={from}
            set={setFrom}
          />
          <Field
            label="Installed until"
            type="date"
            value={until}
            set={setUntil}
          />
        </div>
        <Select
          label="Country filter"
          value={country}
          set={setCountry}
          options={[
            "All countries",
            "United Kingdom",
            "France",
            "Norway",
            "Italy",
          ]}
        />
      </details>
      <Chips
        options={["All", "Draft", "Submitted", "Completed"]}
        value={filter}
        set={setFilter}
      />
      <div className="record-list">
        {rows.map((w) => (
          <button
            className="record"
            key={w.id}
            onClick={() => {
              setDetail(w);
              setPendingDelete(false);
            }}
          >
            <div className="record-icon">
              <FileTextIcon />
            </div>
            <div className="record-main">
              <b>{w.serial}</b>
              <p>
                {w.owner} · {w.date}
              </p>
            </div>
            <Status value={w.status} />
            <ChevronRightIcon />
          </button>
        ))}
      </div>
      {!rows.length && <Empty />}
      <div className="form-row">
        <button
          className="outline wide"
          onClick={() => {
            setError("");
            setBulk(true);
          }}
        >
          <ArchiveIcon />
          Bulk register
        </button>
        <button
          className="outline wide"
          onClick={() =>
            file(
              "warranties.csv",
              csv([
                [
                  "Serial",
                  "Homeowner",
                  "Email",
                  "Date",
                  "Quantity",
                  "Country",
                  "City",
                  "Status",
                ],
                ...rows.map((w) => [
                  w.serial,
                  w.owner,
                  w.email,
                  w.date,
                  w.quantity,
                  w.country,
                  w.city,
                  w.status,
                ]),
              ]),
              "text/csv;charset=utf-8",
            )
          }
        >
          <DownloadIcon />
          Export
        </button>
      </div>
      <p className="result-count">
        {rows.length} of {data.warranties.length} registrations
      </p>
      <PortalLink path="warranty/list" />
      <AppSheet
        open={bulk}
        onOpenChange={setBulk}
        title="Bulk register"
        description="Import warranties as drafts in this preview."
      >
        <div className="sheet-body">
          <p>
            Use a CSV with serial, date, email and quantity columns. Review
            every draft before submitting.
          </p>
          <button
            className="outline wide"
            onClick={() =>
              file(
                "warranty-template.csv",
                csv([
                  [
                    "serial",
                    "date",
                    "email",
                    "quantity",
                    "country",
                    "city",
                    "address",
                    "postal",
                  ],
                  [
                    "SPR-EXAMPLE",
                    today(),
                    "owner@example.com",
                    1,
                    "United Kingdom",
                    "",
                    "",
                    "",
                  ],
                ]),
                "text/csv",
              )
            }
          >
            <DownloadIcon />
            Download CSV template
          </button>
          <label className="upload-button">
            Choose CSV file
            <input
              aria-label="Import warranty CSV"
              type="file"
              accept=".csv,text/csv"
              onChange={(e) => {
                void importCSV(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
          </label>
          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}
          <PortalLink
            path="warranty/list"
            label="Use portal Excel bulk registration"
          />
        </div>
      </AppSheet>
      <AppSheet
        open={!!detail}
        onOpenChange={(open) => {
          if (!open) setDetail(null);
        }}
        title={detail?.serial || "Warranty details"}
        description="Registration details and available actions."
      >
        {detail && (
          <div className="sheet-body">
            <Status value={detail.status} />
            <dl className="detail-list">
              {[
                ["Homeowner", detail.owner],
                ["Email", detail.email || "Not provided"],
                ["Installed", detail.date],
                ["Quantity", String(detail.quantity)],
                ["Country / city", detail.country + " · " + detail.city],
                ["Address", detail.address || "Not provided"],
                ["Related lead", detail.lead || "None"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            {detail.status !== "Completed" && (
              <button className="primary wide" onClick={() => edit(detail)}>
                Edit registration
              </button>
            )}
            {detail.status === "Submitted" && (
              <button
                className="outline wide"
                onClick={() => {
                  setData((d) => ({
                    ...d,
                    reminders: [...d.reminders, detail.id + ":" + now()],
                  }));
                  notify("Reminder recorded locally. No email was sent.");
                }}
              >
                Record reminder
              </button>
            )}
            {detail.status === "Completed" && (
              <PortalLink
                path="warranty/list"
                label="Download official certificate in portal"
              />
            )}
            {detail.status === "Draft" &&
              (pendingDelete ? (
                <div className="delete-confirm">
                  <p>Delete this local draft?</p>
                  <button
                    onClick={() => {
                      setData((d) => ({
                        ...d,
                        warranties: d.warranties.filter(
                          (w) => w.id !== detail.id,
                        ),
                      }));
                      setDetail(null);
                      notify("Draft deleted.");
                    }}
                  >
                    Delete draft
                  </button>
                  <button onClick={() => setPendingDelete(false)}>
                    Keep draft
                  </button>
                </div>
              ) : (
                <button
                  className="danger-button"
                  onClick={() => setPendingDelete(true)}
                >
                  Delete draft
                </button>
              ))}
          </div>
        )}
      </AppSheet>
    </section>
  );
}
function LeadsScreen() {
  const { data, setData, notify, intent } = useApp();
  const keyboard = useKeyboard();
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("All leads");
  const [stage, setStage] = useState(intent.leadStage || "All stages");
  const [source, setSource] = useState("All sources");
  const [type, setType] = useState("All types");
  const [from, setFrom] = useState("");
  const [until, setUntil] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [settings, setSettings] = useState(false);
  const [policy, setPolicy] = useState(data.policy);
  const [asSales, setAsSales] = useState(false);
  const lead = data.leads.find((l) => l.id === selected);
  const rows = data.leads.filter(
    (l) =>
      (!query ||
        [l.name, l.email, l.city, l.id]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())) &&
      (scope === "All leads" ||
        (scope === "My leads" ? l.owner === "Xin Wang" : !l.owner)) &&
      (stage === "All stages" || stage === l.status) &&
      (source === "All sources" || l.source === source) &&
      (type === "All types" || l.type === type) &&
      (!from || l.created >= from) &&
      (!until || l.created <= until),
  );
  const update = (patch: Partial<Lead>, text: string) => {
    if (!lead) return;
    setData((d) => ({
      ...d,
      leads: d.leads.map((l) =>
        l.id === lead.id
          ? {
              ...l,
              ...patch,
              updated: today(),
              notes: [{ time: now(), text }, ...l.notes],
            }
          : l,
      ),
    }));
    notify(text);
  };
  const canWork =
    !!lead && (!asSales || !lead.owner || lead.owner === "Xin Wang");
  const canAssign =
    !!lead &&
    (!asSales ||
      (data.policy.permission === "Owner & admin" &&
        lead.owner === "Xin Wang"));
  return (
    <section className="content">
      <Search
        value={query}
        set={setQuery}
        placeholder="Search name, city, email or lead no."
      />
      <div className="lead-overview">
        <span>
          <b>
            {
              data.leads.filter(
                (l) => !["Qualified", "Rejected"].includes(l.status),
              ).length
            }
          </b>
          Open leads
        </span>
        <i />
        <span>
          <b>{data.leads.filter((l) => l.status === "Pending Claim").length}</b>
          Pending claim
        </span>
      </div>
      <Chips
        options={["All leads", "My leads", "Shared pool"]}
        value={scope}
        set={setScope}
      />
      <details className="filter-details">
        <summary>Lead result query</summary>
        <Select
          label="Lead status"
          value={stage}
          set={setStage}
          options={[
            "All stages",
            "Pending Claim",
            "Claimed",
            "Qualified",
            "Rejected",
          ]}
        />
        <div className="form-row">
          <Select
            label="Lead type"
            value={type}
            set={setType}
            options={["All types", "Residential", "Commercial"]}
          />
          <Select
            label="Lead source"
            value={source}
            set={setSource}
            options={["All sources", "Website", "Referral", "Campaign"]}
          />
        </div>
        <div className="form-row">
          <Field label="Created from" value={from} set={setFrom} type="date" />
          <Field
            label="Created until"
            value={until}
            set={setUntil}
            type="date"
          />
        </div>
        <button
          className="text-btn"
          onClick={() => {
            setQuery("");
            setScope("All leads");
            setStage("All stages");
            setSource("All sources");
            setType("All types");
            setFrom("");
            setUntil("");
          }}
        >
          Reset all filters
        </button>
      </details>
      <div className="section-row">
        <h3 className="section-title">Lead inbox</h3>
        <button
          className="text-btn"
          onClick={() =>
            file(
              "leads.csv",
              csv([
                [
                  "Lead No.",
                  "First Name",
                  "Last Name",
                  "Email",
                  "Telephone",
                  "Country",
                  "Type",
                  "Source",
                  "Owner",
                  "Created",
                  "Updated",
                  "Status",
                ],
                ...rows.map((l) => [
                  l.id,
                  l.name.split(" ")[0],
                  l.name.split(" ").slice(1).join(" "),
                  l.email,
                  l.phone,
                  l.country,
                  l.type,
                  l.source,
                  l.owner,
                  l.created,
                  l.updated,
                  l.status,
                ]),
              ]),
              "text/csv;charset=utf-8",
            )
          }
        >
          <DownloadIcon />
          Export
        </button>
      </div>
      <div className="lead-list">
        {rows.map((l, i) => (
          <button
            className="lead"
            key={l.id}
            onClick={() => {
              setSelected(l.id);
              setNote("");
            }}
          >
            <div className="lead-avatar">
              {l.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="lead-name">
                <b>{l.name}</b>
                <span className={`lead-state s${i % 3}`}>{l.status}</span>
              </div>
              <p>
                <SewingPinIcon />
                {l.city} · {l.source}
              </p>
              <small>
                {l.id} · {l.owner || "Shared pool"}
              </small>
            </div>
            <ChevronRightIcon />
          </button>
        ))}
      </div>
      {!rows.length && <Empty />}
      <p className="result-count">
        {rows.length} of {data.leads.length} leads
      </p>
      <button
        className="outline wide"
        disabled={asSales}
        onClick={() => {
          setPolicy({ ...data.policy });
          setSettings(true);
        }}
      >
        <GearIcon />
        Assignment settings
      </button>
      <label className="check-row preview-switch">
        <input
          type="checkbox"
          checked={asSales}
          onChange={(e) => setAsSales(e.target.checked)}
        />
        <span>Preview sales representative permissions</span>
      </label>
      <PortalLink path="lead/list" />
      <AppSheet
        open={!!lead}
        onOpenChange={(open) => {
          if (!open) {
            keyboard.hide();
            setSelected(null);
          }
        }}
        title={lead?.name || "Lead details"}
        description={lead?.id}
        snap={0.9}
      >
        {lead && (
          <div className="sheet-body">
            <Status value={lead.status} />
            <dl className="detail-list">
              {[
                ["Email", lead.email],
                ["Phone", lead.phone],
                ["Location", lead.city + ", " + lead.country],
                ["Type / source", lead.type + " · " + lead.source],
                ["Assigned to", lead.owner || "Shared pool"],
                ["Created", lead.created],
                ["Last updated", lead.updated],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <div className="form-row">
              <a className="outline" href={"mailto:" + lead.email}>
                <EnvelopeClosedIcon />
                Email
              </a>
              <a
                className="outline"
                href={"tel:" + lead.phone.replaceAll(" ", "")}
              >
                Call
              </a>
            </div>
            {lead.status === "Pending Claim" && (
              <div className="form-row">
                <button
                  className="primary wide"
                  disabled={!canWork}
                  onClick={() =>
                    update(
                      { status: "Claimed", owner: lead.owner || "Xin Wang" },
                      "Lead accepted",
                    )
                  }
                >
                  Accept lead
                </button>
                <button
                  className="outline wide"
                  disabled={!canWork}
                  onClick={() =>
                    update({ status: "Rejected" }, "Lead rejected")
                  }
                >
                  Reject
                </button>
              </div>
            )}
            {lead.status === "Claimed" && (
              <button
                className="primary wide"
                disabled={!canWork}
                onClick={() =>
                  update({ status: "Qualified" }, "Lead qualified")
                }
              >
                Mark as qualified
              </button>
            )}
            <Select
              label="Reassign to"
              disabled={!canAssign}
              value={lead.owner || "Shared pool"}
              set={(owner) => {
                if (canAssign)
                  update(
                    { owner: owner === "Shared pool" ? "" : owner },
                    "Lead reassigned to " + owner,
                  );
              }}
              options={[
                "Shared pool",
                ...data.users
                  .filter((u) => u.enabled && u.status === "Active")
                  .map((u) => u.name),
              ]}
            />
            {!canAssign && (
              <p className="helper">
                Reassignment is managed by the owner or partner admin.
              </p>
            )}
            <label className="form-field">
              <span>Follow-up note</span>
              <KeyboardTextarea
                aria-label="Follow-up note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Record your conversation and next steps"
              />
            </label>
            <button
              className="primary wide"
              disabled={!note.trim() || !canWork}
              onClick={() => {
                update({}, note.trim());
                setNote("");
                keyboard.hide();
              }}
            >
              Save follow-up
            </button>
            <h3 className="section-title">Activity history</h3>
            <div className="timeline">
              {lead.notes.map((n, i) => (
                <article key={i}>
                  <small>{n.time}</small>
                  <p>{n.text}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </AppSheet>
      <AppSheet
        open={settings}
        onOpenChange={setSettings}
        title="Assignment settings"
        description="Partner admin · Applies to this local preview"
        snap={0.85}
      >
        <div className="sheet-body">
          <Select
            label="Initial assignment"
            value={policy.mode}
            set={(mode) => setPolicy({ ...policy, mode })}
            options={["Random assignment", "Shared pool"]}
          />
          {policy.mode === "Random assignment" && (
            <Select
              label="Assign to role"
              value={policy.role}
              set={(role) => setPolicy({ ...policy, role })}
              options={["Sales representative", "Partner admin"]}
            />
          )}
          <Select
            label="Reassignment permission"
            value={policy.permission}
            set={(permission) => setPolicy({ ...policy, permission })}
            options={["Owner & admin", "Admin only"]}
          />
          <label className="check-row">
            <input
              type="checkbox"
              checked={policy.recycle}
              onChange={(e) =>
                setPolicy({ ...policy, recycle: e.target.checked })
              }
            />
            <span>Automatically recycle inactive leads</span>
          </label>
          {policy.recycle && (
            <div className="form-row">
              <Field
                label="Pending claim days"
                type="number"
                value={String(policy.pending)}
                set={(v) => setPolicy({ ...policy, pending: Number(v) })}
              />
              <Field
                label="Claimed days"
                type="number"
                value={String(policy.claimed)}
                set={(v) => setPolicy({ ...policy, claimed: Number(v) })}
              />
            </div>
          )}
          <p className="helper">
            Qualified leads are excluded. The current owner is excluded from
            recycling; if no eligible alternative exists, ownership stays
            unchanged.
          </p>
          <button
            className="primary wide"
            onClick={() => {
              if (
                policy.recycle &&
                ![policy.pending, policy.claimed].every(
                  (n) => Number.isInteger(n) && n >= 1 && n <= 365,
                )
              )
                return notify("Enter whole numbers between 1 and 365 days.");
              setData((d) => ({ ...d, policy }));
              setSettings(false);
              notify("Assignment policy saved locally.");
            }}
          >
            Save settings
          </button>
          <button
            className="outline wide"
            onClick={() => {
              const eligible = data.users.filter(
                (u) =>
                  u.enabled &&
                  u.status === "Active" &&
                  u.role === data.policy.role,
              );
              const user =
                data.policy.mode === "Random assignment" && eligible.length
                  ? eligible[Math.floor(Math.random() * eligible.length)].name
                  : "";
              const id = "LD" + Date.now();
              setData((d) => ({
                ...d,
                leads: [
                  {
                    id,
                    name: "New demo contact",
                    email: "contact@example.com",
                    phone: "",
                    city: "London",
                    country: "United Kingdom",
                    source: "Website",
                    type: "Residential",
                    status: "Pending Claim",
                    owner: user,
                    created: today(),
                    updated: today(),
                    notes: [
                      {
                        time: now(),
                        text: user
                          ? "Assigned to " + user
                          : "Added to shared pool",
                      },
                    ],
                  },
                  ...d.leads,
                ],
              }));
              setSettings(false);
              notify("Demo lead added using the saved policy.");
            }}
          >
            Add a demo lead
          </button>
          <button
            className="outline wide"
            onClick={() => {
              if (!data.policy.recycle)
                return notify("Recycling is disabled in the saved policy.");
              setData((d) => ({
                ...d,
                leads: d.leads.map((l) => {
                  const days = (Date.now() - Date.parse(l.updated)) / 86400000;
                  if (
                    !l.owner ||
                    !["Pending Claim", "Claimed"].includes(l.status) ||
                    days <
                      d.policy[l.status === "Claimed" ? "claimed" : "pending"]
                  )
                    return l;
                  const alternative = d.users.find(
                    (u) =>
                      u.enabled &&
                      u.status === "Active" &&
                      u.role === d.policy.role &&
                      u.name !== l.owner,
                  );
                  if (!alternative) return l;
                  return {
                    ...l,
                    owner: alternative.name,
                    updated: today(),
                    notes: [
                      {
                        time: now(),
                        text: "Automatically reassigned to " + alternative.name,
                      },
                      ...l.notes,
                    ],
                  };
                }),
              }));
              setSettings(false);
              notify(
                "Recycling check completed. Eligible changes appear in activity history.",
              );
            }}
          >
            Run local recycling check
          </button>
        </div>
      </AppSheet>
    </section>
  );
}
const products = [
  {
    id: 1,
    name: "Performance 7",
    model: "SPR-P7-515-BLK-P",
    meta: "515W · 1996 × 1134 × 30 mm",
    img: module515,
    stock: "In Stock",
    category: "Solar panels",
    segment: "Residential",
    pallet: 36,
    watts: 515,
    code: "GF0700001907",
  },
  {
    id: 2,
    name: "Origin 490",
    model: "SPR-BE54-HD490",
    meta: "490W · 1800 × 1134 × 30 mm",
    img: module500,
    stock: "In Stock soon",
    category: "Solar panels",
    segment: "Residential",
    pallet: 36,
    watts: 490,
    code: "",
  },
  {
    id: 3,
    name: "Reserve Kit",
    model: "SP-RSH-6kW+10kWh",
    meta: "6 kW hybrid inverter · 10 kWh",
    img: reserveKit,
    stock: "In Stock",
    category: "Storage",
    segment: "Residential",
    pallet: 1,
    watts: 0,
    code: "",
  },
  {
    id: 4,
    name: "Reserve Battery",
    model: "SP-RH-B5K-G1",
    meta: "5 kWh rechargeable Li-ion battery",
    img: reserveKit,
    stock: "In Stock",
    category: "Storage",
    segment: "Residential",
    pallet: 4,
    watts: 0,
    code: "",
  },
  {
    id: 5,
    name: "Reserve Kit",
    model: "SP-RSH-10kW+5kWh",
    meta: "10 kW hybrid inverter · 5 kWh",
    img: reserveKit,
    stock: "In Stock · Allocation",
    category: "Storage",
    segment: "Residential",
    pallet: 1,
    watts: 0,
    code: "",
  },
  {
    id: 6,
    name: "CT meter G1",
    model: "SP-ARSH-MC-G1",
    meta: "170 × 125 × 150 mm",
    img: null,
    stock: "In Stock · Allocation",
    category: "Accessories",
    segment: "Residential",
    pallet: 1,
    watts: 0,
    code: "",
  },
];
function ProductsScreen() {
  const { data, setData, notify } = useApp();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [stock, setStock] = useState("All stock");
  const [date, setDate] = useState(today());
  const [view, setView] = useState<"catalog" | "cart" | "requests">("catalog");
  const [detail, setDetail] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<Record<number, number>>({});
  const [delivery, setDelivery] = useState(today());
  const [note, setNote] = useState("");
  const [request, setRequest] = useState<Request | null>(null);
  const count = Object.values(data.cart).reduce((a, b) => a + b, 0);
  const items = products.filter(
    (p) =>
      (p.name + " " + p.model).toLowerCase().includes(query.toLowerCase()) &&
      (category === "All" || p.category === category) &&
      (stock === "All stock" || p.stock === stock),
  );
  const product = products.find((p) => p.id === detail);
  const change = (id: number, delta: number) =>
    setData((d) => ({
      ...d,
      cart: { ...d.cart, [id]: Math.max(0, (d.cart[id] || 0) + delta) },
    }));
  const add = (id: number) => {
    change(id, quantity[id] || 1);
    notify("Added to request cart.");
  };
  if (view === "requests")
    return (
      <section className="content">
        <Back label="Back to products" onClick={() => setView("catalog")} />
        <div className="order-summary">
          <span>
            <b>{data.requests.length}</b>Submitted requests
          </span>
          <span>
            <b>
              {data.requests.reduce(
                (sum, r) =>
                  sum + Object.values(r.items).reduce((a, b) => a + b, 0),
                0,
              )}
            </b>
            Pallets / kits requested
          </span>
        </div>
        <h3 className="section-title">Request history</h3>
        {data.requests.length ? (
          data.requests.map((r) => (
            <button
              className="order-card"
              key={r.id}
              onClick={() => setRequest(r)}
            >
              <span className="order-icon">
                <ArchiveIcon />
              </span>
              <span className="order-main">
                <b>{r.id}</b>
                <small>{r.date}</small>
                <p>
                  {
                    Object.keys(r.items).filter((id) => r.items[Number(id)] > 0)
                      .length
                  }{" "}
                  products · Expected {r.delivery}
                </p>
              </span>
              <Status value={r.status} />
              <ChevronRightIcon />
            </button>
          ))
        ) : (
          <Empty>No price requests in this preview yet.</Empty>
        )}
        <PortalLink path="products/list" label="View live submitted requests" />
        <AppSheet
          open={!!request}
          onOpenChange={(o) => {
            if (!o) setRequest(null);
          }}
          title={request?.id || "Request details"}
          description="Local request · Pricing awaits confirmation"
        >
          {request && (
            <div className="sheet-body">
              <Status value={request.status} />
              <p>Requested delivery: {request.delivery}</p>
              {products
                .filter((p) => request.items[p.id] > 0)
                .map((p) => (
                  <div className="resource-file" key={p.id}>
                    <FileTextIcon />
                    <span>
                      <b>{p.model}</b>
                      <small>
                        {request.items[p.id]} × {p.pallet}{" "}
                        {p.category === "Storage" && p.pallet === 1
                          ? "KIT"
                          : "pcs"}
                      </small>
                    </span>
                  </div>
                ))}
              <p>{request.note || "No additional notes."}</p>
              <button
                className="outline wide"
                onClick={() =>
                  file(
                    request.id + ".csv",
                    csv([
                      ["Product", "Quantity", "Unit"],
                      ...products
                        .filter((p) => request.items[p.id] > 0)
                        .map((p) => [
                          p.model,
                          request.items[p.id] * p.pallet,
                          p.pallet === 1 && p.category === "Storage"
                            ? "KIT"
                            : "PC",
                        ]),
                    ]),
                    "text/csv",
                  )
                }
              >
                Export request
              </button>
            </div>
          )}
        </AppSheet>
      </section>
    );
  if (view === "cart")
    return (
      <section className="content">
        <Back label="Continue shopping" onClick={() => setView("catalog")} />
        <h2 className="panel-title">Request cart · {count} pallets / kits</h2>
        {!count ? (
          <Empty>Add a product to start a price request.</Empty>
        ) : (
          <>
            {products
              .filter((p) => data.cart[p.id] > 0)
              .map((p) => (
                <article className="cart-item" key={p.id}>
                  {p.img ? <img src={p.img} alt={p.name} /> : <GearIcon />}
                  <div>
                    <b>{p.model}</b>
                    <small>
                      {data.cart[p.id] * p.pallet}{" "}
                      {p.pallet === 1 && p.category === "Storage"
                        ? "KIT"
                        : "pcs"}
                    </small>
                  </div>
                  <div className="stepper">
                    <button
                      aria-label={"Remove one " + p.model}
                      onClick={() => change(p.id, -1)}
                    >
                      <MinusIcon />
                    </button>
                    <b>{data.cart[p.id]}</b>
                    <button
                      aria-label={"Add one " + p.model}
                      onClick={() => change(p.id, 1)}
                    >
                      <PlusIcon />
                    </button>
                  </div>
                </article>
              ))}
            <Section title="Price request details">
              <Field
                label="Expected delivery date"
                type="date"
                value={delivery}
                set={setDelivery}
                required
              />
              <Field
                label="Notes"
                value={note}
                set={setNote}
                placeholder="Delivery location or project notes"
              />
              <p className="helper">
                A price request is not an order. Availability and pricing need
                confirmation.
              </p>
            </Section>
            <button
              className="primary wide"
              onClick={() => {
                if (!delivery || delivery < today())
                  return notify("Select today or a future delivery date.");
                const r = {
                  id: "PR-" + Date.now().toString().slice(-8),
                  date: today(),
                  items: { ...data.cart },
                  status: "Submitted",
                  delivery,
                  note,
                };
                setData((d) => ({
                  ...d,
                  requests: [r, ...d.requests],
                  cart: {},
                }));
                setView("requests");
                notify(
                  "Price request saved locally. No request was sent to SunPower.",
                );
              }}
            >
              Submit price request
            </button>
            <p className="preview-note">
              Local preview · No purchase or payment is made.
            </p>
            <PortalLink
              path="products/list"
              label="Submit a live price request in portal"
            />
          </>
        )}
      </section>
    );
  return (
    <section className="content product-content">
      <div className="product-tools">
        <button onClick={() => setView("requests")}>
          <ArchiveIcon />
          <span>
            <b>Submitted requests</b>
            <small>{data.requests.length} requests · view history</small>
          </span>
          <ChevronRightIcon />
        </button>
        <button onClick={() => setView("cart")}>
          <BackpackIcon />
          <span>
            <b>Request cart</b>
            <small>
              {count ? `${count} pallets / kits selected` : "No items yet"}
            </small>
          </span>
          <ChevronRightIcon />
        </button>
      </div>
      <Search
        value={query}
        set={setQuery}
        placeholder="Search SKU, model or product"
      />
      <Chips
        options={["All", "Solar panels", "Storage", "Accessories"]}
        value={category}
        set={setCategory}
      />
      <details className="filter-details">
        <summary>Stock and delivery filters</summary>
        <Field
          label="Check stock on date"
          type="date"
          value={date}
          set={setDate}
        />
        <Select
          label="Availability"
          value={stock}
          set={setStock}
          options={[
            "All stock",
            "In Stock",
            "In Stock soon",
            "In Stock · Allocation",
          ]}
        />
        <p className="helper">
          Preview stock is a snapshot. Open the portal for stock on {date}.
        </p>
        <PortalLink path="products/list" label="Check live stock" />
      </details>
      <h3 className="section-title">Choose your products</h3>
      <div className="product-list">
        {items.map((p) => (
          <article className="product-card" key={p.id}>
            <button
              className="product-image"
              aria-label={"View details " + p.model}
              onClick={() => setDetail(p.id)}
            >
              <span>SUNPOWER</span>
              <em>{p.stock.includes("soon") ? "SOON" : "IN STOCK"}</em>
              {p.img ? (
                <img src={p.img} alt={p.name} />
              ) : (
                <GearIcon className="accessory-icon" />
              )}
            </button>
            <div className="product-info">
              <small>{p.name}</small>
              <button className="product-name" onClick={() => setDetail(p.id)}>
                {p.model}
              </button>
              <p>{p.meta}</p>
              <span className="unit-label">
                {p.pallet}{" "}
                {p.pallet === 1 && p.category === "Storage"
                  ? "KIT"
                  : "pcs / pallet"}
              </span>
              <div>
                <select
                  aria-label={"Pallet quantity for " + p.model}
                  value={quantity[p.id] || 1}
                  onChange={(e) =>
                    setQuantity({ ...quantity, [p.id]: Number(e.target.value) })
                  }
                >
                  {[1, 2, 3, 4, 5, 10, 20].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <button onClick={() => add(p.id)}>
                  <PlusIcon />
                  Add
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!items.length && <Empty />}
      <PortalLink path="products/list" />
      <AppSheet
        open={!!product}
        onOpenChange={(o) => {
          if (!o) setDetail(null);
        }}
        title={product?.model || "Product"}
        description={product?.name}
        snap={0.9}
      >
        {product && (
          <div className="sheet-body">
            {product.img && (
              <img
                className="detail-product-img"
                src={product.img}
                alt={product.name}
              />
            )}
            <Status value={product.stock} />
            <h3>Product overview</h3>
            <p>{product.meta}</p>
            <dl className="detail-list">
              <div>
                <dt>Category</dt>
                <dd>{product.category}</dd>
              </div>
              <div>
                <dt>Segment</dt>
                <dd>{product.segment}</dd>
              </div>
              <div>
                <dt>Pack size</dt>
                <dd>{product.pallet} pcs / kit</dd>
              </div>
              {product.id === 1 && (
                <>
                  <div>
                    <dt>Cell technology</dt>
                    <dd>N-TOPCon</dd>
                  </div>
                  <div>
                    <dt>Connector</dt>
                    <dd>EVO2A, ±1350 mm</dd>
                  </div>
                  <div>
                    <dt>Net weight</dt>
                    <dd>27.50 kg</dd>
                  </div>
                  <div>
                    <dt>Product / performance warranty</dt>
                    <dd>30 / 30 years</dd>
                  </div>
                </>
              )}
            </dl>
            <button className="primary wide" onClick={() => add(product.id)}>
              <PlusIcon />
              Add to cart
            </button>
            <h3>Downloads & support files</h3>
            <MenuRow
              icon={<FileTextIcon />}
              title="Product datasheet"
              sub="View the official product documentation"
              onClick={() =>
                live(
                  product.code
                    ? `products/detail?productCode=${product.code}&productMode=SKU&countryCode=GB&expectedDeliveryDate=${date}`
                    : "products/list",
                )
              }
            />
            <MenuRow
              icon={<FileTextIcon />}
              title="Product warranty"
              sub="Official warranty terms & downloads"
              onClick={() =>
                live(
                  product.code
                    ? `products/detail?productCode=${product.code}&productMode=SKU&countryCode=GB&expectedDeliveryDate=${date}`
                    : "products/list",
                )
              }
            />
            <PortalLink
              path="products/list"
              label="View compatible and related products"
            />
          </div>
        )}
      </AppSheet>
    </section>
  );
}
const resources = [
  {
    id: "r1",
    title: "Labor Costs reimbursement",
    type: "After Sales Policy",
    date: "2026-10-16",
    description: "After-sales policy and labor cost reimbursement information.",
  },
  {
    id: "r2",
    title: "Portal Guide - Warranty Management",
    type: "Partner Portal Manuals",
    date: "2026-10-16",
    description: "How to create warranties and manage them.",
  },
  {
    id: "r3",
    title: "Portal Guide - Partner Account Creation, Invite new User",
    type: "Partner Portal Manuals",
    date: "2026-10-16",
    description: "Manual for access to the portal and creating new users.",
  },
];
function MarketingScreen() {
  const [category, setCategory] = useState("Partner Resources");
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All resource types");
  const [selected, setSelected] = useState<string[]>([]);
  const [layout, setLayout] = useState("List");
  const [preview, setPreview] = useState<string | null>(null);
  const r = resources.find((r) => r.id === preview);
  const items = resources.filter(
    (r) =>
      (r.title + " " + r.description)
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (type === "All resource types" || r.type === type),
  );
  return (
    <section className="content">
      <Chips
        options={["Partner Resources", "Digital Assets", "Marketing Shop"]}
        value={category}
        set={setCategory}
      />
      {category === "Partner Resources" ? (
        <>
          <p className="intro">
            Essential documents, brand guidelines, portal manuals and
            operational materials.
          </p>
          <Search value={query} set={setQuery} placeholder="Search resources" />
          <Select
            label="Resource type"
            value={type}
            set={setType}
            options={[
              "All resource types",
              "After Sales Policy",
              "Partner Portal Manuals",
            ]}
          />
          <div className="section-row">
            <h3 className="section-title">{items.length} resources</h3>
            <div className="small-switch">
              {["List", "Grid"].map((v) => (
                <button
                  key={v}
                  className={layout === v ? "active" : ""}
                  onClick={() => setLayout(v)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div
            className={layout === "Grid" ? "resources-grid" : "resource-list"}
          >
            {items.map((r) => (
              <article className="resource-card" key={r.id}>
                <label className="resource-check">
                  <input
                    aria-label={"Select " + r.title}
                    type="checkbox"
                    checked={selected.includes(r.id)}
                    onChange={(e) =>
                      setSelected(
                        e.target.checked
                          ? [...selected, r.id]
                          : selected.filter((id) => id !== r.id),
                      )
                    }
                  />
                  <FileTextIcon />
                </label>
                <button
                  className="resource-info"
                  onClick={() => setPreview(r.id)}
                >
                  <small>{r.type}</small>
                  <b>{r.title}</b>
                  <span>Updated {r.date}</span>
                </button>
                <div className="resource-actions">
                  <button
                    aria-label={"Preview " + r.title}
                    onClick={() => setPreview(r.id)}
                  >
                    Preview
                  </button>
                  <button
                    aria-label={"Download " + r.title + " in portal"}
                    onClick={() => live("marketing/service?name=disitalAssets")}
                  >
                    <DownloadIcon />
                  </button>
                </div>
              </article>
            ))}
          </div>
          {!items.length && <Empty />}
          <button
            className="outline wide"
            disabled={!selected.length}
            onClick={() => live("marketing/service?name=disitalAssets")}
          >
            <ExternalLinkIcon />
            Open {selected.length || ""} selected in portal
          </button>
          <p className="helper">
            Official previews and file downloads use your portal session.
          </p>
        </>
      ) : (
        <Section title={category}>
          <div className="feature-icon">
            {category === "Digital Assets" ? <ArchiveIcon /> : <BackpackIcon />}
          </div>
          <p className="intro">
            {category === "Digital Assets"
              ? "Find digital marketing materials for your campaigns and sales activities."
              : "Find printed brochures, merchandise and website audits in the Marketing Shop."}
          </p>
          <PortalLink path="marketing/list" label={"Open " + category} />
        </Section>
      )}
      <AppSheet
        open={!!r}
        onOpenChange={(o) => {
          if (!o) setPreview(null);
        }}
        title="Resource details"
        description={r?.type}
      >
        {r && (
          <div className="sheet-body">
            <FileTextIcon className="feature-icon" />
            <h3>{r.title}</h3>
            <p>{r.description}</p>
            <p className="helper">Updated {r.date}</p>
            <PortalLink
              path="marketing/service?name=disitalAssets"
              label="Preview or download original document"
            />
          </div>
        )}
      </AppSheet>
    </section>
  );
}
function TrainingScreen() {
  const { notify, data } = useApp();
  const events = data.home.content ? [...visibleHomeMessages(data, "Marketing Event").map(m => ({
    id: m.id, title: m.title, description: m.body, date: m.start,
    day: String(new Date(m.start + "T12:00:00").getDate()),
    month: new Date(m.start + "T12:00:00").toLocaleString("en", {month:"short"}).toUpperCase(),
    kind: m.start >= today() ? "Webinar" : "Past webinar",
    location: m.format === "Offline" ? m.location : "Online",
  })), ...trainingEvents.map(e => ({...e,location:"Online"}))] : [];
  const [filter, setFilter] = useState("All");
  const [month, setMonth] = useState(localDate(new Date()).slice(0,7));
  const [selected, setSelected] = useState<string | null>(null);
  const event = events.find((e) => e.id === selected);
  const list = events.filter(
    (e) =>
      filter === "All" ||
      (filter === "Upcoming"
        ? e.date.slice(0, 10) >= today()
        : filter === "On demand"
          ? e.kind === "On demand"
          : e.kind === "Past webinar"),
  );
  const calendarDate = new Date(month + "-01T12:00:00");
  const monthOK = !isNaN(calendarDate.getTime());
  const days = monthOK
    ? new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth() + 1,
        0,
      ).getDate()
    : 0;
  const offset = monthOK ? (calendarDate.getDay() + 6) % 7 : 0;
  return (
    <section className="content">
      <p className="intro">
        Deepen your SunPower knowledge with live courses, product webinars and
        sales updates.
      </p>
      <div className="calendar-card">
        <div className="calendar-heading">
          <b>Event calendar</b>
          <label>
            <span className="sr-only">Calendar month</span>
            <MobileTextField
              type="month"
              aria-label="Calendar month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </label>
        </div>
        <div className="calendar-grid">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={"d" + i}>{d}</span>
          ))}
          {Array.from({ length: offset }, (_, i) => (
            <span key={"o" + i} />
          ))}
          {Array.from({ length: days }, (_, i) => {
            const day = month + "-" + String(i + 1).padStart(2, "0");
            const event = events.find((e) => e.date.slice(0, 10) === day);
            return (
              <button
                className={event ? "has-event" : ""}
                key={i}
                aria-label={day + (event ? ": " + event.title : "")}
                disabled={!event}
                onClick={() => event && setSelected(event.id)}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
      <Chips
        options={["All", "Upcoming", "On demand", "Past"]}
        value={filter}
        set={setFilter}
      />
      <div className="record-list">
        {list.map((e) => (
          <button
            className="event-card"
            key={e.id}
            onClick={() => setSelected(e.id)}
          >
            <div className="date">
              <b>{e.day}</b>
              <span>{e.month}</span>
            </div>
            <div>
              <b>{e.title}</b>
              <p>
                <VideoIcon />
                {e.kind} · {e.location}
              </p>
            </div>
            <ChevronRightIcon />
          </button>
        ))}
      </div>
      {!list.length && <Empty />}
      <h3 className="section-title">Seminars</h3>
      <p className="helper">
        Check the portal for regional seminar availability.
      </p>
      <PortalLink
        path="livingTrain/list"
        label="View live training & register"
      />
      <AppSheet
        open={!!event}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
        title={event?.kind || "Event"}
        description={event?.date}
      >
        {event && (
          <div className="sheet-body">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>
              <VideoIcon /> {event.location}
            </p>
            <button
              className="outline wide"
              onClick={() => {
                const date = event.date.slice(0, 10).replaceAll("-", "");
                const stamp = new Date()
                  .toISOString()
                  .replace(/[-:]/g, "")
                  .replace(/\.\d{3}/, "");
                file(
                  "sunpower-event.ics",
                  `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//SunPower Preview//Events//EN\r\nBEGIN:VEVENT\r\nUID:${event.id}@sunpower-preview.local\r\nDTSTAMP:${stamp}\r\nDTSTART;VALUE=DATE:${date}\r\nSUMMARY:${event.title}\r\nDESCRIPTION:Confirm event timing in Partner Portal.\r\nURL:${PORTAL}livingTrain/list\r\nEND:VEVENT\r\nEND:VCALENDAR\r\n`,
                  "text/calendar",
                );
                notify(
                  "Calendar file downloaded. Confirm event time in portal.",
                );
              }}
            >
              <CalendarIcon />
              Add to calendar
            </button>
            {event.kind === "Past webinar" ? (
              <button className="primary wide" disabled>
                Registration closed
              </button>
            ) : (
              <PortalLink
                path="livingTrain/list"
                label={
                  event.kind === "On demand"
                    ? "Open training in portal"
                    : "Register in portal"
                }
              />
            )}
          </div>
        )}
      </AppSheet>
    </section>
  );
}
function AcademyScreen() {
  const [tab, setTab] = useState("Home");
  return (
    <section className="content">
      <article className="academy-hero">
        <ReaderIcon />
        <span>PARTNER LEARNING</span>
        <h2>
          TCL Intelligent
          <br />
          Training Academy
        </h2>
        <p>Build product knowledge. Grow your expertise.</p>
      </article>
      <Chips
        options={["Home", "Study", "Exam", "Class"]}
        value={tab}
        set={setTab}
      />
      <Section
        title={
          tab === "Home"
            ? "Todo tasks"
            : tab === "Study"
              ? "Study courses"
              : tab === "Exam"
                ? "AI exams"
                : "My classes"
        }
      >
        <p className="intro">
          {tab === "Home"
            ? "Your assigned courses, exams and classes are managed by the training academy."
            : "Open the academy to see the content and assignments available to your account."}
        </p>
        <PortalLink path="academy/exam" label={"Open Academy · " + tab} />
      </Section>
      <p className="helper">
        Academy uses a separate authenticated platform. Course progress, exam
        results and certificates remain there.
      </p>
    </section>
  );
}
function FieldOpsScreen() {
  const { data, setData, notify } = useApp();
  const entry = isEntryAccount(data);
  const [mode, setMode] = useState("Operations");
  const [view, setView] = useState("Overview");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [detail, setDetail] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const systems = [
    {
      id: "SYS-001",
      name: "Wilson Residence",
      city: "Bristol",
      status: "Normal",
      description: "System operating normally.",
    },
    {
      id: "SYS-002",
      name: "Jensen Residence",
      city: "Oslo",
      status: "Major",
      description: "Battery communication interrupted.",
    },
    {
      id: "SYS-003",
      name: "Rossi Residence",
      city: "Milan",
      status: "Offline",
      description: "Device offline. Check the local network connection.",
    },
    {
      id: "SYS-004",
      name: "Martin Residence",
      city: "Lyon",
      status: "Emergency",
      description:
        "Inverter fault reported. Inspect the live alarm before taking action.",
    },
  ];
  const system = systems.find((s) => s.id === detail);
  const job = data.jobs.find((j) => j.id === detail);
  const list = systems.filter(
    (s) =>
      (!query ||
        (s.name + s.city + s.id).toLowerCase().includes(query.toLowerCase())) &&
      (filter === "All" ||
        (filter === "Alerts"
          ? ["Major", "Emergency"].includes(s.status)
          : s.status === filter)),
  );
  return (
    <section className="content field-content">
      {entry ? <h3 className="section-title">Monitoring</h3> : <div className="mode-tabs" role="tablist">
        {["Installation", "Operations"].map((m) => (
          <button
            key={m}
            role="tab"
            aria-selected={mode === m}
            className={mode === m ? "active" : ""}
            onClick={() => {
              setMode(m);
              setView("Overview");
            }}
          >
            {m === "Installation" ? <LightningBoltIcon /> : <GearIcon />}
            {m}
          </button>
        ))}
      </div>}
      {!entry && mode === "Installation" ? (
        <>
          <div className="ops-hero">
            <div>
              <span>INSTALLATION PIPELINE</span>
              <h2>{data.jobs.length} active projects</h2>
              <p>Surveys, installation and commissioning</p>
            </div>
            <button
              aria-label="Add installation"
              onClick={() => setCreating(true)}
            >
              <PlusIcon />
            </button>
          </div>
          <h3 className="section-title">Today’s work</h3>
          <div className="job-list">
            {data.jobs.map((j) => (
              <button
                className="job-card"
                key={j.id}
                onClick={() => setDetail(j.id)}
              >
                <div className="job-icon">
                  <LightningBoltIcon />
                </div>
                <div>
                  <b>{j.name}</b>
                  <p>{j.city}</p>
                </div>
                <Status value={j.stage} />
                <ChevronRightIcon />
              </button>
            ))}
          </div>
          <button className="primary wide" onClick={() => setCreating(true)}>
            <PlusIcon />
            Create installation
          </button>
        </>
      ) : view === "Overview" ? (
        <>
          <article className="system-card">
            <button
              className="card-head card-head-button"
              onClick={() => setView("Systems")}
            >
              <b>Systems overview</b>
              <ChevronRightIcon />
            </button>
            <div className="system-total">
              <b>28</b>
              <span>Number of systems</span>
            </div>
            <div className="health-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="health-stats">
              <span>
                <b>24</b>
                <i className="green" />
                Normal
              </span>
              <span>
                <b>2</b>
                <i className="red" />
                Alerts
              </span>
              <span>
                <b>2</b>
                <i className="gray" />
                Offline
              </span>
            </div>
          </article>
          <article className="alert-card">
            <div className="card-head">
              <b>Alerts</b>
              <button
                onClick={() => {
                  setView("Systems");
                  setFilter("Alerts");
                }}
              >
                View all
                <ChevronRightIcon />
              </button>
            </div>
            <div className="alert-body">
              <div className="alert-mark">
                <ExclamationTriangleIcon />
                <b>2</b>
                <small>Active alerts</small>
              </div>
              <div className="alert-levels">
                <span>
                  <i className="red" />
                  <b>Emergency</b>
                  <strong>1</strong>
                </span>
                <span>
                  <i className="orange" />
                  <b>Major</b>
                  <strong>1</strong>
                </span>
                <span>
                  <i className="yellow-dot" />
                  <b>Minor</b>
                  <strong>0</strong>
                </span>
              </div>
            </div>
          </article>
          <h3 className="section-title">Systems needing attention</h3>
          <button
            className="attention-card"
            onClick={() => setDetail("SYS-002")}
          >
            <span className="attention-icon">
              <ExclamationTriangleIcon />
            </span>
            <div>
              <b>Jensen Residence</b>
              <p>Battery communication interrupted</p>
            </div>
            <Status value="Major" />
            <ChevronRightIcon />
          </button>
        </>
      ) : (
        <>
          <Back label="Back to overview" onClick={() => setView("Overview")} />
          <Search
            value={query}
            set={setQuery}
            placeholder="Search system, ID or location"
          />
          <Chips
            options={[
              "All",
              "Alerts",
              "Normal",
              "Major",
              "Emergency",
              "Offline",
            ]}
            value={filter}
            set={setFilter}
          />
          <div className="job-list">
            {list.map((s) => (
              <button
                className="job-card"
                key={s.id}
                onClick={() => setDetail(s.id)}
              >
                <div className="job-icon">
                  <LightningBoltIcon />
                </div>
                <div>
                  <b>{s.name}</b>
                  <p>
                    {s.id} · {s.city}
                  </p>
                </div>
                <Status value={s.status} />
                <ChevronRightIcon />
              </button>
            ))}
          </div>
          {!list.length && <Empty />}
          <p className="helper">
            Representative demo systems. Use the live monitoring platform for
            your full inventory.
          </p>
        </>
      )}
      <h3 className="section-title">Monitoring platforms</h3>
      <MenuRow
        icon={<LightningBoltIcon />}
        title="Energy storage"
        sub="System management & commissioning"
        onClick={() =>
          window.open(
            "https://installer.sunpowerglobal.com/#/power-station/list",
            "_blank",
            "noopener,noreferrer",
          )
        }
      />
      <p className="helper">
        An Admin user cannot commission a StorageSystem. Use a user with a
        different role.
      </p>
      <MenuRow
        icon={<BackpackIcon />}
        title="Reserve"
        sub="Open from Partner Portal"
        onClick={() => live("monitoring/index")}
      />
      <MenuRow
        icon={<GlobeIcon />}
        title="Drive"
        sub="Open from Partner Portal"
        onClick={() => live("monitoring/index")}
      />
      <AppSheet
        open={creating}
        onOpenChange={setCreating}
        title="Create installation"
        description="Save a project in this local preview."
      >
        <div className="sheet-body">
          <Field label="Project name" value={name} set={setName} required />
          <Field
            label="Location / system size"
            value={city}
            set={setCity}
            required
          />
          <button
            className="primary wide"
            disabled={!name.trim() || !city.trim()}
            onClick={() => {
              setData((d) => ({
                ...d,
                jobs: [
                  ...d.jobs,
                  {
                    id: "I" + Date.now(),
                    name: name.trim(),
                    city: city.trim(),
                    stage: "Site survey",
                  },
                ],
              }));
              setCreating(false);
              setName("");
              setCity("");
              notify("Installation project saved locally.");
            }}
          >
            Save project
          </button>
        </div>
      </AppSheet>
      <AppSheet
        open={!!detail}
        onOpenChange={(o) => {
          if (!o) setDetail(null);
        }}
        title={job?.name || system?.name || "System"}
        description={job?.city || system?.city}
      >
        <div className="sheet-body">
          {job ? (
            <>
              <Status value={job.stage} />
              <Select
                label="Installation stage"
                value={job.stage}
                set={(stage) => {
                  setData((d) => ({
                    ...d,
                    jobs: d.jobs.map((j) =>
                      j.id === job.id ? { ...j, stage } : j,
                    ),
                  }));
                  notify("Installation stage updated.");
                }}
                options={[
                  "Site survey",
                  "Ready",
                  "Installing",
                  "Commissioning",
                  "Completed",
                ]}
              />
            </>
          ) : (
            system && (
              <>
                <Status value={system.status} />
                <p>{system.description}</p>
                <p className="helper">
                  Inspect system details, permission configuration and
                  notification settings in the monitoring platform.
                </p>
              </>
            )
          )}
          <button
            className="primary wide"
            onClick={() =>
              window.open(
                "https://installer.sunpowerglobal.com/#/power-station/list",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <ExternalLinkIcon />
            Open live system management
          </button>
        </div>
      </AppSheet>
    </section>
  );
}
function BenefitsScreen() {
  const { data } = useApp();
  const canDownload = ["Authorized", "Premier", "Elite"].includes(data.home.level);
  return <section className="content"><TierCard /><h3 className="section-title">Your partner journey</h3>{["Entry","Authorized","Premier","Elite"].map(level => <article className="tier-row" key={level}><span className="record-icon"><RocketIcon /></span><div><b>{level}</b><small>{level === "Entry" ? "Start your journey" : "Discover partner benefits in Portal"}</small></div>{level === data.home.level && <Status value="Current" />}</article>)}<Section title="Partner benefits"><p>Explore partner resources, training, marketing support and the benefits of your membership.</p><PortalLink path="homePage/msgList" label="View partner benefits in Portal" /><button className="outline wide" disabled={!canDownload} onClick={() => live("dashboard/home")}><DownloadIcon />Download certificate in Portal</button>{!canDownload && <p className="helper">Certificates are available from Authorized tier.</p>}</Section></section>;
}
function NewsScreen() {
  const { data } = useApp();
  const items = visibleHomeMessages(data, "Latest News").sort((a,b) => b.start.localeCompare(a.start));
  return <section className="content">{items.map(n => <article className="article-card" key={n.id}><small>LATEST NEWS · {n.start}</small><h2>{n.title}</h2><p>{n.body}</p><PortalLink path="homePage/msgList" label="View story in Partner Portal" /></article>)}{!items.length && <Empty>No news is available for this account.</Empty>}<PortalLink path="homePage/msgList" label="View all news in Portal" /></section>;
}
const permissionOptions = [
  "Warranty",
  "Lead",
  "Marketing",
  "Live training",
  "Academy",
  "Monitoring",
  "Products",
];
function UsersScreen() {
  const { data, setData, notify } = useApp();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All roles");
  const [selected, setSelected] = useState<User | null>(null);
  const [error, setError] = useState("");
  const list = data.users.filter(
    (u) =>
      (u.name + u.email).toLowerCase().includes(query.toLowerCase()) &&
      (role === "All roles" || u.role === role),
  );
  const save = () => {
    if (!selected) return;
    if (
      !selected.name.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(selected.email)
    )
      return setError("Enter a name and valid email.");
    if (
      data.users.some(
        (u) =>
          u.id !== selected.id &&
          u.email.toLowerCase() === selected.email.toLowerCase(),
      )
    )
      return setError("This email already exists.");
    setData((d) => ({
      ...d,
      users: [...d.users.filter((u) => u.id !== selected.id), selected],
    }));
    setSelected(null);
    notify("User saved locally. No invitation or permission change was sent.");
  };
  return (
    <section className="content">
      <Search
        value={query}
        set={setQuery}
        placeholder="Search user name or email"
      />
      <div className="section-row">
        <h3 className="section-title">Users · {list.length}</h3>
        <button
          className="filter-btn"
          onClick={() => {
            setError("");
            setSelected({
              id: "U" + Date.now(),
              name: "",
              email: "",
              phone: "",
              role: "Sales representative",
              status: "Invited",
              enabled: true,
              permissions: ["Lead"],
            });
          }}
        >
          <PlusIcon />
          Invite
        </button>
      </div>
      <Select
        label="User role"
        value={role}
        set={setRole}
        options={[
          "All roles",
          "Partner admin",
          "Sales representative",
          "Installer",
        ]}
      />
      <div className="record-list">
        {list.map((u) => (
          <button
            className="menu-row"
            key={u.id}
            onClick={() => {
              setError("");
              setSelected({ ...u, permissions: [...u.permissions] });
            }}
          >
            <span className="lead-avatar">
              {u.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <span>
              <b>{u.name}</b>
              <small>{u.email}</small>
              <small>{u.role}</small>
            </span>
            <Status value={u.enabled ? u.status : "Disabled"} />
            <ChevronRightIcon />
          </button>
        ))}
      </div>
      {!list.length && <Empty />}
      <PortalLink path="profile/user" label="Manage real users & invitations" />
      <AppSheet
        open={!!selected}
        onOpenChange={(o) => {
          if (!o) setSelected(null);
        }}
        title={selected?.status === "Invited" ? "Invite user" : "User details"}
        description="Local user & permission preview"
        snap={0.9}
      >
        {selected && (
          <div className="sheet-body">
            <Field
              label="User name"
              value={selected.name}
              set={(name) => setSelected({ ...selected, name })}
              required
            />
            <Field
              label="User email"
              type="email"
              value={selected.email}
              set={(email) => setSelected({ ...selected, email })}
              required
            />
            <Field
              label="Phone number"
              value={selected.phone}
              set={(phone) => setSelected({ ...selected, phone })}
            />
            <Select
              label="Role"
              value={selected.role}
              set={(role) => setSelected({ ...selected, role })}
              options={["Partner admin", "Sales representative", "Installer"]}
            />
            <h3>Permission list</h3>
            {permissionOptions.map((p) => (
              <label key={p} className="check-row">
                <input
                  type="checkbox"
                  checked={selected.permissions.includes(p)}
                  onChange={(e) =>
                    setSelected({
                      ...selected,
                      permissions: e.target.checked
                        ? [...selected.permissions, p]
                        : selected.permissions.filter((v) => v !== p),
                    })
                  }
                />
                <span>{p}</span>
              </label>
            ))}
            <label className="check-row">
              <input
                type="checkbox"
                checked={selected.enabled}
                onChange={(e) =>
                  setSelected({ ...selected, enabled: e.target.checked })
                }
              />
              <span>Account enabled</span>
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <button className="primary wide" onClick={save}>
              {selected.status === "Invited"
                ? "Save local invitation"
                : "Save changes"}
            </button>
            <p className="preview-note">
              Real invitations and permissions are managed in Partner Portal.
            </p>
          </div>
        )}
      </AppSheet>
    </section>
  );
}
function HomeSettings({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const { data, setData, go } = useApp();
  const [draft, setDraft] = useState(data.home);
  const [country, setCountry] = useState(data.profile.country);
  useEffect(() => {
    if (open) { setDraft(data.home); setCountry(data.profile.country); }
  }, [open]);
  const toggle = (key: "banner" | "bannerTitle" | "bannerExplore" | "content", label: string) => (
    <Select label={label} value={draft[key] ? "Show" : "Hide"}
      set={v => setDraft(d => ({ ...d, [key]: v === "Show" }))} options={["Show", "Hide"]} />
  );
  return (
    <AppSheet open={open} onOpenChange={setOpen} title="Homepage preview"
      footer={<button className="primary wide" onClick={() => {
        setData(d => ({ ...d, home: draft, profile: { ...d.profile, country } }));
        setOpen(false); go("home");
      }}>Preview homepage</button>}>
      <div className="sheet-body preview-settings">
        <section className="preview-settings-group" aria-labelledby="preview-account-heading">
          <div className="preview-group-heading"><span className="record-icon"><PersonIcon /></span><div>
            <h3 id="preview-account-heading">Account preview</h3>
            <p>Choose the account that determines your homepage and available tabs.</p>
          </div></div>
          <Select label="Partner level" value={draft.level} set={level => setDraft(d => ({ ...d, level }))}
            options={["Entry", "N/A", "Authorized", "Premier", "Elite", "Unmatched"]} />
          <Select label="Account country" value={country} set={setCountry}
            options={["United Kingdom", "Italy", "Spain", "Germany", "France", "Norway"]} />
          <Select label="Account type" value={draft.accountType} set={accountType => setDraft(d => ({ ...d, accountType }))}
            options={["Admin", "User"]} />
        </section>
        <section className="preview-settings-group" aria-labelledby="preview-dashboard-heading">
          <div className="preview-group-heading"><span className="record-icon"><RocketIcon /></span><div>
            <h3 id="preview-dashboard-heading">Membership dashboard</h3>
            <p>Set sample progress, review date and homepage content.</p>
          </div></div>
          <div className="form-grid">
            {([['purchasedKw', 'Purchased solar (kW)'], ['essKits', 'ESS kits'], ['targetKw', 'Next target (kW)'], ['targetKits', 'Next target (kits)']] as const).map(([key, label]) => (
              <Field key={key} label={label} type="number" value={String(draft[key])}
                set={v => setDraft(d => ({ ...d, [key]: Math.max(0, Number(v) || 0) }))} />
            ))}
          </div>
          <Field label="Review date" type="date" value={draft.reviewDate} set={reviewDate => setDraft(d => ({ ...d, reviewDate }))} />
          {toggle("banner", "Homepage banner")}
          {toggle("bannerTitle", "Banner title")}
          {toggle("bannerExplore", "Banner explore button")}
          {toggle("content", "News, benefits & events")}
        </section>
        <section className="preview-settings-group" aria-labelledby="preview-notifications-heading">
          <div className="preview-group-heading"><span className="record-icon"><BellIcon /></span><div>
            <h3 id="preview-notifications-heading">Messages & notifications</h3>
            <p>Try application reminders, invitations and application updates.</p>
          </div></div>
          <Select label="Application history" value={draft.applicationSubmitted ? "Application pending" : "First application"}
            set={v => setDraft(d => ({ ...d, applicationSubmitted: v === "Application pending" }))}
            options={["First application", "Application pending"]} />
          <Select label="Pending notification" value={draft.notification}
            set={notification => setDraft(d => ({ ...d, notification: notification as HomeConfig["notification"] }))}
            options={["None", "Invitation", "Rejected"]} />
        </section>
        <p className="helper">These settings affect this preview only. Formal tier qualification, agreements and certificates remain in Partner Portal.</p>
      </div>
    </AppSheet>
  );
}

function ProfileScreen() {
  const { data, setData, go, notify, intent } = useApp();
  const [editing, setEditing] = useState(!!intent.editProfile);
  const [homeSettings, setHomeSettings] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [language, setLanguage] = useState(data.profile.language);
  const [profile, setProfile] = useState(data.profile);
  const [cookieSheet, setCookieSheet] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [reset, setReset] = useState(false);
  return (
    <section className="content">
      <div className="profile-card">
        <span className="profile-avatar">XW</span>
        <h2>{data.profile.name}</h2>
        <p>{data.profile.company}</p>
        <Status value={data.home.accountType === "Admin" ? "Partner admin" : "Partner user"} />
        <p className="preview-note">
          Local preview · Sample data · Saved in this browser
        </p>
      </div>
      <MenuRow
        icon={<PersonIcon />}
        title="Profile"
        sub="Personal and company information"
        onClick={() => {
          setProfile({ ...data.profile });
          setEditing(true);
        }}
      />
      {data.home.accountType === "Admin" && <MenuRow
        icon={<PersonIcon />}
        title="User management"
        sub="Invite users, roles & permissions"
        onClick={() => go("users")}
      />}
      <MenuRow
        icon={<GearIcon />}
        title="Change password"
        sub="Securely manage your account in portal"
        onClick={() => live("dashboard/home")}
      />
      <MenuRow
        icon={<GlobeIcon />}
        title="Language"
        sub={data.profile.language}
        onClick={() => {
          setLanguage(data.profile.language);
          setLanguageOpen(true);
        }}
      />
      <MenuRow
        icon={<GearIcon />}
        title="Manage cookies"
        sub="Privacy preferences"
        onClick={() => setCookieSheet(true)}
      />
      <MenuRow icon={<GearIcon />} title="Homepage preview" sub="Try account levels, countries & homepage states" onClick={() => setHomeSettings(true)} />
      <HomeSettings open={homeSettings} setOpen={setHomeSettings} />
      <h3 className="section-title">Contact us</h3>
      <div className="contact-card">{data.profile.country === "United Kingdom" ? <><a href="tel:+442045726579">+44 2045726579</a><a href="mailto:PartnerService.UK@sunpowerglobal.com">PartnerService.UK@sunpowerglobal.com</a></> : <><p>{data.profile.country} partner support</p><PortalLink path="dashboard/home" label="View regional contact details" /></>}</div>
      <PortalLink
        path="dashboard/home"
        label="Open your live Partner Portal account"
      />
      <button className="danger-button" onClick={() => setReset(true)}>
        Reset local preview
      </button>
      <AppSheet
        open={editing}
        onOpenChange={setEditing}
        title="Your profile"
        description="Changes apply to this preview only."
        footer={<button
            className="primary wide"
            onClick={() => {
              if (
                !profile.name.trim() ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)
              )
                return notify("Enter your name and a valid email.");
              setData((d) => ({ ...d, profile }));
              setEditing(false);
              notify("Profile saved locally.");
            }}
          >
            Save profile
          </button>}
      >
        <div className="sheet-body">
          <Field
            label="Name"
            value={profile.name}
            set={(name) => setProfile({ ...profile, name })}
            required
          />
          <Field
            label="Email"
            type="email"
            value={profile.email}
            set={(email) => setProfile({ ...profile, email })}
          />
          <Field
            label="Phone"
            value={profile.phone}
            set={(phone) => setProfile({ ...profile, phone })}
          />
          <Field
            label="Company"
            value={profile.company}
            set={(company) => setProfile({ ...profile, company })}
          />
          <Select label="Country" value={profile.country} set={country => setProfile({...profile,country})} options={["United Kingdom","Italy","Spain","Germany","France","Norway"]} />

        </div>
      </AppSheet>
      <AppSheet open={languageOpen} onOpenChange={setLanguageOpen} title="Language" description="Choose your language preference" snap={0.43}
        footer={<button className="primary wide" onClick={() => {
          setData(d => ({...d,profile:{...d.profile,language}}));
          setLanguageOpen(false);
          notify("Language preference saved locally.");
        }}>Save language</button>}>
        <div className="sheet-body">
          <Select label="Language preference" value={language} set={setLanguage} options={["English", "Français", "Deutsch", "Italiano", "Español"]} />
          <p className="helper">This saves your preview preference. Open Partner Portal for translated content.</p>
        </div>
      </AppSheet>
      <AppSheet
        open={cookieSheet}
        onOpenChange={setCookieSheet}
        title="Cookie preferences"
        description="Local preview privacy preferences"
      >
        <div className="sheet-body">
          <label className="check-row">
            <input type="checkbox" checked disabled />
            <span>Essential storage · Required to save your preview</span>
          </label>
          <label className="check-row">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
            />
            <span>Optional analytics preference</span>
          </label>
          <p className="helper">
            This local app does not send analytics. Real portal cookie settings
            are managed separately.
          </p>
          <button
            className="primary wide"
            onClick={() => {
              setCookieSheet(false);
              notify("Preview preferences saved for this session.");
            }}
          >
            Save preferences
          </button>
          <PortalLink path="privacy" label="Read portal Privacy Policy" />
        </div>
      </AppSheet>
      <AppSheet
        open={reset}
        onOpenChange={setReset}
        title="Reset local preview?"
        description="This replaces local drafts, requests and settings with the sample data."
      >
        <div className="sheet-body">
          <button
            className="primary wide"
            onClick={() => {
              setData(initial());
              setReset(false);
              notify("Preview reset.");
              go("home");
            }}
          >
            Reset preview
          </button>
          <button className="outline wide" onClick={() => setReset(false)}>
            Keep my changes
          </button>
        </div>
      </AppSheet>
    </section>
  );
}
function MessagesScreen() {
  const { data, setData } = useApp();
  const messages = [
    {
      id: "m1",
      title: "Welcome to your partner workspace",
      body: "Access warranties, solar opportunities, resources and your product requests in one place.",
      page: "home" as Page,
    },
    {
      id: "m2",
      title: "Explore the latest partner resources",
      body: "Warranty management and partner account guides are available in Marketing.",
      page: "marketing" as Page,
    },
  ];
  const { go } = useApp();
  return (
    <section className="content">
      <div className="section-row">
        <h3 className="section-title">Notifications</h3>
        <button
          className="text-btn"
          onClick={() => setData((d) => ({ ...d, read: ["m1", "m2"] }))}
        >
          Mark all as read
        </button>
      </div>
      {messages.map((m) => (
        <button
          key={m.id}
          className={"message-card " + (data.read.includes(m.id) ? "read" : "")}
          onClick={() => {
            setData((d) => ({ ...d, read: [...new Set([...d.read, m.id])] }));
            go(m.page);
          }}
        >
          <BellIcon />
          <span>
            <b>{m.title}</b>
            <small>{m.body}</small>
          </span>
          {!data.read.includes(m.id) && <i />}
        </button>
      ))}
      {data.reminders.map((r, i) => (
        <article className="message-card read" key={i}>
          <EnvelopeClosedIcon />
          <span>
            <b>Warranty reminder recorded</b>
            <small>{r.split(":")[0]} · Local action</small>
          </span>
        </article>
      ))}
      <PortalLink
        path="dashboard/home"
        label="View live portal notifications"
      />
    </section>
  );
}
function FAQScreen() {
  const { go } = useApp();
  const [query, setQuery] = useState("");
  const questions: { question: string; answer: string; page: Page; action: string }[] = [
    { question: "How do I register a warranty?", answer: "Open Warranty and choose Register warranty. Enter the installation date, serial number and quantity. Save a draft, or add the homeowner email and confirm consent before submitting. This preview saves locally; real emails are sent through Partner Portal.", page: "warranty", action: "Go to Warranty" },
    { question: "Where can I find my leads?", answer: "Open Leads to search opportunities, view My leads or Shared pool, and review follow-up history. Reassignment follows the configured owner and admin permissions in this preview.", page: "leads", action: "Go to Leads" },
    { question: "How do I request product pricing?", answer: "Add products to the request cart, review the pallet or kit quantities and select a delivery date. Requests in this preview are saved locally. Use Partner Portal to submit a real price request and check current stock.", page: "products", action: "Go to Products" },
    { question: "Where are product guides and partner resources?", answer: "Marketing contains partner manuals and resource entrances. Official document previews and downloads open in Partner Portal. Training and Academy are available from Partner resources on Home.", page: "marketing", action: "Go to Marketing" },
    { question: "How can I contact partner support?", answer: "Open Your account for the partner support phone number and email address, along with account and team management entrances.", page: "profile", action: "Contact support" },
  ];
  const rows = questions.filter(q => (q.question + " " + q.answer).toLowerCase().includes(query.toLowerCase()));
  return <section className="content"><Search value={query} set={setQuery} placeholder="Search frequently asked questions" /><p className="helper">Help for using this partner app preview.</p>{rows.map(q => <details className="filter-details faq-item" key={q.question}><summary>{q.question}</summary><p className="intro">{q.answer}</p><button className="text-btn" onClick={() => go(q.page)}>{q.action} <ChevronRightIcon /></button></details>)}{!rows.length && <Empty>Try warranty, leads, pricing or resources.</Empty>}</section>;
}

const pageInfo: Record<Page, [string, string]> = {
  home: ["Good morning, Xin", "Here’s your partner overview"],
  warranty: ["Warranty", "Manage your registrations"],
  leads: ["Leads", "New solar opportunities"],
  products: ["Products", "Build your next solar project"],
  fieldops: ["Field operations", "Installation and system care"],
  marketing: ["Marketing", "Resources for your next opportunity"],
  training: ["Live training", "Learn, connect and grow"],
  academy: ["Academy", "Your partner learning journey"],
  profile: ["Your account", "Manage your partner workspace"],
  users: ["User management", "Your team, roles and permissions"],
  messages: ["Messages", "Stay up to date"],
  benefits: ["Partner benefits", "Your progress and rewards"],
  news: ["Latest news", "What’s new at TCL SunPower"],
  faq: ["FAQ", "Frequently asked questions"],
};
export default function Prototype() {
  const appRoot = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Native input focus can scroll overflow-hidden device chrome. Only the
    // app's content scrollers should move; keep the phone coordinate origin fixed.
    const screen = appRoot.current?.closest<HTMLElement>('[data-phone-screen]');
    if (!screen) return;
    const restoreScreenOrigin = () => {
      if (screen.scrollTop !== 0) screen.scrollTop = 0;
      if (screen.scrollLeft !== 0) screen.scrollLeft = 0;
    };
    restoreScreenOrigin();
    screen.addEventListener("scroll", restoreScreenOrigin);
    return () => screen.removeEventListener("scroll", restoreScreenOrigin);
  }, []);
  const [data, setData] = useState<Store>(restore);
  const [page, setPage] = useState<Page>("home");
  const [intent, setIntent] = useState<RouteIntent>({});
  const [tab, setTab] = useState<Tab>("home");
  const [history, setHistory] = useState<Page[]>([]);
  const [toast, setToast] = useState("");
  const keyboard = useKeyboard();
  const { bottomInset } = useKeyboardInsets();
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ version: 2, data }));
    } catch {
      setToast(
        "Browser storage is full. Changes will only last for this session.",
      );
    }
  }, [data]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4800);
    return () => clearTimeout(t);
  }, [toast]);
  useEffect(() => {
    if (!allowedPage(data, page)) {
      keyboard.hide();
      setPage("home"); setTab("home"); setHistory([]); setIntent({});
    }
  }, [data.home.level, page]);
  const go = (next: Page, nextIntent: RouteIntent = {}) => {
    keyboard.hide();
    if (!allowedPage(data, next)) { setToast("This section is available to partner accounts."); return; }
    setIntent(nextIntent);
    if (next === page) return;
    if (tabs.some((t) => t.id === next)) {
      setTab(next as Tab);
      setHistory([]);
    } else setHistory((h) => [...h, page]);
    setPage(next);
  };
  const back = () => {
    keyboard.hide();
    setIntent({});
    const previous = [...history].reverse().find(p => allowedPage(data, p)) || (allowedPage(data, tab) ? tab : "home");
    setHistory((h) => h.slice(0, -1));
    setPage(previous);
  };
  const [title, subtitle] = page === "fieldops" && isEntryAccount(data)
    ? ["Field operations", "System monitoring and alerts"]
    : pageInfo[page];
  const screens: Record<Page, ReactNode> = {
    home: <HomeScreen />,
    warranty: <WarrantyScreen />,
    leads: <LeadsScreen />,
    products: <ProductsScreen />,
    fieldops: <FieldOpsScreen />,
    marketing: <MarketingScreen />,
    training: <TrainingScreen />,
    academy: <AcademyScreen />,
    profile: <ProfileScreen />,
    users: <UsersScreen />,
    messages: <MessagesScreen />,
    benefits: <BenefitsScreen />,
    news: <NewsScreen />,
    faq: <FAQScreen />,
  };
  return (
    <AppContext.Provider value={{ data, setData, go, intent, notify: setToast }}>
      <div
        ref={appRoot}
        className="sunpower-app"
        data-build="portal-restoration-v2"
        data-keyboard-open={keyboard.visible}
      >
        <Header />
        <MobileScroll key={page} className="app-screen">
          <main className="app-main"><section className="scrolling-page-title">      <div className="page-title">
        {!tabs.some((t) => t.id === page) && (
          <button className="title-back" aria-label="Back" onClick={back}>
            <ArrowLeftIcon />
          </button>
        )}
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
</section>{screens[page]}</main>
        </MobileScroll>
        <BottomNav tab={tab} />
        {toast && (
          <div
            className="app-toast"
            style={{ bottom: bottomInset + 82 }}
            role="status"
          >
            <CheckCircledIcon />
            <span>{toast}</span>
            <button
              aria-label="Dismiss notification"
              onClick={() => setToast("")}
            >
              <Cross2Icon />
            </button>
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}
