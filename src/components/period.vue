<template>
  <div class="period" :class="boxClass">
    <div class="period-header">
      <div class="period-btn-group">
        <el-button
            :type="week.status ? 'primary' : 'default'" size="small"
            @click="handleWeek">全部
        </el-button>
        <el-button
            :type="week.workingday.status ? 'primary' : 'default'" size="small"
            @click="handleWorkingday">工作日
        </el-button>
        <el-button
            :type="week.weekend.status ? 'primary' : 'default'" size="small"
            @click="handleWeekend">周末
        </el-button>
      </div>
      <div class="period-status-group">
        <div class="period-status">
          <span class="box on"></span><span class="text">投放时间段</span>
        </div>
        <div class="period-status">
          <span class="box"></span><span class="text">暂停时间段</span>
        </div>
      </div>
    </div>
    <div class="period-content">
      <period-part v-for="weekday in data" :key="weekday.child" :text="weekday.text"
                   :day="week[weekday.parent].data[weekday.child]" @updateBtnStatus="updateBtnStatus"></period-part>
    </div>
    <div class="period-footer">
      <p>示例一：当你选择了星期一的 [12] 点，则推广时间段为星期一的12：00-12：59</p>
      <p>示例二：当你选择了星期六的 [8,9,10,11] 点，则推广时间段为星期六的8：00-11：59</p>
    </div>
  </div>
</template>
<script type="es6">
  import PeriodPart from './period-part.vue'
  import { fill } from '../utils/util'

  const NUMBERS = []
  for (let i = 0; i < 24; i++) {
    NUMBERS.push(i)
  }

  const EN_WEEK = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday'
  ]

  export default {
    props: {
      isFormat: {
        type: Boolean,
        required: false,
        default: true
      },
      customProperty: {
        type: Object,
        required: false,
        default: function () {
          return {
            day: 'day',
            start: 'start',
            end: 'end'
          }
        }
      },
      boxClass: [String, Array, Object],
      initStatus: {
        type: Array,
        required: false,
        default: function () {
          return []
        }
      }
    },
    data () {
      return {
        week: {
          status: true,
          workingday: {
            status: false,
            data: {
              monday: {
                checkAll: true,
                choose: [...NUMBERS],
                status: fill(24, true),
                parent: 'workingday'
              },
              tuesday: {
                checkAll: true,
                choose: [...NUMBERS],
                status: fill(24, true),
                parent: 'workingday'
              },
              wednesday: {
                checkAll: true,
                choose: [...NUMBERS],
                status: fill(24, true),
                parent: 'workingday'
              },
              thursday: {
                checkAll: true,
                choose: [...NUMBERS],
                status: fill(24, true),
                parent: 'workingday'
              },
              friday: {
                checkAll: true,
                choose: [...NUMBERS],
                status: fill(24, true),
                parent: 'workingday'
              }
            }
          },
          weekend: {
            status: false,
            data: {
              saturday: {
                checkAll: true,
                choose: [...NUMBERS],
                status: fill(24, true),
                parent: 'weekend'
              },
              sunday: {
                checkAll: true,
                choose: [...NUMBERS],
                status: fill(24, true),
                parent: 'weekend'
              }
            }
          }
        },
        data: [
          {
            parent: 'workingday',
            child: 'monday',
            text: { en: 'monday', zh: '星期一' }
          },
          {
            parent: 'workingday',
            child: 'tuesday',
            text: { en: 'tuesday', zh: '星期二' }
          },
          {
            parent: 'workingday',
            child: 'wednesday',
            text: { en: 'wednesday', zh: '星期三' }
          },
          {
            parent: 'workingday',
            child: 'thursday',
            text: { en: 'thursday', zh: '星期四' }
          },
          {
            parent: 'workingday',
            child: 'friday',
            text: { en: 'friday', zh: '星期五' }
          },
          {
            parent: 'weekend',
            child: 'saturday',
            text: { en: 'saturday', zh: '星期六' }
          },
          {
            parent: 'weekend',
            child: 'sunday',
            text: { en: 'sunday', zh: '星期日' }
          }
        ]
      }
    },
    mounted () {
      for (let i = 0; i < this.initStatus.length; i++) {
        let status = this.initStatus[i]
        if (status.day <= 5) {
          this.setInitStatus('workingday', status)
        } else {
          this.setInitStatus('weekend', status)
        }
      }
    },
    methods: {
      setInitStatus (weekday, status) { // 设置初始化状态
        let data = this.week[weekday].data[EN_WEEK[status.day - 1]]
        for (let i = status.start; i <= status.end; i++) {
          data.choose.splice(data.choose.indexOf(i), 1)
          data.status[i] = false
        }
        if (data.choose.length === 24) {
          data.checkAll = true
        }
      },
      submitChoose () {
        let week = this.isFormat ? this.getChoose() : this.week
        this.$emit('change', week)
      },
      getChoose () {
        let choose = this.getFormatChoose()
        let week = []
        for (let i = 0; i < choose.length; i++) {
          let item = choose[i]
          if (item.length === 0) continue
          for (let cItem of item) {
            week.push({
              [this.customProperty['day']]: i + 1,
              [this.customProperty['start']]: Math.min.apply(null, cItem),
              [this.customProperty['end']]: Math.max.apply(null, cItem) + 1
            })
          }
        }
        return week
      },
      getFormatChoose () {
        let choose = []
        Array.prototype.push.apply(choose, this.formatChoose('workingday'))
        Array.prototype.push.apply(choose, this.formatChoose('weekend'))
        return choose
      },
      formatChoose (weekday) {
        let choose = []
        for (let day in this.week[weekday].data) {
          let chooseList = NUMBERS.filter(number => {
            return this.week[weekday].data[day].choose.indexOf(number) === -1
          }).sort((a, b) => a - b)
          if (chooseList.length === 0) {
            choose.push([])
            continue
          }
          let result = []
          let groups = []
          for (let i = 0; i < chooseList.length; i++) {
            let status = chooseList[i]
            if (groups.length === 0 || groups[groups.length - 1] + 1 !== status) {
              groups = []
              result.push(groups)
            }
            groups.push(status)
          }
          choose.push(result)
        }
        return choose
      },
      updateBtnStatus ({ checkAll, en, parent }) {
        this.week[parent].data[en].checkAll = checkAll

        let weekend = this.getWeekStatus('weekend')
        let workingday = this.getWeekStatus('workingday')

        if (workingday.flag && weekend.flag) {
          this.week.status = true
          this.week.workingday.status = false
          this.week.weekend.status = false
        } else {
          this.week.status = false

          if (workingday.flag && weekend.count === 2) {
            this.week.workingday.status = true
          } else if (weekend.flag && workingday.count === 5) {
            this.week.weekend.status = true
          } else {
            this.week.workingday.status = false
            this.week.weekend.status = false
          }
        }
        this.submitChoose()
      },
      getWeekStatus (weekday) {
        let flag = true
        let count = 0

        for (let day in this.week[weekday].data) {
          let item = this.week[weekday].data[day]
          if (!item.checkAll) {
            flag = false
            item.choose.length === 0 ? count++ : ''
          }
        }
        return { flag, count }
      },
      handleWeek () {
        this.chooseAllDay()
      },
      handleWorkingday () {
        this.choosePartDay('workingday', 'weekend')
      },
      handleWeekend () {
        this.choosePartDay('weekend', 'workingday')
      },
      chooseAllDay () {
        if (!this.week.status) {
          this.setPositiveStatus('workingday')
          this.setPositiveStatus('weekend')
        } else {
          this.setNegativeStatus('workingday')
          this.setNegativeStatus('weekend')
        }
        this.week.status = !this.week.status
        this.week.workingday.status = false
        this.week.weekend.status = false

        this.submitChoose()
      },
      choosePartDay (part1, part2) {
        if (!this.week[part1].status) {
          this.setPositiveStatus(part1)
          this.setNegativeStatus(part2)
          this.week[part1].status = true
          this.week[part2].status = false
        } else {
          this.setNegativeStatus(part1)
          this.week[part1].status = false
        }
        this.week.status = false

        this.submitChoose()
      },
      setPositiveStatus (part) {
        for (let day in this.week[part].data) {
          this.week[part].data[day].checkAll = true
          this.week[part].data[day].choose.splice(0, 24, ...NUMBERS)
          this.week[part].data[day].status.splice(0, 24, ...fill(24, true))
        }
      },
      setNegativeStatus (part) {
        for (let day in this.week[part].data) {
          this.week[part].data[day].checkAll = false
          this.week[part].data[day].choose.splice(0, 24)
          this.week[part].data[day].status.splice(0, 24, ...fill(24, false))
        }
      }
    },
    components: {
      PeriodPart
    }
  }
</script>
<style type="text/css">
  .period {
    width: 700px;
  }
  .period .period-header {
    position: relative;
    height: 30px;
  }
  .period .box {
    display: inline-block;
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
    text-align: center;
    font-size: 12px;
    color: #666;
    background-color: #E6E6E6;
    border-radius: 3px;
    cursor: pointer;
  }
  .period .box:last-child {
    margin-right: 0px;
  }
  .period .box.on {
    background-color: #20A0FF;
    color: white;
  }
  .period .period-btn-group {
    float: left;
  }
  .period .period-status-group {
    position: absolute;
    top: 6px;
    right: 0;
  }
  .period .period-status {
    display: inline-block;
    font-size: 0;
  }
  .period .period-status .text {
    display: inline-block;
    vertical-align: top;
    line-height: 20px;
    font-size: 12px;
  }
  .period .period-content {
    margin-top: 10px;
  }
  .period .period-footer p {
    margin: 0 0 0 85px;
    line-height: 20px;
    font-size: 14px;
    text-align: left;
  }
</style>