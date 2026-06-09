/**
 * @fileoverview Proses checkout & pembayaran
 * @author DexVoucher Team
 */

const Checkout = {
  /** Daftar metode pembayaran */
  PAYMENT_METHODS: [
    { id: 'transfer_bca', name: 'Transfer BCA', icon: '<img class="icon-img" src="' + ROOT + '/assets/images/icons/bank.png" alt="" style="width:20px;height:20px">' },
    { id: 'transfer_mandiri', name: 'Transfer Mandiri', icon: '<img class="icon-img" src="' + ROOT + '/assets/images/icons/bank.png" alt="" style="width:20px;height:20px">' },
    { id: 'transfer_bri', name: 'Transfer BRI', icon: '<img class="icon-img" src="' + ROOT + '/assets/images/icons/bank.png" alt="" style="width:20px;height:20px">' },
    { id: 'qris', name: 'QRIS', icon: '📱' },
    { id: 'gopay', name: 'GoPay', icon: '<img class="icon-img" src="' + ROOT + '/assets/images/icons/gopay.png" alt="" style="width:20px;height:20px">' },
    { id: 'dana', name: 'DANA', icon: '<img class="icon-img" src="' + ROOT + '/assets/images/icons/Dana.jpg" alt="" style="width:20px;height:20px">' },
    { id: 'ovo', name: 'OVO', icon: '<img class="icon-img" src="' + ROOT + '/assets/images/icons/Ovo.png" alt="" style="width:20px;height:20px">' }
  ],

  /**
   * Proses pembayaran dari data checkout
   * @param {Object} data - { userId, items, subtotal, discount, total, promoCode, gameId, accountId, paymentMethod }
   * @returns {Object} { success, message, transaction? }
   */
  process(data) {
    if (!data.userId) {
      return { success: false, message: 'Silakan login terlebih dahulu' };
    }
    if (!data.items || data.items.length === 0) {
      return { success: false, message: 'Keranjang belanja kosong' };
    }
    if (!data.paymentMethod) {
      return { success: false, message: 'Pilih metode pembayaran' };
    }
    if (!data.accountId) {
      return { success: false, message: 'ID akun game harus diisi' };
    }

    const gameId = data.gameId || data.items[0]?.gameId || '';

    // Buat transaksi
    const result = Transaction.create({
      userId: data.userId,
      items: data.items,
      subtotal: data.subtotal,
      discount: data.discount || 0,
      total: data.total,
      promoCode: data.promoCode || null,
      gameId: gameId,
      accountId: data.accountId,
      paymentMethod: data.paymentMethod
    });

    if (!result.success) {
      return result;
    }

    // Update kuota promo jika ada
    if (data.promoCode) {
      Promo.markUsed(data.promoCode.toUpperCase().trim());
    }

    // Kosongkan keranjang
    Cart.clear(data.userId);

    return {
      success: true,
      message: 'Pembayaran berhasil!',
      transaction: result.transaction
    };
  }
};
