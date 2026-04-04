import emailjs from '@emailjs/browser';
import type { BadgePayload } from './badgeHtml';

const SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? '';
const TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? '';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? '';

export function isEmailJsConfigured(): boolean {
  return Boolean(SERVICE && TEMPLATE && PUBLIC_KEY && SERVICE !== 'your_service_id');
}

export type RegistrationParams = {
  fullName: string;
  company: string;
  jobTitle: string;
  email: string;
  sector: string;
  badgeHtml: string;
};

/**
 * يرسل عبر EmailJS. عيّن المتغيرات في .env وفق قالبك (مثلاً: user_email, badge_html, ...).
 */
export async function sendRegistrationEmail(params: RegistrationParams): Promise<void> {
  if (!isEmailJsConfigured()) {
    throw new Error('EMAILJS_NOT_CONFIGURED');
  }

  await emailjs.send(
    SERVICE,
    TEMPLATE,
    {
      user_email: params.email,
      reply_to: params.email,
      full_name: params.fullName,
      company: params.company,
      job_title: params.jobTitle,
      sector: params.sector,
      badge_html: params.badgeHtml,
      message: params.badgeHtml,
    },
    { publicKey: PUBLIC_KEY }
  );
}

export function getDefaultBadgePayload(): Pick<
  BadgePayload,
  'exhibitionDates' | 'sloganAr' | 'sloganEn'
> {
  return {
    exhibitionDates: '18 - 20 / 10 / 2026',
    sloganAr: 'نصنع الحياة أسهل',
    sloganEn: 'We Make Life Easier',
  };
}
