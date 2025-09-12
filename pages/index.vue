<template>
  <v-container>
    <v-alert v-if="error" type="error" dense dismissible class="my-4">
      ไม่สามารถโหลดข้อมูลนิยายได้: {{ error }}
    </v-alert>

    <template v-if="isLoading">
      <section class="my-10">
        <h2 class="text-h5 font-weight-bold mb-4">🔥 Popular This Week</h2>
        <v-row>
          <v-col v-for="n in 6" :key="n" cols="12" sm="6" md="4" lg="2">
            <v-skeleton-loader type="card" max-width="200" class="mx-auto"></v-skeleton-loader>
          </v-col>
        </v-row>
      </section>
    </template>

    <template v-else>
      <section class="my-10">
        <h2 class="text-h5 font-weight-bold mb-4">🔥 Popular This Week</h2>
        <v-row>
          <v-col
            v-for="(novel, index) in popularNovels"
            :key="novel.id"
            cols="12" sm="6" md="4" lg="2"
          >
            <nuxt-link :to="`/novels/${novel.id}`" class="text-decoration-none">
              <v-card class="mx-auto hover-card" max-width="200">
                <v-img
                  :src="getCoverImage(novel.cover_image)"
                  height="280px"
                  class="rounded"
                >
                  <div class="rank-number">#{{ index + 1 }}</div>
                  <v-chip
                    small
                    color="deep-purple accent-4"
                    text-color="white"
                    class="status-chip"
                  >
                    {{ novel.status }}
                  </v-chip>
                </v-img>
                <v-card-text class="pa-2">
                  <div class="font-weight-bold text-truncate">{{ novel.title }}</div>
                  <div class="caption grey--text">by {{ novel.author }}</div>
                  <v-progress-linear
                    :value="novel.rating || 70"
                    height="6"
                    color="amber"
                    class="mt-2"
                  ></v-progress-linear>
                  <div class="caption">{{ novel.rating || 70 }}%</div>
                </v-card-text>
              </v-card>
            </nuxt-link>
          </v-col>
        </v-row>
      </section>

      <v-divider class="my-8"></v-divider>

      <section class="my-10">
        <h2 class="text-h5 font-weight-bold mb-4">🆕 New Releases</h2>
        <v-row>
          <v-col
            v-for="novel in newReleases"
            :key="novel.id"
            cols="12" sm="6" md="4" lg="2"
          >
            <nuxt-link :to="`/novels/${novel.id}`" class="text-decoration-none">
              <v-card class="mx-auto hover-card" max-width="200">
                <v-img
                  :src="getCoverImage(novel.cover_image)"
                  height="280px"
                  class="rounded"
                >
                  <v-chip
                    small
                    color="deep-purple accent-4"
                    text-color="white"
                    class="status-chip"
                  >
                    {{ novel.status }}
                  </v-chip>
                </v-img>
                <v-card-text class="pa-2">
                  <div class="font-weight-bold text-truncate">{{ novel.title }}</div>
                  <div class="caption grey--text">by {{ novel.author }}</div>
                </v-card-text>
              </v-card>
            </nuxt-link>
          </v-col>
        </v-row>
      </section>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      popularNovels: [],
      newReleases: [],
      isLoading: true,
      error: null,
    }
  },
  methods: {
    getCoverImage(cover) {
      return cover && cover.startsWith("http")
        ? cover
        : "https://placehold.co/200x280?text=No+Image"
    }
  },
  async mounted() {
    this.isLoading = true;
    this.error = null;
    try {
      const res = await this.$axios.get("/get_novels.php");
      
      const novels = res.data;

      if (Array.isArray(novels)) {
        this.popularNovels = novels.slice(0, 6).map(n => ({
          ...n,
          rating: Math.floor(Math.random() * 30) + 70
        }));
        this.newReleases = novels.slice(-6);
      } else {
        throw new Error("Invalid data format received from API.");
      }
    } catch (err) {
      this.error = err.message || "An unknown error occurred.";
      console.error("Error fetching novels:", err);
    } finally {
      this.isLoading = false;
    }
  }
}
</script>

<style scoped>
.rank-number {
  position: absolute;
  bottom: 8px;
  left: 8px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: bold;
}
.status-chip {
  position: absolute;
  top: 8px;
  left: 8px;
}
.hover-card {
  transition: transform 0.2s;
}
.hover-card:hover {
  transform: scale(1.05);
}
</style>