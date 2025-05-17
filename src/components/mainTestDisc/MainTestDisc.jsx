import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import Scroll from '~/components/scrollToTop/Scroll'
import './MainTestDisc.css'
import InfomationForm from '~/components/infomationForm/InfomationForm'
import TestDiscComponent from '../testDiscComponent/TestDiscComponent'

function MainTestDisc({ questions, arrToRequestInit, detailTest }) {
  const [answeredQuestions, setAnsweredQuestions] = useState([])
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [questionsPerPage, setQuestionsPerPage] = useState(0)
  const [page, setPage] = useState(1)
  const [open, setOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [arrToRequest, setArrToRequest] = useState(arrToRequestInit)
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = () => {
    const position = window.scrollY
    console.log('🚀 ~ handleScroll ~ position:', position)
    setScrollPosition(position)
    const pageHeight = 8000
    const halfPageHeight = pageHeight / 2

    // Check if scrolled more than half of the page height
    if (position > halfPageHeight) {
      // Logic to navigate to the next page
      setPage(2)
      // Replace the log with your actual navigation code
    } else {
      setPage(1)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const arrData = questions
    setTotalQuestions(arrData.length)
    setQuestionsPerPage(arrData.length / 2)
    setArrToRequest(arrToRequestInit)
  }, [questions, arrToRequestInit])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleQuestionClick = (index) => {
    if (index !== 0)
      document.getElementById(`question-${index-1}`).scrollIntoView({ behavior: 'smooth' })
    else {
      window['scrollTo']({ top: 0, behavior: 'smooth' })
    }
    setSelectedQuestion(index)
  }
  const handleMarkAsAnswered = (index, value) => {
    const tmpIndex = index % 2 === 0 ? (index+1) : (index-1)
    if (arrToRequest[tmpIndex].score !== 0 && arrToRequest[index].score!==0 && !answeredQuestions.includes(index%2===0 ? index/2 : tmpIndex/2)) {
      setAnsweredQuestions([...answeredQuestions, index%2===0 ? index/2 : tmpIndex/2])
    }
    setSelectedQuestion(null)
    setArrToRequest([...arrToRequest], arrToRequest[index].score = value)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const startIndex = (page - 1) * (questionsPerPage)
  const endIndex = startIndex + (questionsPerPage)
  const displayedQuestions = questions?.slice(startIndex, endIndex)

  return (
    <Container maxWidth={false} disableGutters>
      <Scroll showBelow={250} />
      <Box className="App">
        <Grid container columns={{ xs:6, sm:6, md:12, lg:12, xl:13 }}>
          <Grid item xs={6} sm={6} md={9} lg={9} xl={9} sx={{ order: { xs: 2, md: 1 } }}>
            <TestDiscComponent
              dataTest={detailTest}
              handleMarkAsAnswered={handleMarkAsAnswered}
              selectedQuestionProp={selectedQuestion}
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3} lg={3} xl={3} sx={{ order: { xs: 1, md: 2 } }}>
            <Box className="sidebar-test-container" sx={{ height: { xs: '100%', md: '100vh', lg:'100vh', xl:'100vh' } }}>
              <Box className='sidebar-test' >
                <Box className='sidebar-test-label-container'>
                  <Box className='sidebar-test-label'>
                    Danh sách câu hỏi
                  </Box>
                </Box>
                <Box className='sidebar-test-text' >Bạn đã trả lời: {answeredQuestions?.length}/{totalQuestions}</Box>
                <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 30, sm: 45, md:15, lg:12, xl:12 }}>
                  {displayedQuestions?.map((_, index) => {
                    const questionIndex = startIndex + index
                    return (
                      <Grid item xs={3} sm={3} md={3} lg={2} xl={2} key={index} sx={{ padding:'0' }}>
                        <Box
                          className = 'sidebar-btn-question'
                          bgcolor='white'
                          onClick={() => handleQuestionClick(questionIndex)}
                          fullWidth
                        >
                          <Box sx={{ mb:2, display:'flex', justifyContent:'center', alignItems:'center', color:'#7bb151' }}>
                            <Box >
                              {questionIndex + 1}
                            </Box>
                          </Box>
                          <Box
                            sx={{ height:'50%', bottom:0, width:'100%', position:'absolute', borderRadius: '0 0 3px 3px' }}
                            bgcolor={answeredQuestions.includes(questionIndex) ? '#7bb151' : '#DDDDDD'}
                          ></Box>
                        </Box>
                      </Grid>
                    )
                  })}
                </Grid>
                <Box className='control-page-detail'>
                  <Box justifyContent="space-between" marginTop="20px">
                    <Pagination
                      count={Math.ceil(totalQuestions / questionsPerPage)}
                      page={page}
                      onChange={handlePageChange}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box className='submit-test-button-container' >
        <Button variant="contained" color="primary" className="submit-test-button" onClick={handleOpen}>Nộp bài</Button>
      </Box>
      <InfomationForm
        answeredQuestions={answeredQuestions}
        totalQuestions={totalQuestions}
        arrToRequest={arrToRequest}
        isOpen={open}
        handleClose={handleClose}
      />
    </Container>
  )
}

export default MainTestDisc
