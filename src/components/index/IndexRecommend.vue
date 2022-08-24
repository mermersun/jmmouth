<template>
  <div
    class="index-recommend"
    @click="$router.push(`/home/hospital_detail/${item.id}`)"
  >
    <img :src="item.picture" alt="" />
    <span>{{ item.hospital_name }}</span>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="scss" scoped>
.index-recommend {
  height: 170px;
  width: 100%;
  margin: 15px 0;
  position: relative;
  border-radius: 10px;
  transition: 0.5s;

  &:hover {
    box-shadow: rgba(19, 19, 33, 0.8) 0px 0px 26px;
  }

  & > img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    cursor: pointer;
  }

  & > span {
    display: inline-block;
    position: absolute;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    text-align: center;
    line-height: 45px;
    color: #fff;
    font-weight: bold;
    border-radius: 0 0 10px 10px;
  }
}
</style>
