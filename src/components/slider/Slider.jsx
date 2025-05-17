import Slider from 'react-slick'
import { Box, Typography } from '@mui/material'
import './Slider.css'

function SliderComponent({ item }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 2000,
    nextArrow: <></>,
    prevArrow: <></>
  }

  return (
    <Slider {...settings}>
      {item.map((item, index) => (
        <Box key={index} sx={{ textAlign: 'center', padding: 3, bgcolor: '#7bb151', borderRadius: 1, color:'white', cursor: 'grabbing' }}>
          <Typography variant="h6">{item.label}</Typography>
          <Typography variant="body1">{item.content}</Typography>
        </Box>
      ))}
    </Slider>

  )
}

export default SliderComponent