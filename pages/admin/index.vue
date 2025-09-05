<template>
  <v-container>
    <h1 class="text-h4 mb-4">ระบบจัดการนิยาย</h1>

    <v-data-table
      :headers="headers"
      :items="items"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>รายชื่อนิยาย</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                <v-icon left>mdi-plus</v-icon>
                เพิ่มนิยายใหม่
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.title" label="ชื่อนิยาย"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.author" label="ผู้แต่ง"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.genre" label="ประเภท"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">ยกเลิก</v-btn>
                <v-btn color="blue darken-1" text @click="save">บันทึก</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item.id)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    dialog: false,
    loading: false,
    headers: [
      { text: 'ID', value: 'id' },
      { text: 'ชื่อนิยาย', value: 'title' },
      { text: 'ผู้แต่ง', value: 'author' },
      { text: 'ประเภท', value: 'genre' },
      { text: 'จัดการ', value: 'actions', sortable: false },
    ],
    items: [],
    editedIndex: -1,
    editedItem: {
      title: '',
      author: '',
      genre: '',
    },
    defaultItem: {
      title: '',
      author: '',
      genre: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'เพิ่มนิยายใหม่' : 'แก้ไขนิยาย';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.fetchItems();
  },

  methods: {
    // ฟังก์ชันสำหรับดึงข้อมูลนิยายทั้งหมด
    async fetchItems() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost/db_webnovels/get_novels.php');
        if (Array.isArray(response.data)) {
          this.items = response.data;
        } else {
          console.error('API response is not an array:', response.data);
          this.items = [];
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูล:', error);
        this.items = [];
      } finally {
        this.loading = false;
      }
    },

    // ฟังก์ชันสำหรับเปิด Dialog เพื่อแก้ไข
    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    // ฟังก์ชันสำหรับลบข้อมูล
    async deleteItem(id) {
      if (confirm('คุณต้องการลบข้อมูลนี้หรือไม่?')) {
        try {
          await axios.delete(`http://localhost/db_webnovels/delete_novel.php?id=${id}`);
          this.fetchItems();
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการลบข้อมูล:', error);
        }
      }
    },

    // ฟังก์ชันสำหรับปิด Dialog และรีเซ็ตฟอร์ม
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    // ฟังก์ชันสำหรับบันทึกข้อมูล (เพิ่ม/แก้ไข)
    async save() {
      try {
        if (this.editedIndex > -1) {
          const id = this.editedItem.id;
          // แก้ไขข้อมูลโดยใช้ axios.put
          await axios.put('http://localhost/db_webnovels/edit_novel.php', editedItem, {
            headers: { 'Content-Type': 'application/json' }
          });
        } else {
          // เพิ่มข้อมูลใหม่โดยใช้ axios.post
          await axios.post('http://localhost/db_webnovels/add_novel.php', this.editedItem);
        }
        this.fetchItems();
        this.close();
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล:', error);
      }
    },
  },
};
</script>