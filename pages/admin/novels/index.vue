<template>
  <v-container>
    <v-card class="pa-5">
      <v-card-title>
        📚 รายการนิยายทั้งหมด
      </v-card-title>

      <v-data-table
        :headers="headers"
        :items="novels"
        item-key="id"
        class="elevation-1"
      >
        <!-- ลำดับ -->
        <template v-slot:item.index="{ index }">
          {{ index + 1 }}
        </template>

        <!-- ปกนิยาย -->
        <template v-slot:item.cover_image="{ item }">
          <v-img
            :src="item.cover_image || 'https://placehold.co/80x100?text=No+Image'"
            max-width="80"
            max-height="100"
            contain
          />
        </template>

        <!-- คำโปรย -->
        <template v-slot:item.description="{ item }">
          <span>{{ item.description ? item.description.slice(0, 50) + "..." : "-" }}</span>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "NovelsIndexPage",
  data: () => ({
    headers: [
      { text: "ลำดับ", value: "index", sortable: false },
      { text: "ปก", value: "cover_image", sortable: false },
      { text: "ชื่อเรื่อง", value: "title" },
      { text: "ผู้แต่ง", value: "author" },
      { text: "ประเภท", value: "genre" },
      { text: "สถานะ", value: "status" },
      { text: "คำโปรย", value: "description" },
    ],
    novels: [],
    apiBase: "http://localhost/db_webnovels/",
  }),

  methods: {
    async fetchNovels() {
      try {
        const res = await axios.get(this.apiBase + "get_novels.php");
        this.novels = res.data;
      } catch (err) {
        console.error("โหลดข้อมูลล้มเหลว:", err);
      }
    },
  },

  mounted() {
    this.fetchNovels();
  },
};
</script>
