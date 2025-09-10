export default function ({ redirect }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user || user.role !== "admin") {
    return redirect("/"); // ไม่ใช่ admin → กลับหน้าแรก
  }
}
