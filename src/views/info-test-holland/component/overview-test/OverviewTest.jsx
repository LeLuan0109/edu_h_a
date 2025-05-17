import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { overViewTestMbti } from '~/utils/text'
import { Link, useNavigate } from 'react-router-dom'
import './OverviewTest.css'
import { routes } from '~/utils/constants'
export default function OverviewTest ({ testId }) {
  const step = ['Bước 1: ', 'Bước 2: ', 'Bước 3: ', 'Bước 4: ', 'Bước 5: ']
  const navigate = useNavigate()
  return (
    <Box>
      <Box className='box-center'>
        <Box className='title'>CÁC BƯỚC LÀM TRẮC NGHIỆM</Box>
      </Box>
      {step.map((item, index) => (
        <Box key={`topic${index}`}>
          <span style={{ fontWeight:'bold' }}>{item}</span> {/* Áp dụng màu cho phần tử 'item' */}
          <span>{overViewTestMbti[index]}</span>
        </Box>
      ))}
      {/* <a href="https://www.onetonline.org/find/descriptor/browse/1.B.1">Click Here!</a> */}
      <Box className='box-center'>
        <Button onClick={() => {navigate(routes.TEST_HOLLAND, { state: { testId } })}} sx={{ borderRadius:'40px' }}>
            Bắt đầu làm trắc nghiệm
        </Button>
      </Box>
    </Box>
  )
}