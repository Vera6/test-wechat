<template>
  <div class="image-container" @click="preview">
    <img :src="src" mode="aspectFit" >
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  methods: {
    preview () {
      const urls = []
      urls.push(this.src)
      wx.previewImage({
        urls
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image-container {
  border: 5px solid #FF759A;
  border-radius: 10px;
  width: 342px;
  height: 190px;
  overflow: hidden;
  img {
    width: 332px;
    height: 180px;
  }
}
</style>
