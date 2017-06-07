<template>
  <div class="period-part">
    <div class="period-part__checkbox">
      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{ text.zh }}</el-checkbox>
    </div>
    <div class="period-part__box">
      <span class="box" v-for="(n, index) in 24" @click="handleBoxClick(index)"
            :class="{ 'on': status[n-1] }">{{ n - 1 }}</span>
    </div>
  </div>
</template>
<script>
  import { fill } from '../utils/util'

  export default {
    name: "period",
    props: {
      text: {
        type: Object,
        require: false,
        default: {
          en: '',
          zh: ''
        }
      },
      day: {
        type: Object,
        require: true,
        default: {
          checkAll: false,
          choose: [],
          status: []
        }
      }
    },
    data () {
      return {
        checkAll: this.day.checkAll,
        isIndeterminate: false,
        choose: this.day.choose, // 选中的 box
        status: this.day.status, // box 状态
        chooseTimes: 0, // 选中次数
        lastChoose: -1 // 上次选中下标
      }
    },
    methods: {
      handleCheckAllChange () {
        this.status.splice(0, 24, ...fill(24, this.checkAll))
        this.updateChoose()
      },
      handleBoxClick (index) {
        this.chooseTimes++
        if (this.status[index]) { // 如果点击之前已经选中的，取消选中
          this.status.splice(index, 1, false)
        } else {
          if (this.chooseTimes % 2 === 0 && this.status[this.lastChoose]) { // 双次选中，选中上次选中与本次选中之间的所有
            this.chooseZone(this.lastChoose, index)
          } else {
            this.status.splice(index, 1, true)
          }
        }
        this.lastChoose = index // 上次选中
        this.updateChoose() // 更新选中 box
      },
      updateChoose () {
        for (let i = 0, len = this.status.length; i < len; i++) {
          let pos = this.choose.indexOf(i)
          if (this.status[i] && pos === -1) {
            this.choose.push(i)
          } else if (!this.status[i] && pos !== -1) {
            this.choose.splice(pos, 1)
          }
        }
      },
      chooseZone (last, current) {
        if (last > current) {
          this.status.splice(current, last - current, ...fill(last - current, true))
        } else {
          this.status.splice(last + 1, current - last, ...fill(current - last, true))
        }
      }
    },
    watch: {
      choose: function (val, oldVal) {
        this.checkAll = val.length === 24
        this.isIndeterminate = val.length < 24 && val.length > 0
        this.$emit('updateBtnStatus', {
          checkAll: this.checkAll,
          en: this.text.en,
          parent: this.day.parent
        })
      }
    }
  }
</script>
<style type="text/css">
  .period-part {
    margin-bottom: 10px;
  }
  .period-part .period-part__checkbox {
    display: inline-block;
  }
  .period-part .period-part__box {
    display: inline-block;
    margin-left: 20px;
    font-size: 0;
  }
</style>
