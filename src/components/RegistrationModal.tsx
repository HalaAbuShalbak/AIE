import { useEffect, useState } from 'react';
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
  const [form, setForm] = useState<FormState>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [lastBadgeHtml, setLastBadgeHtml] = useState('');

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
        <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
          <motion.button
            type="button"
            aria-label="إغلاق"
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={closeModal}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="registration-title"
            className="relative z-10 w-full max-w-md overflow-hidden rounded-corporate border border-gray-200 bg-white shadow-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between border-b border-gray-100 bg-slate px-4 py-3">
              <h2 id="registration-title" className="text-base font-semibold text-primary">
                {success ? 'تم التسجيل' : 'Industrial Pass — تسجيل'}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="rounded-corporate p-1 text-steel hover:bg-gray-200"
                aria-label="إغلاق"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              {success ? (
                <div className="space-y-4 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden />
                  <p className="text-sm text-steel">
                    {demoMode
                      ? 'تم حفظ بياناتك محلياً. أضف مفاتيح EmailJS في ملف البيئة لإرسال البريد تلقائياً.'
                      : 'تم إرسال بطاقة الدخول إلى بريدك الإلكتروني.'}
                  </p>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-corporate border border-primary bg-white px-4 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                  >
                    <Download className="h-4 w-4" />
                    تحميل البادج (نموذج HTML)
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-full rounded-corporate bg-primary py-2.5 text-sm font-medium text-white hover:opacity-90"
                  >
                    إغلاق
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-xs text-steel">
                    نموذج مهني للحصول على بطاقة الدخول الصناعية. البريد الإلكتروني إلزامي.
                  </p>
                  {registrationForm.fields.map((field) => (
                    <div key={field.name}>
                      <label htmlFor={field.name} className="mb-1 block text-sm font-medium text-primary">
                        {field.label}
                        <span className="text-red-600"> *</span>
                      </label>
                      {field.type === 'select' && field.options ? (
                        <select
                          id={field.name}
                          required
                          value={form[field.name] ?? ''}
                          onChange={(ev) => handleChange(field.name, ev.target.value)}
                          className="w-full rounded-corporate border border-gray-300 bg-white px-3 py-2 text-sm text-steel focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="">— اختر —</option>
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
                          className="w-full rounded-corporate border border-gray-300 px-3 py-2 text-sm text-steel focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
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
                    <p className="text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-corporate bg-primary py-2.5 text-sm font-medium text-white disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
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
