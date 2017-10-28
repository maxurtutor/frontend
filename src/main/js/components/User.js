// @flow
'use strict';

import {withStyles} from 'material-ui/styles';
import {Component} from 'react'

import React from 'react';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

import PersonIcon from 'material-ui-icons/Person';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        height: 30,
    },
    avatar: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
});

type Props = {
    +classes: any,
    +name: string
}

type State = {
    anchorEl: ?EventTarget,
    open: boolean,
}

export class User extends Component<Props, State> {

    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = (event: Event) => {
        this.setState({open: true, anchorEl: event.currentTarget});
    };

    handleRequestClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes, name} = this.props;
        return (
            <div>
                <Button className={classes.button}
                        color='contrast'
                        aria-owns={this.state.open ? 'simple-menu' : null}
                        aria-haspopup='true'
                        onClick={this.handleClick}
                >
                    <Avatar className={classes.avatar}>
                        <PersonIcon/>
                    </Avatar>
                    <Typography type='body1' color='inherit' className={classes.flex}>
                        {name}
                    </Typography>
                </Button>
                <Menu
                    id='account-menu'
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                    <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleRequestClose}>Logout</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default withStyles(styles)(User);