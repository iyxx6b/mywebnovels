export const state = () => ({
  user: null, // เก็บข้อมูลผู้ใช้
  isAuthenticated: false, // สถานะการล็อกอิน
  isAdmin: false // สถานะผู้ดูแลระบบ
});

export const mutations = {
  SET_USER(state, user) {
    state.user = user;
    state.isAuthenticated = !!user;
    // ตรวจสอบบทบาทของผู้ใช้ (สมมติว่าถ้าอีเมลเป็น admin@novelverse.com จะเป็น admin)
    state.isAdmin = user && user.email === 'admin@novelverse.com';
  },
  LOGOUT(state) {
    state.user = null;
    state.isAuthenticated = false;
    state.isAdmin = false;
  }
};

export const actions = {
  // Action สำหรับล็อกอิน
  async login({ commit }, credentials) {
    try {
      // โค้ดจริงจะมีการเรียก API เพื่อตรวจสอบข้อมูลล็อกอิน
      // ตัวอย่างจำลอง:
      const user = { email: credentials.email, name: 'Admin User' };
      if (credentials.email === 'admin@novelverse.com' && credentials.password === 'password') {
        commit('SET_USER', user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },
  // Action สำหรับล็อกเอาท์
  logout({ commit }) {
    commit('LOGOUT');
  }
};