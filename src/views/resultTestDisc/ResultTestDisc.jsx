import Box from '@mui/material/Box'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import ResultCharDisc from '~/components/resultChartDisc/ResultChartDisc'
import { routes } from '~/utils/constants'
import './ResultTestDisc.css'
import { extractContentInParentheses } from '~/utils/function'
import { Button } from '@mui/material'
import { Helmet } from 'react-helmet'

export default function ResultTestDisc () {
  const location = useLocation()
  const navigate = useNavigate()
  const { result } = location.state || {}

  useEffect(() => {
    if (!result) {
      toast.error('Không tìm thấy kết quả bài test', {
        onClose: () => navigate(routes.INFO_TEST_DISC)
      })
    }
  }, [result, navigate])

  if (!result) {
    return null
  }
  return (
    <Box>
      <Helmet>
        <title>Trắc nghiệm Disc</title>
      </Helmet>
      <ResultCharDisc result={result} />
      <Box className='analysis-container'>
        <Box className='analysis-detail'>Phân tích kết quả DISC</Box>
        <Box className='group-disc'>Bạn thuộc nhóm ({extractContentInParentheses(result.resultDetail.specificDescription)})</Box>
        <Box>
          {result.resultDetail.specificDescription}
        </Box>
        <Box className='strength'>
          Điểm mạnh:
        </Box>
        {result.resultDetail.strengths.map((strength, index) => (
          <Box key={index}>{strength}</Box>
        ))}
        <Box className='strength'>
          Điểm yếu:
        </Box>
        {result.resultDetail.weaknesses.map((strength, index) => (
          <Box key={index}>{strength}</Box>
        ))}
        <Box className='contact-container'>
          <Box>🔔 Hãy nhớ rằng mọi người đều là sự pha trộn của cả bốn phong cách, nhưng hầu hết mọi người đều có xu hướng mạnh mẽ về một hoặc hai phong cách. Tất cả các phong cách DISC đều bình đẳng và có giá trị theo những cách riêng của chúng.</Box>
          <Box>Bạn muốn nhận thêm kết quả trắc nghiệm về <span className='hightlight-text'>Phong cách làm việc, Phong cách lãnh đạo và Phong cách Tình Yêu.</span> </Box>
          <Box>Hãy liên hệ chuyên viên tư vấn</Box>
          <Button>Đăng ký tư vấn!</Button>
        </Box>
      </Box>
    </Box>
  )
}