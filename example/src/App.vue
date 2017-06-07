<template>
  <div id="app">
    <div class="app-period">
      <div class="app-period__inner">
        <period
            :initStatus="[{ day: 1, start: 6, end: 10 }, { day: 2, start: 13, end: 13 }]"
            :isFormat="true"
            :customProperty="{ day: 'weekday', start: 'startHour', end: 'endHour' }"
            :periodClass="[]"
            @change="handleChange"
        ></period>
        <ul class="app-period__data">
          <li v-for="day in week">星期：{{day.weekday}}， 开始时间：{{day.startHour}}，结束时间：{{day.endHour}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'app',
    data () {
      return {
        week: []
      }
    },
    methods: {
      handleChange (week) {
        this.week = week
      }
    }
  }
</script>

<style>
  .app-period {
    width: 800px;
    margin: 200px auto 0;
    background-color: #fff;
    border: 1px solid #20A0FF;
    box-shadow: 0 1px 10px #20A0FF;
  }
  .app-period__inner {
    padding: 50px;
  }
  .app-period__data {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-top: 40px;
  }
  .app-period__data li {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    background-color: #20A0FF;
    color: #fff;
    border: 1px solid #fff;
  }
</style>
