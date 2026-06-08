/**
 * @fileoverview Manajemen transaksi & invoice
 * @author DexVoucher Team
 */

const Transaction = {
  /**
   * Buat transaksi baru
   * @param {Object} data - { userId, items, subtotal, discount, total, promoCode, gameId, accountId, paymentMethod }
   * @returns {Object} { success, transaction }
   */
  create(data) {
    if (!data.userId || !data.items || data.items.length === 0) {
      return { success: false, message: 'Data transaksi tidak valid' };
    }

    const now = new Date().toISOString();
    const transaction = {
      id: 'TRX-' + Date.now() + Math.floor(Math.random() * 1000),
      userId: data.userId,
      items: data.items.map(item => ({
        productId: item.productId,
        name: item.productName || item.name,
        price: item.price,
        qty: item.qty || 1
      })),
      subtotal: data.subtotal || 0,
      discount: data.discount || 0,
      total: data.total || 0,
      promoCode: data.promoCode || null,
      gameId: data.gameId || data.items[0]?.gameId || '',
      accountId: data.accountId || data.items[0]?.accountId || '',
      paymentMethod: data.paymentMethod || '',
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };

    const transactions = Storage.getTransactions();
    transactions.unshift(transaction);
    Storage.setTransactions(transactions);

    return { success: true, transaction };
  },

  /**
   * Ambil transaksi berdasarkan ID
   * @param {string} id - ID transaksi
   * @returns {Object|null}
   */
  getById(id) {
    if (!id) return null;
    const transactions = Storage.getTransactions();
    return transactions.find(t => t.id === id) || null;
  },

  /**
   * Ambil transaksi milik user tertentu
   * @param {string} userId
   * @returns {Array}
   */
  getByUser(userId) {
    if (!userId) return [];
    const transactions = Storage.getTransactions();
    return transactions.filter(t => t.userId === userId);
  },

  /**
   * Update status transaksi
   * @param {string} id - ID transaksi
   * @param {string} status - "pending" | "success" | "failed"
   * @returns {boolean}
   */
  updateStatus(id, status) {
    const transactions = Storage.getTransactions();
    const idx = transactions.findIndex(t => t.id === id);
    if (idx === -1) return false;
    transactions[idx].status = status;
    transactions[idx].updatedAt = new Date().toISOString();
    Storage.setTransactions(transactions);
    return true;
  },

  /**
   * Ambil semua transaksi
   * @returns {Array}
   */
  getAll() {
    return Storage.getTransactions();
  },

  /**
   * Hitung total pendapatan dari transaksi sukses
   * @param {string} period - "today" | "week" | "month" | "all"
   * @returns {number}
   */
  getRevenue(period = 'all') {
    const transactions = this.getAll().filter(t => t.status === 'success');
    const now = new Date();

    return transactions.reduce((sum, t) => {
      const date = new Date(t.createdAt);
      if (period === 'today' && !this._isSameDay(date, now)) return sum;
      if (period === 'week') {
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        if (date < weekAgo) return sum;
      }
      if (period === 'month') {
        const monthAgo = new Date(now);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        if (date < monthAgo) return sum;
      }
      return sum + (t.total || 0);
    }, 0);
  },

  /**
   * Export transaksi ke CSV
   * @param {Array} transactions - Array transaksi
   * @returns {string} String CSV
   */
  exportToCSV(transactions) {
    const headers = ['ID Transaksi', 'User ID', 'Item', 'Subtotal', 'Diskon', 'Total', 'Kode Promo', 'Metode Bayar', 'Status', 'Tanggal'];
    const rows = transactions.map(t => [
      t.id,
      t.userId,
      t.items.map(i => i.name).join('; '),
      t.subtotal,
      t.discount,
      t.total,
      t.promoCode || '',
      t.paymentMethod || '',
      t.status,
      t.createdAt
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    return csv;
  },

  /**
   * Cek apakah dua tanggal sama (hari yang sama)
   * @private
   */
  _isSameDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }
};
