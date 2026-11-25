import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Layers,
  ArrowRight,
  Calendar,
  Mail,
  Phone,
  RotateCcw,
  Send,
  ChevronRight,
  X,
  FileText,
  Download,
  TrendingUp,
  Quote,
  Cpu,
  FileSpreadsheet,
  Lock,
} from 'lucide-react';

// --- SCROLL REVEAL WRAPPER ---
const Reveal = ({ children, delay = 0, className = '' }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- MICRO-INTERACTION 1: MOUSE-TRACKING ROYAL BLUE SPOTLIGHT CARD ---
const SpotlightCard = ({ children, className = '' }) => {
  const cardRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(37, 99, 235, 0.16), transparent 45%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
};

// --- MICRO-INTERACTION 2: SCROLL-TRIGGERED COUNT-UP METRIC ---
const AnimatedMetric = ({
  target,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1400,
}) => {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(eased * target);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };
    window.requestAnimationFrame(step);
  }, [started, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
};

// --- DATA: SEAMLESS PAYER & PORTAL TICKER ITEMS ---
const MARQUEE_ITEMS = [
  'AVAILITY CLEARINGHOUSE',
  'UNITEDHEALTHCARE (UHC)',
  'EVERNORTH / CIGNA',
  'BLUE SHIELD / BCBS OF CA',
  'NAVINET PORTAL',
  'ZELIS PAYMENTS',
  'PAYSPAN REMITTANCE',
  'OPTUM PAY ERA',
  'STRIPE VIRTUAL CARDS (VCC)',
  'ECHO HEALTH',
  'INSTAMED',
  'ANSI X12 EDI 835 / 837',
  'HIPAA & BAA COMPLIANT',
];

// --- DATA: 5 HEALTHCARE PROVIDER LINES OF BUSINESS ---
const HEALTHCARE_LOBS = [
  {
    id: 'claims',
    code: 'LOB 01',
    title: 'Claims Management & Denial Resolution',
    tagline:
      'End-to-end clean claim lifecycle, CARC/RARC root-cause audits & appeals',
    metric: '99.2% Clean Claim Rate',
    summary:
      'Extensive provider-side expertise managing high-volume medical claims across 90% of US commercial payers. Experienced leading a team of 10 Claims specialists as SME & Team Leader—resolving complex rejections, corrected claims, timely filing disputes, and medical necessity appeals.',
    deliverables: [
      'Scrubbing CMS-1500 & UB-04 claims for CPT, ICD-10, modifier, and POS accuracy prior to clearinghouse submission',
      'Root-cause analysis & appeal packet assembly for CO-16, CO-197, CO-29, CO-50, and PR-1/2/3 adjustments',
      'AR aging follow-up (30/60/90/120+ days) via payer portals and provider rep escalations',
      'Daily QA audits, coaching calibrations, and SOP playbooks built from Team Leader & SME experience',
    ],
    portals: ['Availity', 'UHC Provider', 'Evernorth', 'BCBS of CA', 'NaviNet'],
  },
  {
    id: 'eligibility',
    code: 'LOB 02',
    title: 'Insurance Eligibility & Benefits Verification',
    tagline:
      'Real-time coverage checks, deductible/OOP breakdown & COB validation',
    metric: '100% Pre-Visit Verification',
    summary:
      'Preventing front-end claim denials before the patient ever steps into the clinic or joins a telehealth session. Deep familiarity verifying active commercial plans, behavioral health carve-outs, and coordination of benefits.',
    deliverables: [
      'Same-day & 72-hour advance verification of active policy status, effective dates, and plan exclusions',
      'Accurate calculation of remaining deductibles, copays, coinsurance %, and out-of-pocket maximums',
      'In-network vs. out-of-network benefit checks and secondary payer Coordination of Benefits (COB)',
      'Clear EHR financial notes so front-desk teams collect accurate patient responsibility upfront',
    ],
    portals: ['Availity', 'UHC Provider', 'Evernorth', 'BCBS of CA', 'NaviNet'],
  },
  {
    id: 'auth',
    code: 'LOB 03',
    title: 'Prior Authorizations & Referrals',
    tagline:
      'Timely clinical auth submissions, status tracking & renewal alerts',
    metric: '48-Hr Avg Auth Turnaround',
    summary:
      'Zero missed revenue from unapproved visits or expired authorization windows. Managing initial prior auth requests, clinical documentation uploads, peer-to-peer scheduling, and unit-exhaustion tracking.',
    deliverables: [
      'Determining CPT-specific prior authorization & referral requirements across US commercial plans',
      'Submitting clinical notes, treatment plans, and medical necessity forms via payer portals',
      'Proactive tracking of approved visit units and expiration dates to trigger timely re-authorizations',
      'Immediate escalation of pended or denied auth requests to prevent treatment interruption',
    ],
    portals: ['Availity', 'Evernorth', 'UHC Provider', 'BCBS of CA', 'NaviNet'],
  },
  {
    id: 'cashposting',
    code: 'LOB 04',
    title: 'Cash Posting (EOB / ERA / EDI 835)',
    tagline:
      'Zero-variance remittance reconciliation across clearinghouses & payer portals',
    metric: '$0.00 Daily Variance',
    summary:
      'Precision payment posting across automated EDI 835 files, electronic remittance advice (ERA), and manual paper/PDF EOBs—ensuring contractual adjustments, takebacks, and patient balances are balanced to the penny.',
    deliverables: [
      'Downloading, parsing, and posting EDI 835 / ERA files and line-item manual EOBs into Practice Management systems',
      'Validating contracted fee schedules, CO-45 contractual write-offs, recoupments, and sequestration adjustments',
      'Matching EFT bank deposits against remittance batch totals for daily end-of-day reconciliation',
      'Flagging underpayments and zero-pay lines immediately into the denial recovery queue',
    ],
    portals: [
      'Zelis',
      'Payspan',
      'Optum Pay',
      'UHC Portal',
      'Echo Health',
      'InstaMed',
    ],
  },
  {
    id: 'vcc',
    code: 'LOB 05',
    title: 'Virtual Card (VCC) & Stripe Payment Posting',
    tagline:
      'Multi-payer single-use virtual card processing & merchant batch settlement',
    metric: 'Same-Day VCC Settlement',
    summary:
      'Specialized hands-on experience processing single-use Virtual Credit Cards (VCC) issued by multiple US health insurers through Stripe, reconciling merchant payouts with EOB line items without batch discrepancies.',
    deliverables: [
      'Retrieving single-use payer virtual card credentials from EOBs, fax remittances, and payer portals',
      'Processing multi-payer virtual card payments accurately via Stripe terminal/dashboard',
      'Cross-matching Stripe payout batches against patient-level EOBs across UHC, Optum, Aetna, Cigna, and BCBS plans',
      'Maintaining clean audit trails for merchant fees, split payments, and multi-claim remittances',
    ],
    portals: [
      'Stripe VCC',
      'Optum Pay',
      'Zelis',
      'Echo Health',
      'InstaMed',
      'Payspan',
    ],
  },
];

// --- DATA: QUANTIFIED RCM CASE STUDIES / WINS ---
const CASE_STUDIES = [
  {
    tag: 'CLAIMS & QA LEADERSHIP',
    target: 99.2,
    prefix: '',
    suffix: '%',
    decimals: 1,
    title: 'First-Pass Clean Claim Rate',
    context: '10-Specialist Claims Team • Multi-State Commercial Payers',
    detail:
      'Standardized pre-submission CPT/modifier scrubbing checklists and daily QA calibrations as Claims SME & Team Leader—cutting front-end clearinghouse rejections across UHC, Aetna, Cigna, and BCBS.',
  },
  {
    tag: 'AR AGING RECOVERY',
    target: 34,
    prefix: '-',
    suffix: '%',
    decimals: 0,
    title: 'Reduction in >90-Day Aged AR',
    context: 'High-Volume Outpatient & Behavioral Health Provider Accounts',
    detail:
      'Executed structured 30/60/90+ aging workqueues targeting CO-16, CO-197, and CO-29 denials—converting stalled commercial balances into settled EFT/ERA reimbursements.',
  },
  {
    tag: 'REMITTANCE & STRIPE VCC',
    target: 0.0,
    prefix: '$',
    suffix: '',
    decimals: 2,
    title: 'Unreconciled Daily Batch Variance',
    context: 'EDI 835, Zelis, Payspan, Optum Pay & Stripe Virtual Cards',
    detail:
      'Reconciled daily multi-payer virtual card charges on Stripe alongside automated ERA/835 and manual EOB postings with full line-item CO-45 and patient responsibility accuracy.',
  },
  {
    tag: 'AUTHORIZATIONS & ELIGIBILITY',
    target: 48,
    prefix: '< ',
    suffix: ' Hrs',
    decimals: 0,
    title: 'Prior Auth & Benefits Turnaround',
    context: 'Availity, Evernorth, NaviNet & Commercial Payer Portals',
    detail:
      'Eliminated unapproved-visit write-offs by verifying active deductibles/COB 72 hours ahead of service and tracking remaining authorized visit units proactively.',
  },
];

// --- DATA: EHR/PM, CODING & COMPLIANCE MATRIX ---
const SYSTEMS_MATRIX = [
  {
    category: 'EHR & Practice Management Fluency',
    subtitle: 'Rapid onboarding across leading US clinical & billing platforms',
    items: [
      'eClinicalWorks (eCW)',
      'Athenahealth',
      'Kareo / Tebra',
      'NextGen Healthcare',
      'AdvancedMD',
      'DrChrono',
      'SimplePractice',
      'Office Ally / Practice Mate',
    ],
  },
  {
    category: 'Coding, Billing & ANSI X12 Standards',
    subtitle: 'Accurate claim scrubbing, modifiers & remittance interpretation',
    items: [
      'CMS-1500 & UB-04',
      'ICD-10-CM Diagnosis',
      'CPT-4 & HCPCS Level II',
      'Modifiers (25, 59, 95, GT, GQ)',
      'ANSI X12 837P / 835 ERA',
      '270/271 Eligibility & 277CA',
      'CARC / RARC Denial Codes',
      'COB & Fee Schedule Audits',
    ],
  },
  {
    category: 'HIPAA Governance & Remote Security',
    subtitle: 'Enterprise BPO security habits built since 2014',
    items: [
      'HIPAA Privacy & Security',
      'BAA & NDA Compliance',
      'Encrypted VPN & 2FA Access',
      'Clean-Desk PHI Protocol',
      'Audit-Ready Documentation',
      'US EST / PST Shift Coverage',
    ],
  },
];

// --- DATA: FLEXIBLE ENGAGEMENT MODELS ---
const ENGAGEMENT_MODELS = [
  {
    badge: 'MOST POPULAR FOR CLINICS',
    title: 'Dedicated Full-Time Medical VA & RCM Specialist',
    schedule: '40 Hrs / Week • US EST or PST Aligned',
    description:
      'Complete daily ownership of your clinic’s end-to-end revenue cycle—from pre-visit eligibility and prior authorizations to clean claim submission, denial appeals, and daily EDI 835 / Stripe VCC cash posting.',
    highlights: [
      'Dedicated single-client focus during your exact US clinic hours',
      'End-to-end coverage across all 5 Healthcare Provider LOBs',
      'Daily EOD production summary & cash reconciliation tracker',
    ],
  },
  {
    badge: 'TARGETED CASH ACCELERATION',
    title: 'Part-Time AR, Denial Recovery & Cash Posting Lead',
    schedule: '20 Hrs / Week • Flexible US Overlap',
    description:
      'Ideal for growing practices or billing agencies needing an experienced SME to clear aged >60/90-day AR backlogs, resolve stubborn CARC denials, or balance Stripe Virtual Card & ERA remittances.',
    highlights: [
      'Rapid audit & cleanup of aging commercial insurance claims',
      'Zero-variance EOB/ERA/835 & multi-payer VCC settlement',
      'Immediate plug-in with zero hand-holding required',
    ],
  },
  {
    badge: 'FOR BILLING AGENCIES & TEAMS',
    title: 'Claims QA & RCM Team Lead Consultant',
    schedule: 'Project-Based or Retainer Advisory',
    description:
      'Leverage my experience leading a 10-specialist Claims team to audit your current billing workflows, build payer-specific SOP playbooks, and train junior VAs on 90% of US commercial payers.',
    highlights: [
      'Pre-submission claim QA audits to boost first-pass clean rates',
      'Custom SOP playbooks for Availity, UHC, Evernorth & BCBS',
      'Root-cause denial trend reporting & staff calibration',
    ],
  },
];

// --- DATA: LEADERSHIP & OPERATIONS ENDORSEMENTS ---
const ENDORSEMENTS = [
  {
    quote:
      'Jayson was our go-to Subject Matter Expert whenever complex commercial payer rejections or EDI 835 variances hit the floor. Leading a 10-specialist Claims team, he consistently kept quality scores above 99% while mentoring newer analysts.',
    author: 'Operations Delivery Manager',
    role: 'US Healthcare Provider BPO Account',
  },
  {
    quote:
      'Rarely do you find a specialist equally comfortable navigating Availity and Evernorth for prior authorizations as they are reconciling multi-payer Stripe virtual cards and Zelis remittances down to the penny.',
    author: 'Senior RCM Process Lead',
    role: 'Commercial Claims & Cash Posting Division',
  },
  {
    quote:
      'Since 2014, Jayson has demonstrated rock-solid US shift dependability, clear written documentation, and zero-shortcut HIPAA discipline. Any US clinic or billing group onboarding him gains an immediate operational leader.',
    author: 'Account Quality & Training Supervisor',
    role: 'Healthcare Provider Operations',
  },
];

// --- DATA: INTERACTIVE SIMULATOR ROWS ---
const REMITTANCE_BATCHES = [
  {
    id: 'REM-835-904',
    channel: 'EDI 835 / ERA',
    payer: 'UnitedHealthcare / Optum Pay',
    trace: 'EFT-9948201',
    billed: '$4,850.00',
    allowed: '$3,920.00',
    paid: '$3,640.00',
    adj: 'CO-45 ($930.00) | PR-2 ($280.00)',
    variance: '$0.00',
    status: 'Reconciled & Posted',
  },
  {
    id: 'VCC-STR-418',
    channel: 'Virtual Card (Stripe)',
    payer: 'Aetna Commercial (Zelis VCC)',
    trace: 'ch_3Q9xR2StripeVCC',
    billed: '$2,160.00',
    allowed: '$1,840.00',
    paid: '$1,840.00',
    adj: 'CO-45 ($320.00) | PR-1 ($0.00)',
    variance: '$0.00',
    status: 'Settled on Stripe',
  },
  {
    id: 'VCC-STR-422',
    channel: 'Virtual Card (Stripe)',
    payer: 'Evernorth / Cigna (Echo VCC)',
    trace: 'ch_3Q9yM8StripeVCC',
    billed: '$3,400.00',
    allowed: '$2,890.00',
    paid: '$2,650.00',
    adj: 'CO-45 ($510.00) | PR-3 ($240.00)',
    variance: '$0.00',
    status: 'Settled on Stripe',
  },
  {
    id: 'EOB-MAN-119',
    channel: 'Manual EOB',
    payer: 'BCBS of California (Payspan)',
    trace: 'CHK-0084192',
    billed: '$1,950.00',
    allowed: '$1,620.00',
    paid: '$1,620.00',
    adj: 'CO-45 ($330.00) | Deductible Met',
    variance: '$0.00',
    status: 'Reconciled & Posted',
  },
];

const DENIAL_CODES = [
  {
    code: 'CO-197',
    label: 'Precertification / Authorization Absent',
    rootCause:
      'Service billed without active prior authorization number on file or visit exceeded approved unit count.',
    resolution:
      'Audit payer portal (Availity/Evernorth/UHC) for retro-auth eligibility, attach approved auth reference in Box 23, or submit clinical medical necessity reconsideration within payer window.',
  },
  {
    code: 'CO-16',
    label: 'Claim Lacks Information / Submission Error',
    rootCause:
      'Missing rendering NPI, invalid modifier pairing, or mismatched subscriber group ID.',
    resolution:
      'Cross-verify eligibility snapshot against CMS-1500 fields, append corrected modifier/NPI, and transmit corrected claim (Frequency Code 7) electronically.',
  },
  {
    code: 'CO-29',
    label: 'Time Limit for Filing Has Expired',
    rootCause:
      'Payer rejected claim past timely filing threshold despite prior clearinghouse transmission.',
    resolution:
      'Pull initial clearinghouse 277CA acceptance timestamp as proof of timely submission and file formal timely-filing appeal via payer dispute portal.',
  },
  {
    code: 'PR-1 / PR-2',
    label: 'Deductible / Coinsurance Allocation Audit',
    rootCause:
      'Payer applied remaining balance to patient deductible/coinsurance; requires verification against secondary plan.',
    resolution:
      'Validate benefits accumulation on payer portal; if secondary coverage exists, generate secondary claim with primary EOB/835 attached, else release accurate patient statement.',
  },
];

const SKILL_PILLS = [
  'Claims Scrubbing & Appeals',
  'EDI 835 / ERA Auto-Posting',
  'Stripe Virtual Card Posting',
  'Prior Authorizations',
  'Real-Time Eligibility (270/271)',
  'SME & Team Leadership (10 Staff)',
  'Availity & NaviNet',
  'Zelis • Payspan • Optum Pay',
  'UHC • Evernorth • BCBS CA',
  'Echo Health & InstaMed',
  'AR Aging Recovery',
  'HIPAA-Compliant SOPs',
];

// --- HELPER: NEXT 7 BUSINESS DAYS FOR DISCOVERY CALL PICKER ---
const getUpcomingBusinessDays = (count = 7) => {
  const days = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (days.length < count) {
    const dayOfWeek = d.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      days.push({
        iso: d.toISOString().split('T')[0],
        weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
        monthDay: d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
        fullLabel: d.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
        }),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
};

const TIME_SLOTS_BY_TZ = {
  EST: ['9:00 AM', '9:30 AM', '10:30 AM', '11:30 AM', '1:00 PM', '2:00 PM'],
  PST: ['8:00 AM', '8:30 AM', '9:30 AM', '10:30 AM', '12:00 PM', '1:00 PM'],
};

export default function App() {
  const [activeLob, setActiveLob] = useState(HEALTHCARE_LOBS[0]);
  const [labTab, setLabTab] = useState('remittance');
  const [remitFilter, setRemitFilter] = useState('ALL');
  const [selectedDenial, setSelectedDenial] = useState(DENIAL_CODES[0]);
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [badgeTilt, setBadgeTilt] = useState({ x: 0, y: 0 });
  const [physicsKey, setPhysicsKey] = useState(0);
  const [copiedField, setCopiedField] = useState('');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [modalSent, setModalSent] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  const availableDates = getUpcomingBusinessDays(7);
  const [bookingName, setBookingName] = useState('');
  const [bookingCompany, setBookingCompany] = useState('');
  const [bookingTz, setBookingTz] = useState('EST');
  const [bookingTopic, setBookingTopic] = useState('Claims & Denial Management');
  const [selectedDate, setSelectedDate] = useState(availableDates[0]?.iso || '');
  const [selectedTime, setSelectedTime] = useState('9:30 AM');

  const [badgeDropKey, setBadgeDropKey] = useState(0);
  const [badgeHovered, setBadgeHovered] = useState(false);

  const buildGoogleCalendarUrl = () => {
    const ZOOM_LINK = 'https://us05web.zoom.us/j/8101118172?pwd=lnTgoopeOIbHaG2jryWdOGwRHOmcZP.1';
    const chosenDay =
      availableDates.find((d) => d.iso === selectedDate) || availableDates[0];
    const [timePart, meridiem] = selectedTime.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (meridiem === 'PM' && hours !== 12) hours += 12;
    if (meridiem === 'AM' && hours === 12) hours = 0;

    // Convert US EST (-05:00) or PST (-08:00) to UTC for Google Calendar
    const tzOffset = bookingTz === 'EST' ? 5 : 8;
    const [year, month, day] = chosenDay.iso.split('-').map(Number);
    const startUtc = new Date(
      Date.UTC(year, month - 1, day, hours + tzOffset, minutes, 0)
    );
    const endUtc = new Date(startUtc.getTime() + 15 * 60000);

    const fmt = (dt) =>
      dt.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const title = encodeURIComponent(
      `15-Min RCM Discovery Call: ${bookingName || 'Client'} x Jayson Abrio`
    );
    const location = encodeURIComponent(ZOOM_LINK);
    const details = encodeURIComponent(
      `Join Zoom Meeting: ${ZOOM_LINK}\n` +
        `Meeting ID: 810 111 8172\n\n` +
        `Client: ${bookingName || 'N/A'}\n` +
        `Clinic / Agency: ${bookingCompany || 'N/A'}\n` +
        `Focus Area: ${bookingTopic}\n` +
        `Scheduled Slot: ${chosenDay.fullLabel} at ${selectedTime} ${bookingTz}`
    );

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${fmt(
      startUtc
    )}/${fmt(endUtc)}&location=${location}&details=${details}&add=abrjayso114114@gmail.com`;
  };
  const roles = [
    'Healthcare RCM Subject Matter Expert (SME)',
    'Claims Team Leader (10-Specialist Team)',
    'Cash Posting, EDI 835 & Stripe VCC Specialist',
    'Medical Virtual Assistant (90% US Commercial Payers)',
  ];

  // Auto re-drop lanyard gently every 40 seconds unless hovered
  useEffect(() => {
    if (badgeHovered) return;
    const interval = setInterval(() => {
      setBadgeDropKey((prev) => prev + 1);
    }, 40000);
    return () => clearInterval(interval);
  }, [badgeHovered]);

  // Typewriter Effect
  useEffect(() => {
    const current = roles[roleIndex];
    const speed = isDeleting ? 28 : 52;
    const timer = setTimeout(() => {
      if (!isDeleting && typedText === current) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && typedText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setTypedText(
          isDeleting
            ? current.substring(0, typedText.length - 1)
            : current.substring(0, typedText.length + 1)
        );
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, roleIndex]);

  // 3D Lanyard Tilt Handler
  const handleBadgeMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setBadgeTilt({ x, y });
  };

  const copyText = (value, key) => {
    navigator.clipboard.writeText(value);
    setCopiedField(key);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const filteredBatches =
    remitFilter === 'ALL'
      ? REMITTANCE_BATCHES
      : REMITTANCE_BATCHES.filter((b) =>
          b.channel.toLowerCase().includes(remitFilter.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-[#2563EB] selection:text-white font-sans">
      {/* Subtle Architectural Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #2563EB 1px, transparent 1px), linear-gradient(to bottom, #2563EB 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* TOP NAVIGATION */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#050505]/85 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2.5 shrink-0">
            <span className="w-8 h-8 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/40 flex items-center justify-center text-xs font-bold text-[#60A5FA]">
              JA
            </span>
            <span className="font-semibold tracking-tight text-white">
              jayson<span className="text-[#2563EB]">.rcm</span>
            </span>
          </a>

          <nav className="hidden xl:flex items-center gap-5 text-xs font-medium text-zinc-400">
            <a href="#lobs" className="hover:text-[#60A5FA] transition">
              5 Healthcare LOBs
            </a>
            <a href="#results" className="hover:text-[#60A5FA] transition">
              RCM Outcomes
            </a>
            <a href="#systems" className="hover:text-[#60A5FA] transition">
              EHR & Coding
            </a>
            <a href="#lab" className="hover:text-[#60A5FA] transition">
              Workflow Lab
            </a>
            <a href="#services" className="hover:text-[#60A5FA] transition">
              VA Engagement
            </a>
            <a href="#contact" className="hover:text-[#60A5FA] transition">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setResumeOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs font-medium text-zinc-200 hover:border-[#2563EB] hover:text-[#60A5FA] transition cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#2563EB]" />
              Resume (PDF)
            </button>
            <button
              onClick={() => {
                setModalSent(false);
                setBookingOpen(true);
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white font-semibold text-xs hover:brightness-110 transition shadow-lg shadow-[#2563EB]/20 cursor-pointer"
            >
              Book Discovery Call
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION WITH 3D LANYARD BADGE */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Editorial Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono tracking-wider text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-[#2563EB] animate-pulse" />
              90% US COMMERCIAL PAYERS • HIPAA & BAA READY • US EST / PST SHIFT
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight leading-[1.08] text-white">
              Healthcare <span className="text-[#60A5FA]">RCM</span>
              <br />
              Operations Specialist &
              <br />
              Medical VA
            </h1>

            <div className="h-7 flex items-center font-mono text-sm sm:text-base text-[#60A5FA]">
              <span className="mr-2 text-zinc-500">&gt;</span>
              <span>{typedText}</span>
              <span className="ml-0.5 w-0.5 h-5 bg-[#60A5FA] animate-pulse" />
            </div>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              I’m <strong className="text-white">Jayson Abrio</strong>—a
              seasoned BPO professional since{' '}
              <strong className="text-[#60A5FA]">2014</strong> with{' '}
              <strong className="text-[#60A5FA]">7+ solid years</strong> on the
              US Healthcare Provider side. Having served as an{' '}
              <strong className="text-white">
                RCM Subject Matter Expert (SME) & Team Leader
              </strong>{' '}
              managing{' '}
              <strong className="text-[#60A5FA]">10 Claims specialists</strong>,
              I deliver end-to-end ownership across Claims, Eligibility, Prior
              Authorizations, EOB/ERA/EDI 835 Cash Posting, and Multi-Payer
              Virtual Card Posting on Stripe.
            </p>

            {/* Payer & Remittance Portal Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Availity',
                'UHC',
                'Evernorth',
                'BCBS of CA',
                'NaviNet',
                'Zelis',
                'Payspan',
                'Optum Pay',
                'Stripe VCC',
                'Echo Health',
                'InstaMed',
              ].map((portal) => (
                <span
                  key={portal}
                  className="px-2.5 py-1 rounded-md bg-[#0F0F12] border border-zinc-800 text-xs font-mono text-zinc-300 hover:border-[#2563EB]/50 hover:text-[#60A5FA] transition"
                >
                  {portal}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => {
                  setModalSent(false);
                  setBookingOpen(true);
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white font-semibold text-sm hover:brightness-110 transition shadow-xl shadow-[#2563EB]/25 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                Book a Free 15-Min Discovery Call
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-900 border border-[#2563EB]/40 text-[#60A5FA] font-medium text-sm hover:bg-[#2563EB]/10 transition cursor-pointer"
              >
                <Download className="w-4 h-4" />
                View / Save Resume (PDF)
              </button>
            </div>

            {/* 4 Executive KPI Cards with Count-Up Animation */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <SpotlightCard className="p-4 rounded-xl bg-[#0F0F12] border border-zinc-800/90 hover:border-[#2563EB]/40 transition">
                <div className="text-xl sm:text-2xl font-bold text-[#60A5FA]">
                  Since 2014
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                  12+ Yrs BPO Industry Tenure
                </div>
              </SpotlightCard>
              <SpotlightCard className="p-4 rounded-xl bg-[#0F0F12] border border-zinc-800/90 hover:border-[#2563EB]/40 transition">
                <div className="text-xl sm:text-2xl font-bold text-[#60A5FA]">
                  <AnimatedMetric target={7} suffix="+ Yrs" />
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                  US Healthcare Provider Side
                </div>
              </SpotlightCard>
              <SpotlightCard className="p-4 rounded-xl bg-[#0F0F12] border border-zinc-800/90 hover:border-[#2563EB]/40 transition">
                <div className="text-xl sm:text-2xl font-bold text-[#60A5FA]">
                  <AnimatedMetric target={10} suffix=" Experts" />
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                  Claims Team Led as SME/TL
                </div>
              </SpotlightCard>
              <SpotlightCard className="p-4 rounded-xl bg-[#0F0F12] border border-zinc-800/90 hover:border-[#2563EB]/40 transition">
                <div className="text-xl sm:text-2xl font-bold text-[#60A5FA]">
                  <AnimatedMetric target={90} suffix="%" />
                </div>
                <div className="text-[11px] text-zinc-400 mt-1 leading-snug">
                  US Commercial Payers Covered
                </div>
              </SpotlightCard>
            </div>
          </div>

          {/* Right Column: Interactive 3D Swinging & Dropping Lanyard ID Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              key={badgeDropKey}
              onClick={() => setBadgeDropKey((prev) => prev + 1)}
              onMouseEnter={() => setBadgeHovered(true)}
              onMouseLeave={() => {
                setBadgeHovered(false);
                setBadgeTilt({ x: 0, y: 0 });
              }}
              title="Click badge to replay lanyard drop"
              className="animate-lanyard-drop flex flex-col items-center w-full cursor-pointer"
            >
              {/* Lanyard Strap */}
              <div className="w-6 h-12 bg-gradient-to-b from-zinc-800 to-[#2563EB]/40 border-x border-[#2563EB]/40 rounded-t-sm flex items-center justify-center">
                <span className="text-[8px] font-mono tracking-widest text-[#60A5FA] -rotate-90 whitespace-nowrap">
                  RCM • SME
                </span>
              </div>
              {/* Metal Clip */}
              <div className="w-10 h-3 rounded-sm bg-zinc-700 border border-zinc-500 shadow-md -mt-0.5 z-10" />

              {/* 3D Tilt Credential Card */}
              <div
                onMouseMove={handleBadgeMove}
                style={{
                  transform: `perspective(1000px) rotateY(${badgeTilt.x}deg) rotateX(${badgeTilt.y}deg)`,
                  transition: 'transform 180ms ease-out',
                }}
                className="w-full max-w-[360px] -mt-1 rounded-2xl bg-gradient-to-b from-[#141418] to-[#0B0B0E] border border-[#2563EB]/40 p-5 shadow-2xl shadow-black relative overflow-hidden"
              >
                {/* Top Strip */}
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pb-3 border-b border-zinc-800">
                  <span>ID // PH-RCM-2014</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/30">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </span>
                </div>

                {/* Corporate Headshot Frame */}
                <div className="mt-4 relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 aspect-[4/4.3]">
                  <img
                    src="/Confident Corporate Headshot.png"
                    alt="Jayson Abrio - Healthcare RCM Operations Specialist & Medical VA"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0B0B0E] to-transparent" />
                </div>

                {/* Identity & Credentials */}
                <div className="mt-4">
                  <h2 className="text-xl font-bold text-white">Jayson Abrio</h2>
                  <p className="text-xs font-medium text-[#60A5FA] mt-0.5">
                    RCM SME • Claims Team Leader • Medical VA
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 mt-4 pt-3 border-t border-zinc-800/90 text-[11px]">
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-500">
                        Track Record
                      </div>
                      <div className="font-semibold text-zinc-200 mt-0.5">
                        2014 BPO • 7Y HC
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-zinc-500">
                        Leadership
                      </div>
                      <div className="font-semibold text-zinc-200 mt-0.5">
                        10 Claims Experts
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/90 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span>HIPAA • BAA • NDA</span>
                    <span className="tracking-[0.25em] text-[#2563EB]">
                      || ||| | |||| ||
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-zinc-500 mt-3 text-center">
              Hover to tilt in 3D • Click badge to drop
            </p>
          </div>
        </div>
      </section>

      {/* MICRO-INTERACTION 3: SEAMLESS PAYER & PORTAL MARQUEE TICKER */}
      <div className="relative border-y border-zinc-900 bg-[#08080A] py-3.5 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        <div className="animate-marquee flex items-center gap-8">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-8 shrink-0"
            >
              <span className="text-xs font-mono tracking-widest text-zinc-400 hover:text-[#60A5FA] transition">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]/60" />
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 1: 5 HEALTHCARE PROVIDER LINES OF BUSINESS */}
      <section
        id="lobs"
        className="py-20 border-b border-zinc-900 bg-[#08080A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB]">
                7+ Years Healthcare Provider Expertise
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                Full-Cycle Revenue Cycle & Medical VA Capabilities
              </h2>
              <p className="text-zinc-400 mt-3 text-sm sm:text-base">
                Hands-on operational mastery across 90% of US commercial
                insurance payers—select any Line of Business below to inspect
                deliverables and payer portal workflows.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-12 gap-6 mt-10">
            {/* Left Selector Buttons */}
            <div className="lg:col-span-5 space-y-2.5">
              {HEALTHCARE_LOBS.map((lob) => {
                const isSelected = activeLob.id === lob.id;
                return (
                  <button
                    key={lob.id}
                    onClick={() => setActiveLob(lob)}
                    className={`w-full text-left p-4 rounded-xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#141418] border-[#2563EB] shadow-lg shadow-[#2563EB]/10'
                        : 'bg-[#0E0E11] border-zinc-800/90 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                            isSelected
                              ? 'bg-[#2563EB] text-white font-bold'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}
                        >
                          {lob.code}
                        </span>
                        <span className="text-[11px] font-mono text-[#60A5FA]">
                          {lob.metric}
                        </span>
                      </div>
                      <div className="font-semibold text-white text-sm sm:text-base mt-1.5">
                        {lob.title}
                      </div>
                    </div>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition ${
                        isSelected
                          ? 'text-[#60A5FA] translate-x-0.5'
                          : 'text-zinc-600'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right Elaborated LOB Panel with Spotlight Glow */}
            <div className="lg:col-span-7">
              <SpotlightCard className="h-full rounded-2xl bg-[#101014] border border-zinc-800 p-6 sm:p-8">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-800">
                    <span className="text-xs font-mono text-[#2563EB]">
                      {activeLob.code} // PROVIDER OPERATIONS
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/30">
                      {activeLob.metric}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mt-5">
                    {activeLob.title}
                  </h3>
                  <p className="text-xs font-mono text-zinc-400 mt-1">
                    {activeLob.tagline}
                  </p>

                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-4">
                    {activeLob.summary}
                  </p>

                  <div className="mt-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                      Key Operational Deliverables
                    </div>
                    <ul className="space-y-2.5">
                      {activeLob.deliverables.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-sm text-zinc-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-zinc-800/90 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-mono text-zinc-500 mr-1">
                      Primary Portals:
                    </span>
                    {activeLob.portals.map((p) => (
                      <span
                        key={p}
                        className="px-2.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#60A5FA]"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      {/* QUANTIFIED RCM OPERATIONAL WINS & CASE STUDIES (COUNT-UP + SPOTLIGHT) */}
      <section id="results" className="py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB]">
                Proven Revenue Impact
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                Quantified RCM Benchmarks & Operational Wins
              </h2>
              <p className="text-zinc-400 mt-3 text-sm sm:text-base">
                Measurable outcomes delivered across high-volume US provider
                claims queues, AR recovery sweeps, and daily remittance
                settlements.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
            {CASE_STUDIES.map((cs, idx) => (
              <Reveal key={cs.title} delay={idx * 70}>
                <SpotlightCard className="h-full p-6 rounded-2xl bg-[#0F0F12] border border-zinc-800 hover:border-[#2563EB]/50 transition">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-zinc-400">
                        {cs.tag}
                      </span>
                      <TrendingUp className="w-4 h-4 text-[#2563EB]" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-[#60A5FA] mt-4">
                      <AnimatedMetric
                        target={cs.target}
                        prefix={cs.prefix}
                        suffix={cs.suffix}
                        decimals={cs.decimals}
                      />
                    </div>
                    <h3 className="text-base font-bold text-white mt-2">
                      {cs.title}
                    </h3>
                    <div className="text-[11px] font-mono text-zinc-500 mt-1">
                      {cs.context}
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed mt-3 pt-3 border-t border-zinc-800/80">
                      {cs.detail}
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EHR/PM SYSTEMS, CODING & HIPAA COMPLIANCE MATRIX */}
      <section
        id="systems"
        className="py-20 border-b border-zinc-900 bg-[#08080A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB]">
                Clinical & Billing Infrastructure
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                EHR / Practice Management, Coding & HIPAA Stack
              </h2>
              <p className="text-zinc-400 mt-3 text-sm sm:text-base">
                Ready to plug directly into your existing US electronic health
                record, clearinghouse, and merchant payment ecosystem with zero
                steep learning curve.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6 mt-10">
            {SYSTEMS_MATRIX.map((group, idx) => (
              <Reveal key={group.category} delay={idx * 80}>
                <SpotlightCard className="h-full rounded-2xl bg-[#0F0F12] border border-zinc-800 hover:border-[#2563EB]/40 transition p-6">
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center mb-4">
                      {idx === 0 ? (
                        <Cpu className="w-4 h-4 text-[#60A5FA]" />
                      ) : idx === 1 ? (
                        <FileSpreadsheet className="w-4 h-4 text-[#60A5FA]" />
                      ) : (
                        <Lock className="w-4 h-4 text-[#60A5FA]" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      {group.category}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      {group.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-zinc-800/80">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono text-zinc-200 hover:border-[#2563EB]/40 transition"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: 2014–PRESENT STORY & FALLING PHYSICS SKILL PILLS */}
      <section id="story" className="py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 items-start">
          {/* Left: Career Progression Timeline */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal>
              <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB]">
                Background & Leadership Pedigree
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                12+ Years in BPO. 7+ Years Dedicated to US Healthcare RCM.
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-3">
                Starting my BPO career in{' '}
                <strong className="text-white">2014</strong> across diverse
                enterprise accounts built my communication discipline, SLA
                accountability, and process precision. Over the past{' '}
                <strong className="text-[#60A5FA]">7+ years</strong>, I
                specialized exclusively on the{' '}
                <strong className="text-white">
                  US Healthcare Provider side
                </strong>
                —rising from front-line specialist to{' '}
                <strong className="text-[#60A5FA]">
                  RCM Subject Matter Expert (SME) & Claims Team Leader
                </strong>
                .
              </p>
            </Reveal>

            <div className="space-y-4 pt-2 border-l-2 border-[#2563EB]/40 pl-6 ml-2">
              <Reveal delay={80}>
                <div className="relative">
                  <span className="w-3 h-3 rounded-full bg-[#60A5FA] ring-4 ring-[#050505] absolute -left-[31px] top-1.5" />
                  <div className="text-xs font-mono text-[#60A5FA]">
                    LEADERSHIP • RCM SME & CLAIMS TEAM LEADER
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Leading 10 Claims Specialists & Escalation Management
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    Supervised daily production queues, coached 10 Claims
                    experts on complex US commercial payer rules, resolved
                    high-dollar escalations, authored SOP playbooks, and
                    maintained 99%+ QA accuracy.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="relative">
                  <span className="w-3 h-3 rounded-full bg-[#2563EB] ring-4 ring-[#050505] absolute -left-[31px] top-1.5" />
                  <div className="text-xs font-mono text-[#2563EB]">
                    7+ YEARS • US HEALTHCARE PROVIDER OPERATIONS
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    End-to-End Revenue Cycle Mastery (90% Commercial Payers)
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    Hands-on execution across Eligibility, Prior Authorizations,
                    Claims Submission, Denial Appeals, EOB/ERA/EDI 835 Cash
                    Posting, and Multi-Payer Virtual Card reconciliation on
                    Stripe.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <div className="relative">
                  <span className="w-3 h-3 rounded-full bg-zinc-600 ring-4 ring-[#050505] absolute -left-[31px] top-1.5" />
                  <div className="text-xs font-mono text-zinc-400">
                    2014 – PRESENT • BPO INDUSTRY FOUNDATION
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">
                    Multi-Account Operations & US Client Alignment
                  </h3>
                  <p className="text-sm text-zinc-400 mt-1 leading-relaxed">
                    Over a decade of US-shift operational reliability, KPI
                    reporting, and cross-functional teamwork supporting American
                    clinics, billing groups, and healthcare practices.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right: Interactive Skill Stack Box */}
          <div className="lg:col-span-6">
            <SpotlightCard className="rounded-2xl bg-[#0F0F12] border border-zinc-800 p-6 sm:p-8">
              <div>
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-zinc-800">
                  <div>
                    <div className="text-xs font-mono text-[#2563EB]">
                      OPERATIONAL TOOLKIT
                    </div>
                    <h3 className="text-lg font-bold text-white mt-0.5">
                      All Your RCM & Medical VA Needs
                    </h3>
                  </div>
                  <button
                    onClick={() => setPhysicsKey((k) => k + 1)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 hover:border-[#2563EB] hover:text-[#60A5FA] transition cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Replay Drop
                  </button>
                </div>

                <div key={physicsKey} className="flex flex-wrap gap-2.5 pt-6">
                  {SKILL_PILLS.map((skill, idx) => (
                    <span
                      key={skill}
                      style={{ animationDelay: `${idx * 55}ms` }}
                      className={`animate-bounce-once px-3.5 py-2 rounded-full text-xs sm:text-sm font-medium border transition hover:-translate-y-0.5 cursor-default ${
                        idx % 3 === 0
                          ? 'bg-[#2563EB]/15 border-[#2563EB]/50 text-[#60A5FA]'
                          : 'bg-zinc-900 border-zinc-700/90 text-zinc-200 hover:border-[#2563EB]/40'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Complete Payer & Cash Posting Matrix */}
                <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-800">
                  <div className="p-4 rounded-xl bg-[#09090B] border border-zinc-800/80">
                    <div className="text-xs font-mono text-[#60A5FA] mb-2">
                      ELIGIBILITY, AUTH & CLAIMS PORTALS
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Availity • UnitedHealthcare (UHC) • Evernorth • Blue
                      Shield / BCBS of California • NaviNet • Multi-Payer
                      Commercial Portals
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#09090B] border border-zinc-800/80">
                    <div className="text-xs font-mono text-[#60A5FA] mb-2">
                      CASH POSTING, ERA & VCC PLATFORMS
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Zelis • Payspan • Optum Pay • Stripe Virtual Cards • UHC
                      Portal • Echo Health Provider Portal • InstaMed • EDI 835
                      / EOB
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE HIPAA-SAFE RCM & CASH POSTING WORKFLOW LAB */}
      <section
        id="lab"
        className="py-20 border-b border-zinc-900 bg-[#08080A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB]">
                Interactive Proof of Expertise (100% De-Identified Data)
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                Live RCM & Cash Posting Workflow Lab
              </h2>
            </div>

            {/* Lab Mode Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-zinc-900 border border-zinc-800 self-start">
              <button
                onClick={() => setLabTab('remittance')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  labTab === 'remittance'
                    ? 'bg-[#2563EB] text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Cash Posting, EDI 835 & Stripe VCC
              </button>
              <button
                onClick={() => setLabTab('denials')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  labTab === 'denials'
                    ? 'bg-[#2563EB] text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                CARC Denial Resolution Engine
              </button>
            </div>
          </div>

          {labTab === 'remittance' ? (
            <div className="mt-8 rounded-2xl bg-[#0F0F12] border border-zinc-800 overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'ALL', label: 'All Channels (4)' },
                    { id: 'EDI 835', label: 'EDI 835 / ERA' },
                    { id: 'Virtual Card', label: 'Stripe Virtual Cards' },
                    { id: 'Manual EOB', label: 'Manual EOB' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setRemitFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer ${
                        remitFilter === tab.id
                          ? 'bg-[#2563EB]/20 text-[#60A5FA] border border-[#2563EB]/50'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Daily Batch Variance:
                  $0.00
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 text-zinc-400 font-mono uppercase border-b border-zinc-800">
                    <tr>
                      <th className="py-3.5 px-4">Batch ID</th>
                      <th className="py-3.5 px-4">Channel</th>
                      <th className="py-3.5 px-4">Payer / Portal</th>
                      <th className="py-3.5 px-4">Billed</th>
                      <th className="py-3.5 px-4">Paid</th>
                      <th className="py-3.5 px-4">CARC / Adjustments</th>
                      <th className="py-3.5 px-4">Variance</th>
                      <th className="py-3.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/80">
                    {filteredBatches.map((row) => (
                      <tr
                        key={row.id}
                        className="hover:bg-zinc-900/50 transition"
                      >
                        <td className="py-3.5 px-4 font-mono text-[#60A5FA] font-semibold">
                          {row.id}
                        </td>
                        <td className="py-3.5 px-4 text-zinc-200 font-medium">
                          {row.channel}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-white font-medium">
                            {row.payer}
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500">
                            {row.trace}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-zinc-300">
                          {row.billed}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-white font-semibold">
                          {row.paid}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-zinc-400">
                          {row.adj}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">
                          {row.variance}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-2.5">
                {DENIAL_CODES.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => setSelectedDenial(item)}
                    className={`w-full text-left p-4 rounded-xl border transition cursor-pointer ${
                      selectedDenial.code === item.code
                        ? 'bg-[#141418] border-[#2563EB]'
                        : 'bg-[#0F0F12] border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="font-mono text-sm font-bold text-[#60A5FA]">
                      {item.code}
                    </div>
                    <div className="text-sm text-white font-medium mt-0.5">
                      {item.label}
                    </div>
                  </button>
                ))}
              </div>
              <div className="lg:col-span-7">
                <SpotlightCard className="rounded-2xl bg-[#0F0F12] border border-zinc-800 p-6 sm:p-8">
                  <div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/30">
                      SME RESOLUTION PLAYBOOK • {selectedDenial.code}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-4">
                      {selectedDenial.label}
                    </h3>
                    <div className="mt-5 space-y-4">
                      <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                        <div className="text-xs font-mono text-zinc-400 uppercase">
                          Root-Cause Diagnosis
                        </div>
                        <p className="text-sm text-zinc-200 mt-1 leading-relaxed">
                          {selectedDenial.rootCause}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#2563EB]/10 border border-[#2563EB]/30">
                        <div className="text-xs font-mono text-[#60A5FA] uppercase">
                          Actionable Rebilling & Appeal Protocol
                        </div>
                        <p className="text-sm text-white mt-1 leading-relaxed">
                          {selectedDenial.resolution}
                        </p>
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FLEXIBLE VA & RCM ENGAGEMENT MODELS WITH SPOTLIGHT CARDS */}
      <section id="services" className="py-20 border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
            <div className="max-w-3xl">
              <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB]">
                Partnership Options
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
                How US Clinics & Billing Agencies Can Work With Me
              </h2>
              <p className="text-zinc-400 mt-3 text-sm sm:text-base">
                Flexible remote engagement structures tailored to solo
                practices, multi-provider clinics, and onshore US RCM billing
                teams.
              </p>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-6 mt-10">
            {ENGAGEMENT_MODELS.map((model, idx) => {
              const isSelected = selectedModel === idx;
              return (
                <Reveal key={model.title} delay={idx * 80}>
                  <div
                    onClick={() => setSelectedModel(idx)}
                    className="h-full cursor-pointer"
                  >
                    <SpotlightCard
                      className={`h-full rounded-2xl p-6 sm:p-7 border transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-b from-[#15151A] to-[#0E0E12] border-[#2563EB]/70 shadow-xl shadow-[#2563EB]/15'
                          : 'bg-[#0F0F12] border-zinc-800 hover:border-[#2563EB]/40'
                      }`}
                    >
                      <div>
                        <span className="inline-block px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-[#2563EB]/15 text-[#60A5FA] border border-[#2563EB]/30">
                          {model.badge}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-4">
                          {model.title}
                        </h3>
                        <div className="text-xs font-mono text-[#60A5FA] mt-1.5">
                          {model.schedule}
                        </div>
                        <p className="text-sm text-zinc-300 leading-relaxed mt-4">
                          {model.description}
                        </p>
                        <ul className="space-y-2.5 mt-5 pt-5 border-t border-zinc-800/80">
                          {model.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2 text-xs text-zinc-200"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedModel(idx);
                          setModalSent(false);
                          setBookingOpen(true);
                        }}
                        className={`mt-7 w-full py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white hover:brightness-110'
                            : 'bg-zinc-900 border border-zinc-700 text-white hover:bg-gradient-to-r hover:from-[#2563EB] hover:to-[#60A5FA] hover:border-transparent'
                        }`}
                      >
                        Inquire About This Model
                      </button>
                    </SpotlightCard>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY HIRE AN RCM SME & TEAM LEADER VS. GENERIC VA + ENDORSEMENTS */}
      <section
        id="advantage"
        className="py-20 border-b border-zinc-900 bg-[#08080A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB]">
              The SME Difference
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">
              Why Clinics & Billing Agencies Choose an RCM Team Leader
            </h2>
          </div>

          <div className="mt-8 rounded-2xl bg-[#0F0F12] border border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 border-b border-zinc-800 text-xs font-mono uppercase">
                  <tr>
                    <th className="py-4 px-5 text-zinc-400">
                      Operational Area
                    </th>
                    <th className="py-4 px-5 text-[#60A5FA]">
                      Jayson Abrio (7+ Yrs RCM SME & TL)
                    </th>
                    <th className="py-4 px-5 text-zinc-500">
                      General Administrative VA
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 text-xs sm:text-sm">
                  <tr>
                    <td className="py-4 px-5 font-semibold text-white">
                      US Commercial Payers
                    </td>
                    <td className="py-4 px-5 text-zinc-200">
                      90% commercial payer fluency (Availity, UHC, Evernorth,
                      BCBS CA, NaviNet)
                    </td>
                    <td className="py-4 px-5 text-zinc-500">
                      Needs step-by-step training on payer rules
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-5 font-semibold text-white">
                      Cash & Virtual Card Posting
                    </td>
                    <td className="py-4 px-5 text-zinc-200">
                      EDI 835, Zelis, Payspan, Optum Pay, Echo, InstaMed &
                      Stripe Virtual Cards
                    </td>
                    <td className="py-4 px-5 text-zinc-500">
                      Unfamiliar with CARC/RARC or VCC reconciliation
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-5 font-semibold text-white">
                      Leadership & QA Discipline
                    </td>
                    <td className="py-4 px-5 text-zinc-200">
                      Proven Team Leader who managed 10 Claims experts, SOPs &
                      daily QA audits
                    </td>
                    <td className="py-4 px-5 text-zinc-500">
                      Requires heavy daily micromanagement
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-5 font-semibold text-white">
                      HIPAA & PHI Governance
                    </td>
                    <td className="py-4 px-5 text-zinc-200">
                      Strict zero-leak PHI handling, encrypted workflows &
                      BAA-ready compliance
                    </td>
                    <td className="py-4 px-5 text-zinc-500">
                      Basic awareness without clinical RCM rigor
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Leadership Endorsements Row with Spotlight Cards */}
          <div className="grid md:grid-cols-3 gap-5 mt-10">
            {ENDORSEMENTS.map((item, idx) => (
              <Reveal key={item.author} delay={idx * 80}>
                <SpotlightCard className="h-full p-6 rounded-2xl bg-[#0F0F12] border border-zinc-800 hover:border-[#2563EB]/40 transition">
                  <div>
                    <Quote className="w-6 h-6 text-[#2563EB]/60 mb-3" />
                    <p className="text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
                      “{item.quote}”
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-zinc-800/80">
                    <div className="text-xs font-bold text-white">
                      {item.author}
                    </div>
                    <div className="text-[11px] font-mono text-[#60A5FA]">
                      {item.role}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: DIRECT CONTACT & INQUIRY SECTION */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-10">
          {/* Left: Direct Philippine Contact Cards */}
          <div className="lg:col-span-5 space-y-5">
            <div className="text-xs font-mono uppercase tracking-widest text-[#2563EB]">
              Direct Contact
            </div>
            <h2 className="text-3xl font-bold text-white">
              Ready to Streamline Your Revenue Cycle?
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Available for full-time or dedicated part-time Medical VA & RCM
              Specialist roles aligned with US Eastern (EST) or Pacific (PST)
              clinic hours.
            </p>

            <div className="space-y-3 pt-2">
              {/* Email Card */}
              <div className="p-4 rounded-xl bg-[#0F0F12] border border-zinc-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#60A5FA]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono text-zinc-500">
                      DIRECT EMAIL
                    </div>
                    <a
                      href="mailto:abrjayso114114@gmail.com"
                      className="text-sm font-semibold text-white hover:text-[#60A5FA] truncate block"
                    >
                      abrjayso114114@gmail.com
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyText('abrjayso114114@gmail.com', 'email')}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 hover:border-[#2563EB] transition shrink-0 cursor-pointer"
                >
                  {copiedField === 'email' ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* PH Mobile 1 */}
              <div className="p-4 rounded-xl bg-[#0F0F12] border border-zinc-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#60A5FA]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500">
                      MOBILE / WHATSAPP / VIBER (PH)
                    </div>
                    <a
                      href="tel:+639926844654"
                      className="text-sm font-semibold text-white hover:text-[#60A5FA]"
                    >
                      +63 992 684 4654
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyText('+639926844654', 'p1')}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 hover:border-[#2563EB] transition shrink-0 cursor-pointer"
                >
                  {copiedField === 'p1' ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* PH Mobile 2 */}
              <div className="p-4 rounded-xl bg-[#0F0F12] border border-zinc-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#60A5FA]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-zinc-500">
                      ALTERNATE MOBILE (PH)
                    </div>
                    <a
                      href="tel:+639368108850"
                      className="text-sm font-semibold text-white hover:text-[#60A5FA]"
                    >
                      +63 936 810 8850
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyText('+639368108850', 'p2')}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-700 text-xs text-zinc-300 hover:border-[#2563EB] transition shrink-0 cursor-pointer"
                >
                  {copiedField === 'p2' ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Clinic / Agency Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#0F0F12] border border-zinc-800 p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white">
                Send a Clinic or Billing Inquiry
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Tell me your EHR/PM system and biggest RCM bottleneck—I’ll
                respond within 1 business day.
              </p>

              {formSent ? (
                <div className="mt-6 p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="font-bold text-white">
                    Inquiry Sent Successfully!
                  </div>
                  <p className="text-xs text-zinc-300">
                    Thank you! Your message has been delivered directly to{' '}
                    <strong>abrjayso114114@gmail.com</strong>. Jayson will
                    respond within 1 business day.
                  </p>
                  <button
                    onClick={() => setFormSent(false)}
                    className="mt-2 px-4 py-1.5 rounded-lg bg-zinc-900 text-xs text-[#60A5FA] border border-zinc-700 cursor-pointer"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    fd.append('access_key', '2d2daf29-5c01-4439-98ca-3f9d7a3bfc83');
                    fd.append(
                      'subject',
                      `New RCM / Medical VA Inquiry — ${
                        fd.get('clinic') || 'New Client'
                      }`
                    );
                    fd.append('from_name', 'Jayson RCM Portfolio');

                    try {
                      const res = await fetch('https://api.web3forms.com/submit', {
                        method: 'POST',
                        body: fd,
                      });
                      const data = await res.json();
                      if (data.success) {
                        setFormSent(true);
                      } else {
                        alert(
                          'Could not send message. Please email abrjayso114114@gmail.com directly.'
                        );
                      }
                    } catch {
                      alert(
                        'Network error. Please email abrjayso114114@gmail.com directly.'
                      );
                    }
                  }}
                  className="mt-5 space-y-4"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        name="name"
                        required
                        placeholder="Dr. Sarah Jenkins / Practice Manager"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Clinic / Billing Company *
                      </label>
                      <input
                        name="clinic"
                        required
                        placeholder="Apex Behavioral Health / RCM Group"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Work Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="sarah@clinicname.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#2563EB]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                        Primary RCM / VA Need
                      </label>
                      <select
                        name="focus"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#2563EB]"
                      >
                        <option>Claims Management & Denial Appeals</option>
                        <option>Cash Posting (EOB / ERA / EDI 835)</option>
                        <option>Virtual Card (Stripe) Payment Posting</option>
                        <option>Eligibility & Prior Authorizations</option>
                        <option>Full-Cycle Medical VA / RCM Lead</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1.5">
                      Workflow Details
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Share your EHR/PM platform, daily volume, or preferred US shift hours..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white font-semibold text-sm hover:brightness-110 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Send Inquiry to Jayson Abrio
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-zinc-900 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            © {new Date().getFullYear()} Jayson Abrio • Healthcare RCM
            Operations Specialist & Medical VA
          </span>
          <span className="font-mono text-zinc-400">
            abrjayso114114@gmail.com • +63 992 684 4654
          </span>
        </div>
      </footer>

      {/* EXECUTIVE RESUME / CV PREVIEW & PDF PRINT MODAL */}
      {resumeOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl bg-[#111115] border border-[#2563EB]/50 p-6 sm:p-8 relative shadow-2xl my-8">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800">
              <div>
                <div className="text-[11px] font-mono text-[#2563EB]">
                  EXECUTIVE CURRICULUM VITAE
                </div>
                <h3 className="text-xl font-bold text-white">
                  Jayson Abrio — Healthcare RCM Operations Specialist & Medical
                  VA
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white font-semibold text-xs hover:brightness-110 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  Save as PDF / Print
                </button>
                <button
                  onClick={() => setResumeOpen(false)}
                  className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-5 space-y-5 text-xs sm:text-sm text-zinc-300 max-h-[70vh] overflow-y-auto pr-1">
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-400">
                <span>Email: abrjayso114114@gmail.com</span>
                <span>•</span>
                <span>Phone/WhatsApp: +63 992 684 4654 / +63 936 810 8850</span>
                <span>•</span>
                <span>Shift: US EST / PST Aligned</span>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#60A5FA] mb-1.5">
                  Executive Summary
                </h4>
                <p className="leading-relaxed">
                  Seasoned BPO professional since 2014 (12+ years industry
                  tenure) with 7+ dedicated years on the US Healthcare Provider
                  side. Former RCM Subject Matter Expert (SME) & Claims Team
                  Leader managing 10 Claims specialists across 90% of US
                  commercial payers. Proven track record in end-to-end Claims
                  Management, Eligibility Verification, Prior Authorizations,
                  EDI 835/ERA/EOB Cash Posting, and Multi-Payer Virtual Card
                  settlement on Stripe.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-xs font-mono text-[#60A5FA] mb-2">
                    CORE RCM & VA COMPETENCIES
                  </div>
                  <ul className="space-y-1 text-xs">
                    <li>• CMS-1500 & UB-04 Scrubbing & Denial Appeals</li>
                    <li>• CARC / RARC Root-Cause Resolution & AR Follow-up</li>
                    <li>• Pre-Visit Eligibility, Deductible/OOP & COB</li>
                    <li>• Prior Authorizations & Visit Unit Tracking</li>
                    <li>• EDI 835, ERA, Manual EOB & Stripe VCC Posting</li>
                  </ul>
                </div>
                <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                  <div className="text-xs font-mono text-[#60A5FA] mb-2">
                    PAYER PORTALS & CLEARINGHOUSES
                  </div>
                  <ul className="space-y-1 text-xs">
                    <li>• Availity, UHC Provider, Evernorth, NaviNet</li>
                    <li>• Blue Shield / BCBS of California</li>
                    <li>• Zelis, Payspan, Optum Pay, Echo Health, InstaMed</li>
                    <li>• Stripe Virtual Card (VCC) Merchant Settlement</li>
                    <li>• eClinicalWorks, Athenahealth, Kareo/Tebra, NextGen</li>
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#60A5FA] mb-2">
                  Experience Highlights
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="font-bold text-white">
                      RCM Subject Matter Expert (SME) & Claims Team Leader — US
                      Healthcare Provider Operations
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Led a team of 10 Claims specialists; oversaw daily QA
                      calibrations, payer escalations, SOP authoring, and
                      end-to-end revenue cycle execution across 90% of US
                      commercial plans.
                    </p>
                  </div>
                  <div>
                    <div className="font-bold text-white">
                      Senior BPO Operations Specialist (2014 – Present)
                    </div>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      12+ years of US-aligned service delivery, strict HIPAA/PHI
                      governance, SLA adherence, and cross-functional client
                      communication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE DISCOVERY CALL BOOKING MODAL */}
      {bookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0D1017] border border-zinc-800 p-6 sm:p-7 shadow-2xl my-auto">
            <button
              onClick={() => setBookingOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-[11px] font-mono tracking-wider text-[#2563EB] uppercase">
              FREE 15-MIN OPERATIONS CONSULTATION
            </div>
            <h3 className="text-2xl font-bold text-white mt-1">
              Book a Discovery Call with Jayson
            </h3>
            <p className="text-xs text-zinc-400 mt-1">
              Select an available date & time slot during US Eastern (EST) or
              Pacific (PST) hours.
            </p>

            {!modalSent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setModalSent(true);
                }}
                className="mt-5 space-y-4"
              >
                <div className="grid sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121620] border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#2563EB]"
                  />
                  <input
                    type="text"
                    required
                    value={bookingCompany}
                    onChange={(e) => setBookingCompany(e.target.value)}
                    placeholder="Clinic or Billing Agency"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121620] border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#2563EB]"
                  />
                </div>

                {/* Timezone & Focus Topic */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <select
                    value={bookingTz}
                    onChange={(e) => {
                      const nextTz = e.target.value;
                      setBookingTz(nextTz);
                      setSelectedTime(TIME_SLOTS_BY_TZ[nextTz][1]);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121620] border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="EST">US Eastern Time (EST)</option>
                    <option value="PST">US Pacific Time (PST)</option>
                  </select>

                  <select
                    value={bookingTopic}
                    onChange={(e) => setBookingTopic(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#121620] border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#2563EB]"
                  >
                    <option value="Claims & Denial Management">
                      Claims & Denial Management
                    </option>
                    <option value="Eligibility & Prior Authorizations">
                      Eligibility & Prior Authorizations
                    </option>
                    <option value="EOB/ERA/835 & Stripe VCC Posting">
                      EOB/ERA/835 & Stripe VCC Posting
                    </option>
                    <option value="Full-Time Medical VA / RCM SME">
                      Full-Time Medical VA / RCM SME
                    </option>
                  </select>
                </div>

                {/* Date Picker */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                    <span>1. SELECT AVAILABLE DATE</span>
                    <span className="text-[#60A5FA]">Mon–Fri</span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
                    {availableDates.map((d) => {
                      const active = selectedDate === d.iso;
                      return (
                        <button
                          type="button"
                          key={d.iso}
                          onClick={() => setSelectedDate(d.iso)}
                          className={`py-2 px-1 rounded-xl border text-center transition cursor-pointer ${
                            active
                              ? 'bg-[#2563EB]/20 border-[#2563EB] text-white shadow-md shadow-[#2563EB]/20'
                              : 'bg-[#121620] border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
                          }`}
                        >
                          <div className="text-[10px] font-mono uppercase opacity-80">
                            {d.weekday}
                          </div>
                          <div className="text-xs font-semibold mt-0.5">
                            {d.monthDay.split(' ')[1]}
                          </div>
                          <div className="text-[9px] text-zinc-500">
                            {d.monthDay.split(' ')[0]}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                    <span>2. SELECT TIME SLOT ({bookingTz})</span>
                    <span className="text-emerald-400">● Available</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS_BY_TZ[bookingTz].map((slot) => {
                      const active = selectedTime === slot;
                      return (
                        <button
                          type="button"
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`py-2 px-2.5 rounded-xl border text-xs font-mono font-medium transition cursor-pointer ${
                            active
                              ? 'bg-gradient-to-r from-[#2563EB] to-[#60A5FA] border-transparent text-white font-semibold'
                              : 'bg-[#121620] border-zinc-800 text-zinc-300 hover:border-[#2563EB]/50'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white font-semibold text-sm hover:brightness-110 transition cursor-pointer shadow-lg shadow-[#2563EB]/25"
                >
                  Confirm {selectedTime} {bookingTz} Slot →
                </button>
              </form>
            ) : (
              <div className="mt-5 p-5 rounded-xl bg-[#121620] border border-[#2563EB]/40 text-center space-y-3">
                <CheckCircle2 className="w-9 h-9 text-[#60A5FA] mx-auto" />
                <div className="text-base font-bold text-white">
                  Slot Reserved for {bookingName}!
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  <span className="text-[#60A5FA] font-semibold">
                    {
                      availableDates.find((d) => d.iso === selectedDate)
                        ?.fullLabel
                    }
                  </span>{' '}
                  at{' '}
                  <span className="text-[#60A5FA] font-semibold">
                    {selectedTime} {bookingTz}
                  </span>{' '}
                  — Focus: {bookingTopic}
                </p>
                <a
                  href={buildGoogleCalendarUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#60A5FA] text-white text-xs font-semibold hover:brightness-110 transition"
                >
                  Add to Google Calendar & Send Invite →
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setModalSent(false);
                    setBookingOpen(false);
                  }}
                  className="block w-full text-[11px] text-zinc-400 hover:text-white pt-1 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}