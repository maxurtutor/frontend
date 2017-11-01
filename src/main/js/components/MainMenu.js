// @flow
'use strict';

import type {ActionCreator} from 'redux'

import React, {Component} from 'react'

import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';


import { CircularProgress } from 'material-ui/Progress';

import CreateNewFolder from 'material-ui-icons/CreateNewFolder';
import OpenInBrowser from 'material-ui-icons/OpenInBrowser';
import Save from 'material-ui-icons/Save';
import Delete from 'material-ui-icons/Delete';
import Check from 'material-ui-icons/Check';

import green from 'material-ui/colors/green';

import {HEADER_HEIGHT} from '../constants/Commons'

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

type Props = {
    classes: any,
    open: boolean,
    actions: ActionCreator<any, any>,
    onHideMenu: () => void,
}

type State = {
    loading: boolean,
    saving: boolean,
    success: boolean,
};

const MainMenuItem = (props) => <ListItem tabIndex={0}
                                          button
                                          disabled = {props.disabled}
                                          style={styles().button }
                                          onClick={props.onClick} >
    <ListItemIcon>{props.icon}</ListItemIcon>
    {props.open && <ListItemText inset primary={props.text}/>}
</ListItem>;

export class MainMenu extends Component<Props, State> {

    state = {
        loading: false,
        saving: false,
        success: false,
    };

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    save = () => {
        if (!this.state.saving) {
            this.setState(
                    {
                        success: false,
                        saving: true,
                    },
                    () => {
                        this.timer = setTimeout(() => {
                            this.setState({
                                saving: false,
                                success: true,
                            });
                        }, 2000);
                    },
            );
        }
    };

    timer = undefined;
    
    render() {
        const {saving, success} = this.state;
        const {showNewDialog} = this.props.actions;
        const {classes, open, onHideMenu} = this.props;
        return ( <List className={classes.mainMenu}>
                    <MainMenuItem onClick={showNewDialog} open={open} icon={<CreateNewFolder/>} text='New Project...'/>
                    <MainMenuItem onClick={onHideMenu} open={open} icon={<OpenInBrowser/>} text='Open Project...'/>
                    <MainMenuItem onClick={this.save} open={open}
                                  disabled = {success || saving}
                                  icon={success ? <Check/> : <Save/>} text='Save All'/>
                    {saving && <CircularProgress size={50} className={classes.fabProgress} />}
                    <MainMenuItem onClick={onHideMenu} open={open} icon={<Delete/>} text='Delete Project...'/>
                </List>
        );
    }
}

export default withStyles(styles)(MainMenu);