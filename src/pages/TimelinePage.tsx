import { SectionFade } from '../components/SectionFade';
import { exhibitionVersions } from '../../data.js';

export function TimelinePage() {
  const evolution = exhibitionVersions.find((x) => x.id === 1);
  const sectors = exhibitionVersions.find((x) => x.id === 2);
  const versions = evolution?.versions ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <SectionFade>
        <p className="text-xs font-medium uppercase tracking-wide text-steel">الصفحة 2 — الخط الزمني</p>
        <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">{evolution?.title}</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-steel">{evolution?.description}</p>
      </SectionFade>

      <SectionFade className="mt-10">
        <div className="relative">
          <div className="absolute right-[19px] top-0 hidden h-full w-px bg-gray-300 md:block" aria-hidden />
          <ul className="space-y-0">
            {versions.map((v, index) => {
              const isLast = index === versions.length - 1;
              const is2026 = v.year === '2026';
              return (
                <li key={v.year} className="relative flex gap-4 md:gap-6">
                  <div className="flex shrink-0 flex-col items-center">
                    <span
                      className={`z-10 flex h-10 w-10 items-center justify-center rounded-corporate text-xs font-bold text-white ${
                        is2026 ? 'bg-primary ring-2 ring-primary/30' : 'bg-steel'
                      }`}
                    >
                      {v.year}
                    </span>
                    {!isLast && <span className="hidden w-px flex-1 bg-gray-300 md:block" style={{ minHeight: 24 }} />}
                  </div>
                  <div
                    className={`mb-8 flex-1 rounded-corporate border p-4 text-right md:p-5 ${
                      is2026 ? 'border-primary bg-slate' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <p className="text-sm font-semibold text-primary">{'edition' in v ? v.edition : ''}</p>
                    {'status' in v && v.status && (
                      <p className="mt-2 text-sm text-steel">{v.status}</p>
                    )}
                    {'date' in v && v.date && (
                      <p className="mt-2 text-sm font-medium text-primary">{v.date}</p>
                    )}
                    {'features' in v && v.features && (
                      <p className="mt-2 text-sm text-steel">{v.features}</p>
                    )}
                    {is2026 && (
                      <p className="mt-3 text-xs font-medium text-primary">الإصدار الجديد 2026 — New Edition</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </SectionFade>

      <SectionFade className="mt-4">
        <h2 className="text-lg font-semibold text-primary">{sectors?.title}</h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {(sectors?.categories ?? []).map((c) => (
            <div
              key={c}
              className="rounded-corporate border border-gray-200 bg-white px-3 py-2.5 text-right text-sm text-steel"
            >
              {c}
            </div>
          ))}
        </div>
      </SectionFade>
    </div>
  );
}
