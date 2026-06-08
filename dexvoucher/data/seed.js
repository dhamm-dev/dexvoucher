/**
 * @fileoverview Data awal aplikasi DexVoucher
 * Hanya berjalan sekali saat pertama kali app dibuka
 * @author DexVoucher Team
 */

const Seed = {
  /**
   * Inisialisasi data awal jika belum ada
   * Cek berdasarkan nxt_products — jika kosong, jalankan seed
   */
  init() {
    if (typeof Storage === 'undefined') {
      console.warn('Storage tidak tersedia, seed dibatalkan');
      return;
    }

    this.seedAdmin();
    this.seedUsers();
    this.seedProducts();
    this.seedPromos();
    this.seedSettings();
  },

  /** Buat admin default */
  seedAdmin() {
    const users = Storage.getUsers();
    const adminExists = users.some(u => u.email === 'admin@dexvoucher.com');
    if (adminExists) return;

    users.push({
      id: generateId('usr'),
      name: 'Admin DexVoucher',
      email: 'admin@dexvoucher.com',
      password: simpleHash('admin123'),
      phone: '081234567890',
      avatar: '',
      role: 'admin',
      createdAt: new Date().toISOString(),
      isActive: true
    });
    Storage.setUsers(users);
  },

  /** Buat 5 user dummy */
  seedUsers() {
    const users = Storage.getUsers();
    const dummies = [
      { name: 'Budi Santoso', email: 'budi@email.com', phone: '081111111111' },
      { name: 'Siti Nurhaliza', email: 'siti@email.com', phone: '082222222222' },
      { name: 'Ahmad Rizki', email: 'ahmad@email.com', phone: '083333333333' },
      { name: 'Dewi Lestari', email: 'dewi@email.com', phone: '084444444444' },
      { name: 'Rudi Hermawan', email: 'rudi@email.com', phone: '085555555555' }
    ];

    dummies.forEach(d => {
      const exists = users.some(u => u.email === d.email);
      if (!exists) {
        users.push({
          id: generateId('usr'),
          name: d.name,
          email: d.email,
          password: simpleHash('user123'),
          phone: d.phone,
          avatar: '',
          role: 'user',
          createdAt: new Date().toISOString(),
          isActive: true
        });
      }
    });
    Storage.setUsers(users);
  },

  /** Buat semua produk dari tabel harga */
  seedProducts() {
    const existing = Storage.getProducts();
    const seededGames = new Set(existing.map(p => p.game));
    const products = [...existing];
    const now = new Date().toISOString();

    function addGameProducts(gameId, category, items, opts = {}) {
      if (seededGames.has(gameId)) return;
      const origMul = opts.origMul || 1.1;
      items.forEach((item, i) => {
        products.push({
          id: generateId('prd'),
          game: gameId,
          category: category,
          name: item.name,
          amount: item.amount || 0,
          price: item.price,
          originalPrice: Math.round(item.price * origMul),
          badge: item.badge || null,
          isActive: true,
          createdAt: now
        });
      });
    }

    // ===== Free Fire =====
    addGameProducts('free-fire', 'diamond', [
      { name: '5 Diamond', amount: 5, price: 1500, badge: null },
      { name: '70 Diamond', amount: 70, price: 15000, badge: null },
      { name: '140 Diamond', amount: 140, price: 29000, badge: 'HOT' },
      { name: '355 Diamond', amount: 355, price: 73000, badge: null },
      { name: '720 Diamond', amount: 720, price: 145000, badge: null },
      { name: '1.450 Diamond', amount: 1450, price: 285000, badge: null },
      { name: '2.180 Diamond', amount: 2180, price: 430000, badge: null }
    ]);
    addGameProducts('free-fire', 'membership', [
      { name: 'Weekly Membership', amount: 0, price: 22000, badge: 'SALE' },
      { name: 'Monthly Membership', amount: 0, price: 85000, badge: null }
    ]);

    // ===== Mobile Legends =====
    addGameProducts('mobile-legends', 'diamond', [
      { name: '11 Diamond', amount: 11, price: 3000, badge: 'NEW' },
      { name: '56 Diamond', amount: 56, price: 15000, badge: null },
      { name: '112 Diamond', amount: 112, price: 29000, badge: null },
      { name: '275 Diamond', amount: 275, price: 72000, badge: null },
      { name: '570 Diamond', amount: 570, price: 145000, badge: null },
      { name: '1.155 Diamond', amount: 1155, price: 285000, badge: null },
      { name: '2.398 Diamond', amount: 2398, price: 580000, badge: null }
    ]);
    addGameProducts('mobile-legends', 'membership', [
      { name: 'Starlight Member', amount: 0, price: 50000, badge: 'HOT' }
    ]);
    addGameProducts('mobile-legends', 'bundle', [
      { name: 'Twilight Pass', amount: 0, price: 135000, badge: null }
    ]);

    // ===== Valorant =====
    addGameProducts('valorant', 'voucher', [
      { name: '475 VP', amount: 475, price: 55000, badge: null },
      { name: '1.000 VP', amount: 1000, price: 110000, badge: null },
      { name: '2.050 VP', amount: 2050, price: 215000, badge: null },
      { name: '3.650 VP', amount: 3650, price: 370000, badge: 'SALE' },
      { name: '5.350 VP', amount: 5350, price: 530000, badge: null },
      { name: '11.000 VP', amount: 11000, price: 1050000, badge: null }
    ], { origMul: 1.08 });

    // ===== PUBG Mobile =====
    addGameProducts('pubg-mobile', 'voucher', [
      { name: '60 UC', amount: 60, price: 15000, badge: null },
      { name: '325 UC', amount: 325, price: 75000, badge: 'HOT' },
      { name: '660 UC', amount: 660, price: 145000, badge: null },
      { name: '1.800 UC', amount: 1800, price: 375000, badge: null },
      { name: '3.850 UC', amount: 3850, price: 750000, badge: null },
      { name: '8.100 UC', amount: 8100, price: 1500000, badge: null }
    ]);
    addGameProducts('pubg-mobile', 'membership', [
      { name: 'Royal Pass (M)', amount: 0, price: 150000, badge: null }
    ]);

    // ===== AOV =====
    addGameProducts('aov', 'voucher', [
      { name: '60 Voucher', amount: 60, price: 12000, badge: null },
      { name: '150 Voucher', amount: 150, price: 29000, badge: null },
      { name: '300 Voucher', amount: 300, price: 57000, badge: null },
      { name: '600 Voucher', amount: 600, price: 112000, badge: 'SALE' },
      { name: '1.500 Voucher', amount: 1500, price: 270000, badge: null }
    ]);

    // ===== Genshin Impact =====
    addGameProducts('genshin-impact', 'voucher', [
      { name: '60 Crystal', amount: 60, price: 15000, badge: 'NEW' },
      { name: '330 Crystal', amount: 330, price: 75000, badge: null },
      { name: '1.090 Crystal', amount: 1090, price: 235000, badge: null },
      { name: '2.240 Crystal', amount: 2240, price: 470000, badge: null },
      { name: '3.880 Crystal', amount: 3880, price: 810000, badge: null },
      { name: '8.080 Crystal', amount: 8080, price: 1600000, badge: null }
    ], { origMul: 1.08 });

    // ===== Honkai Star Rail =====
    addGameProducts('honkai-star-rail', 'voucher', [
      { name: '60 Shard', amount: 60, price: 15000, badge: null },
      { name: '330 Shard', amount: 330, price: 75000, badge: null },
      { name: '1.090 Shard', amount: 1090, price: 235000, badge: null },
      { name: '2.240 Shard', amount: 2240, price: 470000, badge: null },
      { name: '3.880 Shard', amount: 3880, price: 810000, badge: null }
    ], { origMul: 1.08 });

    // ===== Clash of Clans =====
    addGameProducts('clash-of-clans', 'voucher', [
      { name: '80 Gems', amount: 80, price: 15000, badge: null },
      { name: '500 Gems', amount: 500, price: 85000, badge: null },
      { name: '1.200 Gems', amount: 1200, price: 200000, badge: 'HOT' },
      { name: '2.500 Gems', amount: 2500, price: 400000, badge: null },
      { name: '6.500 Gems', amount: 6500, price: 1000000, badge: null },
      { name: '14.000 Gems', amount: 14000, price: 2000000, badge: null }
    ]);

    // ===== Roblox =====
    addGameProducts('roblox', 'voucher', [
      { name: '80 Robux', amount: 80, price: 20000, badge: 'HOT' },
      { name: '400 Robux', amount: 400, price: 95000, badge: null },
      { name: '800 Robux', amount: 800, price: 185000, badge: null },
      { name: '1.700 Robux', amount: 1700, price: 375000, badge: null },
      { name: '4.500 Robux', amount: 4500, price: 950000, badge: null },
      { name: '10.000 Robux', amount: 10000, price: 2000000, badge: null }
    ]);
    addGameProducts('roblox', 'membership', [
      { name: 'Premium 450', amount: 0, price: 60000, badge: 'SALE' }
    ]);

    // ===== COD Mobile =====
    addGameProducts('codm', 'voucher', [
      { name: '60 CP', amount: 60, price: 17000, badge: null },
      { name: '330 CP', amount: 330, price: 85000, badge: 'HOT' },
      { name: '660 CP', amount: 660, price: 160000, badge: null },
      { name: '1.800 CP', amount: 1800, price: 400000, badge: null },
      { name: '3.850 CP', amount: 3850, price: 800000, badge: null },
      { name: '8.100 CP', amount: 8100, price: 1600000, badge: null }
    ]);
    addGameProducts('codm', 'membership', [
      { name: 'Battle Pass', amount: 0, price: 150000, badge: null }
    ]);

    // ===== eFootball =====
    addGameProducts('efootball', 'voucher', [
      { name: '100 Coins', amount: 100, price: 20000, badge: null },
      { name: '500 Coins', amount: 500, price: 95000, badge: null },
      { name: '1.000 Coins', amount: 1000, price: 185000, badge: null },
      { name: '2.500 Coins', amount: 2500, price: 440000, badge: 'NEW' },
      { name: '5.600 Coins', amount: 5600, price: 950000, badge: null },
      { name: '12.000 Coins', amount: 12000, price: 1900000, badge: null }
    ], { origMul: 1.08 });

    // ===== Delta Force =====
    addGameProducts('delta-force', 'voucher', [
      { name: '60 Credits', amount: 60, price: 18000, badge: null },
      { name: '330 Credits', amount: 330, price: 90000, badge: null },
      { name: '660 Credits', amount: 660, price: 170000, badge: 'HOT' },
      { name: '1.800 Credits', amount: 1800, price: 420000, badge: null },
      { name: '3.850 Credits', amount: 3850, price: 850000, badge: null }
    ]);
    addGameProducts('delta-force', 'membership', [
      { name: 'Battle Pass', amount: 0, price: 150000, badge: 'NEW' }
    ]);

    Storage.setProducts(products);
  },

  /** Buat kode promo awal */
  seedPromos() {
    const promos = Storage.getPromos();
    if (promos.length > 0) return;

    const now = new Date();
    const future = new Date(now);
    future.setMonth(future.getMonth() + 3);

    const promoList = [
      {
        id: generateId('promo'),
        code: 'NEXANEW10',
        type: 'percent',
        value: 10,
        minPurchase: 50000,
        maxDiscount: 50000,
        quota: 100,
        used: 0,
        expiredAt: future.toISOString(),
        isActive: true
      },
      {
        id: generateId('promo'),
        code: 'HEMAT5K',
        type: 'fixed',
        value: 5000,
        minPurchase: 25000,
        maxDiscount: 5000,
        quota: 200,
        used: 0,
        expiredAt: future.toISOString(),
        isActive: true
      },
      {
        id: generateId('promo'),
        code: 'MLBB20',
        type: 'percent',
        value: 20,
        minPurchase: 50000,
        maxDiscount: 100000,
        quota: 50,
        used: 0,
        expiredAt: future.toISOString(),
        isActive: true
      }
    ];

    Storage.setPromos(promoList);
  },

  /** Buat pengaturan default situs */
  seedSettings() {
    const settings = Storage.get(Storage.KEYS.SETTINGS);
    if (settings) return;

    const defaultSettings = {
      siteName: 'DexVoucher',
      siteEmail: 'support@dexvoucher.com',
      siteWhatsApp: '6281234567890',
      maintenanceMode: false,
      updatedAt: new Date().toISOString()
    };

    Storage.set(Storage.KEYS.SETTINGS, defaultSettings);
  }
};
