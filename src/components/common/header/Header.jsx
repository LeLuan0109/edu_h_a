import * as React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import { useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import logo from '~/assets/image/logo.png'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { constTest, routes } from '~/utils/constants'
import { filterTests } from '~/apis'

function Header() {
  const [isSticky, setIsSticky] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [listTest, setListTest] = useState([])
  const navigate = useNavigate()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSelectTest = (test) => {
    navigate(test.route)
    setAnchorEl(null)
  }

  useEffect(() => {
    filterTests().then(res => {
      setListTest(res.data)
    })
  }, [])

  useEffect(() => {

    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        if (window.scrollY >= 50) {
          setIsSticky(true)
        } else {
          setIsSticky(false)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <Toolbar className={`header ${isSticky ? 'sticky' : ''} ${isHidden ? 'hidden' : 'visible'}`}>
      <Box className='header-container'>
        <Box sx={{ display: { xs: 'none', sm:'flex', md: 'flex' } }} >
          <Link to='/'>
            <img className='logo' src={logo}></img>
          </Link>
        </Box>
        <Box className='header-content' sx={{ display: { xs: 'none', sm:'flex', md: 'flex', lg:'flex', xl:'flex' } }}>
          {/* <Link className='header-link' to='/#'>
            <Box className='header-content-element'>TRANG CHỦ</Box>
          </Link>
          <Link className='header-link' to='/#'>
            <Box className='header-content-element'>DỊCH VỤ</Box>
          </Link>
          <Link className='header-link' to={routes.ABOUT}>
            <Box className='header-content-element'>VẾ CHÚNG TÔI</Box>
          </Link>
          <Box
            className='header-content-element'
            onClick={handleClick}
          >
            TRẮC NGHIỆM
          </Box>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            { constTest.LIST_TEST.map((test, index) =>
              <MenuItem key={`testHidden${index}`} onClick={() => handleSelectTest(test)}>{test.name}</MenuItem>
            )}
          </Menu>
          <Link className='header-link' to='/#'>
            <Box className='header-content-element'>LIÊN HỆ</Box>
          </Link> */}
        </Box>
        {/* <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm:'none', md: 'none', lg:'none', xl:'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="black"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' }
            }}
          >
            <MenuItem onClick={handleCloseNavMenu}>
              <Link className='header-link' to='/#'>
                <Box className='header-content-element'>Trang chủ</Box>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link className='header-link' to='/#'>
                <Box className='header-content-element'>Dịch vụ</Box>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link className='header-link' to='/#'>
                <Box className='header-content-element'>Về chúng tôi</Box>
              </Link>
            </MenuItem>
            <MenuItem>
              <Box
                className='header-content-element'
                onClick={handleClick}
                sx={{ color:'gray !important', ':hover': { color: 'black !important' } }}
              >
                Trắc nghiệm
              </Box>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                { constTest.LIST_TEST.map((test, index) =>
                  <MenuItem key={`testHidden${index}`} onClick={() => handleSelectTest(test)}>{test.name}</MenuItem>
                )}
              </Menu>
            </MenuItem>
            <MenuItem>
              <Link className='header-link' to='/#'>
                <Box className='header-content-element'>Liên hệ</Box>
              </Link>
            </MenuItem>
          </Menu>
          <Box className='container-logo-flex' sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Box className='logo-flex' >
              <img src={logo} style={{ height:'50px' }}></img>
            </Box>
          </Box>
        </Box> */}
      </Box>
    </Toolbar>
  )
}


export default Header