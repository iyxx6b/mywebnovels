export default function ({ store, redirect }) {
  // ตรวจสอบว่าผู้ใช้ล็อกอินและเป็น Admin หรือไม่
  if (!store.state.isAdmin) {
    return redirect('/login'); // หรือจะเปลี่ยนเส้นทางไปหน้าอื่น
  }
}