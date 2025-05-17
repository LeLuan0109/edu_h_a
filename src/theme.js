import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// Create a theme instance.
const theme = extendTheme({
  components: {
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '& .Mui-checked': {
            color: 'green'
          }
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#0A6847'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: 'white',
          borderRadius: '40px',
          backgroundColor: '#7bb151',
          border: '1px solid #7bb151',
          ':hover': {
            backgroundColor: 'white',
            color: '#7bb151',
            border: '1px solid #7bb151'
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label.Mui-focused': {
            color: '#7bb151' // Màu của label khi focus
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#7bb151' // Màu của outline
            },
            '&:hover fieldset': {
              borderColor: '#7bb151' // Màu của outline khi hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#7bb151' // Màu của outline khi focus
            }
          }
        }
      }
    }
  }
  // ...other properties
})

export default theme