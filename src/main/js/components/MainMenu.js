// @flow
'use strict';

import type {ActionCreator} from 'redux'

import React, {Component} from 'react'

import {bindActionCreators} from 'redux'

import {connect} from 'react-redux'

import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';

import {CircularProgress} from 'material-ui/Progress';

import CreateNewFolder from 'material-ui-icons/CreateNewFolder';
import OpenInBrowser from 'material-ui-icons/OpenInBrowser';
import Save from 'material-ui-icons/Save';
import Delete from 'material-ui-icons/Delete';
import Check from 'material-ui-icons/Check';

import green from 'material-ui/colors/green';
import CreateNewProjectDialog from '../components/CreateNewProjectDialog'

import {
    NEW,
    SAVING,
    CLEAN,
    CHANGED,
    LOADING,
} from '../domain/Project'

import {HEADER_HEIGHT} from '../constants/Commons'

import * as mainMenuActions from '../actions/MainMenuActions'

const styles = () => ({
    mainMenu: {
        position: 'relative',
        marginTop: HEADER_HEIGHT,
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: 102,
        left: -2,
        zIndex: 1,
    },
    button: {
        padding: 12,
    },
});

type State = {
    showNewDialog: boolean
}

type Props = {
    classes: any,
    open: boolean,
    actions: ActionCreator<any, any>,
    onHideMenu: () => void,
    state: NEW | SAVING | CLEAN | CHANGED | LOADING
}

const MainMenuItem = (props) => <ListItem tabIndex={0}
                                          button
                                          disabled={props.disabled}
                                          style={styles().button}
                                          onClick={props.onClick}>
    <ListItemIcon>{props.icon}</ListItemIcon>
    {props.open && <ListItemText inset primary={props.text}/>}
</ListItem>;

export class MainMenu extends Component<Props, State> {

    state = {
        showNewDialog: false,
    };

    save() {
        if (this.props.project.isChanged()) {
            this.props.actions.save();
        }
    }

    create() {
        this.setState(
                {showNewDialog: false},
                () => this.props.actions.create()
        )
    }

    render() {
        const project = this.props.project;
        const {classes, open, onHideMenu} = this.props;
        return ( <List className={classes.mainMenu}>
                    <MainMenuItem onClick={() => this.setState({showNewDialog: true})} open={open}
                                  icon={<CreateNewFolder/>} text='New Project...'/>
                    <MainMenuItem onClick={onHideMenu} open={open} icon={<OpenInBrowser/>} text='Open Project...'/>
                    <MainMenuItem onClick={() => this.save()} open={open}
                                  disabled={!project.isChanged()}
                                  icon={(project.isChanged()) ? <Save/> : <Check/>} text='Save All'/>
                    {(project.state === SAVING) && <CircularProgress size={50} className={classes.fabProgress}/>}
                    <MainMenuItem onClick={onHideMenu} open={open} icon={<Delete/>} text='Delete Project...'/>
                    <CreateNewProjectDialog open={this.state.showNewDialog}
                                            onClose={() => this.setState({showNewDialog: false})}
                                            onCreate={() => this.create()} />
                </List>
        );
    }
}

const mapStateToProps = (state) => ({
    project: state.project,
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(mainMenuActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainMenu));