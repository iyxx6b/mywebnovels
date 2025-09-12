<script>
// ไม่จำเป็นต้อง import axios เพราะ Nuxt.js จัดการให้แล้ว
// import axios from "axios" 

export default {
  name: "NovelsPage",
  data() {
    return {
      dialog: false,
      valid: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "ชื่อนิยาย", value: "title" },
        { text: "ผู้เขียน", value: "author" },
        { text: "ประเภท", value: "genre" },
        { text: "สถานะ", value: "status" },
        { text: "ปก", value: "cover_image" },
        { text: "จัดการ", value: "actions", sortable: false },
      ],
      novels: [],
      editedIndex: -1,
      editedNovel: { id: 0, title: "", author: "", genre: "", status: "ongoing", cover_image: "" },
      defaultNovel: { id: 0, title: "", author: "", genre: "", status: "ongoing", cover_image: "" },
      coverFile: null,
      // apiBaseUrl: "http://localhost/db_webnovels/", // <-- บรรทัดนี้ไม่จำเป็นแล้ว
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มนิยายใหม่" : "แก้ไขนิยาย"
    },
  },
  methods: {
    getCoverImage(cover) {
      // ตรวจสอบว่า cover มีค่าและไม่ใช่ null ก่อนขึ้นต้นด้วย http
      return cover && cover.startsWith("http")
        ? cover
        : "https://placehold.co/200x280?text=No+Image"
    },
    async fetchNovels() {
      try {
        // ใช้ this.$axios ซึ่งมี baseURL ที่ตั้งค่าไว้ใน nuxt.config.js
        const res = await this.$axios.get("/get_novels.php")
        this.novels = res.data
      } catch (e) {
        console.error("Fetch failed:", e)
      }
    },
    openForm(item) {
      if (item) {
        this.editedIndex = this.novels.indexOf(item)
        this.editedNovel = Object.assign({}, item)
      } else {
        this.editedIndex = -1
        this.editedNovel = Object.assign({}, this.defaultNovel)
      }
      this.coverFile = null
      this.dialog = true
    },
    closeForm() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedNovel = Object.assign({}, this.defaultNovel)
        this.editedIndex = -1
        this.coverFile = null
      })
    },
    async saveNovel() {
      const formData = new FormData()
      for (const key in this.editedNovel) {
        formData.append(key, this.editedNovel[key])
      }
      if (this.coverFile) {
        formData.append("cover", this.coverFile)
      }

      try {
        if (this.editedIndex > -1) {
          // ใช้ this.$axios และเรียกไฟล์ update_novel.php
          await this.$axios.post("/update_novel.php", formData);
        } else {
          // ใช้ this.$axios และเรียกไฟล์ add_novel.php
          await this.$axios.post("/add_novel.php", formData);
        }
        await this.fetchNovels()
        this.closeForm()
      } catch (e) {
        console.error("Save failed:", e)
      }
    },
    async deleteNovel(id) {
      if (confirm("คุณต้องการลบข้อมูลนี้หรือไม่?")) {
        try {
          // ใช้ this.$axios และส่ง id ไปเป็น params
          await this.$axios.get("/delete_novel.php?id=" + id)
          await this.fetchNovels()
        } catch (e) {
          console.error("Delete failed:", e)
        }
      }
    },
  },
  mounted() {
    this.fetchNovels()
  },
}
</script>