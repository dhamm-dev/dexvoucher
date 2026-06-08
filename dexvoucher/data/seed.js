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

    const existing = Storage.getProducts();
    if (existing && existing.length > 0) return;

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
    const products = [];

    // ===== Free Fire =====
    const ff = [
      { name: '5 Diamond', amount: 5, price: 1500 },
      { name: '70 Diamond', amount: 70, price: 15000 },
      { name: '140 Diamond', amount: 140, price: 29000 },
      { name: '355 Diamond', amount: 355, price: 73000 },
      { name: '720 Diamond', amount: 720, price: 145000 },
      { name: '1.450 Diamond', amount: 1450, price: 285000 },
      { name: '2.180 Diamond', amount: 2180, price: 430000 }
    ];
    ff.forEach((p, i) => {
      products.push({
        id: generateId('prd'),
        game: 'free-fire',
        category: 'diamond',
        name: p.name,
        amount: p.amount,
        price: p.price,
        originalPrice: Math.round(p.price * 1.1),
        badge: i === 2 ? 'HOT' : null,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    });
    products.push({
      id: generateId('prd'),
      game: 'free-fire',
      category: 'membership',
      name: 'Weekly Membership',
      amount: 0,
      price: 22000,
      originalPrice: 25000,
      badge: 'SALE',
      isActive: true,
      createdAt: new Date().toISOString()
    });
    products.push({
      id: generateId('prd'),
      game: 'free-fire',
      category: 'membership',
      name: 'Monthly Membership',
      amount: 0,
      price: 85000,
      originalPrice: 95000,
      badge: null,
      isActive: true,
      createdAt: new Date().toISOString()
    });

    // ===== Mobile Legends =====
    const ml = [
      { name: '11 Diamond', amount: 11, price: 3000 },
      { name: '56 Diamond', amount: 56, price: 15000 },
      { name: '112 Diamond', amount: 112, price: 29000 },
      { name: '275 Diamond', amount: 275, price: 72000 },
      { name: '570 Diamond', amount: 570, price: 145000 },
      { name: '1.155 Diamond', amount: 1155, price: 285000 },
      { name: '2.398 Diamond', amount: 2398, price: 580000 }
    ];
    ml.forEach((p, i) => {
      products.push({
        id: generateId('prd'),
        game: 'mobile-legends',
        category: 'diamond',
        name: p.name,
        amount: p.amount,
        price: p.price,
        originalPrice: Math.round(p.price * 1.1),
        badge: i === 0 ? 'NEW' : null,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    });
    products.push({
      id: generateId('prd'),
      game: 'mobile-legends',
      category: 'membership',
      name: 'Starlight Member',
      amount: 0,
      price: 50000,
      originalPrice: 55000,
      badge: 'HOT',
      isActive: true,
      createdAt: new Date().toISOString()
    });
    products.push({
      id: generateId('prd'),
      game: 'mobile-legends',
      category: 'bundle',
      name: 'Twilight Pass',
      amount: 0,
      price: 135000,
      originalPrice: 150000,
      badge: null,
      isActive: true,
      createdAt: new Date().toISOString()
    });

    // ===== Valorant =====
    const val = [
      { name: '475 VP', amount: 475, price: 55000 },
      { name: '1.000 VP', amount: 1000, price: 110000 },
      { name: '2.050 VP', amount: 2050, price: 215000 },
      { name: '3.650 VP', amount: 3650, price: 370000 },
      { name: '5.350 VP', amount: 5350, price: 530000 },
      { name: '11.000 VP', amount: 11000, price: 1050000 }
    ];
    val.forEach((p, i) => {
      products.push({
        id: generateId('prd'),
        game: 'valorant',
        category: 'voucher',
        name: p.name,
        amount: p.amount,
        price: p.price,
        originalPrice: Math.round(p.price * 1.08),
        badge: i === 3 ? 'SALE' : null,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    });

    // ===== PUBG Mobile =====
    const pubg = [
      { name: '60 UC', amount: 60, price: 15000 },
      { name: '325 UC', amount: 325, price: 75000 },
      { name: '660 UC', amount: 660, price: 145000 },
      { name: '1.800 UC', amount: 1800, price: 375000 },
      { name: '3.850 UC', amount: 3850, price: 750000 },
      { name: '8.100 UC', amount: 8100, price: 1500000 }
    ];
    pubg.forEach((p, i) => {
      products.push({
        id: generateId('prd'),
        game: 'pubg-mobile',
        category: 'voucher',
        name: p.name,
        amount: p.amount,
        price: p.price,
        originalPrice: Math.round(p.price * 1.1),
        badge: i === 1 ? 'HOT' : null,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    });
    products.push({
      id: generateId('prd'),
      game: 'pubg-mobile',
      category: 'membership',
      name: 'Royal Pass (M)',
      amount: 0,
      price: 150000,
      originalPrice: 165000,
      badge: null,
      isActive: true,
      createdAt: new Date().toISOString()
    });

    // ===== AOV =====
    const aov = [
      { name: '60 Voucher', amount: 60, price: 12000 },
      { name: '150 Voucher', amount: 150, price: 29000 },
      { name: '300 Voucher', amount: 300, price: 57000 },
      { name: '600 Voucher', amount: 600, price: 112000 },
      { name: '1.500 Voucher', amount: 1500, price: 270000 }
    ];
    aov.forEach((p, i) => {
      products.push({
        id: generateId('prd'),
        game: 'aov',
        category: 'voucher',
        name: p.name,
        amount: p.amount,
        price: p.price,
        originalPrice: Math.round(p.price * 1.1),
        badge: i === 3 ? 'SALE' : null,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    });

    // ===== Genshin Impact =====
    const genshin = [
      { name: '60 Crystal', amount: 60, price: 15000 },
      { name: '330 Crystal', amount: 330, price: 75000 },
      { name: '1.090 Crystal', amount: 1090, price: 235000 },
      { name: '2.240 Crystal', amount: 2240, price: 470000 },
      { name: '3.880 Crystal', amount: 3880, price: 810000 },
      { name: '8.080 Crystal', amount: 8080, price: 1600000 }
    ];
    genshin.forEach((p, i) => {
      products.push({
        id: generateId('prd'),
        game: 'genshin-impact',
        category: 'voucher',
        name: p.name,
        amount: p.amount,
        price: p.price,
        originalPrice: Math.round(p.price * 1.08),
        badge: i === 0 ? 'NEW' : null,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    });

    // ===== Honkai Star Rail =====
    const hsr = [
      { name: '60 Shard', amount: 60, price: 15000 },
      { name: '330 Shard', amount: 330, price: 75000 },
      { name: '1.090 Shard', amount: 1090, price: 235000 },
      { name: '2.240 Shard', amount: 2240, price: 470000 },
      { name: '3.880 Shard', amount: 3880, price: 810000 }
    ];
    hsr.forEach((p, i) => {
      products.push({
        id: generateId('prd'),
        game: 'honkai-star-rail',
        category: 'voucher',
        name: p.name,
        amount: p.amount,
        price: p.price,
        originalPrice: Math.round(p.price * 1.08),
        badge: null,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    });

    // ===== Clash of Clans =====
    const coc = [
      { name: '80 Gems', amount: 80, price: 15000 },
      { name: '500 Gems', amount: 500, price: 85000 },
      { name: '1.200 Gems', amount: 1200, price: 200000 },
      { name: '2.500 Gems', amount: 2500, price: 400000 },
      { name: '6.500 Gems', amount: 6500, price: 1000000 },
      { name: '14.000 Gems', amount: 14000, price: 2000000 }
    ];
    coc.forEach((p, i) => {
      products.push({
        id: generateId('prd'),
        game: 'clash-of-clans',
        category: 'voucher',
        name: p.name,
        amount: p.amount,
        price: p.price,
        originalPrice: Math.round(p.price * 1.1),
        badge: i === 2 ? 'HOT' : null,
        isActive: true,
        createdAt: new Date().toISOString()
      });
    });

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
