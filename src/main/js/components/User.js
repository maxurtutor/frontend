import React, {Component} from 'react'
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {fullWhite} from 'material-ui/styles/colors';

const styles = {
    avatarLabel: {
        color: fullWhite,
    },
    avatarButton: {
        margin: 9,
        verticalAlign: 'middle',
    },
};

export default class User extends Component {
    render() {
        const {name} = this.props;
        return <IconMenu
            iconButtonElement={
                <FlatButton
                    label={name}
                    icon={<Avatar color={fullWhite}
                                  size={20}
                                  icon={<FontIcon color={fullWhite} className='material-icons'>person</FontIcon>}/>
                    }
                    style={styles.avatarButton}
                    labelStyle={styles.avatarLabel}
                    //containerElement='label'
                >
                </FlatButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        >
            <MenuItem primaryText='Refresh'/>
            <MenuItem primaryText='Help'/>
            <MenuItem primaryText='Sign out'/>
        </IconMenu>
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired
};