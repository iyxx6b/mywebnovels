<template>
  <v-container>
    <!-- Popular This Week -->
    <section class="my-10">
      <h2 class="text-h5 font-weight-bold mb-4">🔥 Popular This Week</h2>
      <v-row>
        <v-col
          v-for="(novel, index) in popularNovels"
          :key="novel.id"
          cols="12" sm="6" md="4" lg="2"
        >
          <v-card class="mx-auto hover-card" max-width="200">
            <!-- รูปปก -->
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

            <!-- ข้อมูล -->
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
        </v-col>
      </v-row>
    </section>

    <v-divider class="my-8"></v-divider>

    <!-- New Releases -->
    <section class="my-10">
      <h2 class="text-h5 font-weight-bold mb-4">🆕 New Releases</h2>
      <v-row>
        <v-col
          v-for="novel in newReleases"
          :key="novel.id"
          cols="12" sm="6" md="4" lg="2"
        >
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
        </v-col>
      </v-row>
    </section>
  </v-container>
</template>

<script>
export default {
  name: "IndexPage",
  data() {
    return {
      popularNovels: [],
      newReleases: []
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
    try {
      const res = await this.$axios.get("http://localhost/db_webnovels/get_novels.php")
      const novels = res.data

      this.popularNovels = novels.slice(0, 6).map(n => ({
        ...n,
        rating: Math.floor(Math.random() * 30) + 70
      }))
      this.newReleases = novels.slice(-6)
    } catch (error) {
      console.error("Error fetching novels:", error)
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
