/**
 * @fileoverview Manajemen keranjang belanja DexVoucher
 * @author DexVoucher Team
 */

const Cart = {
  /**
   * Tambah item ke keranjang user
   * @param {Object} item - { productId, gameId, gameName, userId, accountId, productName, price, qty }
   * @returns {boolean} true jika berhasil, false jika duplikat
   */
  add(item) {
    if (!item.userId || !item.productId) return false;
    const items = Storage.getCart(item.userId);

    const exists = items.some(i =>
      i.productId === item.productId &&
      i.accountId === item.accountId
    );
    if (exists) return false;

    items.push({
      id: generateId('cart'),
      productId: item.productId,
      gameId: item.gameId,
      gameName: item.gameName || '',
      userId: item.userId,
      accountId: item.accountId || '',
      productName: item.productName,
      price: item.price || 0,
      qty: item.qty || 1,
      addedAt: new Date().toISOString()
    });

    Storage.setCart(item.userId, items);
    return true;
  },

  /**
   * Hapus item dari keranjang berdasarkan productId (untuk user saat ini)
   * @param {string} productId - ID produk yang akan dihapus
   * @returns {boolean}
   */
  remove(productId) {
    const session = Auth.getSession();
    if (!session || !productId) return false;
    let items = Storage.getCart(session.id);
    items = items.filter(i => i.productId !== productId);
    Storage.setCart(session.id, items);
    return true;
  },

  /**
   * Ambil semua item keranjang user
   * @param {string} userId
   * @returns {Array}
   */
  getItems(userId) {
    return Storage.getCart(userId || '');
  },

  /**
   * Kosongkan keranjang user
   * @param {string} userId
   */
  clear(userId) {
    if (userId) Storage.setCart(userId, []);
  },

  /**
   * Hitung total harga item di keranjang
   * @param {string} userId
   * @returns {number}
   */
  getTotal(userId) {
    const items = this.getItems(userId);
    return items.reduce((sum, item) => sum + (item.price * (item.qty || 1)), 0);
  }
};
