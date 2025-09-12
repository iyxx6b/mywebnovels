<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>
        ระบบจัดการนิยาย
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="openForm()">เพิ่มนิยายใหม่</v-btn>
      </v-card-title>

      <v-data-table :headers="headers" :items="novels" item-key="id" class="elevation-1">
        <template v-slot:item.index="{ index }">
          {{ index + 1 }}
        </template>

        <template v-slot:item.cover_image="{ item }">
          <v-img
            :src="item.cover_image || 'https://placehold.co/80x100?text=No+Image'"
            max-width="80"
            max-height="100"
            contain
          />
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="openForm(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteNovel(item.id)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>{{ formTitle }}</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field v-model="editedNovel.title" label="ชื่อเรื่อง" required></v-text-field>
            <v-text-field v-model="editedNovel.author" label="ผู้แต่ง" required></v-text-field>
            <v-text-field v-model="editedNovel.genre" label="ประเภท" required></v-text-field>
            <v-select v-model="editedNovel.status" :items="['ongoing','completed']" label="สถานะ"></v-select>
            <v-textarea v-model="editedNovel.description" label="คำโปรย"></v-textarea>
            <v-textarea v-model="editedNovel.content" label="เนื้อหา"></v-textarea>

            <v-file-input
              ref="fileInput"
              label="เลือกรูปปก"
              accept="image/*"
              prepend-icon="mdi-image"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="closeForm">ยกเลิก</v-btn>
          <v-btn color="primary" text @click="saveNovel">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "AdminNovelsPage",
  data: () => ({
    dialog: false,
    valid: false,
    headers: [
      { text: "ลำดับ", value: "index", sortable: false },
      { text: "ปก", value: "cover_image", sortable: false },
      { text: "ชื่อเรื่อง", value: "title" },
      { text: "ผู้แต่ง", value: "author" },
      { text: "ประเภท", value: "genre" },
      { text: "สถานะ", value: "status" },
      { text: "จัดการ", value: "actions", sortable: false },
    ],
    novels: [],
    editedIndex: -1,
    editedNovel: {},
    defaultNovel: {
      id: 0,
      title: "",
      author: "",
      genre: "",
      status: "ongoing",
      description: "",
      content: "",
      cover_image: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มนิยายใหม่" : "แก้ไขนิยาย";
    },
  },

  methods: {
    async fetchNovels() {
      try {
        // **จุดที่แก้ไข:** ลบ Base URL ออก
        const res = await this.$axios.get("/get_novels.php");
        this.novels = res.data;
      } catch (err) {
        console.error("โหลดข้อมูลล้มเหลว:", err);
      }
    },

    openForm(item) {
      if (item) {
        this.editedIndex = this.novels.indexOf(item);
        this.editedNovel = Object.assign({}, item);
      } else {
        this.editedIndex = -1;
        this.editedNovel = Object.assign({}, this.defaultNovel);
      }
      this.dialog = true;
    },

    closeForm() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedNovel = Object.assign({}, this.defaultNovel);
        this.editedIndex = -1;
      });
    },

    async saveNovel() {
      const formData = new FormData();
      for (const key in this.editedNovel) {
        formData.append(key, this.editedNovel[key]);
      }

      if (this.$refs.fileInput.$refs.input.files.length > 0) {
        formData.append("cover", this.$refs.fileInput.$refs.input.files[0]);
      }

      try {
        if (this.editedIndex > -1) {
          // **จุดที่แก้ไข:** ลบ Base URL ออก
          await this.$axios.post("/update_novel.php", formData);
        } else {
          // **จุดที่แก้ไข:** ลบ Base URL ออก
          await this.$axios.post("/add_novel.php", formData);
        }
        await this.fetchNovels();
        this.closeForm();
      } catch (err) {
        console.error("Save failed:", err);
      }
    },

    async deleteNovel(id) {
      if (confirm("ยืนยันการลบ?")) {
        try {
          // **จุดที่แก้ไข:** ลบ Base URL ออก
          await this.$axios.get("/delete_novel.php?id=" + id);
          await this.fetchNovels();
        } catch (err) {
          console.error("Delete failed:", err);
        }
      }
    },
  },

  mounted() {
    this.fetchNovels();
  },
};
</script>