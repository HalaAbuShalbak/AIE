import { NavLink } from 'react-router-dom';
import { Building2, CalendarClock, Handshake, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useRegistration } from '../context/RegistrationContext';

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'flex items-center gap-2 rounded-corporate px-3 py-2 text-sm font-medium transition-colors',
    isActive ? 'bg-primary/10 text-primary' : 'text-steel hover:bg-slate hover:text-primary',
  ].join(' ');

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { openModal } = useRegistration();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-corporate bg-primary text-xs font-bold text-white">
            AIE
          </span>
          <span className="hidden text-right text-sm font-semibold text-primary sm:block">
            المعرض العربي الدولي
            <span className="block text-[11px] font-normal text-steel">للصناعات البلاستيكية</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>
            <Building2 className="h-4 w-4 shrink-0" aria-hidden />
            المنصة
          </NavLink>
          <NavLink to="/timeline" className={linkClass}>
            <CalendarClock className="h-4 w-4 shrink-0" aria-hidden />
            الخط الزمني
          </NavLink>
          <NavLink to="/support" className={linkClass}>
            <Handshake className="h-4 w-4 shrink-0" aria-hidden />
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
            className="rounded-corporate bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            تسجيل الدخول — Industrial Pass
          </button>
          <button
            type="button"
            className="rounded-corporate p-2 text-steel md:hidden"
            aria-expanded={open}
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-gray-100 bg-white px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
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
