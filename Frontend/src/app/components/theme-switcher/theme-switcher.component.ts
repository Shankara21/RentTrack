import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent {

  constructor() { }
  theme: string | any;

  ngOnInit() {
    const selectedTheme = localStorage.getItem('theme');
    if (selectedTheme) {
      this.theme = selectedTheme;
    } else {
      this.theme = 'system';
    }

    this.applyTheme();
  }

  detectSystemTheme() {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDarkMode ? 'dark' : 'light';
  }

  switchTheme(theme: string) {
    this.theme = theme;
    localStorage.setItem('theme', theme);
    this.applyTheme();
  }

  applyTheme() {
    if (this.theme != null && this.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else if (this.theme != null && this.theme === 'dark') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else if (this.theme != null && this.theme === 'system') {
      const systemTheme = this.detectSystemTheme();
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(systemTheme);
    }
  }
}
