<template>
  <div class="environment">
    <b>医院展示</b>
    <div>
      <img v-for="img in showImg" :key="img" :src="img" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      showImg: [], //医院展示图片数组
    };
  },
  mounted() {
    this.showImg = this.item.show.split("，");
  },
};
</script>

<style lang="scss" scoped>
.environment {
  padding: 10px;
  & > b {
    display: inline-block;
    margin: 20px 0;
  }
  & > div {
    width: 1000px;
    padding-left: 15px;
    & > img {
      width: 100%;
    }
  }
}
</style>
