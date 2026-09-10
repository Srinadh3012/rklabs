import { Link, useRouterState, Outlet } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import {
  Menu,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function PublicHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="RK Repair Labs"
            className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/10 bg-white/5"
          />
          <div className="hidden sm:block">
            <div className="text-base md:text-lg font-bold tracking-tight text-white leading-none">
              RK Repair Labs
            </div>
            <div className="text-[10px] md:text-xs uppercase tracking-widest text-cyan-400 font-semibold mt-1">
              Repair System
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-cyan-400 relative py-2",
                path === link.to ? "text-cyan-400" : "text-slate-300",
              )}
            >
              {link.label}
              {path === link.to && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-cyan-400 rounded-t-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/track" className="hidden sm:inline-flex">
            <Button variant="ghost" className="text-slate-300 hover:text-white font-semibold">
              Track Repair
            </Button>
          </Link>
          <Link to="/auth">
            <Button className="shadow-[var(--shadow-neon)] transition-transform hover:-translate-y-0.5 bg-[var(--neon)] text-black font-bold">
              Sign In
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-slate-300 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-80 border-l border-white/10 bg-[#0f172a] p-0 flex flex-col h-full"
            >
              <div className="p-6 border-b border-white/5 flex items-center gap-3">
                <img src="/logo.png" alt="RK Repair Labs" className="h-10 w-10 rounded-full" />
                <div>
                  <div className="text-lg font-bold text-white">RK Repair Labs</div>
                  <div className="text-xs uppercase text-cyan-400">Repair System</div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-xl text-base font-semibold transition-all",
                      path === link.to
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-slate-300 hover:bg-white/5",
                    )}
                  >
                    {link.label}
                    <ChevronRight className="h-4 w-4 opacity-50" />
                  </Link>
                ))}
                <Link
                  to="/track"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between p-4 rounded-xl text-base font-semibold text-slate-300 hover:bg-white/5 transition-all mt-4 border border-white/10"
                >
                  Track Repair
                  <ChevronRight className="h-4 w-4 opacity-50" />
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function PublicFooter() {
  return (
    <footer className="border-t border-white/5 bg-[#0f172a] pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="RK Repair Labs"
                className="h-12 w-12 rounded-full border border-white/10 bg-white/5"
              />
              <div>
                <div className="text-xl font-bold tracking-tight text-white leading-none">
                  RK Repair Labs
                </div>
                <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold mt-1">
                  Repair System
                </div>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Expert laptop and mobile repair services in Guntur. 11+ years of experience in
              chip-level repairs, screen replacement, and software solutions.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/919666984949"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-slate-300 hover:bg-[#25D366] hover:text-white transition-all"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {NAV_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-slate-400 hover:text-cyan-400 transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <ChevronRight className="h-3 w-3" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Our Services</h3>
            <ul className="space-y-4">
              <li className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-500" /> Laptop Chip-Level Repair
              </li>
              <li className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-500" /> iPhone & Mobile Repair
              </li>
              <li className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-500" /> Screen Replacement
              </li>
              <li className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-500" /> Dead Condition Recovery
              </li>
              <li className="text-slate-400 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-cyan-500" /> Software Solutions
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm leading-relaxed">
                  Shop No 5, Sri Srinivasa Complex, Opp. R.T.C Bus Stand, Guntur, AP
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-cyan-500 shrink-0" />
                <a
                  href="tel:+919666984949"
                  className="text-slate-400 hover:text-white text-sm font-medium"
                >
                  +91 96669 84949
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-cyan-500 shrink-0" />
                <a
                  href="mailto:info@rkrepairlabs.com"
                  className="text-slate-400 hover:text-white text-sm font-medium"
                >
                  info@rkrepairlabs.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-cyan-500 shrink-0" />
                <span className="text-slate-400 text-sm">Mon - Sat: 10:00 AM - 8:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} RK Repair Labs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/track"
              className="text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors"
            >
              Track Repair
            </Link>
            <Link
              to="/auth"
              className="text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors"
            >
              Admin Sign In
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-slate-200 selection:bg-cyan-500/30 font-sans">
      <PublicHeader />
      <main className="flex-1 w-full flex flex-col">{children}</main>
      <PublicFooter />
    </div>
  );
}
