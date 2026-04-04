export function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200/90 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-content flex-col gap-4 px-4 py-8 text-center sm:px-6 sm:text-right md:flex-row md:items-center md:justify-between md:gap-8 lg:px-8">
        <p className="text-body-sm leading-relaxed text-steel">
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-primary/95">المعرض العربي الدولي للصناعات البلاستيكية (AIE)</span>
          . جميع الحقوق محفوظة.
        </p>
        <p className="text-caption font-medium text-steel/85 md:whitespace-nowrap">
          نصنع الحياة أسهل — <span lang="en">We Make Life Easier</span>
        </p>
      </div>
    </footer>
  );
}
