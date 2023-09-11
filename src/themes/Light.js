import { createTheme } from '@mui/material';
import { blue, lightBlue, grey, yellow } from '@mui/material/colors';

export const Light = createTheme({
  palette: {
    primary: {
      main: blue[700],
      contrastText: '#fff',
      dark: blue[900],
      light: blue[400],
    },
    secondary: {
      main: lightBlue[900],
      contrastText: '#fff',
      dark: lightBlue[900],
      light: lightBlue[700],
    },
    text: {
      primary: grey[900],
      secondary: '#d4d4d4',
      card: {
        title: '#fff',
        subtitle: '#6e6e6e',
        description: '#bfbfbf',
      },
    },
    background: {
      default: grey[200],
      paper: '#212121',
    },
    icons: {
      primary: grey[700],
      secondary: yellow[800],

    },
    appBar: {
      primary: '#001F54',
    },
  },
});
