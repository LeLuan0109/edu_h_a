import Box from '@mui/material/Box'
import './Title.css'

export default function TitleTest ({ testName }) {
  return (
    <Box >
      <Box className = 'title-container'>
        <Box className = 'title-test' >TRẮC NGHIỆM ĐÁNH GIÁ PHÂN LOẠI TÍNH CÁCH</Box>
      </Box>
      <Box className = 'title-container'>
        <Box className = 'subtitle-test'>MẬT MÃ {testName?.toUpperCase()}</Box>
      </Box>
    </Box>
  )
}