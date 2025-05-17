// App.js
import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Box, Grid } from '@mui/material'
import BoltIcon from '@mui/icons-material/Bolt'
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople'
import LandscapeIcon from '@mui/icons-material/Landscape'
import SquareFootIcon from '@mui/icons-material/SquareFoot'
import './ResultChartDisc.css'
const ResultChartDisc = ({ result }) => {
  const comfortableData = result.selfStudyResult.map(item => Math.round(item.ratioScore) )
  const pressureData = result.adaptationResult.map(item => Math.round(item.ratioScore))

  const mainChartOptions = {
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Kết quả DISC'
    },
    subtitle: {
    },
    xAxis: {
      categories: ['D', 'I', 'S', 'C'],
      labels: {
        useHTML: true,
        formatter: function () {
          const colors = {
            D: '#C40C0C', // Màu nền cho nhãn D
            I: '#FFC100', // Màu nền cho nhãn I
            S: '#06D001', // Màu nền cho nhãn S
            C: '#060047' // Màu nền cho nhãn C
          }
          return `<span style="background-color:${colors[this.value]};color: white; width:10px; padding: 2px 5px; border-radius: 5px;">${this.value}</span>`
        }
      }
    },
    yAxis: {
      title: {
        text: null
      },
      tickInterval: 10,
      max: 100,
      min: 0,
      plotLines: [{
        value: 50,
        color: 'black',
        width: 1,
        dashStyle: 'shortdash',
        label: {
          align: 'left',
          style: {
            color: 'black'
          }
        }
      }]
    },
    tooltip: {
      valueSuffix: ' points'
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      backgroundColor: '#F8F8F8',
      borderRadius: 5,
      itemStyle: {
        color: '#333333',
        fontSize: '14px'
      },
      itemHoverStyle: {
        color: '#000000'
      },
      labelFormatter: function () {
        if (this.name === 'Tự nhiên') {
          return 'Biểu đồ tự nhiên:<br>Thể hiện hành vi thuộc về bản năng và mong muốn của bạn.'
        } else if (this.name === 'Thích ứng') {
          return 'Biểu đồ thích ứng:<br>Thể hiện xu hướng hành vi mà bạn nghĩ mình nên làm trong hoàn cảnh cụ thể.'
        }
        return this.name
      }
    },
    series: [
      {
        name: 'Tự nhiên',
        marker: {
          symbol: 'circle'
        },
        data: comfortableData,
        color: '#26355D'
      },
      {
        name: 'Thích ứng',
        marker: {
          symbol: 'diamond'
        },
        data: pressureData,
        color: '#4CCD99'
      }
    ],
    credits: {
      enabled: false // Tắt logo Highcharts.com
    }
  }

  return (
    <div className='result-container'>
      <Grid sx={{ p:2 }} container columns={{ xs:6, sm:6, md:12, lg:12, xl:12 }}>
        <Grid item xs={6} sm={6} md={7} lg={7} xl={7} sx={{ mb:2 }}>
          <div className="chart-container">
            <HighchartsReact highcharts={Highcharts} options={mainChartOptions} />
          </div>
        </Grid>
        <Grid item xs={6} sm={6} md={5} lg={5} xl={5} >
          <Box className='note-container'>
            <Box className='note-detail'>
              <Box className='label-container'>
                <Box className='label-element-D' >
                  <Box className='label-text'>D</Box>
                  <Box className='label-icon-D'>
                    <BoltIcon />
                  </Box>
                </Box>
                <Box className='label-element-I'>
                  <Box className='label-text'>I</Box>
                  <Box className='label-icon-I'>
                    <EmojiPeopleIcon />
                  </Box>
                </Box>
                <Box className='label-element-S'>
                  <Box className='label-text'>S</Box>
                  <Box className='label-icon-S'>
                    <LandscapeIcon />
                  </Box>
                </Box>
                <Box className='label-element-C'>
                  <Box className='label-text'>C</Box>
                  <Box className='label-icon-C'>
                    <SquareFootIcon />
                  </Box>
                </Box>
              </Box>
              <Box className='score-disc-container'>
                <Box className='score-disc-latent'>
                  <Box className='score-disc-element'>{comfortableData[0]}</Box>
                  <Box className='score-disc-element'>{comfortableData[1]}</Box>
                  <Box className='score-disc-element'>{comfortableData[2]}</Box>
                  <Box className='score-disc-element'>{comfortableData[3]}</Box>
                  <Box className='score-disc-label'>Tự nhiên</Box>
                </Box>
                <Box className='score-disc-motivate'>
                  <Box className='score-disc-element'>{pressureData[0]}</Box>
                  <Box className='score-disc-element'>{pressureData[1]}</Box>
                  <Box className='score-disc-element'>{pressureData[2]}</Box>
                  <Box className='score-disc-element'>{pressureData[3]}</Box>
                  <Box className='score-disc-label'>Thích ứng</Box>
                </Box>
              </Box>
              <Box className='difference-container'>
                <Box className='D-difference'>
                  <Box className='D-difference-score'>
                    {comfortableData[0] - pressureData[0]}
                  </Box>
                  <Box className='diffecrence-text'>
                    Thống trị
                    <BoltIcon />
                  </Box>
                </Box>
                <Box className='I-difference'>
                  <Box className='I-difference-score'>
                    {comfortableData[1] - pressureData[1]}
                  </Box>
                  <Box className='diffecrence-text'>
                    Ảnh hưởng
                    <EmojiPeopleIcon />
                  </Box>
                </Box>
                <Box className='S-difference'>
                  <Box className='S-difference-score'>
                    {comfortableData[2] - pressureData[2]}
                  </Box>
                  <Box className='diffecrence-text'>
                    Ổn định
                    <LandscapeIcon />
                  </Box>
                </Box>
                <Box className='C-difference'>
                  <Box className='C-difference-score'>
                    {comfortableData[3] - pressureData[3]}
                  </Box>
                  <Box className='diffecrence-text'>
                    Tận tâm
                    <SquareFootIcon />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

export default ResultChartDisc
