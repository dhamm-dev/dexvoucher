/**
 * @fileoverview Manajemen autentikasi user & admin
 * @author DexVoucher Team
 */

const Auth = {
  /**
   * Daftarkan user baru
   * @param {Object} param0 - Data registrasi { name, email, password, phone }
   * @returns {Object} { success: boolean, message: string }
   */
  register({ name, email, password, phone }) {
    if (!name || !email || !password || !phone) {
      return { success: false, message: 'Semua field harus diisi' };
    }

    if (!validateEmail(email)) {
      return { success: false, message: 'Format email tidak valid' };
    }

    if (!validatePhone(phone)) {
      return { success: false, message: 'Format nomor telepon tidak valid' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password minimal 6 karakter' };
    }

    const users = Storage.getUsers();
    const exists = users.some(u => u.email === email.toLowerCase().trim());
    if (exists) {
      return { success: false, message: 'Email sudah terdaftar' };
    }

    const newUser = {
      id: generateId('usr'),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: simpleHash(password),
      phone: phone.trim(),
      avatar: '',
      role: 'user',
      createdAt: new Date().toISOString(),
      isActive: true
    };

    users.push(newUser);
    Storage.setUsers(users);

    Auth._setSession(newUser);
    return { success: true, message: 'Registrasi berhasil' };
  },

  /**
   * Login user biasa
   * @param {Object} param0 - { email, password }
   * @returns {Object} { success: boolean, message: string }
   */
  login({ email, password }) {
    if (!email || !password) {
      return { success: false, message: 'Email dan password harus diisi' };
    }

    const users = Storage.getUsers();
    const user = users.find(u => u.email === email.toLowerCase().trim());

    if (!user) {
      return { success: false, message: 'Email tidak terdaftar' };
    }

    if (!user.isActive) {
      return { success: false, message: 'Akun telah dinonaktifkan' };
    }

    if (user.password !== simpleHash(password)) {
      return { success: false, message: 'Password salah' };
    }

    if (user.role === 'admin') {
      return { success: false, message: 'Silakan gunakan halaman login admin' };
    }

    Auth._setSession(user);
    return { success: true, message: 'Login berhasil' };
  },

  /**
   * Login khusus admin
   * @param {Object} param0 - { email, password }
   * @returns {Object} { success: boolean, message: string }
   */
  loginAdmin({ email, password }) {
    if (!email || !password) {
      return { success: false, message: 'Email dan password harus diisi' };
    }

    const users = Storage.getUsers();
    const user = users.find(u => u.email === email.toLowerCase().trim());

    if (!user) {
      return { success: false, message: 'Email tidak terdaftar' };
    }

    if (!user.isActive) {
      return { success: false, message: 'Akun telah dinonaktifkan' };
    }

    if (user.password !== simpleHash(password)) {
      return { success: false, message: 'Password salah' };
    }

    if (user.role !== 'admin') {
      return { success: false, message: 'Akses hanya untuk admin' };
    }

    Auth._setSession(user);
    return { success: true, message: 'Login admin berhasil' };
  },

  /**
   * Logout — hapus session dan redirect
   */
  logout() {
    Storage.clearSession();
    window.location.href = ROOT + '/pages/user/login.html';
  },

  /**
   * Ambil session user yang sedang login
   * @returns {Object|null} Data user atau null
   */
  getSession() {
    return Storage.getSession();
  },

  /**
   * Cek apakah user sudah login
   * @returns {boolean}
   */
  isLoggedIn() {
    return !!Auth.getSession();
  },

  /**
   * Cek apakah user adalah admin
   * @returns {boolean}
   */
  isAdmin() {
    const session = Auth.getSession();
    return session && session.role === 'admin';
  },

  /**
   * Redirect ke login jika belum login
   * Gunakan di halaman yang memerlukan autentikasi
   */
  requireAuth() {
    if (!Auth.isLoggedIn()) {
      const currentPage = window.location.pathname;
      window.location.href = ROOT + '/pages/user/login.html?redirect=' + encodeURIComponent(currentPage);
    }
  },

  /**
   * Redirect jika bukan admin
   * Gunakan di halaman admin
   */
  requireAdmin() {
    if (!Auth.isLoggedIn()) {
      window.location.href = ROOT + '/pages/admin/login-admin.html';
      return;
    }
    if (!Auth.isAdmin()) {
      window.location.href = ROOT + '/index.html';
    }
  },

  /**
   * Generate token reset password dummy
   * @param {string} email - Email user
   * @returns {Object} { success, message, token? }
   */
  forgotPassword(email) {
    if (!email || !validateEmail(email)) {
      return { success: false, message: 'Format email tidak valid' };
    }

    const users = Storage.getUsers();
    const user = users.find(u => u.email === email.toLowerCase().trim());
    if (!user) {
      return { success: false, message: 'Email tidak terdaftar' };
    }

    const token = generateId('rst') + '_' + Date.now();
    const resetData = {
      email: user.email,
      token: token,
      expiredAt: new Date(Date.now() + 3600000).toISOString()
    };
    Storage.set('nxt_reset_token', resetData);

    return {
      success: true,
      message: 'Token reset telah dikirim (simulasi). Cek console untuk token.',
      token: token
    };
  },

  /**
   * Reset password menggunakan token
   * @param {string} token - Token reset
   * @param {string} newPassword - Password baru
   * @returns {Object} { success, message }
   */
  resetPassword(token, newPassword) {
    if (!token || !newPassword) {
      return { success: false, message: 'Token dan password baru harus diisi' };
    }

    if (newPassword.length < 6) {
      return { success: false, message: 'Password minimal 6 karakter' };
    }

    const resetData = Storage.get('nxt_reset_token');
    if (!resetData || resetData.token !== token) {
      return { success: false, message: 'Token tidak valid' };
    }

    const now = new Date();
    const expired = new Date(resetData.expiredAt);
    if (now > expired) {
      Storage.remove('nxt_reset_token');
      return { success: false, message: 'Token sudah kedaluwarsa' };
    }

    const users = Storage.getUsers();
    const idx = users.findIndex(u => u.email === resetData.email);
    if (idx === -1) {
      return { success: false, message: 'User tidak ditemukan' };
    }

    users[idx].password = simpleHash(newPassword);
    Storage.setUsers(users);
    Storage.remove('nxt_reset_token');

    return { success: true, message: 'Password berhasil direset' };
  },

  /**
   * Simpan session ke localStorage
   * @param {Object} user - Data user
   * @private
   */
  _setSession(user) {
    const sessionData = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt
    };
    Storage.setSession(sessionData);
  }
};
