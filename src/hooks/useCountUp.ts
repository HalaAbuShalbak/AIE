import { useEffect, useState } from 'react';

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

type Options = {
  durationMs?: number;
  delayMs?: number;
  /** عند true يُعرض الرقم النهائي فوراً */
  instant?: boolean;
};

export function useCountUp(target: number, active: boolean, opts: Options = {}) {
  const { durationMs = 1300, delayMs = 0, instant = false } = opts;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }

    if (instant || target === 0) {
      setValue(target);
      return;
    }

    let rafId = 0;
    const delayTimer = window.setTimeout(() => {
      let startTime: number | null = null;

      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / durationMs);
        setValue(Math.round(easeOutCubic(p) * target));
        if (p < 1) {
          rafId = requestAnimationFrame(tick);
        }
      };

      rafId = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(delayTimer);
      cancelAnimationFrame(rafId);
    };
  }, [active, target, durationMs, delayMs, instant]);

  return value;
}
