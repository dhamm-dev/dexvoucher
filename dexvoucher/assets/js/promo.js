/**
 * @fileoverview Manajemen kode promo & diskon
 * @author DexVoucher Team
 */

const Promo = {
  /**
   * Validasi dan apply kode promo
   * @param {string} code - Kode promo
   * @param {number} subtotal - Total belanja sebelum diskon
   * @returns {Object} { success, message, discount?, promo? }
   */
  apply(code, subtotal) {
    if (!code || !code.trim()) {
      return { success: false, message: 'Masukkan kode promo' };
    }

    const promos = Storage.getPromos();
    const promo = promos.find(p => p.code === code.toUpperCase().trim());

    if (!promo) {
      return { success: false, message: 'Kode promo tidak ditemukan' };
    }

    if (!promo.isActive) {
      return { success: false, message: 'Kode promo sudah tidak aktif' };
    }

    // Cek expired
    const now = new Date();
    const expired = new Date(promo.expiredAt);
    if (expired < now) {
      return { success: false, message: 'Kode promo sudah kedaluwarsa' };
    }

    // Cek kuota
    if (promo.quota > 0 && promo.used >= promo.quota) {
      return { success: false, message: 'Kuota kode promo sudah habis' };
    }

    // Cek minimal pembelian
    if (subtotal < promo.minPurchase) {
      return {
        success: false,
        message: `Minimal pembelian ${formatRupiah(promo.minPurchase)} untuk kode ini`
      };
    }

    // Hitung diskon
    let discount = 0;
    if (promo.type === 'percent') {
      discount = Math.round(subtotal * promo.value / 100);
      if (promo.maxDiscount > 0 && discount > promo.maxDiscount) {
        discount = promo.maxDiscount;
      }
    } else {
      discount = promo.value;
    }

    // Pastikan diskon tidak melebihi subtotal
    if (discount > subtotal) discount = subtotal;

    return {
      success: true,
      message: `Diskon ${promo.type === 'percent' ? promo.value + '%' : formatRupiah(promo.value)} berhasil diterapkan!`,
      discount: discount,
      promo: promo
    };
  },

  /**
   * Tandai promo sudah dipakai (tambah counter used)
   * @param {string} code
   */
  markUsed(code) {
    const promos = Storage.getPromos();
    const idx = promos.findIndex(p => p.code === code);
    if (idx !== -1) {
      promos[idx].used = (promos[idx].used || 0) + 1;
      Storage.setPromos(promos);
    }
  }
};
