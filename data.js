/**
 * Site content — bilingual `{ ar, en }` strings and asset URLs.
 * Do not put user-facing copy in components; import from here.
 */

/** @typedef {{ ar: string; en: string }} L10n */

/** IANA zone for interpreting deadline wall times (Jordan, UTC+3 in Oct). */
export const deadlines = {
  timezoneIana: 'Asia/Amman',
  /** Participant registration closes at start of 9 Oct 2026 local (+03). */
  participantEndsAtIso: '2026-10-09T00:00:00+03:00',
  /** Guest registration closes 18 Oct 2026, 09:00 local (+03). */
  guestEndsAtIso: '2026-10-18T09:00:00+03:00',
};

export const branding = {
  /** Header / hero logo (placeholder). */
  logoUrl: 'https://placehold.co/160x160/1a4a8b/ffffff?text=SE',
  logoAlt: {
    ar: 'شعار سيلفر إليت',
    en: 'Silver Elite logo',
  },
  /** Large hero mark (placeholder). */
  heroMarkUrl: 'https://placehold.co/400x200/e2e8f0/1a4a8b?text=Silver+Elite',
};

/** UI chrome: nav, footer labels, aria, misc. */
export const ui = {
  skipToContent: { ar: 'تخطي إلى المحتوى', en: 'Skip to main content' },
  mainNav: { ar: 'التنقل الرئيسي', en: 'Main navigation' },
  navExhibitions: { ar: 'المعارض', en: 'Exhibitions' },
  navRegister: { ar: 'التسجيل', en: 'Register' },
  navAbout: { ar: 'من نحن', en: 'About us' },
  navOpenMenu: { ar: 'فتح القائمة', en: 'Open menu' },
  navCloseMenu: { ar: 'إغلاق القائمة', en: 'Close menu' },
  langArabic: { ar: 'العربية', en: 'Arabic' },
  langEnglish: { ar: 'English', en: 'English' },
  footerRights: {
    ar: 'جميع الحقوق محفوظة.',
    en: 'All rights reserved.',
  },
  footerContactTitle: { ar: 'تواصل معنا', en: 'Contact us' },
  footerSiteLinksTitle: { ar: 'روابط الموقع', en: 'Site links' },
  footerHome: { ar: 'الرئيسية', en: 'Home' },
  footerRegister: { ar: 'نموذج التسجيل', en: 'Registration' },
  registrationClosedHint: {
    ar: 'انتهى موعد التسجيل.',
    en: 'Registration is closed.',
  },
  mapTitle: { ar: 'الموقع على الخريطة', en: 'Location map' },
};

export const homeContent = {
  hero: {
    eyebrow: { ar: 'الصفحة الرئيسية', en: 'Home' },
    title: { ar: 'سيلفر إليت', en: 'Silver Elite' },
    slogan: {
      ar: 'نص شعار الشركة — نص تجريبي',
      en: 'Company slogan placeholder',
    },
    lead: {
      ar: 'نص تعريفي قصير عن سيلفر إليت كشركة. هذا نص تجريبي يمكن استبداله من دون تعديل الكود.',
      en: 'Short placeholder about Silver Elite as a company. Replace via data.js only.',
    },
  },
  about: {
    sectionTitle: { ar: 'من نحن', en: 'About us' },
    body: {
      ar: 'قسم عن الشركة: رؤية، رسالة، وقيم — نص تجريبي بالكامل من data.js.',
      en: 'About section: vision, mission, values — dummy copy from data.js.',
    },
  },
  exhibitionsHeading: { ar: 'المعارض', en: 'Exhibitions' },
  exhibitionsIntro: {
    ar: 'نظرة على معارضنا الخمسة (بيانات تجريبية).',
    en: 'Overview of our five exhibitions (dummy data).',
  },
};

/**
 * Five exhibition cards on home + anchor ids for footer links.
 * @type {Array<{ id: string; anchorId: string; name: L10n; description: L10n; imageUrl: string }>}
 */
export const exhibitionCards = [
  {
    id: 'ex-1',
    anchorId: 'exhibition-ex-1',
    name: { ar: 'معرض الخليج للبلاستيك', en: 'Gulf Plastics Expo' },
    description: {
      ar: 'وصف تجريبي قصير للمعرض الأول.',
      en: 'Dummy short description for exhibition one.',
    },
    imageUrl: 'https://placehold.co/640x400/1a4a8b/ffffff?text=Ex+1',
  },
  {
    id: 'ex-2',
    anchorId: 'exhibition-ex-2',
    name: { ar: 'أسبوع التغليف الذكي', en: 'Smart Packaging Week' },
    description: {
      ar: 'وصف تجريبي قصير للمعرض الثاني.',
      en: 'Dummy short description for exhibition two.',
    },
    imageUrl: 'https://placehold.co/640x400/2563eb/ffffff?text=Ex+2',
  },
  {
    id: 'ex-3',
    anchorId: 'exhibition-ex-3',
    name: { ar: 'منتدى البتروكيماويات', en: 'Petrochemicals Forum' },
    description: {
      ar: 'وصف تجريبي قصير للمعرض الثالث.',
      en: 'Dummy short description for exhibition three.',
    },
    imageUrl: 'https://placehold.co/640x400/0d9488/ffffff?text=Ex+3',
  },
  {
    id: 'ex-4',
    anchorId: 'exhibition-ex-4',
    name: { ar: 'قمة إعادة التدوير', en: 'Recycling Summit' },
    description: {
      ar: 'وصف تجريبي قصير للمعرض الرابع.',
      en: 'Dummy short description for exhibition four.',
    },
    imageUrl: 'https://placehold.co/640x400/7c3aed/ffffff?text=Ex+4',
  },
  {
    id: 'ex-5',
    anchorId: 'exhibition-ex-5',
    name: { ar: 'معرض التقنيات الصناعية', en: 'Industrial Tech Fair' },
    description: {
      ar: 'وصف تجريبي قصير للمعرض الخامس.',
      en: 'Dummy short description for exhibition five.',
    },
    imageUrl: 'https://placehold.co/640x400/b45309/ffffff?text=Ex+5',
  },
];

export const footerContact = {
  email: 'info@silverelite.example',
  phone: '+962 0 000 0000',
  social: [
    { id: 'li', label: { ar: 'لينكدإن', en: 'LinkedIn' }, href: 'https://example.com/linkedin', icon: 'linkedin' },
    { id: 'x', label: { ar: 'إكس', en: 'X' }, href: 'https://example.com/x', icon: 'x' },
    { id: 'ig', label: { ar: 'إنستغرام', en: 'Instagram' }, href: 'https://example.com/ig', icon: 'instagram' },
  ],
  /** Placeholder embed (OpenStreetMap export or Google embed URL from data). */
  mapEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=35.85%2C31.92%2C35.95%2C31.99&layer=mapnik',
};

export const footerSecondary = {
  externalLink: {
    label: { ar: 'الموقع الشريك', en: 'Partner website' },
    href: 'https://example.com/partner',
  },
};

/** Exhibitions page: current show + gallery + sponsor tiers. */
export const exhibitionsPageContent = {
  pageTitle: { ar: 'المعارض', en: 'Exhibitions' },
  current: {
    title: { ar: 'المعرض الحالي — دورة 2026', en: 'Current exhibition — 2026 edition' },
    dates: { ar: '18 – 20 / 10 / 2026', en: '18 – 20 Oct 2026' },
    description: {
      ar: 'نص تجريبي عن المعرض الحالي، الفعاليات، والجمهور المستهدف.',
      en: 'Dummy copy for the current exhibition, events, and audience.',
    },
    imageUrl: 'https://placehold.co/960x520/1a4a8b/ffffff?text=Current+Exhibition',
    ctaRegister: { ar: 'سجّل الآن', en: 'Register now' },
  },
  galleryHeading: { ar: 'معارض سابقة', en: 'Previous exhibitions' },
  gallerySub: {
    ar: 'معرض صور تجريبي — يتبدل تلقائياً.',
    en: 'Dummy photo gallery with automatic transitions.',
  },
  /** Eight placeholder images; UI shows four at a time with shuffle. */
  galleryImageUrls: [
    'https://placehold.co/800x600/ccc/333?text=G1',
    'https://placehold.co/800x600/aaa/111?text=G2',
    'https://placehold.co/800x600/bbb/222?text=G3',
    'https://placehold.co/800/c94/fff?text=G4',
    'https://placehold.co/800x600/99a/fff?text=G5',
    'https://placehold.co/800x600/8b5/fff?text=G6',
    'https://placehold.co/800x600/636/fff?text=G7',
    'https://placehold.co/800x600/089/fff?text=G8',
  ],
  sponsorsBlockTitle: { ar: 'الرعاة والشركاء', en: 'Sponsors and partners' },
  sponsorTiers: {
    sponsors: {
      title: { ar: 'رعاة', en: 'Sponsors' },
      items: [
        { name: { ar: 'شركة أ', en: 'Company A' }, logoUrl: 'https://placehold.co/200x80/eee/333?text=A', href: '#' },
        { name: { ar: 'شركة ب', en: 'Company B' }, logoUrl: 'https://placehold.co/200x80/eee/333?text=B', href: '#' },
        { name: { ar: 'شركة ج', en: 'Company C' }, logoUrl: 'https://placehold.co/200x80/eee/333?text=C', href: '#' },
        { name: { ar: 'شركة د', en: 'Company D' }, logoUrl: 'https://placehold.co/200x80/eee/333?text=D', href: '#' },
      ],
    },
    partners: {
      title: { ar: 'شركاء', en: 'Partners' },
      items: [
        { name: { ar: 'شريك 1', en: 'Partner 1' }, logoUrl: 'https://placehold.co/160x64/f1f5f9/334155?text=P1', href: '#' },
        { name: { ar: 'شريك 2', en: 'Partner 2' }, logoUrl: 'https://placehold.co/160x64/f1f5f9/334155?text=P2', href: '#' },
        { name: { ar: 'شريك 3', en: 'Partner 3' }, logoUrl: 'https://placehold.co/160x64/f1f5f9/334155?text=P3', href: '#' },
        { name: { ar: 'شريك 4', en: 'Partner 4' }, logoUrl: 'https://placehold.co/160x64/f1f5f9/334155?text=P4', href: '#' },
      ],
    },
    socialMediaPartners: {
      title: { ar: 'شركاء التواصل', en: 'Social media partners' },
      items: [
        { name: { ar: 'منصة 1', en: 'Platform 1' }, logoUrl: 'https://placehold.co/140x56/e2e8f0/1e293b?text=S1', href: '#' },
        { name: { ar: 'منصة 2', en: 'Platform 2' }, logoUrl: 'https://placehold.co/140x56/e2e8f0/1e293b?text=S2', href: '#' },
        { name: { ar: 'منصة 3', en: 'Platform 3' }, logoUrl: 'https://placehold.co/140x56/e2e8f0/1e293b?text=S3', href: '#' },
        { name: { ar: 'منصة 4', en: 'Platform 4' }, logoUrl: 'https://placehold.co/140x56/e2e8f0/1e293b?text=S4', href: '#' },
        { name: { ar: 'منصة 5', en: 'Platform 5' }, logoUrl: 'https://placehold.co/140x56/e2e8f0/1e293b?text=S5', href: '#' },
        { name: { ar: 'منصة 6', en: 'Platform 6' }, logoUrl: 'https://placehold.co/140x56/e2e8f0/1e293b?text=S6', href: '#' },
        { name: { ar: 'منصة 7', en: 'Platform 7' }, logoUrl: 'https://placehold.co/140x56/e2e8f0/1e293b?text=S7', href: '#' },
        { name: { ar: 'منصة 8', en: 'Platform 8' }, logoUrl: 'https://placehold.co/140x56/e2e8f0/1e293b?text=S8', href: '#' },
        { name: { ar: 'منصة 9', en: 'Platform 9' }, logoUrl: 'https://placehold.co/140x56/e2e8f0/1e293b?text=S9', href: '#' },
        { name: { ar: 'منصة 10', en: 'Platform 10' }, logoUrl: 'https://placehold.co/140x56/e2e8f0/1e293b?text=S10', href: '#' },
      ],
    },
  },
};

/** Sentinel value for country dropdown “Other”. */
export const countryOtherValue = '__OTHER__';

export const registrationCopy = {
  modalTitle: { ar: 'التسجيل', en: 'Registration' },
  stepChooseType: { ar: 'التسجيل كـ:', en: 'Register as:' },
  typeGuest: { ar: 'زائر', en: 'Guest' },
  typeParticipant: { ar: 'مشارك', en: 'Participant' },
  back: { ar: 'رجوع', en: 'Back' },
  close: { ar: 'إغلاق', en: 'Close' },
  closeOverlay: { ar: 'إغلاق النافذة', en: 'Close dialog' },
  submit: { ar: 'إرسال', en: 'Submit' },
  submitting: { ar: 'جاري الإرسال…', en: 'Sending…' },
  requiredHint: { ar: 'جميع الحقول إلزامية.', en: 'All fields are required.' },
  participantClosedTitle: { ar: 'تسجيل المشاركين مغلق', en: 'Participant registration closed' },
  participantClosedBody: {
    ar: 'انتهى موعد تسجيل المشاركين (9 أكتوبر 2026، 12 صباحاً بتوقيت عمان).',
    en: 'Participant registration ended (9 Oct 2026, 12:00 AM Amman time).',
  },
  globalClosedTitle: { ar: 'التسجيل مغلق', en: 'Registration closed' },
  globalClosedBody: {
    ar: 'انتهى موعد تسجيل الزوار (18 أكتوبر 2026، 9 صباحاً بتوقيت عمان).',
    en: 'Guest registration ended (18 Oct 2026, 9:00 AM Amman time).',
  },
  successTitle: { ar: 'تم الإرسال', en: 'Success' },
  successParticipant: { ar: 'تم استلام تسجيلك بنجاح.', en: 'Your registration was received successfully.' },
  successGuestLine1: { ar: 'تم استلام تسجيلك بنجاح.', en: 'Your registration was received successfully.' },
  successGuestLine2: {
    ar: 'تحقق من بريدك الإلكتروني لبطاقة الدخول.',
    en: 'Please check your email for your entry badge.',
  },
  errorGeneric: {
    ar: 'تعذر إكمال الطلب. حاول لاحقاً أو تحقق من الإعدادات.',
    en: 'We could not complete the request. Try again later or check configuration.',
  },
  errorSheets: {
    ar: 'تعذر حفظ البيانات. حاول لاحقاً.',
    en: 'Could not save your data. Please try again later.',
  },
  errorEmail: {
    ar: 'تم الحفظ لكن تعذر إرسال البريد. تواصل مع الدعم.',
    en: 'Saved, but email could not be sent. Please contact support.',
  },
  /** When EmailJS returns Gmail invalid grant / OAuth (HTTP 412). */
  errorEmailGmailReconnect: {
    ar: 'تم حفظ التسجيل، لكن إرسال البريد فشل: يجب إعادة ربط حساب Gmail في لوحة EmailJS (Invalid grant).',
    en: 'Your registration was saved, but the email could not be sent: reconnect the Gmail account in the EmailJS dashboard (Invalid grant).',
  },
  labels: {
    fullName: { ar: 'الاسم الكامل', en: 'Full name' },
    email: { ar: 'البريد الإلكتروني', en: 'Email' },
    mobile: { ar: 'رقم الجوال', en: 'Mobile number' },
    company: { ar: 'اسم الشركة', en: 'Company name' },
    position: { ar: 'المسمى الوظيفي', en: 'Position' },
    fieldSelect: { ar: 'مجال العمل', en: 'Field' },
    fieldPlaceholder: { ar: '— اختر —', en: '— Select —' },
    country: { ar: 'الدولة', en: 'Country' },
    countryOtherOption: { ar: 'أخرى', en: 'Other' },
    countryOther: { ar: 'اسم الدولة', en: 'Country name' },
    countryOtherPlaceholder: { ar: 'اكتب اسم الدولة', en: 'Type country name' },
  },
};

/** Participant “field” dropdown options. */
export const participantFieldOptions = [
  { value: 'plastics', label: { ar: 'البلاستيك والمطاط', en: 'Plastics & rubber' } },
  { value: 'packaging', label: { ar: 'التغليف والطباعة', en: 'Packaging & printing' } },
  { value: 'petro', label: { ar: 'البتروكيماويات', en: 'Petrochemicals' } },
  { value: 'recycling', label: { ar: 'إعادة التدوير', en: 'Recycling' } },
  { value: 'other', label: { ar: 'أخرى', en: 'Other' } },
];

/** League Arab states + “Other” row handled via countryOtherValue. */
export const arabCountries = [
  { code: 'DZ', ar: 'الجزائر', en: 'Algeria' },
  { code: 'BH', ar: 'البحرين', en: 'Bahrain' },
  { code: 'KM', ar: 'جزر القمر', en: 'Comoros' },
  { code: 'DJ', ar: 'جيبوتي', en: 'Djibouti' },
  { code: 'EG', ar: 'مصر', en: 'Egypt' },
  { code: 'IQ', ar: 'العراق', en: 'Iraq' },
  { code: 'JO', ar: 'الأردن', en: 'Jordan' },
  { code: 'KW', ar: 'الكويت', en: 'Kuwait' },
  { code: 'LB', ar: 'لبنان', en: 'Lebanon' },
  { code: 'LY', ar: 'ليبيا', en: 'Libya' },
  { code: 'MR', ar: 'موريتانيا', en: 'Mauritania' },
  { code: 'MA', ar: 'المغرب', en: 'Morocco' },
  { code: 'OM', ar: 'عُمان', en: 'Oman' },
  { code: 'PS', ar: 'فلسطين', en: 'Palestine' },
  { code: 'QA', ar: 'قطر', en: 'Qatar' },
  { code: 'SA', ar: 'السعودية', en: 'Saudi Arabia' },
  { code: 'SO', ar: 'الصومال', en: 'Somalia' },
  { code: 'SD', ar: 'السودان', en: 'Sudan' },
  { code: 'SY', ar: 'سوريا', en: 'Syria' },
  { code: 'TN', ar: 'تونس', en: 'Tunisia' },
  { code: 'AE', ar: 'الإمارات', en: 'United Arab Emirates' },
  { code: 'YE', ar: 'اليمن', en: 'Yemen' },
];

/** Badge / email extras — passed into HTML builder (no hard-coded slogans inside builder). */
export const badgeBranding = {
  exhibitionDates: { ar: '18 – 20 / 10 / 2026', en: '18 – 20 Oct 2026' },
  slogan: { ar: 'نص الشعار من البيانات', en: 'Slogan from data' },
  organizerLine: { ar: 'سيلفر إليت — نص تجريبي', en: 'Silver Elite — placeholder' },
};

/** Z-index scale (document in CSS using same tokens). */
export const zIndex = {
  header: 40,
  mobileNav: 45,
  modalBackdrop: 50,
  modalDialog: 60,
};

/** Legal / copyright name line in footer. */
export const siteLegalName = {
  ar: 'سيلفر إليت',
  en: 'Silver Elite',
};
