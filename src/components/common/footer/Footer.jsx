import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CallIcon from '@mui/icons-material/Call'
import './Footer.css'
import { Grid } from '@mui/material'
import abp from '~/assets/image/abp.png'
import { Link } from 'react-router-dom'

function Footer() {

  return (
    <Container maxWidth={false} className='container-footer' >
      <Box className='content' >
        <Grid container spacing={{ xs: 1, sm: 1 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
          <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
            <Box className='footer-label'>
              {/* <img className='img' src={abp}></img> */}
              <Box className='footer-label-title'>

              </Box>
            </Box>
          </Grid>
          <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
            <Box className='footer-about'>
              <Link className='footer-about-element' to='/#'>
                <Box className='footer-about-content'>Trang chủ</Box>
              </Link>
              <Link className='footer-about-element' to='/#' >
                <Box className='footer-about-content' >Về chúng tôi</Box>
              </Link>
              <Link className='footer-about-element' to='/#' >
                <Box className='footer-about-content'>Tuyển dụng</Box>
              </Link>
              <Link className='footer-about-element' to='/#' >
                <Box className='footer-about-content'>Liên hệ</Box>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
            <Box className='footer-service'>
              <Box className='footer-service-label'>Dịch vụ</Box>
              <Link to='/#' className='footer-service-element'>
                <Box className='footer-service-content'>Dịch vụ tư vấn và đào tạo</Box>
              </Link>
              <Link to='/#' className='footer-service-element'>
                <Box className='footer-service-content'>Elearning</Box>
              </Link>
              <Link to='/#' className='footer-service-element'>
                <Box className='footer-service-content'>Dịch vụ tư vấn và đào tạo</Box>
              </Link>
            </Box>
          </Grid>
          <Grid item xs={4} sm={4} md={3} lg={3} xl={3}>
            <Box className='footer-info'>
              <Box className='footer-info-label'>Thông tin liên hệ</Box>
              <Box className='footer-info-content'>Hotline: (+84) 098HSB-MET3</Box>
              <Box className='footer-info-content'>Email: hsb.personality.mbti@gmail.com</Box>
              <Box className='footer-info-content'>Zalo: (+84) 098HSB-MET3</Box>
            </Box>
          </Grid>
          <Box className='infor-container'></Box>
        </Grid>
      </Box>
      <Box>
        <Grid container spacing={{ xs: 1, sm: 1 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12, xl: 12 }}>
          <Grid item xs={4} sm={4} md={6} lg={6} xl={6}>
            <Box className='address'>
              {/* CHI NHÁNH TẠI TP.HÀ NỘI */}
            </Box>
            <Box>
              {/* Địa chỉ: Tầng 3, số 8 ngõ 21 Lê Văn Lương, Nhân Chính, Thanh Xuân, Hà Nội. */}
            </Box>
            <Box>
              {/* MST: 0110090542 */}
            </Box>
          </Grid>
          <Grid item xs={4} sm={4} md={6} lg={6} xl={6}>
            <Box className='contact'>
              <CallIcon className='call-icon' />
              <Box className='contact-content'>TỔNG ĐÀI TƯ VẤN: (+84) 098HSB-MET3</Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}


export default Footer