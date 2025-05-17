import IconButton from '@mui/material/IconButton'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  toTop: {
    zIndex: 2,
    width: '45px !important',
    height: '45px !important',
    position: 'fixed !important',
    bottom: '2vh !important',
    border: '1px solid gray !important',
    color: 'gray !important',
    '&:hover, &.Mui-focusVisible': {
      border: '0px  #FFA62F !important',
      transition: '0.3s !important',
      color: 'white !important',
      backgroundColor: '#FFA62F !important'
    },
    right: '3% !important'
  }
}))
const Scroll = ({ showBelow }) => {
  const classes = useStyles()
  const [show, setShow] = useState(showBelow ? false : true)

  const handleScroll = () => {
    const scrollPosition = window.scrollY
    if (scrollPosition > showBelow) {
      if (!show) {
        setShow(true)
      }
    } else {
      if (show) setShow(false)
    }
  }

  useEffect(() => {
    if (showBelow) {
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }
  })

  const handleClick = () => {
    window['scrollTo']({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {show && <IconButton onClick={handleClick} className={classes.toTop}>
        <ExpandLessIcon></ExpandLessIcon>
      </IconButton>}
    </div>
  )
}

export default Scroll