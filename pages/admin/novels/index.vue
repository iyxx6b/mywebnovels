<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet
          :color="$vuetify.theme.dark ? 'surface' : 'white'"
          elevation="4"
          rounded="lg"
          class="pa-6 pa-md-8 my-8"
        >
          <h1 class="display-2 font-weight-bold mb-3">จัดการนิยาย</h1>
          <v-btn color="primary" class="my-4" @click="openDialog(false)">เพิ่มนิยาย</v-btn>

          <v-data-table
            :headers="headers"
            :items="novels"
            item-key="id"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="openDialog(true, item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteNovel(item._id)">mdi-delete</v-icon>
            </template>
          </v-data-table>

          <v-dialog v-model="dialog" max-width="600px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ isEditing ? 'แก้ไขนิยาย' : 'เพิ่มนิยายใหม่' }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="form.title" label="ชื่อนิยาย" required></v-text-field>
                      <v-text-field v-model="form.author" label="ผู้แต่ง" required></v-text-field>
                      <v-textarea v-model="form.description" label="คำอธิบาย" required></v-textarea>
                      <v-text-field v-model="form.genre" label="หมวดหมู่"></v-text-field>
                      <v-text-field v-model="form.coverUrl" label="URL รูปหน้าปก"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">ยกเลิก</v-btn>
                <v-btn color="blue darken-1" text @click="saveNovel">บันทึก</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // เพิ่ม Middleware เพื่อป้องกันการเข้าถึง
  middleware: 'admin-auth', 

  layout: 'default',
  data() {
    return {
      headers: [
        { text: 'ชื่อนิยาย', value: 'title' },
        { text: 'ผู้แต่ง', value: 'author' },
        { text: 'หมวดหมู่', value: 'genre' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      novels: [],
      dialog: false,
      isEditing: false,
      form: {
        _id: null,
        title: '',
        author: '',
        description: '',
        genre: '',
        coverUrl: '',
      },
    };
  },
  async fetch() {
    try {
      const { data } = await this.$axios.get('/novels');
      this.novels = data;
    } catch (error) {
      console.error('Fetch novels error:', error);
    }
  },
  methods: {
    async saveNovel() {
      try {
        if (this.isEditing) {
          await this.$axios.put(`/novels/${this.form._id}`, this.form);
        } else {
          await this.$axios.post('/novels', this.form);
        }
        this.dialog = false;
        await this.$fetch();
      } catch (error) {
        console.error('Save novel error:', error);
      }
    },
    async deleteNovel(id) {
      if (confirm('คุณต้องการลบนิยายเรื่องนี้ใช่หรือไม่?')) {
        try {
          await this.$axios.delete(`/novels/${id}`);
          await this.$fetch();
        } catch (error) {
          console.error('Delete novel error:', error);
        }
      }
    },
    openDialog(editing, item = {}) {
      this.isEditing = editing;
      this.form = editing ? { ...item } : { _id: null, title: '', author: '', description: '', genre: '', coverUrl: '' };
      this.dialog = true;
    },
  },
};
</script>