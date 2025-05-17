import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Scroll from '~/components/scrollToTop/Scroll'
import SliderComponent from '~/components/slider/Slider'
import SliderService from '~/components/sliderService/SliderService'
import { Link } from 'react-router-dom'
import { about, aboutPartner, aboutTest, course, eLearning, slogan, trainingConsulting, vision } from '~/utils/text'
import testService from '~/assets/image/test.png'
import introImage from '~/assets/image/intro.png'
import card1 from '~/assets/image/card1.png'
import card2 from '~/assets/image/card2.png'
import card3 from '~/assets/image/card3.png'
import './HomePage.css'
import { Helmet } from 'react-helmet'
export default function HomePage () {

  const arrItem = [
    {
      label: 'Tầm nhìn',
      content: `${vision}`
    },
    {
      label: 'Tầm nhìn',
      content: `${vision}`
    }
  ]

  const listService = [
    {
      image: card1,
      label: 'DỊCH VỤ TƯ VẤN VÀ ĐÀO TẠO',
      content: trainingConsulting
    },
    {
      image: card2,
      label: 'E-LEARNING',
      content: eLearning
    },
    {
      image: card3,
      label: 'TÀI LIỆU VÀ KHÓA HỌC BỔ TRỢ',
      content: course
    },
    {
      image: card1,
      label: 'DỊCH VỤ TƯ VẤN VÀ ĐÀO TẠO',
      content: trainingConsulting
    },
    {
      image: card1,
      label: 'DỊCH VỤ TƯ VẤN VÀ ĐÀO TẠO',
      content: trainingConsulting
    },
    {
      image: card1,
      label: 'DỊCH VỤ TƯ VẤN VÀ ĐÀO TẠO',
      content: trainingConsulting
    }
  ]

  return (
    <Box className='home-container'>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <Scroll showBelow={200} />
      <Box >
        <Grid container columns={{ xs:6, sm:6, md:12, lg:12, xl:12 }}>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box className='home-intro'>
              Welcome to ABP
            </Box>
            <Box className='home-slogan'>
              <h3>{slogan}</h3>
            </Box>
            <Box>
              {about}
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box>
              <img className='intro-image' src={introImage} alt='ABP'></img>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Container maxWidth="xl" sx={{ marginTop: 5, p:'0 !important', bgcolor: '#7bb151' }}>
        <SliderComponent item={arrItem} />
      </Container>
      <Box className='product-container'>
        <Box className='product'>
          <Box className='product-rank'>
            <Box>
              Top #1
            </Box>
          </Box>
          <Box className='product-content'>Sản phẩm nổi bật</Box>
        </Box>
      </Box>
      <Box className='service-container'>
        <Box className='service-content'>
          DỊCH VỤ TƯ VẤN VÀ ĐÀO TẠO
        </Box>
      </Box>
      <SliderService serviceData={listService} />
      <Box className='test-service'>
        <Grid container columns={{ xs:6, sm:6, md:12, lg:12, xl:12 }}>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Box>
              <img className='intro-image' src={testService} alt='ABP'></img>
            </Box>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
            <Box className='test-service-content-container'>
              <Box className='test-service-content'>
                <Box className='test-service-label'>
                  KHÁM PHÁ BẢN THÂN
                </Box>
                <Box className='test-service-about'>
                  {aboutTest}
                </Box>
                <Link to='/trac-nghiem-Holland' style={{ textDecoration:'none' }}>
                  <Box className='btn-test'>
                    Làm bài trắc nghiệm tại đây !
                  </Box>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className='partner-label-container'>
        <Box className='partner-label'>ABP EDU là đối tác tin cậy của các thương hiệu hàng đầu</Box>
      </Box>
      <Box className='partner-content-container'>
        <Box className='partner-content'>{aboutPartner}</Box>
      </Box>
    </Box>
  )
}