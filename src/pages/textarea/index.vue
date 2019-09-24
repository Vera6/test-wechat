<template>
  <div>
    <div class="story">
      <!-- <div class="title"><img src="http://static-fe.anlink.tech/dingzuan/traceabilityLove/memories.png">有色回忆</div> -->
      <!-- <div class="addImage"><img src="http://static-fe.anlink.tech/dingzuan/traceabilityLove/addImage.png"></div> -->
      <div class="form">
        <div class="form-item xian">
          <label>日期</label>
          <span @click="isShow">
            {{ showDate }}
            <!-- <img src="http://static-fe.anlink.tech/dingzuan/traceabilityLove/rArrow.png"> -->
          </span>
        </div>
        <div class="form-item">
          <label>地点</label>
          <input v-model="site" placeholder="上海世纪公园"/>
        </div>
        <textarea
          v-model="desc"
          maxlength="100"
          :placeholder="placeholder"
          class="content"
          cursor-spacing="25"
          @input="descInput">
        </textarea>
      </div>
      <!-- 时间popup -->
      <van-popup
        :show="showTimePopup"
        position="bottom"
        title="年月日"
        :overlay="true">
        <van-datetime-picker
          type="date"
          :value="currentDate"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="onTimeConfirm"
          @cancel="onTimePopupClose"
        />
      </van-popup>
    </div>
    <p class="addStory">+添加爱情故事</p>
    <div class="btn">
      <div class="save">保存</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      site: '',
      showTimePopup: false,
      currentDate: new Date().getTime(),
      minDate: new Date(2018, 6, 1).getTime(),
      maxDate: new Date().getTime(),
      currentWordNumber: 0,
      placeholder: '我相信一见钟情的爱情\n' +
      '因为遇见你之后，结婚我没想过别人…',
      desc: ''
    }
  },
  computed: {
    // 时间返回
    showDate () {
      const cDate = new Date(this.currentDate)
      return this.formatTime(cDate)
    }
  },
  methods: {
    //字数限制
    descInput() {
      this.currentWordNumber = this.desc.length
    },
    isShow() {
      this.showTimePopup = true
    },
    formatNumber (n) {
      const str = n.toString()
      return str[1] ? str : `0${str}`
    },
    /**
     * 日期格式化
     */
    formatTime (date) {
      date = new Date(date)
      const year = [date.getFullYear()].map(this.formatNumber).join('-')
      const month = [date.getMonth() + 1].map(this.formatNumber).join('-')
      const day = [date.getDate()].map(this.formatNumber).join('-')
      return `${year}年${month}月${day}日`
    },
    // 选择日期 确定
    onTimeConfirm (event) {
      this.currentDate = event.mp.detail
      this.showTimePopup = false
    },
    // 选择日期 取消
    onTimePopupClose () {
      this.showTimePopup = false
    }
  }
}
</script>

<style>
.story {
  background-color: #ffffff;
  padding: 0 17px;
}
  .title {
    font-family: PingFangSC-Semibold;
    font-size: 14px;
    color: #32373D;
    line-height: 30px;
    padding: 7px 0 4px 0;
  }
    img {
      width: 17px;
      height: 14px;
      margin: 0 5px 2px 0;
      vertical-align: middle;
    }
  
  .addImage {
    width: 342px;
    height: 190px;
    background: #F6F7F9;
    text-align: center;
  }
    img {
      width: 28px;
      height: 28px;
      vertical-align: middle;
      margin-top: 81px;
    }
  
  .form{
    padding-bottom: 10px;
  }
    .form-item {
      position: relative;
      line-height: 40px;
      height: 40px;
      display: flex;
      align-items: center;
    }
      label {
        width: 102px;
        font-size: 14px;
        ont-family: PingFangSC-Regular;
        color: #32373D;
        text-indent: 8px;
      }
      span, input {
        display: inline-block;
        width: calc(100% - 102px);
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #32373D;
        text-align: right;
      }
      input {
        padding-right: 26px;
      }
      img {
        width: 6px;
        height: 13px;
        vertical-align: middle;
        margin: 0 0 2px 15px;
      }
    
    .xian {
      border-bottom: 1px solid #E5E5E5;
    }
    .script {
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #AFB4B9;
    }
  .content {
      width: 342px;
      height: 130px;
      padding: 8px 8px 23px 8px;
      box-sizing: border-box;
      background-color: #F6F7F9;
      font-family: PingFangSC-Regular;
      font-size: 13px;
      color: #32373D;
      position: relative;
    
}
.addStory {
  font-family: PingFangSC-Medium;
  font-size: 13px;
  color: #FF95A9;
  padding: 20px 0 24px 0;
  text-align: center;
}
.btn {
  width: 100%;
  height: 70px;
  background-color: #F6F7F9;
  
}
.save {
    width: 335px;
    height: 46px;
    background-image: linear-gradient(169deg, #FF5D7C 0%, #FF2E55 79%);
    border-radius: 23px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #FFFFFF;
    line-height: 46px;
    letter-spacing: 1px;
    text-align: center;
    margin: 0 calc((100% - 335px) / 2);
  }
</style>
