<template>
  <v-container v-if="novel">
    <v-row>
      <v-col cols="12" md="4">
        <v-img
          :src="novel.cover_image || 'https://placehold.co/300x450?text=No+Image'"
          max-height="450"
          contain
          class="elevation-2 rounded"
        ></v-img>
      </v-col>
      <v-col cols="12" md="8">
        <h1 class="text-h4 font-weight-bold mb-2">{{ novel.title }}</h1>
        <p class="subtitle-1"><strong>ผู้แต่ง:</strong> {{ novel.author }}</p>
        <div class="mb-4">
          <v-chip class="mr-2" color="primary">{{ novel.genre }}</v-chip>
          <v-chip :color="novel.status === 'ongoing' ? 'success' : 'info'">{{ novel.status }}</v-chip>
        </div>
        <h2 class="text-h6 mt-6">เรื่องย่อ</h2>
        <v-divider class="my-2"></v-divider>
        <p class="body-1" style="white-space: pre-wrap;">{{ novel.description }}</p>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else class="text-center">
    <v-progress-circular indeterminate color="primary" size="64" class="my-16"></v-progress-circular>
    <p>Loading...</p>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      novel: null,
    };
  },
  async asyncData({ params, $axios, error }) {
    try {
      const response = await $axios.get(`/get_novel_by_id.php?id=${params.id}`);
      return { novel: response.data };
    } catch (e) {
      error({ statusCode: 404, message: 'Novel not found' });
      return { novel: null };
    }
  },
  head() {
    return {
      title: this.novel ? this.novel.title : 'Loading Novel...',
    };
  },
};
</script>