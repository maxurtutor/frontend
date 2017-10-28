// @flow
'use strict';

import React from 'react';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';

import MenuIcon from 'material-ui-icons/Menu';
import MenuClose from 'material-ui-icons/Close';

const styles = () => ({
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -20,
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
            <Toolbar>
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
                {open && <Typography type='title' color='inherit' className={classes.flex}>
                    Frontend
                </Typography>
                }
            </Toolbar>
    );
}

export default withStyles(styles)(MainMenuBar);