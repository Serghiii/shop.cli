import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
   palette: {
      primary: {
         main: '#556cd6',
      },
      secondary: {
         main: '#19857b',
      },
      error: {
         main: red.A400,
      },
      background: {
         default: '#fff',
      },
   },
   components: {
      MuiButtonBase: {
         defaultProps: {
            disableRipple: true
         },
      },
      MuiAppBar: {
         defaultProps: {
            style: {
               background: 'transparent',
               boxShadow: 'none'
            }
         }
      },
   },
});

export default theme;