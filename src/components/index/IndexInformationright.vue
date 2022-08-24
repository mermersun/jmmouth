<template>
  <div
    class="index-informationright"
    @click="$router.push(`/home/information_detail/${item.id}`)"
  >
    <div>
      <img :src="item.picture" alt="" />
      <div>
        <p>{{ item.title }}</p>
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
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style lang="scss" scoped>
.index-informationright {
  padding: 15px 0;
  box-sizing: border-box;
  border-bottom: 1.5px solid #ccc;

  & > div {
    height: 150px;
    width: 390px;
    display: flex;
    cursor: pointer;
    transition: 0.5s;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px;
    &:hover {
      box-shadow: rgba(19, 19, 33, 0.8) 0px 0px 26px;
    }

    & > img {
      width: 45%;
      height: 100%;
      border-radius: 10px;
    }
    & p {
      margin-top: 4px;
      font-weight: bold;
      font-size: 0.9em;
    }

    & > div {
      height: 95%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 10px;

      & > div {
        width: 200px;
        display: flex;
        justify-content: space-between;
        color: #aaa;
        & div > img:first-child {
          width: 18px;
          vertical-align: middle;
        }
        & div > span {
          font-size: 0.9em;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
