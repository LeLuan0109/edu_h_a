import { useState } from 'react'
import { Box, Divider, Grid, Typography } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import { useEffect } from 'react'
import './TestDiscComponent.css'

const TestDiscComponent = ({ dataTest, handleMarkAsAnswered, selectedQuestionProp }) => {
  const [selectedQuestion, setSelectedQuestion] = useState(selectedQuestionProp)
  const [arrToRequest, setArrToRequest] = useState([])
  const [colorAnswer, setColorAnswer] = useState(null)
  const [answerClass, setAnswerClass] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [answerLabels, setAnswerLabels] = useState(null)
  const [numAnswers, setNumAnswers] = useState(null)
  useEffect(() => {
    setArrToRequest(dataTest?.arrToRequest)
    setAnswerClass(dataTest?.answerClass)
    setQuestions(dataTest?.questions)
    setColorAnswer(dataTest?.color)
    setAnswerLabels(dataTest?.answerLabels)
    setNumAnswers(dataTest?.maxScore)
    setSelectedQuestion(selectedQuestionProp)
    // console.log('🚀 ~ useEffect ~ dataTest?.questions:', dataTest?.questions)
  }, [dataTest, selectedQuestionProp])
  const handleSelectAnswer = (index, value) => {
    setSelectedQuestion(null)
    setArrToRequest([...arrToRequest], arrToRequest[index].score = value)
    handleMarkAsAnswered(index, value)
  }

  return (
    <Box className="question-container">
      {questions?.map((question, index) => (
        <Box key={index} id={`question-${index}`} className={selectedQuestion === index ? 'questionSelected' : 'question'}>
          <Grid container columns={{ xs: 9, sm: 9, md: 12, lg: 12, xl: 12 }}>
            <Grid item xs={9} sm={9} md={12} lg={12} xl={12} className='question-name'>
              <Typography variant="h6">{index + 1}. {question.questionName}</Typography>
            </Grid>
            <Grid item xs={9} sm={9} md={12} lg={12} xl={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Grid container columns={{ xs:6, sm:6, md:12, lg:12, xl:12 }}>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                  <Box className={selectedQuestion === index ? 'answerSelected' : 'answer'} sx={{ textAlign:'center', mb:2, mt: { xs:2, md:0 } }}>{question.items[0].questionName}</Box>
                  <Box className='answer-container' >
                    <Box
                      className={selectedQuestion === index ? 'answerSelected' : 'answer'}
                      sx={{
                        mr: 2,
                        fontSize: 17,
                        display: { xs: '', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }
                      }}
                    >
                      {answerLabels[0]}
                    </Box>
                    {[...Array(numAnswers)]?.map((_, value) => (
                      <Box key={value + 1}>
                        <Box
                          className={answerClass[value]}
                          sx={{
                            backgroundColor: arrToRequest[index*2]?.score === value + 1 ? `${colorAnswer[value]} !important` : 'white'
                          }}
                          onClick={() => handleSelectAnswer(index*2, value + 1)}
                        >
                          {
                            arrToRequest[index*2]?.score === value + 1
                      && <DoneIcon
                        sx={{
                          color: 'white',
                          fontSize: (value + 1 === numAnswers || value + 1 === 1) ? 'large' : (value + 1 === 3 ? 'small' : 'medium')
                        }}
                      />
                          }
                        </Box>
                      </Box>
                    ))}
                    <Box
                      className={selectedQuestion === index ? 'answerSelected' : 'answer'}
                      sx={{
                        mr: 2,
                        fontSize: 17,
                        display: { xs: '', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }
                      }}
                    >
                      {answerLabels[1]}
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={6} md={6} lg={6} xl={6} >
                  <Divider
                    sx={{
                      display: { xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' },
                      mt: { xs: 2, sm: 4 }, // Margin top for xs and larger screens
                      mb: { xs: 2, sm: 4 }, // Margin bottom for xs and larger screens
                      borderColor: 'grey.500', // Change the color of the divider
                      borderWidth: 1 // Change the thickness of the divider
                    }}
                  />
                  <Box className={selectedQuestion === index ? 'answerSelected' : 'answer'} sx={{ textAlign:'center', mb:2, mt: { xs:2, md:0 } }}>{question.items[1].questionName}</Box>
                  <Box className='answer-container'>
                    <Box
                      className={selectedQuestion === index ? 'answerSelected' : 'answer'}
                      sx={{
                        mr: 2,
                        fontSize: 17,
                        display: { xs: '', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }
                      }}
                    >
                      {answerLabels[0]}
                    </Box>
                    {[...Array(numAnswers)]?.map((_, value) => (
                      <Box key={value + 1}>
                        <Box
                          className={answerClass[value]}
                          sx={{
                            backgroundColor: arrToRequest[index*2+1]?.score === value + 1 ? `${colorAnswer[value]} !important` : 'white'
                          }}
                          onClick={() => handleSelectAnswer(index*2+1, value + 1)}
                        >
                          {
                            arrToRequest[index*2+1]?.score === value + 1
                      && <DoneIcon
                        sx={{
                          color: 'white',
                          fontSize: (value + 1 === numAnswers || value + 1 === 1) ? 'large' : (value + 1 === 3 ? 'small' : 'medium')
                        }}
                      />
                          }
                        </Box>
                      </Box>
                    ))}
                    <Box
                      className={selectedQuestion === index ? 'answerSelected' : 'answer'}
                      sx={{
                        mr: 2,
                        fontSize: 17,
                        display: { xs: '', sm: 'flex', md: 'flex', lg: 'flex', xl: 'flex' }
                      }}
                    >
                      {answerLabels[1]}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

export default TestDiscComponent
