<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      class="elevation-2"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
      dark
      class="elevation-4"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title class="font-weight-bold" v-text="title" />
      <v-spacer />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
      class="elevation-2"
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>mdi-repeat</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Switch drawer (click me)</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list>
    </v-navigation-drawer>

    <v-footer :fixed="fixed" app class="justify-center py-3">
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false, // ควบคุมว่า App Bar จะทับ Navigation Drawer หรือไม่
      drawer: false, // ควบคุมการเปิด/ปิด Navigation Drawer ด้านซ้าย
      fixed: false, // ควบคุมว่า Footer จะติดอยู่ด้านล่างตลอดเวลาหรือไม่
      items: [
        // รายการเมนูสำหรับ Navigation Drawer ด้านซ้าย
        {
          icon: 'mdi-home', // เปลี่ยนไอคอนให้เหมาะสม
          title: 'หน้าหลัก', // เปลี่ยนชื่อเมนูให้ชัดเจน
          to: '/',
        },
        {
          icon: 'mdi-lightbulb-on', // เปลี่ยนไอคอนให้เหมาะสม
          title: 'แรงบันดาลใจ',
          to: '/inspire',
        },
        {
          icon: 'mdi-account-group', // เปลี่ยนไอคอนให้เหมาะสม
          title: 'เกี่ยวกับเรา', // เปลี่ยนชื่อเมนูให้ชัดเจน
          to: '/about', // ตัวอย่างเส้นทางใหม่
        },
        {
          icon: 'mdi-star', // เพิ่มเมนูใหม่สำหรับ Nona
          title: 'Nona',
          to: '/welcome',
        },
      ],
      miniVariant: false, // ควบคุมโหมด Navigation Drawer แบบย่อ
      right: true, // ควบคุมตำแหน่งของ Navigation Drawer ด้านขวา
      rightDrawer: false, // ควบคุมการเปิด/ปิด Navigation Drawer ด้านขวา
      title: 'Nuxtify App', // เปลี่ยนชื่อแอปพลิเคชัน
    }
  },
}
</script>

<style scoped>
/*
  สามารถเพิ่ม CSS ทั่วไปสำหรับเลย์เอาต์นี้ได้ที่นี่
  แต่สำหรับ Vuetify มักจะใช้พร็อพพ์และคลาสที่ Vuetify มีให้มากกว่าเขียน CSS เองโดยตรง

  ตัวอย่าง:
  .v-app-bar.v-toolbar {
    border-bottom: 2px solid var(--v-primary-lighten5);
  }
*/
</style>