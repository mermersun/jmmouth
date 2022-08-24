<template>
  <div
    class="index-doctor"
    @click="$router.push(`/home/doctor_detail/${item.id}`)"
  >
    <img :src="item.picture" alt="" />
    <div>
      <b>{{ item.doctor_name }}</b>
      <b>|</b>
      <b>{{ item.doctor_position }}</b>
    </div>
    <p>
      擅长：
      <span v-for="doctor_skill in doctor_skills" :key="doctor_skill">{{
        doctor_skill
      }}</span>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      doctor_skills: [],
    };
  },
  props: ["item"],
  mounted() {
    this.doctor_skills = this.item.doctor_skill.split("，");
  },
};
</script>

<style lang="scss" scoped>
.index-doctor {
  width: 22%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  font-size: 0.9em;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  cursor: pointer;

  & > img {
    height: 70%;
    width: 100%;
    border-radius: 10px;
  }

  & > div {
    text-align: center;

    & > b {
      margin: 3px;
    }
  }

  & > p {
    padding-left: 20px;
    margin-bottom: 10px;
  }
  & > p > span {
    display: inline-block;
    padding: 0 8px;
    margin-right: 3px;
    line-height: 25px;
    border-radius: 5px;
    background-color: #f7f9fd;
    font-size: 0.8em;
  }
}
</style>
