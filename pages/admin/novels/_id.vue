<template>
  <v-container>
    <v-card class="pa-5">
      <v-row>
        <v-col cols="12" md="4">
          <v-img
            :src="novel.cover_image || 'https://placehold.co/200x300?text=No+Image'"
            height="300px"
          />
        </v-col>
        <v-col cols="12" md="8">
          <h1>{{ novel.title }}</h1>
          <p><strong>ผู้แต่ง:</strong> {{ novel.author }}</p>
          <p><strong>ประเภท:</strong> {{ novel.genre }}</p>
          <p><strong>สถานะ:</strong> {{ novel.status }}</p>
          <p><strong>คำโปรย:</strong> {{ novel.description }}</p>
        </v-col>
      </v-row>
      <v-divider class="my-5"></v-divider>
      <h2>📖 เนื้อหา</h2>
      <div v-html="novel.content"></div>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "NovelDetailPage",
  data: () => ({
    novel: {},
    apiBase: "http://localhost/db_webnovels/",
  }),
  async asyncData({ params }) {
    const res = await axios.get("http://localhost/db_webnovels/get_novels.php");
    const novels = res.data;
    const novel = novels.find((n) => n.id == params.id) || {};
    return { novel };
  },
};
</script>
