import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import './ResultChartHolland.css'

import VariablePie from 'highcharts/modules/variable-pie'
import { key } from '~/utils/constants'

// Initialize the module
VariablePie(Highcharts)

const ResultChartHolland = ({ resData, handleClick }) => {
  // console.log('🚀 ~ ResultChartHolland ~ resData:', resData)
  const maxY = Math.max(...resData.map(d => d.resultScore.ratioScore))
  const options = {
    chart: {
      type: 'variablepie'
    },
    title: {
      text: 'MBTI kết quả'
    },
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> ' +
        '{point.name}</b><br/>' +
        'Score: <b>{point.custom.originalScore}%</b><br/>'
    },
    plotOptions: {
      variablepie: {
        startAngle: -30
      }
    },
    series: [{
      cursor: 'pointer',
      minPointSize: 10,
      innerSize: '10%',
      zMin: 0,
      name: 'countries',
      borderRadius: 5,
      data: resData.map((item, index) =>
      ({
        name: item.resultScore.name + key[index],
        y: 60,
        z: item.resultScore.ratioScore * item.resultScore.ratioScore,
        custom: {
          originalScore: item.resultScore.ratioScore// Lưu giá trị gốc
        }
      })
      ),
      point: {
        events: {
          click: function (event) {
            handleClick(event)
          }
        }
      }
    }],
    colors: [
      '#65B741',
      '#FFC100',
      '#FF6500',
      '#FF0000',
      '#850F8D',
      '#10439F'
    ],
    credits: {
      enabled: false // Tắt logo Highcharts.com
    }
  }

  return (

    <figure className="highcharts-figure">
      <div id="container">
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </figure>
  )
}

export default ResultChartHolland
