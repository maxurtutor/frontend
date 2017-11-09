import * as React from 'react'
import {Component} from 'react'

import {bindActionCreators} from 'redux'

import {ActionCreator, connect, Dispatch} from 'react-redux'

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import {MuiThemeProvider, createMuiTheme, StyleRulesCallback} from 'material-ui/styles';
import {WithStyles} from "material-ui";
import {withStyles} from 'material-ui/styles';

import {lightGreen, purple, red} from 'material-ui/colors';
import {HEADER_HEIGHT} from '../constants/commons'

import Project from "../domain/Project";

import MainMenuBar from '../components/MainMenuBar'

const drawerMiniWidth = 48;
const drawerFullWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: lightGreen,
        secondary: purple,
        error: red,
    },
});

const styles: StyleRulesCallback<any> = theme => ({
    root: {
        width: '100%',
        height: `${window.innerHeight}px`,
        zIndex: 1,
        overflow: 'hidden',
    },
    appFrame: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    appBar: {
        position: 'absolute',
        height: HEADER_HEIGHT
    },
    drawerMini: {
        position: 'absolute',
        height: '100%',
        width: drawerMiniWidth,
        display: 'flex',
    },
    drawerFull: {
        position: 'absolute',
        height: '100%',
        width: drawerFullWidth,
        display: 'flex',
    },
    drawerHeader: {
        ...theme.mixins.toolbar,
        width: `calc(100% - ${drawerMiniWidth}px)`,
        marginLeft: drawerMiniWidth,

        height: HEADER_HEIGHT
    },

    content: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        height: `calc(100% - ${HEADER_HEIGHT}px)`,
        width: `calc(100% - ${drawerMiniWidth}px - 48px)`,
        marginLeft: drawerMiniWidth,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
        },
    },
    flex: {
        flex: 1,
    },
});

type Props = {
    classes?: any,
    project: Project
}

type State = {
    open: boolean,
    timeout?: any;
}

class App extends Component<Props & WithStyles<any>, State> {

    constructor(props: Props & WithStyles<any>) {
        super(props);
        this.state = {open: false, timeout: null};
    }

    showMenu = () => {
        if (this.state.timeout) {
            clearTimeout(this.state.timeout)
        }
        this.setState({open: true, timeout: null});
    };
    hideMenu = () => {
        if (this.state.timeout) {
            clearTimeout(this.state.timeout)
        }
        this.setState({open: false, timeout: null});
    };

    postponedShowMenu = () => {
        this.setState({
            timeout: setTimeout(() => {
                if (this.state.timeout) this.showMenu()
            }, 700)
        });
    };

    render() {
        const {classes, project}: Props = this.props;

        return <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <div className={classes.appFrame}>

                    <div className={classes.drawerHeader}>
                        <Toolbar className={classes.header}>
                            <Typography type='title' color='inherit' className={classes.flex}>
                                {project.name}
                            </Typography>
                        </Toolbar>
                    </div>

                    <Drawer
                        type={'permanent'}
                        classes={{
                            paper: this.state.open ? classes.drawerFull : classes.drawerMini,
                        }}
                    >
                        <div onMouseEnter={this.postponedShowMenu} onMouseLeave={this.hideMenu}>
                            <AppBar position='static' className={classes.appBar}>
                                <MainMenuBar open={this.state.open}
                                             onShowMenu={this.showMenu}
                                             onHideMenu={this.hideMenu}/>
                            </AppBar>
                        </div>
                    </Drawer>
                    <main className={classes.content}>
                    </main>
                </div>
            </div>
        </MuiThemeProvider>
    }
}

const mapStateToProps = (state: any) => ({
    project: state.project,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));