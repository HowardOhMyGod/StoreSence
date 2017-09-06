<template lang="pug">
.allWarnMsgInfo
	.container
		.row
			.warnMsgBlock(v-for="errorType in leftColData")
				h4.warnTitle {{errorType.name}}
				.tableWraper
					.fieldBlock
						.field(v-for="field in fieldNames")
							h5.fieldName {{field}}
							i(class="fa fa-caret-down")
					.deviceList(v-for="device in errorType.devices",
					@click="clickToDetail(errorType.name, device.deviceModel)")
						.deviceType.data {{device.deviceModel}}
						.counter.data {{device[errorTypeTable[errorType.name]]}}
						.location.data {{device.location}}
						.occurTime.data {{today()}}
						i(class="fa fa-angle-right")
		.row
			.warnMsgBlock(v-for="errorType in rightColData")
				h4.warnTitle {{errorType.name}}
				.tableWraper
					.fieldBlock
						.field(v-for="field in fieldNames")
							h5.fieldName {{field}}
							i(class="fa fa-caret-down")
					.deviceList(v-for="device in errorType.devices",
					@click="clickToDetail(errorType.name, device.deviceModel)")
						.deviceType.data {{device.deviceModel}}
						.counter.data {{device[errorTypeTable[errorType.name]]}}
						.location.data {{device.location}}
						.occurTime.data {{today()}}
						i(class="fa fa-angle-right")
</template>

<script>
// import {warnMessage} from '../../../data/warnMsg'
import {dateOperate} from '../../../mixin/dateMixin'
import {
	warnTypeReq
} from '../../../request/errorReport'
export default {
	mixins: [dateOperate],
	data() {
		return {
			fieldNames: ['設備型號', '發生次數', '所在位置', '發生時間'],
			errMessages: 　[],
			rightColData: [],
			leftColData: [],
			errorTypeTable: {
				"軟體當機": 'softDead',
				"觸控無反應": "touchDead",
				"觸控不準": "touchBug",
				"螢幕黑屏": "blackScreen",
				"停留在windows畫面": "stayWindows",
				"CPU異常": "cpuWarn"
			}
		}
	},
	methods: {
		clickToDetail(errorType, deviceModel) {
			this.$router.push({
				path: `/warning/warnMsg/${errorType}/${deviceModel}`
			})
		},
		today(){
			let today = new Date()
			return this.toDate(today)
		}
	},
	mounted() {
		warnTypeReq(this).then((res) => {
			this.errMessages = res.messages
      console.log(this.errMessages)

			// split left and right
			for (let i = 0; i < this.errMessages.length; i++) {
				if (i % 2 === 0) {
					this.leftColData.push(this.errMessages[i])
				} else if (i % 2 !== 0) {
					this.rightColData.push(this.errMessages[i])
				}
			}
		})
	}
}
</script>

<style lang="sass" scoped>
  $tableWidth: 120px
  $colorWhite: #fff
  $colorBlue: #F0FAFC
  $borderColor: rgba(black, 0.1)
  *
    // border: solid 1px black
    position: relative
  .allWarnMsgInfo
    width: 100%
    top: 40px
    .container
      padding: 20px 45px
      display: flex
      .row
        .warnMsgBlock
          margin-top: 10px
          margin-bottom: 20px
          margin-right: 50px
          .warnTitle
            font-weight: 600
            left: 5px
            margin-bottom: 20px
          .tableWraper
            padding: 10px 20px
            background-color: $colorWhite
            padding-bottom: 20px
            width: 535px
            border-radius: 3px
            box-shadow: 0px 0px 3px rgba(black, 0.3)
            .fieldBlock
              display: flex
              margin-bottom: 5px
              .field
                display: flex
                .fieldName
                  width: $tableWidth
                  font-size: 17px
                  font-weight: 600
                i
                  height: 20px
                  position: absolute
                  right: 25px
                  top: 10px
            .deviceList
              display: flex
              padding: 8px 4px
              padding-right: 10px
              // border-left: solid 1px $borderColor
              // border-right: solid 1px $borderColor
              cursor: pointer
              .counter
                padding-left: 5px
              .occurTime
                margin-right: 10px
              i
                // left: 10px
                font-size: 16px
                font-weight: 600
                // margin-left: 10px
            .data
              width: $tableWidth
            .deviceList:nth-child(odd)
              background-color: $colorBlue
            .deviceList:nth-child(2)
              border-top: solid 1px $borderColor
            .deviceList:nth-last-child(1)
              border-bottom: solid 1px $borderColor
</style>
