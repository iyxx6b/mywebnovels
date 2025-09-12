<template>
  <v-container>
    <v-card class="pa-6">
      <h2 class="mb-4">Chapter {{ chapter.number }}: {{ chapter.title }}</h2>

      <!-- แสดงเนื้อหาตอน -->
      <div v-html="chapter.content" class="chapter-content"></div>

      <v-divider class="my-6"></v-divider>

      <!-- ปุ่มเปลี่ยนตอน -->
      <div class="d-flex justify-space-between">
        <v-btn :disabled="chapter.number <= 1" @click="goToChapter(chapter.number - 1)">
          Prev
        </v-btn>
        <v-btn @click="goToChapter(chapter.number + 1)">
          Next
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "ChapterPage",
  data: () => ({
    chapter: {},
  }),
  async asyncData({ params }) {
    try {
      const res = await axios.get(
        `http://localhost/db_webnovels/get_chapter.php?novel_id=${params.id}&chapter=${params.chapter}`
      );
      return { chapter: res.data };
    } catch (err) {
      console.error("โหลดข้อมูลตอนล้มเหลว:", err);
      return { chapter: {} };
    }
  },
  methods: {
    goToChapter(chapterNum) {
      this.$router.push(`/novels/${this.$route.params.id}/chapter/${chapterNum}`);
    },
  },
};
</script>

<style scoped>
.chapter-content {
  white-space: pre-line;
  line-height: 1.8;
  font-size: 1.1rem;
}
</style>
