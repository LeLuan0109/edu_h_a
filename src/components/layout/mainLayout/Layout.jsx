import Footer from '~/components/common/footer/Footer'
import Header from '~/components/common/header/Header'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import './Layout.css'
import Loadable from '~/components/loadable/Loadable'
import holland from '~/assets/image/background.png'

const BaseLayout = () => {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundImage: `url(${holland})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}>
      {/* <Header /> */}
      <Box sx={{ flex: '1 0 auto' }} className="outlet-container">
        <Loadable>
          <Outlet />
        </Loadable>
      </Box>
      <Box sx={{ flexShrink: 0 }}>
        {/* <Footer /> */}
      </Box>
    </Box>
  )
}

export default BaseLayout