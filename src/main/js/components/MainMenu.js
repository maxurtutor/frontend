// @flow weak

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';

import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';

const headerHeight = 64;

const styles = () => ({
    mainMenu: {
        position: 'relative',
        marginTop: headerHeight,

    },
});

const MainMenuItem = (props) => <ListItem button onClick={props.onClick} tabIndex={0}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        {props.open && <ListItemText inset primary={props.text} />}
    </ListItem>;

const MainMenu = (props) => {
    const { classes, open, onHideMenu } = props;
    return ( <List className={classes.mainMenu}>
                    <MainMenuItem onClick={onHideMenu} open={open} icon={<SendIcon/>} text='Sent mail' />
                    <MainMenuItem onClick={onHideMenu} open={open} icon={<DraftsIcon/>} text='Drafts' />
                    <MainMenuItem onClick={onHideMenu} open={open} icon={<InboxIcon/>} text='Inbox' />
                </List>
    );
};

MainMenu.propTypes = {
    classes: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onHideMenu: PropTypes.func,
};

export default withStyles(styles)(MainMenu);