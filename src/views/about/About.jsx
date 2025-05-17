import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import about1 from '~/assets/image/about1.png'
import about2 from '~/assets/image/about2.png'
import './About.css'
import { Helmet } from 'react-helmet'

export default function About () {
  return (
    <Box>
      <Helmet>
        <title>Về chúng tôi</title>
      </Helmet>
      <Box
        sx={{
          width: '100%',
          maxWidth: '1200px', // Đặt kích thước tối đa tùy theo thiết kế của bạn
          mx: 'auto' // Căn giữa phần tử theo chiều ngang
        }}
      >
        <img src={about1} alt="about" style={{ width: '100%', height: 'auto' }} />
      </Box>
      <Box>
        <Grid container columns={{ xs:12, sm:12, md:12, lg:12, xl:12 }} className='about-content-container'>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8} >
            <Box className='about-title'>
              VỀ CHÚNG TÔI
            </Box>
            <Box className='about-content'>
              ABP cung cấp giải pháp toàn diện trong lĩnh vực truyền thông số và công nghệ số từ tư vấn chiến lược, truyền thông đa nền tảng đến xây dựng thương hiệu
            </Box>
            <Box className='about-content'>
              ABP tự hào là bệ phóng hỗ trợ các doanh nghiệp, tổ chức chính phủ, phi chính phủ, trong nước và quốc tế; góp phần lan tỏa những giá trị tốt đẹp đến cộng đồng, thể hiện trách nhiệm xã hội của doanh nghiệp tới xã hội, bảo vệ hình ảnh thương hiệu doanh nghiệp trên không gian mạng.
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <img src={about2} alt="about" style={{ width: '60%', height: 'auto' }} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}