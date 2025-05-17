import Box from '@mui/material/Box'
import Intro from './component/intro/Intro'
import OverviewTopic from './component/overview-topic/OveviewTopic'
import OverviewTest from './component/overview-test/OverviewTest'
import TitleTest from '~/components/title-test/TitleTest'
import Scroll from '~/components/scrollToTop/Scroll'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router'

export default function InfoTestHolland () {
  const location = useLocation()
  const { testId } = location.state || {}
  return (
    <Box sx={{ width:'100%', p:3 }}>
      <Scroll showBelow={250} />
      <Helmet>
        <title>Trắc nghiệm MBTI</title>
      </Helmet>
      <TitleTest testName='MBTI' />
      <Intro />
      {/* <OverviewTopic /> */}
      <OverviewTest testId={testId}/>
    </Box>
  )
}