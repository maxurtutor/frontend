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
import MainMenu from '../components/MainMenu'
import * as pageActions from '../actions/PageActions'

import logo from '../../img/maxur-logo.png'

const drawerMiniWidth = 60;
const drawerFullWidth = 240;
const headerHeight = 64;

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
        height: headerHeight
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

        height: headerHeight
    },

    content: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        height: `calc(100% - ${headerHeight}px)`,
        width: `calc(100% - ${drawerMiniWidth}px - 48px)`,
        marginLeft: drawerMiniWidth,
        [theme.breakpoints.up('sm')]: {
            height: 'calc(100% - 64px)',
        },
    },
    flex: {
        flex: 1,
    },
    flex2: {
        flex: 1,
        textAlign: 'center',
    },
});

type Props = {
    +classes: any,
    +pageActions: ActionCreator<any, any>,
    +user: any,
    +page: any,
    +loader: any,
}

type State = {
    open: boolean,
}

class App extends Component<Props, State> {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    showMenu = () => this.setState({open: true});
    hideMenu = () => this.setState({open: false});

    render() {
        const {getPhotos} = this.props.pageActions;
        const {classes, user, page, loader} = this.props;

        return <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
                <div className={classes.appFrame}>

                    <div className={classes.drawerHeader}>
                        <Toolbar className={classes.header}>
                            <Typography type='title' color='inherit' className={classes.flex}/>
                            <User name={user.name}/>
                        </Toolbar>
                    </div>

                    <Drawer
                        type={'permanent'}
                        onMouseEnter={this.showMenu}
                        onMouseLeave={this.hideMenu}
                        classes={{
                            paper: this.state.open ? classes.drawerFull : classes.drawerMini,
                        }}
                    >
                        <AppBar position='static' className={classes.appBar}>
                            <Toolbar>
                                <img style={{width: 38, height: 57, marginLeft:-14}} src={logo}/>
                                {this.state.open && <Typography type='title' color='inherit' className={classes.flex2}>
                                    Frontend
                                </Typography>}
                            </Toolbar>
                        </AppBar>
                        <MainMenu open={this.state.open} onHideMenu={this.hideMenu}/>
                    </Drawer>
                    <main className={classes.content}>
                        <Page photos={page.photos} year={page.year} getPhotos={getPhotos} fetching={loader.fetching}/>
                    </main>
                </div>
            </div>
        </MuiThemeProvider>
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    page: state.page,
    loader: state.loader,
});

const mapDispatchToProps = (dispatch) => ({
    pageActions: bindActionCreators(pageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
