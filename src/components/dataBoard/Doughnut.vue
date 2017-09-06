<template lang="html">
  <div class="doughnut">
    <div id="canvas-holder">
        <canvas id="chart-area" />
    </div>
  </div>
</template>

<script>
import {
	cantTouch,
	deadPC
} from '../../data/dataBoard'
import {
	eventBus
} from '../../main'
import {
	devTypeError
} from '../../request/errorReport'
import {
	errTypeTable
} from '../../data/errorTypeTable'
import $ from 'jquery'
import _ from 'lodash'

export default {
	data() {
		return {
			selectData: null,
			typeData: {},
			typeDataLength: {}
		}
	},
	watch: {
		selectData() {
			eventBus.passDataBoardData({
				devices: this.typeData[errTypeTable[this.selectData]],
        stores: this.filterStore(this.typeData[errTypeTable[this.selectData]])
			}, this.selectData)
		}
	},
	methods: {
		// Doughnut listen for click event and change select data
		canvasListen() {
			var canvas = document.getElementById("chart-area")
			var vue = this

			canvas.onclick = function(evt) {
				var activePoints = window.myDoughnut.getElementsAtEvent(evt)
				if (activePoints[0]) {
					var chartData = activePoints[0]['_chart'].config.data
					var idx = activePoints[0]['_index']

					var label = chartData.labels[idx]
					var value = chartData.datasets[0].data[idx]

					//change current selected data
					vue.selectData = label

					$('html, body').animate({
						scrollTop: 150
					}, 400, function() {});
				}
			}
		},
		// 篩選出各錯誤下的設備: {cpuWarn: [{}, {}], softDead: [{}, {}]}
		filterErrorType(devList) {
			let typeObj = {}

			for (let i = 0; i < devList.length; i++) {
				let errorType = devList[i].errorType

				// push device obj to errTypeObj array
				if (!typeObj[errTypeTable[errorType]]) {
					typeObj[errTypeTable[errorType]] = []
					typeObj[errTypeTable[errorType]].push(devList[i])
				} else {
					typeObj[errTypeTable[errorType]].push(devList[i])
				}
			}

			return typeObj
		},
		// 計算各錯誤發生幾次
		typeErrAmount() {
			for (let field in errTypeTable) {
				if (this.typeData[errTypeTable[field]]) {
					this.typeDataLength[errTypeTable[field]] = this.typeData[errTypeTable[field]].length
				} else {
					this.typeDataLength[errTypeTable[field]] = 0
				}
			}
			console.log(this.typeDataLength)
		},
    // 計算錯誤類別下店家發生數量：　{'內湖店': 2, '林口': 1}
		filterStore(devList) {
			let storeObj = {}
			for (let i = 0; i < devList.length; ++i) {
				if (!storeObj[devList[i]['location']]) {
					storeObj[devList[i]['location']] = 1
				} else {
					storeObj[devList[i]['location']] += 1
				}
			}
			return storeObj
		}
	},
	mounted() {
		devTypeError(this, 'TouchPC').then((devList) => {
			console.log(this.filterErrorType(devList))
			this.typeData = this.filterErrorType(devList)
			this.typeErrAmount()

			var config = {
				type: 'doughnut',
				data: {
					datasets: [{
						data: [
							this.typeDataLength.touchBug,
							this.typeDataLength.touchDead,
							this.typeDataLength.softDead,
							this.typeDataLength.blackScreen,
							this.typeDataLength.stayWindows,
							this.typeDataLength.cpuWarn
						],
						backgroundColor: [
							"#366280",
							"#26A3DF",
							"#2DBEE5",
              "#5BAFEF",
              "#008080",
              "#808080"
						]
					}],
					labels: [
						"觸控不準",
						"觸控無反應",
						"軟體當機",
						"螢幕黑屏",
						"停留在windows畫面",
						"CPU異常"
					]
				},
				options: {
					maintainAspectRatio: false,
					legend: {
						position: 'right',
						display: true,
						labels: {
							fontFamily: '微軟正黑體',
							fontSize: 15,
							usePointStyle: true,
							padding: 20
						}
					},
					animation: {
						animateScale: true,
						animateRotate: true
					}
				}
			}

      // style tooltips
      Chart.defaults.global.tooltips.bodyFontSize = 16
      Chart.defaults.global.tooltips.bodyFontFamily = '微軟正黑體'
      Chart.defaults.global.tooltips.position = 'nearest'

			var ctx = document.getElementById("chart-area").getContext("2d")
			ctx.height = 350
			window.myDoughnut = new Chart(ctx, config)

			this.canvasListen()

      let key = _.findKey(errTypeTable, (el) => {
        return el == Object.keys(this.typeData)[0]
      })
			eventBus.passDataBoardData({
				devices: this.typeData[Object.keys(this.typeData)[0]],
        stores: this.filterStore(this.typeData[Object.keys(this.typeData)[0]])
			}, key)
		})

	}
}
</script>

<style lang="sass" scoped>
  *
    position: relative
  .doughnut
    padding: 10px 80px
    #canvas-holder
      width: 68%
      height: 300px
      #chart-area
        left: 40%
        height: 300px
        cursor: pointer
</style>
