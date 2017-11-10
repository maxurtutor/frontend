import * as React from "react";
import {Component, MouseEventHandler} from "react";

import {WithStyles} from "material-ui";
import {StyleRulesCallback, withStyles} from "material-ui/styles";

import Avatar from "material-ui/Avatar";
import Button from "material-ui/Button";
import Menu from "material-ui/Menu";
import {MenuItem} from "material-ui/Menu";
import Typography from "material-ui/Typography";

import PersonIcon from "material-ui-icons/Person";

import User from "../domain/User";

const styles: StyleRulesCallback<any> = (theme) => ({
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

interface Props {
    classes?: any;
    user: User;
}

interface State {
    anchorEl?: HTMLElement;
    open: boolean;
}

export class UserBar extends Component<Props & WithStyles<any>, State> {

    constructor(props: Props & WithStyles<any>) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
        };
    }

    public handleClick: MouseEventHandler<any> = (event) => {
        this.setState({open: true, anchorEl: event.currentTarget});
    }

    public handleRequestClose = () => {
        this.setState({open: false});
    }

    public render() {
        const {classes, user}: Props = this.props;
        return (
            <div>
                <Button className={classes.button}
                        color="contrast"
                        aria-owns={this.state.open ? "simple-menu" : null}
                        aria-haspopup={true}
                        onClick={this.handleClick}
                >
                    <Avatar className={classes.avatar}>
                        <PersonIcon/>
                    </Avatar>
                    <Typography type="body1" color="inherit" className={classes.flex}>
                        {user.name}
                    </Typography>
                </Button>
                <Menu
                    id="account-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    {user.isAuthorized ?
                        <div>
                            <MenuItem onClick={this.handleRequestClose}>Log Out</MenuItem>
                            <MenuItem onClick={this.handleRequestClose}>Profile</MenuItem>
                            <MenuItem onClick={this.handleRequestClose}>My account</MenuItem>
                        </div> :
                        <MenuItem onClick={this.handleRequestClose}>Log In</MenuItem>}
                    }
                </Menu>
            </div>
        );
    }
}

export default withStyles(styles)(UserBar);
