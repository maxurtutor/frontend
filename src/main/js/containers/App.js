// @flow
'use strict';

import React, {Component} from 'react'

import {bindActionCreators} from 'redux'
import type {ActionCreator} from 'redux'
import {connect} from 'react-redux'

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import {lightGreen, purple, red} from 'material-ui/colors';

import User from '../components/User'
import Page from '../components/Page'

import MainMenuBar from '../components/MainMenuBar'
import MainMenu from '../components/MainMenu'

import * as pageActions from '../actions/PageActions'

import {HEADER_HEIGHT} from '../constants/Commons'

const drawerMiniWidth = 48;
const drawerFullWidth = 240;

const theme = createMuiTheme({
    palette: {
        primary: lightGreen,
        secondary: purple,
        error: red,
    },
});

const styles = theme => ({
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
    +classes: any,
    +pageActions: ActionCreator<any, any>,
    +mainMenuActions: ActionCreator<any, any>,
    +user: any,
    +page: any,
    +loader: any,
}

type State = {
    open: boolean,
    timeout?: any;
}

class App extends Component<Props, State> {

    constructor(props) {
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

    postponedShowMenu = () => {this.state.timeout = setTimeout(() => {if (this.state.timeout) this.showMenu()}, 700) };
    
    render() {
        const {getPhotos} = this.props.pageActions;
        const {classes, user, page, global, project} = this.props;

        return <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <div className={classes.appFrame}>

                    <div className={classes.drawerHeader}>
                        <Toolbar className={classes.header}>
                            <Typography type='title' color='inherit' className={classes.flex}>
                                {project.name}
                            </Typography>
                            <User name={user.name}/>
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
                                <MainMenuBar open={this.state.open} onShowMenu={this.showMenu}
                                             onHideMenu={this.hideMenu}/>
                            </AppBar>
                            <MainMenu open={this.state.open} onHideMenu={this.hideMenu}/>
                        </div>
                    </Drawer>
                    <main className={classes.content}>
                        <Page photos={page.photos} year={page.year} getPhotos={getPhotos} fetching={global.fetching}/>
                    </main>
                </div>
            </div>
        </MuiThemeProvider>
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    page: state.page,
    global: state.global,
    project: state.project,
});

const mapDispatchToProps = (dispatch) => ({
    pageActions: bindActionCreators(pageActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
