// @flow
'use strict';

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import MenuIcon from 'material-ui-icons/Menu';
import MenuClose from 'material-ui-icons/Close';

import {HEADER_HEIGHT} from '../constants/Commons'

const styles = () => ({
    toolbar: {
        justifyContent: 'space-between',
        padding: 0,
        minHeight: HEADER_HEIGHT
    },
    title: {
        flex: 1,
        textAlign: 'center'
    },
    menuButton: {
    },
});

type Props = {
    +classes: any,
    +open: boolean,
    +onShowMenu: () => void,
    +onHideMenu: () => void,
}

function MainMenuBar(props: Props) {
    const { classes, open, onShowMenu, onHideMenu } = props;
    return (
            <Toolbar className={classes.toolbar}>
                {!open && <IconButton className={classes.menuButton}
                                                 onClick={onShowMenu} color='contrast'
                                                 aria-label='Menu'>
                    <MenuIcon/>
                </IconButton>}

                {open && <IconButton className={classes.menuButton}
                                                onClick={onHideMenu} color='contrast'
                                                aria-label='Menu'>
                    <MenuClose/>
                </IconButton>}
                {open && <Typography type='title' color='inherit' className={classes.title}>
                    Frontend
                </Typography>
                }
            </Toolbar>
    );
}

export default withStyles(styles)(MainMenuBar);