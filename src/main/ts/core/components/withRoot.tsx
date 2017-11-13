import * as React from 'react';
import {withStyles, MuiThemeProvider} from 'material-ui/styles';
import {wrapDisplayName} from 'recompose';
import createContext from '../styles/createContext';

// Apply some reset
const decorate = withStyles(theme => ({
    '@global': {
        html: {
            background: theme.palette.background.default,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
        },
        body: {
            margin: 0,
        },
    },
}));

const AppWrapper = decorate<{ children: JSX.Element }>(props => props.children);

const context = createContext();

function withRoot(BaseComponent: React.ComponentType) {
    class WithRoot extends React.Component {

        render() {
            return (
                <MuiThemeProvider theme={context.theme}>
                    <AppWrapper>
                        <BaseComponent/>
                    </AppWrapper>
                </MuiThemeProvider>
            );
        }
    }

    if (process.env.NODE_ENV !== 'production') {
        (WithRoot as any).displayName = wrapDisplayName(BaseComponent, 'withRoot');
    }

    return WithRoot;
}

export default withRoot;