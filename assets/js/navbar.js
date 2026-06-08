/**
 * @fileoverview Komponen Navbar reusable untuk DexVoucher
 * Dipanggil di setiap halaman via Navbar.render()
 * @author DexVoucher Team
 */

const Navbar = {
  /** Daftar menu utama */
  MENUS: [
    { label: 'Beranda', href: '/dexvoucher/index.html' },
    { label: 'Game', href: '/dexvoucher/index.html#games' },
    { label: 'Tentang', href: '/dexvoucher/pages/user/about.html' }
  ],

  /** Data game untuk dropdown navigasi */
  GAMES: [
    { id: 'free-fire', name: 'Free Fire', color: '#FF6B35' },
    { id: 'mobile-legends', name: 'Mobile Legends', color: '#1E90FF' },
    { id: 'valorant', name: 'Valorant', color: '#FF4655' },
    { id: 'pubg-mobile', name: 'PUBG Mobile', color: '#F5A623' },
    { id: 'aov', name: 'AOV', color: '#9B59B6' },
    { id: 'genshin-impact', name: 'Genshin Impact', color: '#4A9EFF' },
    { id: 'honkai-star-rail', name: 'Honkai Star Rail', color: '#C0A0FF' },
    { id: 'clash-of-clans', name: 'Clash of Clans', color: '#27AE60' },
    { id: 'roblox', name: 'Roblox', color: '#E2231A' },
    { id: 'codm', name: 'COD Mobile', color: '#C5943E' },
    { id: 'efootball', name: 'eFootball', color: '#00A859' },
    { id: 'delta-force', name: 'Delta Force', color: '#2D5A27' }
  ],

  /** Render navbar ke dalam container */
  render() {
    const container = document.getElementById('navbar-container');
    if (!container) return;

    const session = Auth.getSession();
    const isLoggedIn = !!session;

    container.innerHTML = `
      <nav class="navbar" role="navigation" aria-label="Navigasi utama">
        <div class="navbar-inner">
          <div class="flex items-center gap-lg">
            <button class="navbar-toggle" id="nav-toggle" aria-label="Buka menu" type="button">☰</button>
            <a href="/dexvoucher/index.html" class="navbar-logo">
              <img src="/dexvoucher/assets/images/logo/logo.svg" alt="DexVoucher" onerror="this.style.display='none'" style="width:32px;height:32px">
              DexVoucher
            </a>
          </div>

          <div class="navbar-menu" id="navbar-menu">
            ${this.MENUS.map(m => `
              <a href="${m.href}" data-nav-link>${m.label}</a>
            `).join('')}
          </div>

          <div class="navbar-actions">
            <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Ganti tema" title="Toggle tema"><span class="theme-toggle-knob"></span></button>

            <a href="/dexvoucher/pages/user/cart.html" class="navbar-cart" aria-label="Keranjang belanja">
              <img class="icon-img" src="/dexvoucher/assets/images/icons/checkout.png" alt="" style="width:20px;height:20px">
              <span class="cart-badge" id="cart-badge" style="display:none">0</span>
            </a>

            ${isLoggedIn ? `
              <div class="navbar-user" id="navbar-user">
                <img src="${session.avatar || '/dexvoucher/assets/images/avatars/default.svg'}" alt="${session.name}" class="navbar-avatar" id="user-avatar" onerror="this.src='/dexvoucher/assets/images/avatars/default.svg'">
                <div class="navbar-dropdown" id="user-dropdown">
                  <a href="/dexvoucher/pages/user/profile.html"><img class="icon-img" src="/dexvoucher/assets/images/icons/Profil.png" alt="" style="width:16px;height:16px"> Profil</a>
                  <a href="/dexvoucher/pages/user/history.html"><img class="icon-img" src="/dexvoucher/assets/images/icons/transaction.png" alt="" style="width:16px;height:16px"> Riwayat</a>
                  <a href="/dexvoucher/pages/user/settings.html"><img class="icon-img" src="/dexvoucher/assets/images/icons/setting.png" alt="" style="width:16px;height:16px"> Pengaturan</a>
                  <div class="divider"></div>
                  <button id="logout-btn" type="button">🚪 Logout</button>
                </div>
              </div>
            ` : `
              <a href="/dexvoucher/pages/user/login.html" class="btn btn-primary btn-sm">Masuk</a>
            `}
          </div>
        </div>
      </nav>
    `;

    this._bindEvents(isLoggedIn);
    this.updateCartBadge();
  },

  /** Bind event listeners */
  _bindEvents(isLoggedIn) {
    // Toggle menu mobile
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('navbar-menu');
    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        menu.classList.toggle('open');
        toggle.textContent = menu.classList.contains('open') ? '✕' : '☰';
      });
    }

    // User dropdown
    if (isLoggedIn) {
      const avatar = document.getElementById('user-avatar');
      const dropdown = document.getElementById('user-dropdown');
      if (avatar && dropdown) {
        avatar.addEventListener('click', (e) => {
          e.stopPropagation();
          dropdown.classList.toggle('show');
        });
        document.addEventListener('click', () => dropdown.classList.remove('show'));
      }

      // Logout
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => Auth.logout());
      }
    }

    // Tutup menu mobile saat link diklik
    document.querySelectorAll('[data-nav-link]').forEach(link => {
      link.addEventListener('click', () => {
        menu?.classList.remove('open');
        if (toggle) toggle.textContent = '☰';
      });
    });

    // Tandai link aktif
    this._markActiveLink();

    // Pasang listener theme toggle (tombol sudah ada di DOM sekarang)
    if (typeof ThemeManager !== 'undefined') ThemeManager.setupToggleListener();
  },

  /** Tandai menu yang aktif berdasarkan URL */
  _markActiveLink() {
    const currentPath = window.location.pathname;
    document.querySelectorAll('[data-nav-link]').forEach(link => {
      const href = link.getAttribute('href');
      if (currentPath === href || (href && currentPath.endsWith(href))) {
        link.classList.add('active');
      }
    });
  },

  /** Update jumlah item di badge keranjang */
  updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    try {
      const session = Auth.getSession();
      if (session) {
        const items = Storage.getCart(session.id);
        const count = items.reduce((sum, item) => sum + (item.qty || 1), 0);
        if (count > 0) {
          badge.textContent = count > 99 ? '99+' : count;
          badge.style.display = 'flex';
        } else {
          badge.style.display = 'none';
        }
      } else {
        badge.style.display = 'none';
      }
    } catch {
      badge.style.display = 'none';
    }
  }
};
