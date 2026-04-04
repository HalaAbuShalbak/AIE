import { Building2, Sparkles, TrendingUp } from 'lucide-react';
import { SectionFade } from '../components/SectionFade';
import { sponsorInfo } from '../../data.js';

export function SupportPage() {
  const main = sponsorInfo.find((s) => s.id === 1);
  const benefits = sponsorInfo.find((s) => s.id === 2);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <SectionFade>
        <p className="text-xs font-medium uppercase tracking-wide text-steel">الصفحة 3 — الدعم والشبكة</p>
        <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">
          {main?.title ?? 'الشركاء والغرف والفعاليات المتزامنة'}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-steel">{main?.description}</p>
      </SectionFade>

      <SectionFade className="mt-10">
        <div className="grid gap-4 md:grid-cols-2">
          {(main?.sponsors ?? []).map((s) => {
            const isBeauty = s.name === 'Beauty Jo';
            return (
              <article
                key={s.name}
                className={`rounded-corporate border p-5 text-right ${
                  isBeauty
                    ? 'border-accent/40 bg-white'
                    : 'border-gray-200 bg-slate'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className={`text-base font-semibold ${isBeauty ? 'text-accent' : 'text-primary'}`}>
                      {s.name}
                    </h2>
                    <p className="mt-1 text-xs text-steel">{s.role}</p>
                  </div>
                  {isBeauty ? (
                    <Sparkles className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  ) : (
                    <Building2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  )}
                </div>
                {isBeauty && (
                  <p className="mt-3 text-xs leading-relaxed text-steel">
                    معرض متزامن — يُستخدم لون التمييز بشكل خفيف فقط لهذا القسم.
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </SectionFade>

      <SectionFade className="mt-10">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <TrendingUp className="h-5 w-5 text-primary" aria-hidden />
          <h2 className="text-lg font-semibold text-primary">{benefits?.title}</h2>
        </div>
        <ul className="mt-6 space-y-3">
          {(benefits?.benefits ?? []).map((b, i) => (
            <li
              key={i}
              className="flex gap-3 rounded-corporate border border-gray-200 bg-white px-4 py-3 text-right text-sm text-steel"
            >
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-corporate bg-primary/10 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </SectionFade>
    </div>
  );
}
