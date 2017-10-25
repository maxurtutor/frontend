// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = () => ({
    root: {
        width: '100%',
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

function TopAppBar(props) {
    const { classes, elementRight, onLeftIconButtonTouchTap } = props;
    return (
        <div className={classes.root}>
            <AppBar position='static' className={classes.appBar}>
                <Toolbar>
                    <IconButton className={classes.menuButton}
                                onClick={onLeftIconButtonTouchTap} color='contrast' aria-label='Menu'>
                        <MenuIcon />
                    </IconButton>
                    <Typography type='title' color='inherit' className={classes.flex}>
                        Frontend
                    </Typography>
                    {elementRight}
                </Toolbar>
            </AppBar>
        </div>
    );
}

TopAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    elementRight: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopAppBar);