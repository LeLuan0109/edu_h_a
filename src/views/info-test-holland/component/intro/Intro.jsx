import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { mbti } from '~/utils/text'
import holland from '~/assets/image/mbti.png'
import ENFJ from '~/assets/image/ENFJ.png'
import ENTJ from '~/assets/image/ENTJ.png'
import ESFJ from '~/assets/image/ESFJ.png'
import ESTP from '~/assets/image/ESTP.png'
import INFJ from '~/assets/image/INFJ.png'
import INFP from '~/assets/image/INFP.png'
import INTJ from '~/assets/image/INTJ.png'
import INTP from '~/assets/image/INTP.png'
import ISFJ from '~/assets/image/ISFJ.png'
import ISFP from '~/assets/image/ISFP.png'
import ISTJ from '~/assets/image/ISTJ.png'
import ISTP from '~/assets/image/ISTP.png'

export const mbtiImages = {
  ENFJ,
  ENTJ,
  ESFJ,
  ESTP,
  INFJ,
  INFP,
  INTJ,
  INTP,
  ISFJ,
  ISFP,
  ISTJ,
  ISTP,
}
export default function Intro() {
  return (
    <Box >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 4, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={4} sm={8} md={9} sx={{ padding: 0 }}>
            <Box sx={{ whiteSpace: 'pre-line' }}>
              {mbti}
            </Box>
          </Grid>
          <Grid item xs={4} sm={8} md={3}>
            <Box>
              <img src={holland} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}