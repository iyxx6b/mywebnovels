// frontend/store/index.js

// STATE: ใช้เก็บข้อมูลหลักของแอปพลิเคชัน
export const state = () => ({
  user: null,
  token: null,
  isAuthenticated: false
});

// MUTATIONS: ฟังก์ชันเดียวที่สามารถแก้ไข State ได้โดยตรง
export const mutations = {
  SET_AUTH(state, { user, token }) {
    state.user = user;
    state.token = token;
    state.isAuthenticated = true;
    this.$axios.setToken(token, 'Bearer');
    if (process.client) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  LOGOUT(state) {
    state.user = null;
    state.token = null;
    state.isAuthenticated = false;
    this.$axios.setToken(false);
    if (process.client) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  INITIALIZE_STORE(state) {
    if (process.client) {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      if (token && user) {
        this.commit('SET_AUTH', { user, token });
      }
    }
  }
};

// ACTIONS: ฟังก์ชันสำหรับทำงานที่ซับซ้อน (เช่น เรียก API)
export const actions = {
  async login({ commit }, credentials) {
    try {
      // **จุดที่แก้ไข:** เปลี่ยนมาใช้ Relative Path
      const response = await this.$axios.post('/login.php', credentials);
      if (response.data && response.data.token) {
        const { user, token } = response.data;
        commit('SET_AUTH', { user, token });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login Action Error:', error);
      return false;
    }
  },
  logout({ commit }) {
    commit('LOGOUT');
  }
};

// GETTERS: ใช้สำหรับดึงข้อมูลจาก State ไปแสดงผล
export const getters = {
  isAuthenticated: state => state.isAuthenticated,
  loggedInUser: state => state.user,
  isAdmin: state => state.isAuthenticated && state.user && state.user.role === 'admin'
};