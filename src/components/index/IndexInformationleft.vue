<template>
  <div
    class="index-informationleft"
    @click="$router.push(`/home/information_detail/${item.id}`)"
  >
    <img :src="item.picture" alt="" />
    <p>{{ item.title }}</p>
    <p>{{ item.article }}</p>
    <div>
      <div>
        <img src="@/assets/information/author.png" alt="" />
        <span>{{ item.author }}</span>
      </div>
      <div>
        <img src="@/assets/information/time.png" alt="" />
        <span>{{ item.time }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="scss" scoped>
.index-informationleft {
  height: 450px;
  width: 380px;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;

  & > p:nth-child(2) {
    font-weight: bold;
    padding: 15px 10px;
  }
  & > p:nth-child(3) {
    height: 60px;
    width: 95%;
    line-height: 30px;
    padding: 0 10px;
    //文本超出显示...
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    word-break: break-all; /* break-all(允许在单词内换行。)  对pc端可以不要*/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 2; /** 显示的行数 **/
  }

  & > img {
    height: 65%;
    width: 100%;
    border-radius: 10px;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    color: #aaa;
    padding: 0 10px;
    & div > img:first-child {
      width: 18px;
      vertical-align: middle;
    }
    & div > span {
      vertical-align: middle;
    }
  }
}
</style>
