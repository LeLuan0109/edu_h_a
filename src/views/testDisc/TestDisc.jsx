import Box from '@mui/material/Box'
import TitleTest from '~/components/title-test/TitleTest'
import { Helmet } from 'react-helmet'
import { useEffect } from 'react'
import { useState } from 'react'
import { dataTest, numericalData } from '~/utils/constants'
import convertQuestions from '~/utils/function'
import MainTestDisc from '~/components/mainTestDisc/MainTestDisc'
import { filterQuestions } from '~/apis'
import Loading from '~/components/loading/Loading'
export default function TestDisc() {
  const [arrToRequest, setArrToRequest] = useState([])
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsLoading(true)
    filterQuestions(2, numericalData.LIMIT_DISC).then((res) => {
      setQuestions(convertQuestions(res.data.question))
      const arrQuestions = res.data.question
      const arrTmp = []
      for (let i = 0; i < arrQuestions.length; i++) {
        arrTmp.push({
          resultCategoryId: arrQuestions[i].resultId,
          maxScore: arrQuestions[i].maxScore,
          questionId: arrQuestions[i].id,
          score: 0
        })
      }
      setArrToRequest(arrTmp)
    }).finally(() => { setIsLoading(false) })

  }, [])
  return (
    <Box sx={{ width: '100%' }}>
      { isLoading === true && <Loading /> }
      <Helmet>
        <title>Trắc nghiệm Disc</title>
      </Helmet>
      <TitleTest testName='Disc' />
      <Box className='instruct-title'>Hướng dẫn:</Box>
      <Box className>
        <Box>• Thời gian hoàn thành dự kiến: 10 - 15 phút</Box>
        <Box>• Click chọn đáp án mô tả đặc điểm phù hợp với mình</Box>
        <Box>• Với mỗi câu hỏi, vui lòng chọn 2 đáp án tương ứng với 2 trạng thái khi thoải mái <span style={{ fontWeight:'600', color:'#e8751a' }}>(Tự nhiên)</span>  và khi có áp lực <span style={{ fontWeight:'600', color:'#e8751a' }}>(Thích ứng)</span></Box>
        <Box>• Đáp án được sắp xếp theo mức độ từ Không giống - Giống</Box>
        <Box>• Không cần suy nghĩ quá nhiều khi lựa chọn câu trả lời</Box>
        <Box>• Click <span style={{ fontWeight:'600', color:'#e8751a' }}>Nộp bài</span> để xem kết quả</Box>
      </Box>
      <MainTestDisc
        questions={questions}
        arrToRequestInit={arrToRequest}
        detailTest={dataTest(questions, arrToRequest).disc}
      />
    </Box>
  )
}