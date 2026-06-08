/**
 * @fileoverview Entry point aplikasi DexVoucher — inisialisasi global, helper, komponen reusable
 * @author DexVoucher Team
 */

/**
 * Tampilkan toast notifikasi global
 * @param {string} message - Pesan yang ditampilkan
 * @param {string} type - Tipe: "success" | "error" | "warning" | "info"
 */
function showToast(message, type) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <span>${message}</span>
    <button class="toast-close" type="button" aria-label="Tutup">&times;</button>
  `;
  container.appendChild(toast);

  toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));
  setTimeout(() => removeToast(toast), 3000);
}

function removeToast(toast) {
  if (!toast.parentNode) return;
  toast.style.opacity = '0';
  toast.style.transform = 'translateX(100%)';
  setTimeout(() => toast.remove(), 300);
}

/**
 * Tampilkan modal konfirmasi custom (pengganti confirm())
 * @param {string} title - Judul modal
 * @param {string} message - Pesan konfirmasi
 * @param {Function} onConfirm - Callback saat dikonfirmasi
 */
function showConfirm(title, message, onConfirm) {
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" style="max-width:400px">
      <div class="modal-header"><h3>${title}</h3></div>
      <div class="modal-body"><p>${message}</p></div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="confirm-cancel">Batal</button>
        <button class="btn btn-primary" id="confirm-ok">Ya</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('#confirm-cancel').addEventListener('click', () => overlay.remove());
  overlay.querySelector('#confirm-ok').addEventListener('click', function () {
    overlay.remove();
    if (typeof onConfirm === 'function') onConfirm();
  });
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

/**
 * Inisialisasi global saat DOM siap
 */
document.addEventListener('DOMContentLoaded', function () {
  // Pasang scroll to top button global jika belum ada
  if (!document.querySelector('.scroll-top')) {
    const btn = document.createElement('button');
    btn.className = 'scroll-top';
    btn.id = 'scroll-top-global';
    btn.setAttribute('aria-label', 'Scroll ke atas');
    btn.textContent = '↑';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > 300);
    });
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
