import { SectionFade } from '../components/SectionFade';
import { exhibitionVersions } from '../../data.js';

export function TimelinePage() {
  const evolution = exhibitionVersions.find((x) => x.id === 1);
  const sectors = exhibitionVersions.find((x) => x.id === 2);
  const versions = evolution?.versions ?? [];

  return (
    <div className="aie-page">
      <SectionFade>
        <header className="max-w-measure text-right">
          <p className="aie-eyebrow">الصفحة 2 — الخط الزمني</p>
          <h1 className="aie-h1 mt-3">{evolution?.title}</h1>
          <p className="aie-lead mt-5">{evolution?.description}</p>
        </header>
      </SectionFade>

      <SectionFade className="mt-12 sm:mt-14">
        <div className="relative pr-1 md:pr-0">
          <div
            className="absolute right-[22px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-gray-200 via-gray-300 to-gray-200 md:block"
            aria-hidden
          />
          <ul className="space-y-0">
            {versions.map((v, index) => {
              const isLast = index === versions.length - 1;
              const is2026 = v.year === '2026';
              return (
                <li key={v.year} className="relative flex gap-4 md:gap-7">
                  <div className="flex shrink-0 flex-col items-center pt-1">
                    <span
                      className={`z-10 flex h-11 min-w-[2.75rem] items-center justify-center rounded-corporate px-2 text-caption font-bold text-white shadow-sm ${
                        is2026 ? 'bg-primary ring-2 ring-primary/25' : 'bg-steel'
                      }`}
                    >
                      {v.year}
                    </span>
                    {!isLast && (
                      <span
                        className="mt-2 hidden w-px flex-1 bg-gray-200 md:block"
                        style={{ minHeight: 20 }}
                        aria-hidden
                      />
                    )}
                  </div>
                  <div
                    className={`mb-8 flex-1 rounded-corporate border p-5 text-right shadow-sm transition-shadow md:p-6 ${
                      is2026
                        ? 'border-primary/35 bg-white shadow-card ring-1 ring-primary/10'
                        : 'border-gray-200/95 bg-white/95 hover:shadow-card'
                    }`}
                  >
                    <p className="text-body-sm font-semibold text-primary">
                      {'edition' in v ? v.edition : ''}
                    </p>
                    {'status' in v && v.status && (
                      <p className="mt-2 text-body-sm leading-relaxed text-steel">{v.status}</p>
                    )}
                    {'date' in v && v.date && (
                      <p className="mt-3 text-body font-semibold text-primary">{v.date}</p>
                    )}
                    {'features' in v && v.features && (
                      <p className="mt-2 text-body-sm leading-relaxed text-steel">{v.features}</p>
                    )}
                    {is2026 && (
                      <p className="mt-4 text-caption font-semibold text-primary">
                        الإصدار الجديد 2026 — <span lang="en">New Edition</span>
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </SectionFade>

      <SectionFade className="mt-4 sm:mt-6">
        <h2 className="aie-h2">{sectors?.title}</h2>
        <p className="mt-2 max-w-measure text-body-sm text-steel/95">
          قطاعات مستهدفة تعكس تنوع سلسلة القيمة في الصناعات البلاستيكية والمرتبطة بها.
        </p>
        <div className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {(sectors?.categories ?? []).map((c) => (
            <div
              key={c}
              className="rounded-corporate border border-gray-200/95 bg-white/90 px-4 py-3 text-right text-body-sm font-medium text-steel shadow-sm transition-colors hover:border-primary/20 hover:text-primary"
            >
              {c}
            </div>
          ))}
        </div>
      </SectionFade>
    </div>
  );
}
