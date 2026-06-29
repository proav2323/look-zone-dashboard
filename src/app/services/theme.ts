import { Service, signal, WritableSignal } from '@angular/core';

@Service()
export class Theme {
  theme: WritableSignal<string | null> = signal(
    localStorage.getItem('theme') !== null ? localStorage.getItem('theme') : 'light',
  );

  getTheme() {
    this.showUi();
  }

  showUi() {
    if (this.theme() === 'dark') {
      document.documentElement.style.setProperty('--bg-primary', '#0b0f19');
      document.documentElement.style.setProperty('--bg-dark', '#000617');
      document.documentElement.style.setProperty('--bg-secondary', '#111827');
      document.documentElement.style.setProperty('--bg-surface', '#1f2937');
      document.documentElement.style.setProperty('--color-primary', '#7c3aed');
      document.documentElement.style.setProperty('--color-secondary', '#2563eb');
      document.documentElement.style.setProperty('--color-success', '#22c55e');
      document.documentElement.style.setProperty('--color-warning', '#f59e0b');
      document.documentElement.style.setProperty('--color-error', '#ef4444');
      document.documentElement.style.setProperty('--text-primary', '#f9fafb');
      document.documentElement.style.setProperty('--text-secondary', '#94a3b8');
      document.documentElement.style.setProperty('--border-color', '#1e293b');
      document.documentElement.style.setProperty(
        '--gradient-primary',
        'linear-gradient(135deg, #7c3aed, #2563eb)',
      );
      document.documentElement.style.setProperty(
        '--gradient-success',
        'linear-gradient(135deg, #22c55e, #14b8a6)',
      );
      document.documentElement.style.setProperty(
        '--gradient-dark',
        'linear-gradient(135deg, #111827, #312e81)',
      );
      document.documentElement.style.setProperty('--shadow-sm', '0 2px 8px rgba(0, 0, 0, 0.15)');
      document.documentElement.style.setProperty('--shadow-sm', '0 8px 24px rgba(0, 0, 0, 0.25)');
      document.documentElement.style.setProperty('--shadow-sm', '0 20px 40px rgba(0, 0, 0, 0.35)');
    } else {
      document.documentElement.style.setProperty('--bg-primary', '#F8FAFC');
      document.documentElement.style.setProperty('--bg-dark', 'rgb(143, 149, 157)');
      document.documentElement.style.setProperty('--bg-secondary', '#FFFFFF');
      document.documentElement.style.setProperty('--bg-surface', '#F1F5F9');
      document.documentElement.style.setProperty('--color-primary', '#6D28D9');
      document.documentElement.style.setProperty('--color-secondary', '#2563EB');
      document.documentElement.style.setProperty('--color-success', '#16A34A');
      document.documentElement.style.setProperty('--color-warning', '#D97706');
      document.documentElement.style.setProperty('--color-error', '#DC2626');
      document.documentElement.style.setProperty('--text-primary', '#0F172A');
      document.documentElement.style.setProperty('--text-secondary', '#64748B');
      document.documentElement.style.setProperty('--border-color', '#E2E8F0');
      (document.documentElement.style.setProperty(
        '--gradient-primary',
        'linear-gradient(135deg, #6D28D9, #2563EB)',
      ),
        document.documentElement.style.setProperty(
          '--gradient-success',
          'linear-gradient( 135deg, #16A34A, #0D9488)',
        ));
      document.documentElement.style.setProperty(
        '--gradient-dark',
        'linear-gradient(135deg, #FFFFFF,#EEF2FF)',
      );
      document.documentElement.style.setProperty('--shadow-sm', '0  2px 8px rgba(15,23,42,0.08)');
      document.documentElement.style.setProperty('--shadow-sm', '0 8px 24px rgba(15,23,42,0.12)');
      document.documentElement.style.setProperty('--shadow-sm', '0 20px 40px rgba(15,23,42,0.16)');
    }
  }

  toggleTheme() {
    if (this.theme() === 'light') {
      this.theme.set('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      this.theme.set('light');
      localStorage.setItem('theme', 'light');
    }
    this.showUi();
  }
}
