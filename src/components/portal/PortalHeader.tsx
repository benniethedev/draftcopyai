'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Plus, Bell, User, LogOut, Settings, HelpCircle, FileText } from 'lucide-react';
import { Client } from '@/types/portal';

interface PortalHeaderProps {
  client: Client;
}

export default function PortalHeader({ client }: PortalHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const initials = client.name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/portal" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="DraftCopyAI"
                width={140}
                height={28}
                className="h-7 w-auto"
                priority
              />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/portal"
                className="text-sm font-medium text-secondary-500 hover:text-primary-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/portal/projects"
                className="text-sm font-medium text-secondary-500 hover:text-primary-900 transition-colors"
              >
                Projects
              </Link>
              <Link
                href="/portal/templates"
                className="text-sm font-medium text-secondary-500 hover:text-primary-900 transition-colors"
              >
                Templates
              </Link>
              <Link
                href="/portal/briefs/new"
                className="text-sm font-medium text-secondary-500 hover:text-primary-900 transition-colors"
              >
                Submit Brief
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* New Brief Button */}
            <Link
              href="/portal/briefs/new"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent-500 px-4 py-2 text-sm font-semibold text-white hover:bg-accent-600 transition-colors"
            >
              <Plus className="h-4 w-4" />
              New Brief
            </Link>

            {/* Notifications */}
            <button className="relative p-2 text-secondary-500 hover:text-primary-900 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent-500" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-900 text-white text-sm font-semibold">
                  {initials}
                </div>
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setUserMenuOpen(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg border border-slate-200 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="font-medium text-primary-900">{client.name}</p>
                        <p className="text-sm text-secondary-500">{client.company}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/portal/settings"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-secondary-600 hover:bg-slate-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          Settings
                        </Link>
                        <Link
                          href="/portal/help"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-secondary-600 hover:bg-slate-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <HelpCircle className="h-4 w-4" />
                          Help & Support
                        </Link>
                      </div>
                      <div className="border-t border-slate-100 py-1">
                        <button
                          className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 text-secondary-500 hover:text-primary-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-slate-100"
            >
              <div className="space-y-1 py-4">
                <Link
                  href="/portal"
                  className="block px-3 py-2 text-base font-medium text-secondary-600 hover:text-primary-900 hover:bg-slate-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/portal/projects"
                  className="block px-3 py-2 text-base font-medium text-secondary-600 hover:text-primary-900 hover:bg-slate-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </Link>
                <Link
                  href="/portal/templates"
                  className="block px-3 py-2 text-base font-medium text-secondary-600 hover:text-primary-900 hover:bg-slate-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Templates
                  </span>
                </Link>
                <Link
                  href="/portal/briefs/new"
                  className="block px-3 py-2 text-base font-medium text-accent-600 hover:text-accent-700 hover:bg-accent-50 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Submit New Brief
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
