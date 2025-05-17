import Box from '@mui/material/Box'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import CardService from '../cardService/CardService'

function SliderService({ serviceData }) {

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 2
    },
    desktop: {
      breakpoint: { max: 2000, min: 1000 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  const product = serviceData?.map((item, index) => (
    <CardService
      key={`Card${index}`}
      card={item.image}
      label={item.label}
      content={item.content}
    />
  ))

  return (
    <Box sx={{ mr:1 }}>
      <Carousel responsive={responsive} draggable={false}>
        {product}
      </Carousel>
    </Box>
  )
}

export default SliderService