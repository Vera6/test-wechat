<template>
  <div @click="onPage">
    <van-button>Welcome</van-button>
  </div>
</template>

<script>
import { get } from '@/utils/request'

export default {
  created() {
    get('https://www.baidu.com').then((res) => {
      console.log('res', res)
    })
  },
  methods: {
    onPage() {
      this.$router.push('/pages/index/main')
    }
  }
}
</script>

<style lang="scss" scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
