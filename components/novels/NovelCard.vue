<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      :src="novel.imageUrl || 'https://via.placeholder.com/150'"
      height="200px"
      cover
    ></v-img>

    <v-card-title>
      {{ novel.title || 'ชื่อนิยาย' }}
    </v-card-title>

    <v-card-subtitle class="pb-0">
      ผู้เขียน: {{ novel.author || 'ไม่ระบุ' }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>แนว: {{ novel.genre || 'ทั่วไป' }}</div>
      <div>
        <v-icon small>mdi-star</v-icon>
        {{ novel.rating || 'N/A' }} ({{ novel.views || 0 }} views)
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange" text @click="readNovel">
        อ่านนิยาย
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text>
          {{ novel.description || 'ไม่มีคำอธิบายสำหรับนิยายเรื่องนี้.' }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: 'NovelCard',
  props: {
    novel: {
      type: Object,
      default: () => ({
        title: 'นิยายไม่ระบุชื่อ',
        author: 'ไม่ระบุผู้เขียน',
        genre: 'แฟนตาซี',
        rating: 4.5,
        views: 12345,
        description: 'นี่คือคำอธิบายสั้นๆ ของนิยายเรื่องนี้...',
        imageUrl: ''
      })
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    readNovel() {
      this.$emit('read-novel', this.novel)
    }
  }
}
</script>