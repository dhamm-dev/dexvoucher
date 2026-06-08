/**
 * @fileoverview Manajemen produk & render halaman game
 * @author DexVoucher Team
 */

const Products = {
  /** Data konfigurasi tiap game */
  GAMES: {
    'free-fire': {
      name: 'Free Fire',
      color: '#FF6B35',
      icon: 'FF',
      logo: 'Free Fire.png',
      banner: 'FreeFire_B.jpg',
      description: 'Top up Diamond Free Fire dengan harga termurah. Proses cepat dan aman.',
      categories: ['diamond', 'membership'],
      hasServerId: false,
      badge: 'HOT'
    },
    'mobile-legends': {
      name: 'Mobile Legends',
      color: '#1E90FF',
      icon: 'ML',
      logo: 'Mobile_Legend.jpg',
      banner: 'MobileLegend_B.jpg',
      description: 'Top up Diamond Mobile Legends termurah. Starlight Member dan Twilight Pass tersedia.',
      categories: ['diamond', 'membership', 'bundle'],
      hasServerId: true,
      badge: 'POPULER'
    },
    'valorant': {
      name: 'Valorant',
      color: '#FF4655',
      icon: 'V',
      logo: 'Valorant.png',
      banner: 'Valorant_B.jpg',
      description: 'Top up Valorant Points (VP) dengan harga terbaik. Proses instan.',
      categories: ['voucher'],
      hasServerId: false,
      badge: 'SALE'
    },
    'pubg-mobile': {
      name: 'PUBG Mobile',
      color: '#F5A623',
      icon: 'P',
      logo: 'PUBGM.jpg',
      banner: 'PUBGM_B.jpg',
      description: 'Top up UC PUBG Mobile termurah. Royal Pass juga tersedia.',
      categories: ['voucher', 'membership'],
      hasServerId: false,
      badge: null
    },
    'aov': {
      name: 'Arena of Valor',
      color: '#9B59B6',
      icon: 'A',
      logo: 'AOV.png',
      banner: 'AOV_B.jpg',
      description: 'Top up Voucher AOV dengan harga murah dan proses cepat.',
      categories: ['voucher'],
      hasServerId: true,
      badge: null
    },
    'genshin-impact': {
      name: 'Genshin Impact',
      color: '#4A9EFF',
      icon: 'G',
      logo: 'Genshin_Impact.jpg',
      banner: 'GenshinImpact_B.jpg',
      description: 'Top up Genesis Crystal Genshin Impact. Welkin Moon tersedia.',
      categories: ['voucher'],
      hasServerId: false,
      badge: 'NEW'
    },
    'honkai-star-rail': {
      name: 'Honkai: Star Rail',
      color: '#C0A0FF',
      icon: 'H',
      logo: 'Honkai_Star_rail.jpg',
      banner: 'HonkaiStarRail_B.jpg',
      description: 'Top up Oneiric Shard Honkai Star Rail dengan harga terbaik.',
      categories: ['voucher'],
      hasServerId: false,
      badge: 'NEW'
    },
    'clash-of-clans': {
      name: 'Clash of Clans',
      color: '#27AE60',
      icon: 'C',
      logo: 'Clash_of_clans.jpg',
      banner: 'COC_B.jpg',
      description: 'Top up Gems Clash of Clans termurah. Gold Pass juga tersedia.',
      categories: ['voucher'],
      hasServerId: false,
      badge: null
    },
    'roblox': {
      name: 'Roblox',
      color: '#E2231A',
      icon: 'R',
      logo: 'Roblox.png',
      banner: 'Roblox_B.jpg',
      description: 'Top up Robux Roblox dengan harga termurah. Premium membership tersedia.',
      categories: ['voucher', 'membership'],
      hasServerId: false,
      badge: 'HOT',
      accountLabel: 'Username',
      accountPlaceholder: 'Masukkan Username Roblox'
    },
    'codm': {
      name: 'COD Mobile',
      color: '#C5943E',
      icon: 'CM',
      logo: 'CODM.jpg',
      banner: 'CODM_B.jpg',
      description: 'Top up CP COD Mobile termurah. Battle Pass juga tersedia.',
      categories: ['voucher', 'membership'],
      hasServerId: false,
      badge: 'NEW'
    },
    'efootball': {
      name: 'eFootball',
      color: '#00A859',
      icon: 'EF',
      logo: 'Efootball.png',
      banner: 'Efootball_B.jpg',
      description: 'Top up eFootball Coins dengan harga terbaik. Proses instan.',
      categories: ['voucher'],
      hasServerId: false,
      badge: null
    },
    'delta-force': {
      name: 'Delta Force',
      color: '#2D5A27',
      icon: 'DF',
      logo: 'DeltaForce.png',
      banner: 'DeltaForce_B.jpg',
      description: 'Top up Credits Delta Force termurah. Battle Pass tersedia.',
      categories: ['voucher', 'membership'],
      hasServerId: false,
      badge: 'NEW'
    }
  },

  /** Label kategori dalam Bahasa Indonesia */
  CATEGORY_LABELS: {
    diamond: 'Diamond',
    membership: 'Membership',
    voucher: 'Voucher',
    bundle: 'Bundle'
  },

  /**
   * Render halaman game lengkap berdasarkan gameId
   * @param {string} gameId - ID game (contoh: "free-fire")
   */
  renderGamePage(gameId) {
    const game = this.GAMES[gameId];
    if (!game) {
      document.body.innerHTML = '<div class="container" style="padding:100px 20px;text-align:center"><h1>Game tidak ditemukan</h1><a href="/dexvoucher/index.html" class="btn btn-primary mt-lg">Kembali ke Home</a></div>';
      return;
    }

    // Set page title
    document.title = `Top Up ${game.name} — DexVoucher`;

    // Render header
    const header = document.getElementById('game-header');
    if (header) {
      header.innerHTML = `
        <div class="game-banner" style="background-image:url('../../assets/images/banners/${game.banner}');background-size:cover;background-position:center;position:relative">
          <div class="banner-overlay" style="background:linear-gradient(135deg, ${game.color}cc, ${game.color}33)"></div>
          <div class="container" style="position:relative;z-index:2">
            <div class="game-header-content glass-header">
              <div class="game-header-logo" style="background:${game.color}"><img src="../../assets/images/logo/${game.logo}" alt="${game.name}" style="width:100%;height:100%;object-fit:contain;border-radius:inherit"></div>
              <div>
                <h1 class="game-header-title">${game.name}</h1>
                <p class="game-header-desc">${game.description}</p>
                ${game.badge ? `<span class="badge badge-${game.badge.toLowerCase() === 'hot' ? 'hot' : game.badge.toLowerCase() === 'sale' ? 'sale' : 'new'}" style="margin-top:8px;display:inline-block">${game.badge}</span>` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    // Render form ID
    const formContainer = document.getElementById('game-id-form');
    if (formContainer) {
      const accountLabel = game.accountLabel || 'User ID';
      const accountPlaceholder = game.accountPlaceholder || 'Masukkan User ID';
      formContainer.innerHTML = `
        <div class="card">
          <h3 style="margin-bottom:16px;font-size:1rem">Masukkan ${accountLabel}</h3>
          <div class="form-row">
            <div class="input-group">
              <label for="user-id">${accountLabel}</label>
              <input type="text" id="user-id" class="input-field" placeholder="${accountPlaceholder}" required>
              <span class="input-error" id="user-id-error"></span>
            </div>
            ${game.hasServerId ? `
            <div class="input-group">
              <label for="server-id">Server ID</label>
              <input type="text" id="server-id" class="input-field" placeholder="Masukkan Server ID">
              <span class="input-error" id="server-id-error"></span>
            </div>
            ` : ''}
          </div>
          <div style="margin-top:12px">
            <button class="btn btn-outline btn-sm" id="check-id-btn" type="button"><img class="icon-img" src="/dexvoucher/assets/images/icons/search.png" alt="" style="width:14px;height:14px"> Cek ${accountLabel}</button>
            <span id="check-id-result" style="margin-left:12px;font-size:0.85rem"></span>
          </div>
        </div>
      `;
    }

    // Render tabs kategori
    const tabContainer = document.getElementById('category-tabs');
    if (tabContainer) {
      tabContainer.innerHTML = game.categories.map((cat, i) => `
        <button class="tab ${i === 0 ? 'active' : ''}" data-category="${cat}" type="button">${this.CATEGORY_LABELS[cat] || cat}</button>
      `).join('');
    }

    // Render produk
    this._renderProducts(gameId, game.categories[0]);

    // Bind events
    this._bindEvents(gameId, game);
  },

  /**
   * Render grid produk berdasarkan game dan kategori
   * @param {string} gameId
   * @param {string} category
   */
  _renderProducts(gameId, category) {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const allProducts = Storage.getProducts();
    const filtered = allProducts.filter(p =>
      p.game === gameId &&
      p.category === category &&
      p.isActive === true
    );

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-state" style="grid-column:1/-1"><div class="empty-icon"><img class="icon-img" src="/dexvoucher/assets/images/icons/Product.png" alt="" style="width:36px;height:36px"></div><h3>Tidak ada produk</h3><p>Belum ada produk untuk kategori ini</p></div>';
      return;
    }

    grid.innerHTML = filtered.map(p => `
      <div class="product-card" data-product-id="${p.id}">
        ${p.badge ? `<span class="product-badge badge badge-${p.badge.toLowerCase()}">${p.badge}</span>` : ''}
        <div class="product-amount">${p.amount > 0 ? p.amount : ''}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price">${formatRupiah(p.price)}</div>
        ${p.originalPrice > p.price ? `<div class="product-original-price">${formatRupiah(p.originalPrice)}</div>` : '<div style="height:20px"></div>'}
        <div class="product-actions">
          <button class="btn btn-primary btn-sm btn-buy" data-product='${JSON.stringify(p).replace(/'/g, "&#39;")}'>Beli Sekarang</button>
          <button class="btn btn-outline btn-sm btn-cart" data-product='${JSON.stringify(p).replace(/'/g, "&#39;")}'>Tambah ke Keranjang</button>
        </div>
      </div>
    `).join('');
  },

  /**
   * Bind semua event interaktif di halaman game
   * @param {string} gameId
   * @param {Object} game
   */
  _bindEvents(gameId, game) {
    const acctLabel = game.accountLabel || 'User ID';
    // Tab switching
    document.querySelectorAll('[data-category]').forEach(tab => {
      tab.addEventListener('click', function () {
        document.querySelectorAll('[data-category]').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        Products._renderProducts(gameId, this.dataset.category);
      });
    });

    // Cek ID
    const checkBtn = document.getElementById('check-id-btn');
    if (checkBtn) {
      checkBtn.addEventListener('click', function () {
        const userId = document.getElementById('user-id');
        const result = document.getElementById('check-id-result');
        if (!userId.value.trim()) {
          userId.classList.add('error');
          document.getElementById('user-id-error').textContent = acctLabel + ' harus diisi';
          result.textContent = '';
          return;
        }
        userId.classList.remove('error');
        document.getElementById('user-id-error').textContent = '';
        result.innerHTML = '<img class="icon-img" src="/dexvoucher/assets/images/icons/sukses.png" alt="" style="width:16px;height:16px;vertical-align:middle"> ' + acctLabel + ' valid';
        result.style.color = 'var(--success)';

        if (game.hasServerId) {
          const serverId = document.getElementById('server-id');
          if (!serverId.value.trim()) {
            serverId.classList.add('error');
            document.getElementById('server-id-error').textContent = 'Server ID harus diisi';
            return;
          }
          serverId.classList.remove('error');
          document.getElementById('server-id-error').textContent = '';
        }
      });
    }

    // Beli Sekarang
    document.querySelectorAll('.btn-buy').forEach(btn => {
      btn.addEventListener('click', function () {
        const product = JSON.parse(this.dataset.product);
        const userId = document.getElementById('user-id');
        if (!userId || !userId.value.trim()) {
          userId?.classList.add('error');
          document.getElementById('user-id-error').textContent = 'Isi ' + acctLabel + ' terlebih dahulu';
          return;
        }
        const serverId = document.getElementById('server-id');
        Products._showConfirmModal(product, userId.value.trim(), serverId?.value.trim() || '');
      });
    });

    // Tambah ke Keranjang
    document.querySelectorAll('.btn-cart').forEach(btn => {
      btn.addEventListener('click', function () {
        const product = JSON.parse(this.dataset.product);
        const userId = document.getElementById('user-id');
        if (!userId || !userId.value.trim()) {
          userId?.classList.add('error');
          document.getElementById('user-id-error').textContent = 'Isi ' + acctLabel + ' terlebih dahulu';
          return;
        }
        const session = Auth.getSession();
        if (!session) {
          window.location.href = '/dexvoucher/pages/user/login.html?redirect=' + encodeURIComponent(window.location.pathname);
          return;
        }
        const serverId = document.getElementById('server-id');
        const success = Cart.add({
          productId: product.id,
          gameId: gameId,
          gameName: Products.GAMES[gameId].name,
          userId: session.id,
          accountId: userId.value.trim() + (serverId?.value.trim() ? ` (${serverId.value.trim()})` : ''),
          productName: product.name,
          price: product.price,
          qty: 1
        });
        if (success) {
          Navbar.updateCartBadge();
          Products._showToast('success', `${product.name} ditambahkan ke keranjang!`);
        } else {
          Products._showToast('warning', 'Produk sudah ada di keranjang');
        }
      });
    });

    // User ID real-time validation
    const userIdInput = document.getElementById('user-id');
    if (userIdInput) {
      userIdInput.addEventListener('input', function () {
        if (this.value.trim()) {
          this.classList.remove('error');
          document.getElementById('user-id-error').textContent = '';
        }
      });
    }
  },

  /**
   * Tampilkan modal konfirmasi pembelian
   * @param {Object} product
   * @param {string} accountId
   * @param {string} serverId
   */
  _showConfirmModal(product, accountId, serverId) {
    const existing = document.querySelector('.modal-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h3>Konfirmasi Pembelian</h3>
          <button class="modal-close" id="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div style="margin-bottom:16px">
            <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">Produk</div>
            <div style="font-weight:600">${product.name}</div>
          </div>
          <div style="margin-bottom:16px">
            <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">ID Akun</div>
            <div style="font-weight:600">${accountId}${serverId ? ` (${serverId})` : ''}</div>
          </div>
          <div style="margin-bottom:16px">
            <div style="font-size:0.85rem;color:var(--text-muted);margin-bottom:4px">Harga</div>
            <div style="font-weight:700;color:var(--accent);font-size:1.25rem">${formatRupiah(product.price)}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" id="modal-cancel">Batal</button>
          <button class="btn btn-primary" id="modal-confirm">Konfirmasi Beli</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('modal-close').addEventListener('click', () => overlay.remove());
    document.getElementById('modal-cancel').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    document.getElementById('modal-confirm').addEventListener('click', function () {
      overlay.remove();
      const session = Auth.getSession();
      if (!session) {
        window.location.href = '/dexvoucher/pages/user/login.html?redirect=' + encodeURIComponent(window.location.pathname);
        return;
      }
      const item = {
        productId: product.id,
        gameId: product.game,
        gameName: Products.GAMES[product.game]?.name || product.game,
        accountId: accountId + (serverId ? ` (${serverId})` : ''),
        productName: product.name,
        price: product.price,
        qty: 1
      };
      const checkoutData = {
        items: [item],
        subtotal: product.price,
        discount: 0,
        total: product.price,
        promoCode: null
      };
      sessionStorage.setItem('nxt_checkout_data', JSON.stringify(checkoutData));
      window.location.href = '/dexvoucher/pages/user/checkout.html';
    });
  },

  /**
   * Tampilkan toast notifikasi
   * @param {string} type - success | error | warning | info
   * @param {string} message
   */
  _showToast(type, message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const iconMap = { success: 'sukses.png', error: 'gagal.png', warning: 'warning.png', info: 'sukses.png' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon"><img class="icon-img" src="/dexvoucher/assets/images/icons/${iconMap[type] || 'sukses.png'}" alt="" style="width:20px;height:20px"></span>
      <span>${message}</span>
      <button class="toast-close" type="button">&times;</button>
    `;
    container.appendChild(toast);

    toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
      }
    }, 3000);
  }
};
