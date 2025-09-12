<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 text-center">ระบบจัดการนิยาย</h1>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-card class="pa-5">
          <v-card-title>
            รายการนิยาย
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="openForm()">เพิ่มนิยายใหม่</v-btn>
          </v-card-title>

          <v-data-table
            :headers="headers"
            :items="novels"
            item-key="id"
            class="elevation-1"
          >
            <template v-slot:item.cover_image="{ item }">
              <v-img
                :src="getCoverImage(item.cover_image)"
                max-width="80"
                max-height="120"
                contain
              ></v-img>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="openForm(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteNovel(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="editedNovel.title" label="ชื่อนิยาย" required></v-text-field>
            <v-text-field v-model="editedNovel.author" label="ผู้เขียน" required></v-text-field>
            <v-text-field v-model="editedNovel.genre" label="ประเภท (Tag)" required></v-text-field>
            <v-select v-model="editedNovel.status" :items="['ongoing','completed', 'paused']" label="สถานะ" required></v-select>
            <v-textarea v-model="editedNovel.description" label="เรื่องย่อ / คำโปรย" required></v-textarea>
            <v-file-input v-model="coverFile" label="ปกนิยาย" accept="image/*" show-size></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeForm">ยกเลิก</v-btn>
          <v-btn text color="primary" @click="saveNovel">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  // เพิ่ม middleware เพื่อป้องกันหน้านี้สำหรับผู้ดูแลระบบเท่านั้น
  middleware: 'admin-auth',

  name: "AdminNovelsPage",
  data() {
    return {
      dialog: false,
      valid: false,
      headers: [
        { text: "ID", value: "id", width: '5%' },
        { text: "ปก", value: "cover_image", sortable: false },
        { text: "ชื่อนิยาย", value: "title" },
        { text: "ผู้เขียน", value: "author" },
        { text: "ประเภท", value: "genre" },
        { text: "สถานะ", value: "status" },
        { text: "จัดการ", value: "actions", sortable: false, align: 'center' },
      ],
      novels: [],
      editedIndex: -1,
      editedNovel: { id: 0, title: "", author: "", genre: "", status: "ongoing", cover_image: "", description: "" },
      defaultNovel: { id: 0, title: "", author: "", genre: "", status: "ongoing", cover_image: "", description: "" },
      coverFile: null,
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
        const res = await this.$axios.get("/get_novels.php")
        this.novels = Array.isArray(res.data) ? res.data : [];
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
      // ส่งข้อมูลทั้งหมดใน editedNovel ไปกับ FormData
      for (const key in this.editedNovel) {
        formData.append(key, this.editedNovel[key]);
      }
      if (this.coverFile) {
        formData.append("cover", this.coverFile);
      }

      try {
        if (this.editedIndex > -1) {
          await this.$axios.post("/update_novel.php", formData);
        } else {
          await this.$axios.post("/add_novel.php", formData);
        }
        await this.fetchNovels();
        this.closeForm();
      } catch (e) {
        console.error("Save failed:", e);
      }
    },
    async deleteNovel(id) {
      if (confirm("คุณต้องการลบข้อมูลนี้หรือไม่?")) {
        try {
          await this.$axios.get(`/delete_novel.php?id=${id}`);
          await this.fetchNovels();
        } catch (e) {
          console.error("Delete failed:", e);
        }
      }
    },
  },
  mounted() {
    this.fetchNovels();
  },
}
</script>