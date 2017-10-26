// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
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

function MainMenuBar(props) {
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

MainMenuBar.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onShowMenu: PropTypes.func.isRequired,
    onHideMenu: PropTypes.func.isRequired,
};

export default withStyles(styles)(MainMenuBar);