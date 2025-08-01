<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-sheet
          :color="$vuetify.theme.dark ? 'surface' : 'white'"
          elevation="4"
          rounded="lg"
          class="pa-6 pa-md-8 my-8 content-sheet"
        >
          <v-row class="text-center mb-8">
            <v-col cols="12">
              <h1 class="display-2 font-weight-bold mb-3" :class="{'white--text': $vuetify.theme.dark, 'primary--text': !$vuetify.theme.dark}">
                📚 ยินดีต้อนรับสู่ <span class="accent--text">NovelVerse</span>
              </h1>
              <p class="subtitle-1 grey--text text--darken-1">
                ดำดิ่งสู่โลกแห่งจินตนาการ ค้นพบนิยายคุณภาพเยี่ยม นิยายยอดนิยม และนิยายมาแรงประจำสัปดาห์
              </p>
              <v-btn color="accent" class="mt-4" large to="/novels">
                <v-icon left>mdi-book-open-page-variant</v-icon>
                สำรวจนิยายทั้งหมด
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="my-8"></v-divider>

          <section class="my-10">
            <h2 class="text-h4 font-weight-medium mb-6" :class="{'white--text': $vuetify.theme.dark, 'primary--text': !$vuetify.theme.dark}">
              🔥 นิยายยอดเข้าชมประจำสัปดาห์
            </h2>
            <v-row>
              <v-col
                v-for="novel in popularNovels" :key="novel.id" 
                cols="12" sm="6" md="4" lg="3" class="d-flex"
              >
                <NovelCard :novel="novel" />
              </v-col>
            </v-row>
          </section>

          <v-divider class="my-8"></v-divider>

          <section class="my-10">
            <h2 class="text-h4 font-weight-medium mb-6" :class="{'white--text': $vuetify.theme.dark, 'primary--text': !$vuetify.theme.dark}">
              🏆 นิยายยอดนิยมตลอดกาล
            </h2>
            <v-row>
              <v-col
                v-for="novel in trendingNovels" :key="novel.id" 
                cols="12" sm="6" md="4" lg="3" class="d-flex"
              >
                <NovelCard :novel="novel" />
              </v-col>
            </v-row>
          </section>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import NovelCard from '~/components/novels/NovelCard.vue'

export default {
  components: {
    NovelCard // ลงทะเบียน component
  },
  data() {
    return {
      popularNovels: [ // ข้อมูลจำลอง (ควรดึงจาก API จริง)
        { id: 1, title: 'บันทึกตำนานมังกร', author: 'ผู้แต่ง A', coverUrl: 'https://via.placeholder.com/150x200?text=Dragon' },
        { id: 2, title: 'ผจญภัยในโลกเวทมนตร์', author: 'ผู้แต่ง B', coverUrl: 'https://via.placeholder.com/150x200?text=Magic' },
        { id: 3, title: 'เกิดใหม่เป็นจอมมาร', author: 'ผู้แต่ง C', coverUrl: 'https://via.placeholder.com/150x200?text=Demon' },
        { id: 4, title: 'เส้นทางสู่เซียน', author: 'ผู้แต่ง D', coverUrl: 'https://via.placeholder.com/150x200?text=Immortal' },
      ],
      trendingNovels: [ // ข้อมูลจำลอง
        { id: 5, title: 'รักนี้ต้องรอด', author: 'ผู้แต่ง E', coverUrl: 'https://via.placeholder.com/150x200?text=Love' },
        { id: 6, title: 'สงครามจักรวาล', author: 'ผู้แต่ง F', coverUrl: 'https://via.placeholder.com/150x200?text=Space' },
        { id: 7, title: 'ปริศนาคฤหาสน์เก่า', author: 'ผู้แต่ง G', coverUrl: 'https://via.placeholder.com/150x200?text=Mystery' },
        { id: 8, title: 'ฮีโร่ไร้นาม', author: 'ผู้แต่ง H', coverUrl: 'https://via.placeholder.com/150x200?text=Hero' },
      ]
    }
  },
  head() {
    return {
      title: 'หน้าแรก - NovelVerse',
      meta: [
        { hid: 'description', name: 'description', content: 'เว็บไซต์นิยาย e-Book ที่ดีที่สุด' }
      ]
    }
  }
}
</script>

<style scoped>
/* ยังคงสไตล์สำหรับ v-sheet และ container ของหน้าแรก */
.content-sheet {
  /* No specific styles here needed if default Vuetify classes are sufficient */
}
</style>