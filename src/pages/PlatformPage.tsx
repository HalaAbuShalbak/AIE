import { MapPin, Factory } from 'lucide-react';
import { SectionFade } from '../components/SectionFade';
import { StatisticsSection, type StatRow } from '../components/StatisticsSection';
import { companyInfo } from '../../data.js';

export function PlatformPage() {
  const hero = companyInfo.find((c) => c.section === 'hero');
  const stats = companyInfo.find((c) => c.section === 'statistics');
  const why = companyInfo.find((c) => c.section === 'why_jordan');

  return (
    <div className="aie-page">
      <SectionFade>
        <section
          className="relative overflow-hidden rounded-corporate border border-gray-200/90 bg-white/95 p-6 shadow-card backdrop-blur-sm sm:p-8 lg:p-10"
          aria-labelledby="platform-hero-title"
        >
          <div
            className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl animate-hero-fade"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-primary/[0.06] blur-2xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-white/95 via-slate/30 to-transparent"
            aria-hidden
          />
          <div className="relative">
            <p className="aie-eyebrow">الصفحة 1 — المنصة</p>
            <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
              <div className="min-w-0 flex-1 text-right">
                <h1 id="platform-hero-title" className="aie-h1">
                  {hero?.title}
                </h1>
                <p className="mt-3 text-body-sm font-medium text-primary/95">{hero?.subtitle}</p>
                <p className="aie-lead mt-5">{hero?.description}</p>
              </div>
              <aside className="flex w-full shrink-0 flex-col justify-center lg:w-80">
                <div className="rounded-corporate border border-gray-200/90 bg-white/90 p-6 shadow-card">
                  <div className="mx-auto flex aspect-[5/2] w-full max-w-[220px] items-center justify-center rounded-corporate bg-gradient-to-br from-primary to-[#143d72] text-lg font-bold text-white shadow-inner">
                    AIE
                  </div>
                  <p className="mt-4 text-center text-caption text-steel/90">مكان الشعار — قريباً</p>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </SectionFade>

      <StatisticsSection title={stats?.title} rows={(stats?.data ?? []) as StatRow[]} />

      <SectionFade className="mt-14 sm:mt-16">
        <div className="aie-section-head">
          <MapPin className="h-5 w-5 shrink-0 text-primary" aria-hidden />
          <h2 id="why-jordan" className="aie-h2">
            {why?.title}
          </h2>
        </div>
        <ul className="mt-8 grid gap-4 sm:gap-5 md:grid-cols-3" aria-labelledby="why-jordan">
          {(why?.points ?? []).map((point, idx) => (
            <li key={idx} className="aie-card p-5 text-right">
              <div className="mb-3 flex items-start justify-between gap-2">
                <Factory className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span className="text-caption font-semibold text-primary/55">0{idx + 1}</span>
              </div>
              <p className="text-body-sm leading-relaxed text-steel">{point}</p>
            </li>
          ))}
        </ul>
      </SectionFade>
    </div>
  );
}
