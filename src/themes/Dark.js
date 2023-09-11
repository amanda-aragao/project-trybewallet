import { createTheme } from '@mui/material';
import { purple, green, grey, yellow } from '@mui/material/colors';

export const Dark = createTheme({
  palette: {
    primary: {
      main: '#1282A2',
      contrastText: '#fff',
      dark: green[700],
      light: green[300],
    },
    secondary: {
      main: purple[500],
      contrastText: '#fff',
      dark: purple[700],
      light: purple[300],
    },
    text: {
      primary: '#fff',
      secondary: '#d4d4d4',
      card: {
        title: 'fff',
        subtitle: '#6e6e6e',
        description: '#bfbfbf',

      },
    },
    background: {
      default: grey[900],
      paper: '#212121',
    },
    icons: {
      primary: '#fff',
      secondary: yellow[800],
    },
    appBar: {
      primary: '#001F54',
    },
  },

});
