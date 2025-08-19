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
// นำเข้า Component ที่จำเป็น
import NovelCard from '~/components/novels/NovelCard.vue'

export default {
  // ตั้งชื่อ Component
  name: 'IndexPage',
  components: {
    NovelCard // ลงทะเบียน component
  },
  data() {
    return {
      popularNovels: [ // ข้อมูลจำลองสำหรับนิยายยอดเข้าชม (ในความเป็นจริงควรดึงจาก API)
        { id: 1, title: 'บันทึกตำนานมังกร', author: 'ผู้แต่ง A', imageUrl: 'https://via.placeholder.com/150x200?text=Dragon', genre: 'แฟนตาซี', rating: 4.8, views: 500000, description: 'เรื่องราวการผจญภัยของนักปราชญ์ผู้ถูกขับไล่...' },
        { id: 2, title: 'ผจญภัยในโลกเวทมนตร์', author: 'ผู้แต่ง B', imageUrl: 'https://via.placeholder.com/150x200?text=Magic', genre: 'เวทมนตร์', rating: 4.6, views: 450000, description: 'เด็กหนุ่มผู้ไม่มีเวทมนตร์กลับต้องปกป้องโลกใบนี้...' },
        { id: 3, title: 'เกิดใหม่เป็นจอมมาร', author: 'ผู้แต่ง C', imageUrl: 'https://via.placeholder.com/150x200?text=Demon', genre: 'ต่างโลก', rating: 4.9, views: 600000, description: 'เมื่อวิศวกรหนุ่มสุดเนิร์ดต้องเกิดใหม่เป็นจอมมารสุดโหด...' },
        { id: 4, title: 'เส้นทางสู่เซียน', author: 'ผู้แต่ง D', imageUrl: 'https://via.placeholder.com/150x200?text=Immortal', genre: 'กำลังภายใน', rating: 4.7, views: 480000, description: 'ฝึกฝนพลังภายใน เพื่อก้าวข้ามขีดจำกัดของมนุษย์...' },
      ],
      trendingNovels: [ // ข้อมูลจำลองสำหรับนิยายยอดนิยมตลอดกาล
        { id: 5, title: 'รักนี้ต้องรอด', author: 'ผู้แต่ง E', imageUrl: 'https://via.placeholder.com/150x200?text=Love', genre: 'โรแมนติก', rating: 5.0, views: 1200000, description: 'รักต่างชนชั้นที่ต้องเผชิญกับอุปสรรคมากมาย...' },
        { id: 6, title: 'สงครามจักรวาล', author: 'ผู้แต่ง F', imageUrl: 'https://via.placeholder.com/150x200?text=Space', genre: 'ไซไฟ', rating: 4.9, views: 1050000, description: 'การต่อสู้เพื่อชิงอำนาจสูงสุดในกาแล็กซี่...' },
        { id: 7, title: 'ปริศนาคฤหาสน์เก่า', author: 'ผู้แต่ง G', imageUrl: 'https://via.placeholder.com/150x200?text=Mystery', genre: 'สืบสวนสอบสวน', rating: 4.7, views: 980000, description: 'คดีฆาตกรรมสุดซับซ้อนที่รอให้คุณไขปริศนา...' },
        { id: 8, title: 'ฮีโร่ไร้นาม', author: 'ผู้แต่ง H', imageUrl: 'https://via.placeholder.com/150x200?text=Hero', genre: 'แอ็คชั่น', rating: 4.8, views: 1100000, description: 'เมื่อฮีโร่ไม่ต้องการชื่อเสียงแต่ต้องแบกรับชะตาโลก...' },
      ]
    }
  },
  // ส่วนที่ใช้สำหรับกำหนด metadata ของหน้า เช่น title, description
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
/*
  สไตล์ที่กำหนดในนี้จะใช้เฉพาะกับ Component นี้เท่านั้น
  ในโค้ดที่คุณให้มา ไม่มี style เฉพาะเจาะจงที่จำเป็นต้องใช้
  ดังนั้นส่วนนี้จึงว่างเปล่า
*/
</style>