/**
 * @fileoverview Manajemen tema Dark/Light mode
 * @author DexVoucher Team
 */

const ThemeManager = {
  KEY: 'nxt_theme',

  /**
   * Inisialisasi tema saat halaman dimuat
   * Baca dari localStorage, fallback ke dark mode
   */
  init() {
    const savedTheme = Storage.get(this.KEY) || 'dark';
    this.apply(savedTheme);
  },

  /**
   * Terapkan tema ke elemen <html>
   * @param {string} theme - "dark" atau "light"
   */
  apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    Storage.set(this.KEY, theme);
  },

  /**
   * Toggle antara dark ↔ light
   */
  toggle() {
    const current = this.getCurrent();
    const next = current === 'dark' ? 'light' : 'dark';
    this.apply(next);
    this.updateToggleIcon(next);
  },

  /**
   * Dapatkan tema yang sedang aktif
   * @returns {string} "dark" atau "light"
   */
  getCurrent() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  },

  /**
   * Update icon tombol toggle sesuai tema
   * @param {string} theme - "dark" atau "light"
   */
  updateToggleIcon(theme) {
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    toggleBtns.forEach(btn => {
      btn.classList.toggle('light', theme === 'light');
      btn.setAttribute('aria-label', `Ganti ke mode ${theme === 'dark' ? 'terang' : 'gelap'}`);
    });
  },

  /**
   * Pasang event listener ke semua tombol toggle tema
   */
  setupToggleListener() {
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    const currentTheme = this.getCurrent();
    this.updateToggleIcon(currentTheme);

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', () => this.toggle());
    });
  }
};
