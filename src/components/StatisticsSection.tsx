import { BarChart3 } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';
import { useInViewOnce } from '../hooks/useInViewOnce';
import { useCountUp } from '../hooks/useCountUp';

type StatAnimate = { end: number; prefix?: string; suffix?: string };

export type StatRow = {
  label: string;
  value: string;
  animate?: StatAnimate;
};

function formatDigits(n: number): string {
  return new Intl.NumberFormat('en-US').format(n);
}

function AnimatedStatValue({
  animate,
  active,
  delayMs,
  instant,
}: {
  animate: StatAnimate;
  active: boolean;
  delayMs: number;
  instant: boolean;
}) {
  const v = useCountUp(animate.end, active, {
    durationMs: 1400,
    delayMs,
    instant,
  });
  const prefix = animate.prefix ?? '';
  const suffix = animate.suffix ?? '';
  return (
    <span className="font-semibold tabular-nums tracking-tight text-primary">
      {prefix}
      {formatDigits(v)}
      {suffix}
    </span>
  );
}

type Props = {
  title?: string;
  rows: StatRow[];
};

export function StatisticsSection({ title, rows }: Props) {
  const { ref, inView } = useInViewOnce<HTMLElement>();
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="mt-12 sm:mt-14" aria-labelledby="stats-heading">
      <div className="aie-section-head">
        <BarChart3 className="h-5 w-5 shrink-0 text-primary" aria-hidden />
        <h2 id="stats-heading" className="aie-h2">
          {title}
        </h2>
      </div>
      <p className="mt-3 max-w-measure text-body-sm text-steel/95">
        أرقام رئيسية تساعد المستثمرين وصناع القرار على تقييم حجم السوق والفرص في الأردن والمنطقة.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {rows.map((row, index) => {
          const hasAnim = Boolean(row.animate);
          const stagger = index * 140;
          const instant = Boolean(reduceMotion);

          return (
            <article
              key={row.label}
              className={[
                'group relative overflow-hidden rounded-corporate border border-gray-200/90 bg-white/95 p-6 shadow-card backdrop-blur-sm transition-all duration-300',
                'hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-card-hover',
                inView ? 'opacity-100' : 'opacity-[0.92]',
              ].join(' ')}
              style={{
                transitionDelay: inView ? `${Math.min(index * 60, 180)}ms` : '0ms',
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-primary to-primary/70 transition-transform duration-700 ease-out"
                style={{
                  transform: inView ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'right center',
                }}
              />
              <p className="text-right text-body-sm font-medium leading-relaxed text-steel">{row.label}</p>
              <div className="mt-5 min-h-[3rem] text-right">
                {hasAnim && row.animate ? (
                  <p className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
                    <AnimatedStatValue
                      animate={row.animate}
                      active={inView}
                      delayMs={stagger}
                      instant={instant}
                    />
                  </p>
                ) : (
                  <p className="text-xl font-semibold leading-snug text-primary md:text-2xl">{row.value}</p>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
