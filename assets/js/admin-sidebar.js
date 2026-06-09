/**
 * @fileoverview Komponen Sidebar Admin reusable
 * @author DexVoucher Team
 */

const AdminSidebar = {
  MENUS: [
    { label: 'Dashboard', icon: '📊', href: 'dashboard-admin.html' },
    { label: 'Produk', icon: '📦', href: 'manage-products.html' },
    { label: 'Pengguna', icon: '👥', href: 'manage-users.html' },
    { label: 'Transaksi', icon: '<img class="icon-img" src="' + ROOT + '/assets/images/icons/money-bag_1653705.png" alt="" style="width:16px;height:16px">', href: 'manage-transactions.html' },
    { label: 'Promo', icon: '🏷️', href: 'manage-promo.html' },
    { label: 'Laporan', icon: '📈', href: 'reports.html' },
    { label: 'Pengaturan', icon: '⚙️', href: 'settings-admin.html' }
  ],

  /** Render sidebar dan header admin */
  render() {
    const container = document.getElementById('admin-layout');
    if (!container) return;

    const session = Auth.getSession();
    const currentPath = window.location.pathname.split('/').pop();

    container.innerHTML = `
      <aside class="sidebar" id="admin-sidebar">
        <div class="sidebar-header">
          <img src="${ROOT}/assets/images/logo/logo.svg" alt="DexVoucher" onerror="this.style.display='none'" style="width:32px;height:32px">
          <span>DexVoucher</span>
        </div>
        <nav class="sidebar-menu">
          ${this.MENUS.map(m => `
            <a href="${m.href}" class="${currentPath === m.href ? 'active' : ''}">
              <span class="icon">${m.icon}</span>
              ${m.label}
            </a>
          `).join('')}
        </nav>
        <div class="sidebar-footer">
          <div class="admin-info">
            <img src="${session?.avatar || 'assets/images/avatars/default.svg'}" alt="" onerror="this.src='assets/images/avatars/default.svg'">
            <div>
              <div class="name">${session?.name || 'Admin'}</div>
              <div class="role">Admin</div>
            </div>
          </div>
          <button class="btn btn-secondary btn-sm btn-block" id="admin-logout-btn" type="button">🚪 Logout</button>
        </div>
      </aside>

      <div class="admin-main">
        <header class="admin-header">
          <div style="display:flex;align-items:center;gap:12px">
            <button class="sidebar-toggle" id="sidebar-toggle" type="button" aria-label="Buka sidebar">☰</button>
            <span style="font-size:0.85rem;color:var(--text-muted)" id="breadcrumb">Dashboard</span>
          </div>
          <div class="flex items-center gap-md">
            <button class="theme-toggle" id="theme-toggle" type="button" aria-label="Ganti tema" title="Toggle tema"><span class="theme-toggle-knob"></span></button>
            <span style="font-size:0.85rem;color:var(--text-secondary)">${session?.name || 'Admin'}</span>
            <img src="${session?.avatar || 'assets/images/avatars/default.svg'}" alt="" style="width:32px;height:32px;border-radius:50%;object-fit:cover" onerror="this.src='assets/images/avatars/default.svg'">
          </div>
        </header>
        <main class="admin-content" id="admin-content">
          <!-- konten diisi oleh masing2 halaman -->
        </main>
      </div>
    `;

    this._bindEvents();
  },

  _bindEvents() {
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('admin-sidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
    }

    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => Auth.logout());
    }

    // Pasang listener theme toggle
    if (typeof ThemeManager !== 'undefined') ThemeManager.setupToggleListener();
  }
};
