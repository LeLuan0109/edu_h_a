import { useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import { useEffect } from 'react'
import './TestComponent.css'

const TestComponent = ({ dataTest, handleMarkAsAnswered, selectedQuestionProp }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(selectedQuestionProp)
  const [arrToRequest, setArrToRequest] = useState(dataTest?.arrToRequest)
  // const [data, setData] = useState(dataTest)
  const [colorAnswer, setColorAnswer] = useState([])
  const [answerClass, setAnswerClass] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [answerLabels, setAnswerLabels] = useState(null)
  const [numAnswers, setNumAnswers] = useState(null)
  useEffect(() => {
    // setData(dataTest)
    setArrToRequest(dataTest?.arrToRequest)
    setAnswerClass(dataTest?.answerClass)
    setQuestions(dataTest?.questions)
    setColorAnswer(dataTest?.color)
    setAnswerLabels(dataTest?.answerLabels)
    setNumAnswers(dataTest?.maxScore)
    setSelectedQuestion(selectedQuestionProp)
    console.log('🚀 ~ useEffect ~ dataTest:', dataTest)
    // console.log('🚀 ~ TestComponent ~ arrToRequest:', arrToRequest)
  }, [dataTest, selectedQuestionProp])
  
  const handleSelectAnswer = (index, value) => {
  const updatedArr = [...arrToRequest] // Sao chép mảng arrToRequest để tránh thay đổi trực tiếp
  updatedArr[index].personalityType = value // Cập nhật giá trị personalityType
  setArrToRequest(updatedArr) // Cập nhật lại mảng arrToRequest với giá trị đã thay đổi
  handleMarkAsAnswered(index, value) // Gọi hàm callback nếu cần
}


  useEffect(() => {
    const arrTmp = []
    // console.log('🚀 ~ filterQuestions ~ res.data.question:', res.data.question)
    for (let i = 0; i < questions?.length; i++) {
      arrTmp.push({
        resultCategoryId: questions[i]?.resultId,
        maxScore: questions[i]?.maxScore,
        questionId: questions[i]?.id,
        score: 0
      })
    }
    setArrToRequest(arrTmp)
    // console.log('🚀 ~ useEffect ~ arrTmp:', arrTmp)
  }, [questions])

  return (
    <Box className="question-container">
      {questions?.map((question, index) => (
        <Box key={index} id={`question-${index}`} className={selectedQuestion === index ? 'questionSelected' : 'question'}>
          <Grid container columns={{ xs: 9, sm: 9, md: 12, lg: 12, xl: 12 }}>
            <Grid item xs={9} sm={9} md={12} lg={12} xl={12}>
              <Typography variant="h6">{index + 1}. {question.questionName}</Typography>
            </Grid>
            <Grid item xs={9} sm={9} md={12} lg={12} xl={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {question.options.map((option, optIndex) => {
    // Kiểm tra xem đáp án này đã được chọn chưa
    const isSelected = arrToRequest[index]?.personalityType === option.personalityType
    return (
      <Box
        key={optIndex}
        onClick={() => handleSelectAnswer(index, option.personalityType)} // Chọn personalityType khi đáp án được chọn
        className={`option-container ${isSelected ? 'selected' : ''}`}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '12px 16px',
          margin: '10px 5px',
          borderRadius: '10px',
          border: isSelected ? '2px solid #1976d2' : '1px solid #ccc',
          backgroundColor: isSelected ? '#e3f2fd' : 'white',
          transition: 'all 0.2s ease-in-out',
        }}
      >
        <DoneIcon
          sx={{
            fontSize: 18,
            color: isSelected ? '#1976d2' : 'white', // Màu xanh khi được chọn, màu trắng khi chưa chọn
            marginRight: 2,
            border: isSelected ? '2px solid #1976d2' : '2px solid transparent', // Thêm viền màu xanh nếu đã chọn
            borderRadius: '50%', // Viền hình tròn
            padding:  '2px' ,
          }}
        />
        <Typography sx={{ fontWeight: 500 }}>{option.answer}</Typography>
      </Box>
    )
  })}
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

export default TestComponent
