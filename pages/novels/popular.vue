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
          <!-- ส่วนหัวของหน้านิยายยอดนิยม -->
          <v-row class="text-center mb-8">
            <v-col cols="12">
              <h1 class="display-2 font-weight-bold mb-3" :class="{'white--text': $vuetify.theme.dark, 'primary--text': !$vuetify.theme.dark}">
                🏆 นิยายยอดนิยม
              </h1>
              <p class="subtitle-1 grey--text text--darken-1">
                รวมนิยายที่ได้รับความนิยมสูงสุดตลอดกาลจากนักอ่านทั่วโลก
              </p>
            </v-col>
          </v-row>

          <v-divider class="my-8"></v-divider>

          <!-- รายการนิยายยอดนิยม -->
          <section class="my-10">
            <v-row>
              <v-col
                v-for="novel in popularNovels"
                :key="novel.id"
                cols="12" sm="6" md="4" lg="3" class="d-flex"
              >
                <!-- ใช้ NovelCard component ที่มีอยู่แล้ว -->
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
// นำเข้า NovelCard component
import NovelCard from '~/components/novels/NovelCard.vue'

export default {
  // ตั้งชื่อ Component
  name: 'PopularNovelsPage',
  components: {
    NovelCard
  },
  data() {
    return {
      popularNovels: [ // ข้อมูลจำลองสำหรับนิยายยอดนิยม
        { id: 1, title: 'บันทึกตำนานมังกร', author: 'ผู้แต่ง A', coverUrl: 'https://via.placeholder.com/150x200?text=Dragon' },
        { id: 2, title: 'ผจญภัยในโลกเวทมนตร์', author: 'ผู้แต่ง B', coverUrl: 'https://via.placeholder.com/150x200?text=Magic' },
        { id: 3, title: 'เกิดใหม่เป็นจอมมาร', author: 'ผู้แต่ง C', coverUrl: 'https://via.placeholder.com/150x200?text=Demon' },
        { id: 4, title: 'เส้นทางสู่เซียน', author: 'ผู้แต่ง D', coverUrl: 'https://via.placeholder.com/150x200?text=Immortal' },
        { id: 5, title: 'รักนี้ต้องรอด', author: 'ผู้แต่ง E', coverUrl: 'https://via.placeholder.com/150x200?text=Love' },
        { id: 6, title: 'สงครามจักรวาล', author: 'ผู้แต่ง F', coverUrl: 'https://via.placeholder.com/150x200?text=Space' },
        { id: 7, title: 'ปริศนาคฤหาสน์เก่า', author: 'ผู้แต่ง G', coverUrl: 'https://via.placeholder.com/150x200?text=Mystery' },
        { id: 8, title: 'ฮีโร่ไร้นาม', author: 'ผู้แต่ง H', coverUrl: 'https://via.placeholder.com/150x200?text=Hero' },
      ]
    }
  },
  // ส่วนที่ใช้สำหรับกำหนด metadata ของหน้า
  head() {
    return {
      title: 'นิยายยอดนิยม - NovelVerse',
      meta: [
        { hid: 'description', name: 'description', content: 'รวมนิยายยอดนิยมและนิยายขายดีที่สุด' }
      ]
    }
  }
}
</script>

<style scoped>
/* สไตล์เฉพาะสำหรับคอมโพเนนต์นี้ */
</style>
