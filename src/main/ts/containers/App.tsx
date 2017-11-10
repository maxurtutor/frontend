import * as React from 'react';
import {Component} from 'react';

// import {bindActionCreators} from "redux";

import {connect, Dispatch} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';

import {WithStyles} from 'material-ui';
import {createMuiTheme, MuiThemeProvider, StyleRulesCallback} from 'material-ui/styles';
import {withStyles} from 'material-ui/styles';

import {lightGreen, purple, red} from 'material-ui/colors';

import MainMenu from '../components/MainMenu';
import MainMenuBar from '../components/MainMenuBar';
import ProjectBar from '../components/ProjectBar';
import UserBar from '../components/UserBar';

import Project from '../domain/Project';
import User from '../domain/User';

const headerHeight = 64;
const drawerMiniWidth = 48;
const drawerFullWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: lightGreen,
        secondary: purple,
        error: red,
    },
});

const styles: StyleRulesCallback<any> = (currentTheme) => ({
    root: {
        width: `100%`,
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
        height: headerHeight,
        minHeight: headerHeight,
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
        ...currentTheme.mixins.toolbar,
        width: `calc(100% - ${drawerMiniWidth}px)`,
        marginLeft: drawerMiniWidth,

        height: headerHeight,
    },

    content: {
        backgroundColor: currentTheme.palette.background.default,
        padding: currentTheme.spacing.unit * 3,
        height: `calc(100% - ${headerHeight}px)`,
        width: `calc(100% - ${drawerMiniWidth}px - 48px)`,
        marginLeft: drawerMiniWidth,
        [currentTheme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
        },
    },
});

interface Props {
    classes?: any;
    project: Project;
    user: User;
}

interface State {
    isMenuOpened: boolean;
    timeout?: any;
}

class App extends Component<Props & WithStyles<any>, State> {

    constructor(props: Props & WithStyles<any>) {
        super(props);
        this.state = {isMenuOpened: false, timeout: null};
    }

    public showMenu = () => {
        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
        this.setState({isMenuOpened: true, timeout: null});
    }

    public hideMenu = () => {
        if (this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
        this.setState({isMenuOpened: false, timeout: null});
    }

    public postponedShowMenu = () => {
        this.setState({
            timeout: setTimeout(() => {
                if (this.state.timeout) {
                    this.showMenu();
                }
            }, 700),
        });
    }

    public render() {
        const {classes, project, user}: Props = this.props;
        const isMenuOpened = this.state.isMenuOpened;

        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <div className={classes.appFrame}>

                        <div className={classes.drawerHeader}>
                            <Toolbar className={classes.header}>
                                <ProjectBar project={project}/>
                                <UserBar user={user}/>
                            </Toolbar>
                        </div>

                        <Drawer
                            type={'permanent'}
                            classes={{paper: isMenuOpened ? classes.drawerFull : classes.drawerMini}}
                        >
                            <div onMouseEnter={this.postponedShowMenu} onMouseLeave={this.hideMenu}>
                                <AppBar position="static" className={classes.appBar}>
                                    <MainMenuBar
                                        open={isMenuOpened}
                                        minHeight={headerHeight}
                                        onShowMenu={this.showMenu}
                                        onHideMenu={this.hideMenu}
                                    />
                                </AppBar>
                                <MainMenu open={this.state.isMenuOpened} onHideMenu={this.hideMenu}/>
                            </div>
                        </Drawer>
                        <main className={classes.content}/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state: any) => ({
    project: state.project,
    user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
