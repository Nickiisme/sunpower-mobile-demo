import { useMemo, useState } from "react";
import { ArchiveIcon, ArrowLeftIcon, BackpackIcon, CalendarIcon, CheckCircledIcon, ChevronDownIcon, ChevronRightIcon, Cross2Icon, ExclamationTriangleIcon, FileTextIcon, GearIcon, HomeIcon, LightningBoltIcon, MagnifyingGlassIcon, MinusIcon, PersonIcon, PlusIcon, RocketIcon, SewingPinIcon } from "@radix-ui/react-icons";
import { KeyboardInput as MobileTextField, MobileScroll, useKeyboard, useKeyboardInsets } from "./mobile";
import module515 from "./assets/module-515.png";
import module500 from "./assets/module-500.png";
import reserveKit from "./assets/reserve-kit.png";

type Tab = "home" | "warranty" | "leads" | "products" | "fieldops";
const tabs: { id: Tab; label: string; icon: React.ComponentType }[] = [
  { id: "home", label: "Home", icon: HomeIcon }, { id: "warranty", label: "Warranty", icon: FileTextIcon },
  { id: "leads", label: "Leads", icon: PersonIcon }, { id: "products", label: "Products", icon: BackpackIcon },
  { id: "fieldops", label: "Field Ops", icon: GearIcon },
];
function Header({ title, subtitle }: { title: string; subtitle?: string }) { return <header className="topbar"><div className="brand"><b>TCL</b><i />SUNPOWER</div><button className="avatar" aria-label="Profile">XW</button><div className="page-title"><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div></header>; }
function BottomNav({ tab, setTab, cartCount }: { tab: Tab; setTab: (t: Tab) => void; cartCount: number }) { const keyboard = useKeyboard(); const { bottomInset } = useKeyboardInsets(); return <nav className="bottom-nav" style={{ bottom: bottomInset }} aria-label="Main navigation">{tabs.map(({ id, label, icon: Icon }) => <button type="button" key={id} aria-current={tab === id ? "page" : undefined} className={tab === id ? "active" : ""} onClick={() => { keyboard.hide(); setTab(id); }}><span className="nav-icon"><Icon />{id === "products" && cartCount > 0 && <em>{cartCount}</em>}</span>{label}</button>)}</nav>; }
function HomeScreen({ go }: { go: (t: Tab) => void }) {
  const [showAllNews, setShowAllNews] = useState(false);
  const [selectedNews, setSelectedNews] = useState<string | null>(null);
  return <><Header title="Good morning, Xin" subtitle="Here’s your partner overview" /><section className="content home-content">
    <article className="hero-card"><span className="eyebrow">CURRENT TIER</span><div className="tier-head"><div className="tier-badge"><RocketIcon /></div><div><h2>Authorized</h2><p>100 kW / 5 kits achieved</p></div></div><div className="progress-label"><span>Progress to Premier</span><b>28%</b></div><div className="progress"><i /></div><div className="tier-stats"><span><b>112 kW</b>Installed</span><span><b>7</b>Kits</span><span><b>Jan 2027</b>Review</span></div></article>
    <h3 className="section-title">Quick actions</h3><div className="quick-grid"><button onClick={() => go("warranty")}><span className="quick-icon yellow"><FileTextIcon /></span><b>Register warranty</b><small>Protect a new install</small><ChevronRightIcon /></button><button onClick={() => go("leads")}><span className="quick-icon blue"><PersonIcon /></span><b>View leads</b><small>3 need your attention</small><ChevronRightIcon /></button></div>
    <div className="section-row"><h3 className="section-title">Upcoming</h3><button className="text-btn">View all</button></div><article className="event-card"><div className="date"><b>18</b><span>JUN</span></div><div><b>Partner Growth Workshop</b><p><CalendarIcon /> Online · 10:00 AM</p></div><ChevronRightIcon /></article>
    <div className="section-row news-heading"><h3 className="section-title">Latest news</h3><button className="text-btn" onClick={() => setShowAllNews(!showAllNews)}>{showAllNews ? "Show less" : "View all"}</button></div>
    <button className={`news-card ${selectedNews === "case-study" ? "selected" : ""}`} onClick={() => setSelectedNews(selectedNews === "case-study" ? null : "case-study")}>
      <img src={module515} alt="SunPower Performance 7 solar module" />
      <span className="news-copy"><span className="news-meta"><em>Latest news</em><time>21 Jul 2026</time></span><b>A winning match for sustainability</b><small>See how high-performance solar helps partners deliver more value.</small><span className="news-link">Read story <ChevronRightIcon /></span></span>
    </button>
    {showAllNews && <button className={`news-compact ${selectedNews === "product" ? "selected" : ""}`} onClick={() => setSelectedNews(selectedNews === "product" ? null : "product")}><span className="news-icon"><LightningBoltIcon /></span><span><em>Product update</em><b>New Performance 7 resources are ready</b><small>18 Jul 2026 · 3 min read</small></span><ChevronRightIcon /></button>}
    {selectedNews && <div className="news-feedback"><CheckCircledIcon /> Article preview opened</div>}
    <article className="support-card"><div className="support-icon"><PersonIcon /></div><div><b>Need partner support?</b><p>Our team usually replies within one day.</p></div><button>Contact</button></article>
  </section></>;
}
const warrantyRows = [{ serial: "SPR-460-0182", owner: "Sophie Martin", date: "22 Aug", status: "Completed" }, { serial: "SPR-515-0047", owner: "Pending owner", date: "12 Aug", status: "Submitted" }, { serial: "SP-RH-8831", owner: "Pending owner", date: "29 Jul", status: "Draft" }];
function WarrantyScreen() {
  const [filter, setFilter] = useState("All");
  const [registering, setRegistering] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState<"draft" | "sent" | null>(null);
  if (registering) return <div className="register-page">
    <header className="register-header"><button onClick={() => setRegistering(false)} aria-label="Back to warranty"><ArrowLeftIcon /></button><div><h1>Register warranty</h1><p>Complete homeowner information now or later.</p></div></header>
    <section className="register-form">
      {submitted && <div className="form-success"><CheckCircledIcon /><span><b>{submitted === "draft" ? "Warranty saved as draft" : "Request sent to homeowner"}</b><small>You can track it from the warranty list.</small></span></div>}
      <div className="form-section"><div className="form-section-title"><span>1</span><h2>Installation information</h2></div>
        <label className="form-field"><span>Installation date <em>*</em></span><div className="field-control"><MobileTextField placeholder="DD / MM / YYYY" aria-label="Installation date" /><CalendarIcon /></div></label>
        <label className="form-field"><span>Serial number <em>*</em></span><MobileTextField placeholder="Enter serial number" aria-label="Serial number" /></label>
        <div className="form-row"><label className="form-field"><span>Quantity <em>*</em></span><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><MinusIcon /></button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)}><PlusIcon /></button></div></label><label className="form-field"><span>Product name</span><div className="readonly-field">Auto-filled</div></label></div>
      </div>
      <div className="form-section"><div className="form-section-title"><span>2</span><h2>Homeowner information</h2></div>
        <label className="form-field"><span>Email <em>*</em></span><MobileTextField placeholder="Enter homeowner email" aria-label="Homeowner email" /></label>
        <div className="form-row"><label className="form-field"><span>Postal code</span><MobileTextField placeholder="Optional" aria-label="Postal code" /></label><label className="form-field"><span>City</span><MobileTextField placeholder="Optional" aria-label="City" /></label></div>
        <label className="form-field"><span>Country</span><button className="select-field">Select country <ChevronDownIcon /></button></label>
        <label className="form-field"><span>Detailed address</span><MobileTextField placeholder="Optional" aria-label="Detailed address" /></label>
        <button className={`consent ${consent ? "checked" : ""}`} onClick={() => setConsent(!consent)}><i>{consent && <CheckCircledIcon />}</i><span>I’ve informed the owner that their email will be shared with TCL SunPower Global.</span></button>
      </div>
      <div className="form-section"><div className="form-section-title"><span>3</span><h2>Lead information</h2></div><label className="form-field"><span>Related lead</span><button className="select-field">Select a lead (optional) <ChevronDownIcon /></button></label></div>
      <div className="form-actions"><button className="outline" onClick={() => setSubmitted("draft")}>Save as draft</button><button className="primary" disabled={!consent} onClick={() => setSubmitted("sent")}>Send to homeowner</button></div>
    </section>
  </div>;
  return <><Header title="Warranty" subtitle="Manage your registrations" /><section className="content"><div className="summary-strip"><span><b>3</b>Total</span><span><b>1</b>Draft</span><span><b>1</b>Submitted</span><span><b>1</b>Complete</span></div><button className="primary wide" onClick={() => setRegistering(true)}><PlusIcon /> Register warranty</button><div className="section-row"><h3 className="section-title">Recent registrations</h3><button className="filter-btn" onClick={() => setFilter(filter === "All" ? "Completed" : "All")}>{filter}<ChevronDownIcon /></button></div><div className="record-list">{warrantyRows.filter(r => filter === "All" || r.status === filter).map(r => <article className="record" key={r.serial}><div className="record-icon"><FileTextIcon /></div><div className="record-main"><b>{r.serial}</b><p>{r.owner} · Installed {r.date}</p></div><span className={`pill ${r.status.toLowerCase()}`}>{r.status}</span><ChevronRightIcon /></article>)}</div><button className="outline wide"><ArchiveIcon /> Bulk register</button></section></>;
}
function LeadsScreen() { const [query, setQuery] = useState(""); const leads = [{ name: "Emma Wilson", city: "Bristol", source: "Website", heat: "New" }, { name: "Noah Jensen", city: "Oslo", source: "Referral", heat: "Contacted" }, { name: "Clara Rossi", city: "Milan", source: "Campaign", heat: "Qualified" }].filter(l => l.name.toLowerCase().includes(query.toLowerCase())); return <><Header title="Leads" subtitle="New solar opportunities" /><section className="content"><div className="search"><MagnifyingGlassIcon /><MobileTextField value={query} onChange={e => setQuery(e.target.value)} placeholder="Search name or city" aria-label="Search leads" />{query && <button onClick={() => setQuery("")}><Cross2Icon /></button>}</div><div className="lead-overview"><span><b>12</b>Open leads</span><i /><span><b>3</b>New this week</span></div><div className="section-row"><h3 className="section-title">Lead inbox</h3><button className="filter-btn">All leads<ChevronDownIcon /></button></div><div className="lead-list">{leads.map((lead, i) => <article className="lead" key={lead.name}><div className="lead-avatar">{lead.name.split(" ").map(n => n[0]).join("")}</div><div><div className="lead-name"><b>{lead.name}</b><span className={`lead-state s${i}`}>{lead.heat}</span></div><p><SewingPinIcon /> {lead.city} · {lead.source}</p><small>Interested in residential solar + storage</small></div><ChevronRightIcon /></article>)}</div></section></>; }
const products = [{ id: 1, name: "Performance 7", model: "SPR-P7-515-BLK-P", meta: "515W · 1996 × 1134 mm", img: module515, stock: true }, { id: 2, name: "Performance 7", model: "SPR-P7-460-BLK", meta: "460W · 1790 × 1134 mm", img: module500, stock: true }, { id: 3, name: "Reserve Battery", model: "SP-RH-B5K-G1", meta: "5 kWh Li-ion storage", img: reserveKit, stock: false }];
function FieldOpsScreen() {
  const [mode, setMode] = useState<"install" | "operations">("operations");
  const installJobs = [
    { name: "Wilson Residence", detail: "Bristol · 8.2 kW + storage", state: "Commissioning", tone: "submitted" },
    { name: "Jensen Residence", detail: "Oslo · 10.3 kW", state: "Site survey", tone: "draft" },
    { name: "Rossi Residence", detail: "Milan · 6.9 kW + storage", state: "Ready", tone: "completed" },
  ];
  return <><Header title="Field operations" subtitle="Installation and system care" /><section className="content field-content">
    <div className="mode-tabs" role="tablist"><button className={mode === "install" ? "active" : ""} onClick={() => setMode("install")}><LightningBoltIcon /> Installation</button><button className={mode === "operations" ? "active" : ""} onClick={() => setMode("operations")}><GearIcon /> Operations</button></div>
    {mode === "install" ? <>
      <div className="ops-hero"><div><span>INSTALLATION PIPELINE</span><h2>3 active projects</h2><p>1 commissioning · 1 survey · 1 ready</p></div><button aria-label="Add installation"><PlusIcon /></button></div>
      <div className="section-row"><h3 className="section-title">Today’s work</h3><button className="text-btn">View map</button></div>
      <div className="job-list">{installJobs.map(job => <article className="job-card" key={job.name}><div className="job-icon"><LightningBoltIcon /></div><div><b>{job.name}</b><p>{job.detail}</p></div><span className={`pill ${job.tone}`}>{job.state}</span><ChevronRightIcon /></article>)}</div>
      <button className="primary wide"><PlusIcon /> Create installation</button>
    </> : <>
      <article className="system-card"><div className="card-head"><b>Systems overview</b><ChevronRightIcon /></div><div className="system-total"><b>28</b><span>Number of systems</span></div><div className="health-bar"><i /><i /><i /></div><div className="health-stats"><span><b>24</b><i className="green" />Normal</span><span><b>2</b><i className="red" />Alerts</span><span><b>2</b><i className="gray" />Offline</span></div></article>
      <article className="alert-card"><div className="card-head"><b>Alerts</b><button>View all <ChevronRightIcon /></button></div><div className="alert-body"><div className="alert-mark"><ExclamationTriangleIcon /><b>2</b><small>Active alerts</small></div><div className="alert-levels"><span><i className="red" /><b>Emergency</b><strong>1</strong></span><span><i className="orange" /><b>Major</b><strong>1</strong></span><span><i className="yellow-dot" /><b>Minor</b><strong>0</strong></span></div></div></article>
      <h3 className="section-title">Systems needing attention</h3>
      <article className="attention-card"><span className="attention-icon"><ExclamationTriangleIcon /></span><div><b>Jensen Residence</b><p>Battery communication interrupted</p></div><span className="pill draft">Major</span><ChevronRightIcon /></article>
    </>}
  </section></>;
}
function ProductsScreen({ cart, setCart }: { cart: Record<number, number>; setCart: React.Dispatch<React.SetStateAction<Record<number, number>>> }) {
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"catalog" | "cart" | "orders">("catalog");
  const [orderFilter, setOrderFilter] = useState<"All" | "Delivered">("All");
  const items = useMemo(() => products.filter(p => (p.name + p.model).toLowerCase().includes(query.toLowerCase())), [query]);
  const count = Object.values(cart).reduce((a,b) => a+b,0);
  const change = (id:number, delta:number) => setCart(c => ({...c, [id]: Math.max(0,(c[id] || 0)+delta)}));
  const orders = [
    { id: "SP-2026-0188", date: "12 Sep 2026", status: "Delivered", total: "€12,480", detail: "Performance 7 · 2 pallets" },
    { id: "SP-2026-0141", date: "28 Aug 2026", status: "In transit", total: "€8,950", detail: "Reserve Battery · 3 units" },
    { id: "SP-2026-0096", date: "11 Jul 2026", status: "Delivered", total: "€18,720", detail: "Performance 7 · 3 pallets" },
  ];
  if (view === "orders") return <><Header title="Purchase history" subtitle="Track previous product orders" /><section className="content order-content">
    <button className="back-link" onClick={() => setView("catalog")}><ArrowLeftIcon /> Back to products</button>
    <div className="order-summary"><span><b>3</b>Orders</span><span><b>€40,150</b>Total purchased</span></div>
    <div className="section-row"><h3 className="section-title">Order history</h3><button className="filter-btn" onClick={() => setOrderFilter(orderFilter === "All" ? "Delivered" : "All")}>{orderFilter}<ChevronDownIcon /></button></div>
    <div className="order-list">{orders.filter(order => orderFilter === "All" || order.status === orderFilter).map(order => <button className="order-card" key={order.id}>
      <span className="order-icon"><ArchiveIcon /></span><span className="order-main"><span><b>{order.id}</b><em className={order.status === "Delivered" ? "delivered" : "transit"}>{order.status}</em></span><small>{order.date}</small><p>{order.detail}</p></span><span className="order-total"><b>{order.total}</b><ChevronRightIcon /></span>
    </button>)}</div>
  </section></>;
  if (view === "cart") return <><Header title="Request cart" subtitle={`${count} pallet${count === 1 ? "" : "s"} selected`} /><section className="content"><button className="back-link" onClick={() => setView("catalog")}><ArrowLeftIcon /> Continue shopping</button>{count === 0 ? <div className="empty"><BackpackIcon /><h3>Your cart is empty</h3><p>Add products to start a price request.</p></div> : <>{products.filter(p => cart[p.id]).map(p => <article className="cart-item" key={p.id}><img src={p.img}/><div><b>{p.name}</b><small>{p.model}</small></div><div className="stepper"><button onClick={() => change(p.id,-1)}><MinusIcon /></button><b>{cart[p.id]}</b><button onClick={() => change(p.id,1)}><PlusIcon /></button></div></article>)}<div className="request-note"><CheckCircledIcon /><span><b>Price request ready</b><small>Our team will confirm stock and pricing.</small></span></div><button className="primary wide" onClick={() => alert("Price request submitted")}>Submit price request</button></>}</section></>;
  return <><Header title="Products" subtitle="Build your next solar project" /><section className="content product-content">
    <div className="product-tools"><button onClick={() => setView("orders")}><ArchiveIcon /><span><b>Purchase history</b><small>View orders and delivery status</small></span><ChevronRightIcon /></button><button className="tool-cart" onClick={() => setView("cart")}><BackpackIcon /><span><b>Request cart</b><small>{count ? `${count} selected` : "No items yet"}</small></span>{count > 0 && <em>{count}</em>}<ChevronRightIcon /></button></div>
    <div className="search"><MagnifyingGlassIcon /><MobileTextField value={query} onChange={e => setQuery(e.target.value)} placeholder="Search model or product" aria-label="Search products" /></div><div className="chip-row"><button className="selected">All</button><button>Solar panels</button><button>Storage</button></div>
    <div className="section-row"><h3 className="section-title">Available products</h3></div><div className="product-list">{items.map(p => <article className="product-card" key={p.id}><div className="product-image"><span>SUNPOWER</span>{p.stock && <em>IN STOCK</em>}<img src={p.img} alt={p.name}/></div><div className="product-info"><small>{p.name}</small><h3>{p.model}</h3><p>{p.meta}</p><div><span className={p.stock ? "stock" : "no-stock"}>{p.stock ? "Available now" : "Check availability"}</span><button className={cart[p.id] ? "added" : ""} onClick={() => change(p.id,1)}>{cart[p.id] ? <><CheckCircledIcon /> {cart[p.id]} added</> : <><PlusIcon /> Add</>}</button></div></div></article>)}</div>
  </section></>;
}
export default function Prototype() { const [tab, setTab] = useState<Tab>("home"); const [cart, setCart] = useState<Record<number, number>>({}); const cartCount = Object.values(cart).reduce((a,b) => a+b,0); return <div className="sunpower-app" data-build="pages-frame-path-v2"><MobileScroll className="app-screen"><main className="app-main">{tab === "home" && <HomeScreen go={setTab} />}{tab === "warranty" && <WarrantyScreen />}{tab === "leads" && <LeadsScreen />}{tab === "products" && <ProductsScreen cart={cart} setCart={setCart} />}{tab === "fieldops" && <FieldOpsScreen />}</main></MobileScroll><BottomNav tab={tab} setTab={setTab} cartCount={cartCount}/></div>; }
