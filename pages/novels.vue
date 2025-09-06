<template>
  <v-container>
    <v-row class="my-5">
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
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="openForm(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteNovel(item.id)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <!-- Dialog Add/Edit -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="valid">
              <v-text-field
                v-model="editedNovel.title"
                label="ชื่อนิยาย"
                :rules="[v => !!v || 'กรุณากรอกชื่อนิยาย']"
              />
              <v-text-field
                v-model="editedNovel.author"
                label="ผู้เขียน"
                :rules="[v => !!v || 'กรุณากรอกชื่อผู้เขียน']"
              />
              <v-text-field
                v-model="editedNovel.genre"
                label="ประเภท"
                :rules="[v => !!v || 'กรุณากรอกประเภทนิยาย']"
              />
              <v-select
                v-model="editedNovel.status"
                :items="['ongoing', 'completed']"
                label="สถานะ"
                :rules="[v => !!v || 'กรุณาเลือกสถานะ']"
              />
              <v-textarea
                v-model="editedNovel.content"
                label="เนื้อหานิยาย"
                :rules="[v => !!v || 'กรุณากรอกเนื้อหา']"
              />
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeForm">ยกเลิก</v-btn>
          <v-btn color="blue darken-1" text @click="saveNovel">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Card แสดงรายการ -->
    <v-row>
      <v-col
        v-for="novel in novels"
        :key="novel.id"
        cols="12"
        md="4"
      >
        <v-card>
          <v-card-title>{{ novel.title }}</v-card-title>
          <v-card-subtitle>ผู้แต่ง: {{ novel.author }}</v-card-subtitle>
          <v-card-text>
            ประเภท: {{ novel.genre }} <br />
            สถานะ: {{ novel.status }} <br />
            {{ novel.content ? novel.content.substring(0, 100) + '...' : '' }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-alert v-if="error" type="error" dense>{{ error }}</v-alert>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  layout: "default",
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
        { text: "จัดการ", value: "actions", sortable: false },
      ],
      novels: [],
      editedIndex: -1,
      editedNovel: {
        id: 0,
        title: "",
        author: "",
        genre: "",
        status: "ongoing",
        content: "",
      },
      defaultNovel: {
        id: 0,
        title: "",
        author: "",
        genre: "",
        status: "ongoing",
        content: "",
      },
      error: "",
      // ใช้ path ที่ตรงกับโฟลเดอร์ db_webnovels
      apiBaseUrl: "http://localhost/db_webnovels/",
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มนิยายใหม่" : "แก้ไขนิยาย";
    },
  },
  methods: {
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
        if (this.$refs.form) {
          this.$refs.form.resetValidation();
        }
      });
    },
    async saveNovel() {
      if (!this.$refs.form.validate()) return;

      try {
        if (this.editedIndex > -1) {
          // Update
          await axios.put(`${this.apiBaseUrl}edit_novel.php`, this.editedNovel);
        } else {
          // Insert
          await axios.post(`${this.apiBaseUrl}add_novel.php`, this.editedNovel);
        }
        await this.fetchNovels();
        this.closeForm();
      } catch (error) {
        console.error("Save failed:", error.response?.data || error.message);
        this.error = "ไม่สามารถบันทึกข้อมูลได้";
      }
    },
    async deleteNovel(id) {
      if (confirm("คุณต้องการลบข้อมูลนี้หรือไม่?")) {
        try {
          await axios.get(`${this.apiBaseUrl}delete_novel.php?id=${id}`);
          await this.fetchNovels();
        } catch (error) {
          console.error("Delete failed:", error);
          this.error = "ไม่สามารถลบข้อมูลได้";
        }
      }
    },
    async fetchNovels() {
      try {
        const response = await axios.get(`${this.apiBaseUrl}get_novels.php`);
        this.novels = response.data;
      } catch (error) {
        console.error("Fetch failed:", error);
        this.error = "ไม่สามารถโหลดข้อมูลได้";
      }
    },
  },
  async mounted() {
    await this.fetchNovels();
  },
};
</script>

<style scoped>
/* ใช้ Vuetify เป็นหลัก */
</style>
