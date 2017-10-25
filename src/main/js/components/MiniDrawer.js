/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon} from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

const styles = {
    list: {
        width: 50,
    },
    listFull: {
        width: 'auto',
    },
};

class MiniDrawer extends React.Component {

    render() {
        const {classes, onRequestClose} = this.props;
        const sideList = (
            <div className={classes.list}>
                <List className={classes.root}>
                    <ListItem button>
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                    </ListItem>
                </List>
            </div>
        );
        return (<Drawer onRequestClose={onRequestClose} type='permanent'>
            <AppBar position='static' className={classes.appBar}>
                <Toolbar>

                </Toolbar>
            </AppBar>
            <div
                tabIndex={0}
                role='button'
                onClick={onRequestClose}
                onKeyDown={onRequestClose}
            >
                {sideList}
            </div>
        </Drawer>)
    }
}

MiniDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(MiniDrawer);