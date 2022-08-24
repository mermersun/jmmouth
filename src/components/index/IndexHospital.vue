<template>
  <div
    class="index-hospital"
    @click="$router.push(`/home/hospital_detail/${item.id}`)"
  >
    <img :src="item.picture" alt="" />
    <div>
      <div>
        <span>{{ item.hospital_name }}</span>
        <img src="@/assets/hospital/logo.png" alt="" />
      </div>
      <p>
        {{ item.hospital_detail }}
      </p>
      <div>
        <img src="@/assets/hospital/location.png" alt="" />
        <span>{{ item.address }}</span>
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
.index-hospital {
  margin-right: 40px;
  width: 260px;
  height: 380px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;

  & > img {
    width: 100%;
    height: 50%;
    border-radius: 10px;
  }

  & > div {
    height: 48%;
    width: 100%;

    & > div:first-child > span {
      font-weight: bold;
      font-size: 0.9em;
      vertical-align: middle;
      padding-left: 10px;
    }

    & > div:first-child > img {
      vertical-align: middle;
      width: 25px;
    }

    p {
      font-size: 0.9em;
      color: #666;
      width: 90%;
      height: 85px;
      margin: 10px 0;
      line-height: 22px;
      padding: 0 10px;
      //文本超出显示...
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
      word-break: break-all; /* break-all(允许在单词内换行。)  对pc端可以不要*/
      -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 4; /** 显示的行数 **/
    }

    & > div:last-child {
      margin-top: 30px;
      & > span {
        color: #aaa;
        font-size: 0.8em;
        vertical-align: middle;
      }
      & > img {
        vertical-align: middle;
        width: 20px;
      }
    }
  }
}
</style>
