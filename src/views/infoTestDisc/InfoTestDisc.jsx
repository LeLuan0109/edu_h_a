import Box from '@mui/material/Box'
import TitleTest from '~/components/title-test/TitleTest'
import Scroll from '~/components/scrollToTop/Scroll'
import disc from '~/assets/image/disc.png'
import { Helmet } from 'react-helmet'
import { Button, Grid } from '@mui/material'
import './InfoTestDisc.css'
import { useLocation, useNavigate } from 'react-router'
import { routes } from '~/utils/constants'

export default function InfoTestDisc () {
  const location = useLocation()
  const { testId } = location.state || {}

  const navigagte = useNavigate()

  return (
    <Box sx={{ width:'100%', p:3 }}>
      <Scroll showBelow={250} />
      <Helmet>
        <title>Trắc nghiệm Disc</title>
      </Helmet>
      <TitleTest testName='DISC' />
      <Grid container columns={{ xs:6, sm:6, md:6, lg:12, xl:12 }} sx={{ mt:5 }}>
        <Grid item xs={6} sm={6} md={6} lg={7} xl={7} sx={{ order: { xs: 2, md: 1 } }}>
          <Box sx={{ }}>
            <span style={{ fontWeight:'bold' }}> Mô hình DISC </span> được nhà tâm lý học người Mỹ Walter Clarke xây dựng dựa trên lý thuyết DISC của nhà tâm lý học William Moulton Marston. Trắc nghiệm DISC là công cụ hữu ích nhất được nhiều công ty và tổ chức sử dụng nhằm đánh giá khả năng giao tiếp, hành vi và tính cách của con người
          </Box>
          <Box className='about-disc'>
            DISC là từ viết tắt của bốn xu hướng hành vi chính được mô tả trong mô hình DISC.
          </Box>
          <Box>- Thống lĩnh- Dominance (D)</Box>
          <Box>- Ảnh hưởng - Influence (I)</Box>
          <Box>- Kiên định - Steady (S)</Box>
          <Box>- Tuân thủ - Compliant (C)</Box>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={5} xl={5} sx={{ order: { xs: 1, md: 2 } }} className='image-container'>
          <img src={disc} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
        </Grid>
      </Grid>
      <Box className='btn-start-test'>
        <Button onClick={() => {
          navigagte(routes.TEST_DISC, { state: { testId } })
        }}>
          Bắt đầu làm bài trắc nghiệm
        </Button>
      </Box>
    </Box>
  )
}