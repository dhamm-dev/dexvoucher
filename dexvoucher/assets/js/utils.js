/**
 * @fileoverview Fungsi utilitas umum untuk DexVoucher
 * @author DexVoucher Team
 */

/**
 * Format angka ke format Rupiah
 * @param {number} number - Angka yang akan diformat
 * @returns {string} String format Rupiah contoh: "Rp 10.000"
 */
function formatRupiah(number) {
  if (number === null || number === undefined || isNaN(number)) return 'Rp 0';
  const num = Math.round(number);
  return 'Rp ' + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Format ISO string ke tanggal Indonesia
 * @param {string} isoString - String tanggal ISO
 * @returns {string} Tanggal terformat contoh: "12 Jan 2025, 14:30"
 */
function formatDate(isoString) {
  if (!isoString) return '-';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '-';
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
      'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
    ];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
  } catch {
    return '-';
  }
}

/**
 * Generate ID unik dengan prefix
 * @param {string} prefix - Prefix ID (contoh: "usr", "prd", "trx")
 * @returns {string} ID dengan format "prefix_timestamp"
 */
function generateId(prefix) {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}_${timestamp}${random}`;
}

/**
 * Hash sederhana berbasis base64 untuk password (bukan untuk keamanan nyata)
 * @param {string} string - String yang akan di-hash
 * @returns {string} Hash base64
 */
function simpleHash(string) {
  if (!string) return '';
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i);
    result += String.fromCharCode(code + 3);
  }
  return btoa(result);
}

/**
 * Validasi format email
 * @param {string} string - Email yang divalidasi
 * @returns {boolean} true jika format email valid
 */
function validateEmail(string) {
  if (!string || typeof string !== 'string') return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(string.trim());
}

/**
 * Validasi format nomor telepon Indonesia
 * @param {string} string - Nomor telepon yang divalidasi
 * @returns {boolean} true jika format nomor valid
 */
function validatePhone(string) {
  if (!string || typeof string !== 'string') return false;
  const cleaned = string.replace(/[\s\-]/g, '');
  const regex = /^(0|62)\d{8,13}$/;
  return regex.test(cleaned);
}

/**
 * Potong teks melebihi batas maksimal
 * @param {string} str - Teks yang akan dipotong
 * @param {number} maxLength - Panjang maksimal karakter
 * @returns {string} Teks yang sudah dipotong
 */
function truncateText(str, maxLength) {
  if (!str || typeof str !== 'string') return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Debounce fungsi dengan delay tertentu
 * @param {Function} fn - Fungsi yang akan di-debounce
 * @param {number} delay - Delay dalam milidetik
 * @returns {Function} Fungsi yang sudah di-debounce
 */
function debounce(fn, delay) {
  let timeout = null;
  return function (...args) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(context, args), delay);
  };
}
