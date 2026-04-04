import { useEffect, useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, CheckCircle2, Loader2 } from 'lucide-react';
import { registrationForm } from '../../data.js';
import { useRegistration } from '../context/RegistrationContext';
import { buildIndustrialPassHtml, downloadBadgeFile } from '../lib/badgeHtml';
import { getDefaultBadgePayload, isEmailJsConfigured, sendRegistrationEmail } from '../lib/sendRegistration';

type FormState = Record<string, string>;

function emptyForm(): FormState {
  const s: FormState = {};
  for (const f of registrationForm.fields) {
    s[f.name] = '';
  }
  return s;
}

export function RegistrationModal() {
  const { modalOpen, closeModal } = useRegistration();
  const titleId = useId();
  const descId = useId();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [lastBadgeHtml, setLastBadgeHtml] = useState('');

  useEffect(() => {
    if (!modalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [modalOpen, closeModal]);

  useEffect(() => {
    if (!modalOpen) {
      setForm(emptyForm());
      setError(null);
      setSuccess(false);
      setDemoMode(false);
      setSubmitting(false);
    }
  }, [modalOpen]);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const fullName = form.full_name?.trim() ?? '';
    const company = form.company?.trim() ?? '';
    const jobTitle = form.job_title?.trim() ?? '';
    const email = form.email?.trim() ?? '';
    const sector = form.sector?.trim() ?? '';

    if (!fullName || !company || !jobTitle || !email || !sector) {
      setError('يرجى تعبئة جميع الحقول بما فيها البريد الإلكتروني.');
      return;
    }

    const defaults = getDefaultBadgePayload();
    const badgeHtml = buildIndustrialPassHtml({
      fullName,
      company,
      jobTitle,
      sector,
      ...defaults,
    });
    setLastBadgeHtml(badgeHtml);

    setSubmitting(true);
    try {
      if (isEmailJsConfigured()) {
        await sendRegistrationEmail({
          fullName,
          company,
          jobTitle,
          email,
          sector,
          badgeHtml,
        });
        setDemoMode(false);
      } else {
        setDemoMode(true);
      }
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('تعذر إرسال الطلب. تحقق من إعدادات EmailJS أو حاول لاحقاً.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDownload = () => {
    if (lastBadgeHtml) downloadBadgeFile(lastBadgeHtml);
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center sm:p-6">
          <motion.button
            type="button"
            aria-label="إغلاق النافذة"
            className="absolute inset-0 bg-slate-900/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeModal}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={success ? undefined : descId}
            className="relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-corporate border border-gray-200/95 bg-white shadow-card-hover"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 bg-gradient-to-l from-slate/90 to-white px-5 py-4 sm:px-6">
              <div className="min-w-0 text-right">
                <h2 id={titleId} className="text-title-md text-primary">
                  {success ? 'تم التسجيل بنجاح' : 'Industrial Pass'}
                </h2>
                {!success && (
                  <p id={descId} className="mt-1 text-caption text-steel/90">
                    بياناتك تُستخدم لإصدار بطاقة دخول رقمية عبر البريد.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-corporate text-steel transition-colors hover:bg-gray-100"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-6 sm:py-6">
              {success ? (
                <div className="space-y-5 text-center">
                  <CheckCircle2 className="mx-auto h-14 w-14 text-primary" aria-hidden />
                  <p className="text-body-sm leading-relaxed text-steel">
                    {demoMode
                      ? 'تم تجهيز بطاقة الدخول. أضف مفاتيح EmailJS في ملف البيئة لإرسال البريد تلقائياً.'
                      : 'تم إرسال بطاقة الدخول إلى بريدك الإلكتروني.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex w-full min-h-[2.75rem] items-center justify-center gap-2 rounded-corporate border border-primary bg-white px-4 text-body-sm font-semibold text-primary shadow-sm transition-colors hover:bg-primary/5"
                  >
                    <Download className="h-4 w-4" aria-hidden />
                    تحميل البادج (نموذج HTML)
                  </button>
                  <button type="button" onClick={closeModal} className="aie-btn-primary w-full">
                    إغلاق
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-body-sm leading-relaxed text-steel">
                    نموذج موجز لطلب بطاقة الدخول. جميع الحقول إلزامية بما فيها البريد المهني.
                  </p>
                  {registrationForm.fields.map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="mb-1.5 block text-right text-body-sm font-semibold text-primary">
                        {field.label}
                        <span className="text-red-600"> *</span>
                      </label>
                      {field.type === 'select' && field.options ? (
                        <select
                          id={field.name}
                          required
                          value={form[field.name] ?? ''}
                          onChange={(ev) => handleChange(field.name, ev.target.value)}
                          className="aie-input cursor-pointer"
                        >
                          <option value="">— اختر القطاع —</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={field.name}
                          type={field.type === 'email' ? 'email' : 'text'}
                          required={field.name === 'email' || field.type === 'text'}
                          value={form[field.name] ?? ''}
                          onChange={(ev) => handleChange(field.name, ev.target.value)}
                          className="aie-input"
                          autoComplete={
                            field.name === 'email'
                              ? 'email'
                              : field.name === 'full_name'
                                ? 'name'
                                : 'organization'
                          }
                        />
                      )}
                    </div>
                  ))}

                  {error && (
                    <p className="rounded-corporate border border-red-200 bg-red-50 px-3 py-2.5 text-body-sm text-red-700" role="alert">
                      {error}
                    </p>
                  )}

                  <button type="submit" disabled={submitting} className="aie-btn-primary w-full disabled:opacity-60">
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        جاري الإرسال...
                      </>
                    ) : (
                      'إرسال والحصول على البادج'
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
