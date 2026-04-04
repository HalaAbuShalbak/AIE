import { NavLink } from 'react-router-dom';
import { Building2, CalendarClock, Handshake, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useRegistration } from '../context/RegistrationContext';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'flex min-h-[2.75rem] items-center gap-2 rounded-corporate px-3 py-2 text-body-sm font-medium transition-colors',
    isActive ? 'bg-primary/10 text-primary' : 'text-steel hover:bg-slate hover:text-primary',
  ].join(' ');

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { openModal } = useRegistration();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200/90 bg-white/90 shadow-nav backdrop-blur-md">
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="flex min-w-0 items-center gap-3 rounded-corporate py-1 pr-1 outline-none transition-opacity hover:opacity-95"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-corporate bg-primary text-sm font-bold leading-none text-white shadow-sm">
            AIE
          </span>
          <span className="hidden min-w-0 text-right sm:block">
            <span className="block truncate text-body-sm font-semibold leading-snug text-primary">
              المعرض العربي الدولي
            </span>
            <span className="mt-0.5 block text-caption text-steel/90">للصناعات البلاستيكية</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-0.5 md:flex" aria-label="التنقل الرئيسي">
          <NavLink to="/" end className={linkClass}>
            <Building2 className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            المنصة
          </NavLink>
          <NavLink to="/timeline" className={linkClass}>
            <CalendarClock className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            الخط الزمني
          </NavLink>
          <NavLink to="/support" className={linkClass}>
            <Handshake className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
            الدعم والشبكة
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              openModal();
              setOpen(false);
            }}
            className="aie-btn-primary px-3 sm:px-5"
          >
            <span className="hidden sm:inline">تسجيل — Industrial Pass</span>
            <span className="sm:hidden">تسجيل</span>
          </button>
          <button
            type="button"
            className="flex min-h-11 min-w-11 items-center justify-center rounded-corporate text-steel transition-colors hover:bg-slate md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-gray-100 bg-white px-4 py-3 shadow-inner md:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="التنقل — جوال">
            <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>
              <Building2 className="h-4 w-4" />
              المنصة
            </NavLink>
            <NavLink to="/timeline" className={linkClass} onClick={() => setOpen(false)}>
              <CalendarClock className="h-4 w-4" />
              الخط الزمني
            </NavLink>
            <NavLink to="/support" className={linkClass} onClick={() => setOpen(false)}>
              <Handshake className="h-4 w-4" />
              الدعم والشبكة
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
