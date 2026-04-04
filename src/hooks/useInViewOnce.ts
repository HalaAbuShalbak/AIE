import { useCallback, useEffect, useState } from 'react';

/**
 * يفعّل مرة واحدة عند دخول العنصر إلى نطاق الرؤية (مناسب للعدّادات).
 * يستخدم callback ref لضمان ربط المراقب بعد تركيب العنصر.
 */
export function useInViewOnce<T extends HTMLElement = HTMLElement>(
  options?: IntersectionObserverInit
) {
  const [node, setNode] = useState<T | null>(null);
  const [inView, setInView] = useState(false);

  const ref = useCallback((el: T | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (inView || !node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: '0px 0px -6% 0px', ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, inView, options]);

  return { ref, inView };
}
