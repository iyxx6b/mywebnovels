<template>
  <v-card class="ma-3" outlined>
    <v-img
      :src="novel.cover_image || 'https://via.placeholder.com/150x200?text=No+Image'"
      height="200px"
    >
      <v-card-title class="white--text">{{ novel.title }}</v-card-title>
    </v-img>
    <v-card-subtitle>
      ผู้แต่ง: {{ novel.author }}
    </v-card-subtitle>
    <v-card-text>
      ประเภท: {{ novel.genre }} <br />
      สถานะ: {{ novel.status }} <br />
      {{ novel.content ? novel.content.substring(0, 80) + '...' : '' }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "NovelCard",
  props: {
    novel: { type: Object, required: true }
  }
}
</script>
