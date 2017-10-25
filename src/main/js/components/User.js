import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {Component} from 'react'

import React from 'react';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

import Avatar from 'material-ui/Avatar';
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

export class User extends Component {

    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = event => {
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

User.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired
};


export default withStyles(styles)(User);