/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
    list: {
        width: 250,
    },
    listFull: {
        width: 'auto',
    },
};

class LeftDrawer extends React.Component {

    render() {
        const {classes, open, onRequestClose} = this.props;
        const sideList = (
            <div className={classes.list}>
                <List className={classes.root} subheader={<ListSubheader>Nested List Items</ListSubheader>}>
                    <ListItem button>
                        <ListItemIcon>
                            <SendIcon />
                        </ListItemIcon>
                        <ListItemText inset primary='Sent mail' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DraftsIcon />
                        </ListItemIcon>
                        <ListItemText inset primary='Drafts' />
                    </ListItem>
                    <ListItem button onClick={this.handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText inset primary='Inbox' />
                    </ListItem>
                </List>
            </div>
        );
        return (<Drawer open={open} onRequestClose={onRequestClose} >
            <AppBar position='static' className={classes.appBar}>
                <Toolbar>
                    <Typography type='title' color='inherit' className={classes.flex}>
                        Frontend
                    </Typography>
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

LeftDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

export default withStyles(styles)(LeftDrawer);