import { MapPin, Factory, BarChart3 } from 'lucide-react';
import { SectionFade } from '../components/SectionFade';
import { companyInfo } from '../../data.js';

export function PlatformPage() {
  const hero = companyInfo.find((c) => c.section === 'hero');
  const stats = companyInfo.find((c) => c.section === 'statistics');
  const why = companyInfo.find((c) => c.section === 'why_jordan');

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
      <SectionFade>
        <div className="border-b border-gray-200 pb-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-10">
            <div className="flex-1 text-right">
              <p className="text-xs font-medium uppercase tracking-wide text-steel">الصفحة 1 — المنصة</p>
              <h1 className="mt-2 text-2xl font-bold text-primary md:text-3xl">{hero?.title}</h1>
              <p className="mt-2 text-sm text-primary/90">{hero?.subtitle}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-steel">{hero?.description}</p>
            </div>
            <div className="flex w-full shrink-0 flex-col justify-center rounded-corporate border border-gray-200 bg-slate p-6 lg:w-72">
              <div className="mx-auto flex h-20 w-full max-w-[200px] items-center justify-center rounded-corporate bg-primary text-lg font-bold text-white">
                AIE
              </div>
              <p className="mt-3 text-center text-[11px] text-steel">مكان الشعار — قريباً</p>
            </div>
          </div>
        </div>
      </SectionFade>

      <SectionFade className="mt-10">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <BarChart3 className="h-5 w-5 text-primary" aria-hidden />
          <h2 className="text-lg font-semibold text-primary">{stats?.title}</h2>
        </div>

        <div className="mt-6 overflow-hidden rounded-corporate border border-gray-200">
          <div className="hidden md:block">
            <table className="w-full border-collapse text-right text-sm">
              <thead>
                <tr className="bg-slate text-primary">
                  <th className="border-b border-gray-200 px-4 py-3 font-semibold">المؤشر</th>
                  <th className="border-b border-gray-200 px-4 py-3 font-semibold">القيمة</th>
                </tr>
              </thead>
              <tbody>
                {(stats?.data ?? []).map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-white' : 'bg-slate/50'}>
                    <td className="border-b border-gray-100 px-4 py-3 text-steel">{row.label}</td>
                    <td className="border-b border-gray-100 px-4 py-3 font-medium text-primary">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="divide-y divide-gray-100 md:hidden">
            {(stats?.data ?? []).map((row) => (
              <div key={row.label} className="bg-white px-4 py-4">
                <p className="text-xs text-steel">{row.label}</p>
                <p className="mt-1 font-semibold text-primary">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionFade>

      <SectionFade className="mt-12">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
          <MapPin className="h-5 w-5 text-primary" aria-hidden />
          <h2 className="text-lg font-semibold text-primary">{why?.title}</h2>
        </div>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {(why?.points ?? []).map((point, idx) => (
            <li
              key={idx}
              className="rounded-corporate border border-gray-200 bg-white p-4 text-right text-sm leading-relaxed text-steel"
            >
              <Factory className="mb-2 h-5 w-5 text-primary" aria-hidden />
              {point}
            </li>
          ))}
        </ul>
      </SectionFade>
    </div>
  );
}
