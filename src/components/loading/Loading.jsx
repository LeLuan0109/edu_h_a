import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'


function Loading() {
  return (
    <Box sx={{
      height:'100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 2
    }}>
      <CircularProgress />
      <Typography sx={{ color:'black' }}>Loading...</Typography>
    </Box>
  )
}

export default Loading