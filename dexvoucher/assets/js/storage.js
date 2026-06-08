/**
 * @fileoverview Manajemen LocalStorage untuk DexVoucher
 * Semua akses localStorage WAJIB melalui objek Storage ini.
 * @author DexVoucher Team
 */

const Storage = {
  PREFIX: 'nxt_',

  /** Daftar key yang diizinkan */
  KEYS: {
    USERS: 'nxt_users',
    SESSION: 'nxt_session',
    PRODUCTS: 'nxt_products',
    CART: 'nxt_cart',
    TRANSACTIONS: 'nxt_transactions',
    PROMOS: 'nxt_promos',
    THEME: 'nxt_theme',
    SETTINGS: 'nxt_settings'
  },

  /**
   * Ambil data dari localStorage
   * @param {string} key - Key localStorage
   * @returns {*} Data yang sudah di-parse, atau null jika gagal
   */
  get(key) {
    try {
      const data = localStorage.getItem(key);
      if (data === null) return null;
      return JSON.parse(data);
    } catch {
      console.warn('Storage.get error untuk key:', key);
      return null;
    }
  },

  /**
   * Simpan data ke localStorage
   * @param {string} key - Key localStorage
   * @param {*} value - Data yang akan disimpan
   * @returns {boolean} true jika berhasil
   */
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      console.warn('Storage.set error untuk key:', key);
      return false;
    }
  },

  /**
   * Hapus key dari localStorage
   * @param {string} key - Key yang akan dihapus
   * @returns {boolean} true jika berhasil
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      console.warn('Storage.remove error untuk key:', key);
      return false;
    }
  },

  /**
   * Hapus semua key dengan prefix nxt_
   * @returns {boolean} true jika berhasil
   */
  clear() {
    try {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(this.PREFIX)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
      return true;
    } catch {
      console.warn('Storage.clear error');
      return false;
    }
  },

  // ===== USERS =====

  /** @returns {Array} Array user */
  getUsers() {
    return this.get(this.KEYS.USERS) || [];
  },

  /**
   * Simpan array user
   * @param {Array} arr
   */
  setUsers(arr) {
    return this.set(this.KEYS.USERS, arr);
  },

  // ===== SESSION =====

  /** @returns {Object|null} Data session atau null */
  getSession() {
    return this.get(this.KEYS.SESSION);
  },

  /**
   * Simpan session user/admin
   * @param {Object} obj - Data session
   */
  setSession(obj) {
    return this.set(this.KEYS.SESSION, obj);
  },

  /** Hapus session */
  clearSession() {
    return this.remove(this.KEYS.SESSION);
  },

  // ===== PRODUCTS =====

  /** @returns {Array} Array produk */
  getProducts() {
    return this.get(this.KEYS.PRODUCTS) || [];
  },

  /**
   * Simpan array produk
   * @param {Array} arr
   */
  setProducts(arr) {
    return this.set(this.KEYS.PRODUCTS, arr);
  },

  // ===== CART =====

  /**
   * Ambil keranjang milik user
   * @param {string} userId - ID user
   * @returns {Array} Array item keranjang
   */
  getCart(userId) {
    if (!userId) return [];
    const allCarts = this.get(this.KEYS.CART) || {};
    return allCarts[userId] || [];
  },

  /**
   * Simpan keranjang milik user
   * @param {string} userId - ID user
   * @param {Array} arr - Array item keranjang
   */
  setCart(userId, arr) {
    if (!userId) return false;
    const allCarts = this.get(this.KEYS.CART) || {};
    allCarts[userId] = arr;
    return this.set(this.KEYS.CART, allCarts);
  },

  // ===== TRANSACTIONS =====

  /** @returns {Array} Array transaksi */
  getTransactions() {
    return this.get(this.KEYS.TRANSACTIONS) || [];
  },

  /**
   * Simpan array transaksi
   * @param {Array} arr
   */
  setTransactions(arr) {
    return this.set(this.KEYS.TRANSACTIONS, arr);
  },

  // ===== PROMOS =====

  /** @returns {Array} Array kode promo */
  getPromos() {
    return this.get(this.KEYS.PROMOS) || [];
  },

  /**
   * Simpan array promo
   * @param {Array} arr
   */
  setPromos(arr) {
    return this.set(this.KEYS.PROMOS, arr);
  }
};
