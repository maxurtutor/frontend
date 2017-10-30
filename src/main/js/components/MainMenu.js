// @flow
'use strict';

import type {ActionCreator} from 'redux'

import React from 'react';
import {withStyles} from 'material-ui/styles';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';

import CreateNewFolder from 'material-ui-icons/CreateNewFolder';
import OpenInBrowser from 'material-ui-icons/OpenInBrowser';
import Save from 'material-ui-icons/Save';

import {HEADER_HEIGHT} from '../constants/Commons'

const styles = () => ({
    mainMenu: {
        position: 'relative',
        marginTop: HEADER_HEIGHT,
    },
});

const MainMenuItem = (props) => <ListItem style={{padding: 12}} button onClick={props.onClick} tabIndex={0}>
    <ListItemIcon>{props.icon}</ListItemIcon>
    {props.open && <ListItemText inset primary={props.text}/>}
</ListItem>;

type Props = {
    classes: any,
    open: boolean,
    actions: ActionCreator<any, any>,
    onHideMenu: () => void,
}

const MainMenu = (props: Props) => {
    const {showNewDialog} = props.actions;
    const {classes, open, onHideMenu} = props;
    return ( <List className={classes.mainMenu}>
                <MainMenuItem onClick={showNewDialog} open={open} icon={<CreateNewFolder/>} text='Create New'/>
                <MainMenuItem onClick={onHideMenu} open={open} icon={<OpenInBrowser/>} text='Open Project'/>
                <MainMenuItem onClick={onHideMenu} open={open} icon={<Save/>} text='Save'/>
            </List>
    );
};

export default withStyles(styles)(MainMenu);