<template lang="html">
  <div class="doughnut">
    <div id="canvas-holder">
        <canvas id="chart-area" />
    </div>
  </div>
</template>

<script>
import {cantTouch, deadPC} from '../../data/dataBoard'
import {eventBus} from '../../main'
export default {
	data() {
		return {
			selectData: null
		}
	},
  watch: {
    selectData () {
      if (this.selectData == '無法觸控') {
        eventBus.passDataBoardData(cantTouch, this.selectData)
      } else if (this.selectData == '軟體當機') {
        eventBus.passDataBoardData(deadPC, this.selectData)
      }
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
  			}
  		}
    }
  },
	mounted() {
		var config = {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [
						3,
						1,
						5
					],
					backgroundColor: [
						"#FF6384",
						"#36A2EB",
						"#FFCE56"
					]
				}],
				labels: [
					"觸控不準",
					"無法觸控",
					"軟體當機"
				]
			},
			options: {
        maintainAspectRatio: false,
				legend: {
					position: 'right',
          display: true,
          labels: {
              fontFamily: '微軟正黑體',
              fontSize: 16,
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

		var ctx = document.getElementById("chart-area").getContext("2d")
    ctx.height = 350
		window.myDoughnut = new Chart(ctx, config)

    this.canvasListen()
	}
}
</script>

<style lang="sass" scoped>
  *
    position: relative
  .doughnut
    padding: 10px 80px
    #canvas-holder
      width: 60%
      height: 300px
      #chart-area
        left: 40%
        height: 300px
        cursor: pointer
</style>
