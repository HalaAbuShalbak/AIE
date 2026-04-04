import { Building2, Sparkles, TrendingUp } from 'lucide-react';
import { SectionFade } from '../components/SectionFade';
import { sponsorInfo } from '../../data.js';

export function SupportPage() {
  const main = sponsorInfo.find((s) => s.id === 1);
  const benefits = sponsorInfo.find((s) => s.id === 2);

  return (
    <div className="aie-page">
      <SectionFade>
        <header className="max-w-measure text-right">
          <p className="aie-eyebrow">الصفحة 3 — الدعم والشبكة</p>
          <h1 className="aie-h1 mt-3">
            {main?.title ?? 'الشركاء والغرف والفعاليات المتزامنة'}
          </h1>
          <p className="aie-lead mt-5">{main?.description}</p>
        </header>
      </SectionFade>

      <SectionFade className="mt-12 sm:mt-14">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {(main?.sponsors ?? []).map((s) => {
            const isBeauty = s.name === 'Beauty Jo';
            return (
              <article
                key={s.name}
                className={`rounded-corporate border p-6 text-right shadow-sm transition-shadow ${
                  isBeauty
                    ? 'border-accent/35 bg-white ring-1 ring-accent/10 hover:shadow-card'
                    : 'border-gray-200/95 bg-white/95 hover:shadow-card'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2
                      className={`text-title-md ${isBeauty ? 'text-accent' : 'text-primary'}`}
                    >
                      {s.name}
                    </h2>
                    <p className="mt-1.5 text-caption font-medium text-steel/90">{s.role}</p>
                  </div>
                  {isBeauty ? (
                    <Sparkles className="h-5 w-5 shrink-0 text-accent" aria-hidden />
                  ) : (
                    <Building2 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                  )}
                </div>
                {isBeauty && (
                  <p className="mt-4 border-t border-gray-100 pt-4 text-body-sm leading-relaxed text-steel">
                    معرض متزامن — يُستخدم لون التمييز بشكل خفيف فقط لهذا القسم.
                  </p>
                )}
              </article>
            );
          })}
        </div>
      </SectionFade>

      <SectionFade className="mt-12 sm:mt-14">
        <div className="aie-section-head">
          <TrendingUp className="h-5 w-5 text-primary" aria-hidden />
          <h2 className="aie-h2">{benefits?.title}</h2>
        </div>
        <ul className="mt-8 space-y-3" role="list">
          {(benefits?.benefits ?? []).map((b, i) => (
            <li
              key={i}
                className="flex gap-4 rounded-corporate border border-gray-200/95 bg-white/95 px-4 py-4 text-right shadow-sm transition-colors hover:border-primary/20 sm:px-5 sm:py-4"
            >
              <span className="mt-0.5 flex h-8 min-w-[2rem] items-center justify-center rounded-corporate bg-primary/10 text-caption font-bold text-primary">
                {i + 1}
              </span>
              <span className="text-body-sm leading-relaxed text-steel">{b}</span>
            </li>
          ))}
        </ul>
      </SectionFade>
    </div>
  );
}
