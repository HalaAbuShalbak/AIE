export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-slate">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-center text-xs text-steel md:flex-row md:items-center md:justify-between md:text-right">
        <p>© {new Date().getFullYear()} المعرض العربي الدولي للصناعات البلاستيكية (AIE). جميع الحقوق محفوظة.</p>
        <p className="text-[11px]">نصنع الحياة أسهل — We Make Life Easier</p>
      </div>
    </footer>
  );
}
