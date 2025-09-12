export default function ({ store, redirect }) {
  // Middleware จะตรวจสอบว่าผู้ใช้เป็น Admin หรือไม่
  // โดยเรียกใช้ getter 'isAdmin' จาก Vuex store
  if (!store.getters.isAdmin) {
    // ถ้าไม่ใช่ Admin จะถูก redirect ไปที่หน้า login
    return redirect('/login')
  }
}