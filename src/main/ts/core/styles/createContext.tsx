import { createMuiTheme } from 'material-ui/styles';
import {purple, red, lightGreen} from 'material-ui/colors';

const theme = createMuiTheme({
    palette: {
        primary: lightGreen,
        secondary: purple,
        error: red,
    },
});

export default function createContext() {
    return {
        theme
    };
}