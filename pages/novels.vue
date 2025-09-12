<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold my-8">นิยายทั้งหมด</h1>

    <v-row v-if="isLoading">
      <v-col v-for="n in 12" :key="n" cols="12" sm="6" md="4" lg="3">
        <v-skeleton-loader type="card" class="mx-auto"></v-skeleton-loader>
      </v-col>
    </v-row>
    
    <v-row v-else-if="novels.length > 0">
      <v-col
        v-for="novel in novels"
        :key="novel.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <nuxt-link :to="`/novels/${novel.id}`" class="text-decoration-none">
          <v-card class="mx-auto hover-card" max-width="250">
            <v-img
              :src="getCoverImage(novel.cover_image)"
              height="350px"
              class="rounded"
            ></v-img>
            <v-card-text class="pa-2">
              <div class="font-weight-bold text-truncate">{{ novel.title }}</div>
              <div class="caption grey--text">by {{ novel.author }}</div>
            </v-card-text>
          </v-card>
        </nuxt-link>
      </v-col>
    </v-row>

    <v-alert v-else type="info">
      ยังไม่มีนิยายในระบบ
    </v-alert>

    <div class="text-center my-8" v-if="totalPages > 1">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        @input="fetchNovels"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AllNovelsPage",
  data() {
    return {
      novels: [],
      isLoading: true,
      error: null,
      currentPage: 1,
      totalPages: 1,
    };
  },
  watch: {
    // เมื่อ currentPage เปลี่ยน ให้โหลดข้อมูลใหม่
    currentPage(newPage) {
      this.fetchNovels(newPage);
    }
  },
  methods: {
    getCoverImage(cover) {
      return cover && cover.startsWith("http")
        ? cover
        : "https://placehold.co/250x350?text=No+Image";
    },
    async fetchNovels(page = 1) {
      this.isLoading = true;
      try {
        const response = await this.$axios.get(`/get_novels_paginated.php?page=${page}&limit=12`);
        this.novels = response.data.novels;
        this.totalPages = response.data.totalPages;
        this.currentPage = response.data.currentPage;
      } catch (err) {
        this.error = "Failed to load novels.";
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchNovels(this.currentPage);
  },
   head() {
    return {
      title: 'นิยายทั้งหมด',
    };
  },
};
</script>

<style scoped>
.hover-card {
  transition: transform 0.2s;
}
.hover-card:hover {
  transform: scale(1.05);
}
</style>