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
                v-for="i in 4" :key="i"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                class="d-flex"
              >
                <v-card :color="$vuetify.theme.dark ? 'secondary' : 'grey lighten-4'" class="pa-4 flex-grow-1 text-center">
                    <v-img src="https://via.placeholder.com/150x200?text=Novel+Cover" height="200px" contain class="mb-2"></v-img>
                    <h3 class="text-h6 font-weight-bold" :class="{'white--text': $vuetify.theme.dark, 'primary--text': !$vuetify.theme.dark}">ชื่อนิยาย {{ i }}</h3>
                    <p class="text-caption grey--text">ผู้แต่ง: ทดสอบ</p>
                    <v-btn small text color="accent">อ่านเลย</v-btn>
                </v-card>
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
                v-for="i in 4" :key="i"
                cols="12"
                sm="6"
                md="4"
                lg="3"
                class="d-flex"
              >
                 <v-card :color="$vuetify.theme.dark ? 'secondary' : 'grey lighten-4'" class="pa-4 flex-grow-1 text-center">
                    <v-img src="https://via.placeholder.com/150x200?text=Novel+Cover" height="200px" contain class="mb-2"></v-img>
                    <h3 class="text-h6 font-weight-bold" :class="{'white--text': $vuetify.theme.dark, 'primary--text': !$vuetify.theme.dark}">ชื่อนิยายยอดนิยม {{ i }}</h3>
                    <p class="text-caption grey--text">ผู้แต่ง: ทดสอบ</p>
                    <v-btn small text color="accent">อ่านเลย</v-btn>
                </v-card>
              </v-col>
            </v-row>
          </section>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
.content-sheet {
  /* No specific styles here needed if default Vuetify classes are sufficient */
}
</style>