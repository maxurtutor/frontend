// @flow
'use strict';

import React, {Component} from 'react'
import Button from 'material-ui/Button';

import {withStyles} from 'material-ui/styles';

import Input from 'material-ui/Input';

import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

import Project from '../domain/Project'

const styles = () => ({
});

type Props = {
    classes: any,
    open: boolean,
    onClose: () => void,
    onCreate: () => void,
}

type State = {
    project: Project
}

export class CreateNewProjectDialog extends Component<Props, State> {

    state = {
        project: new Project()
    };

    render() {
           return  <Dialog open={this.props.open} onRequestClose={this.props.onClose}>
                <DialogTitle>Create new project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create new project, please enter it's name here.
                    </DialogContentText>
                    <Input
                            autoFocus
                            margin='dense'
                            id='name'
                            label='Project Name'
                            fullWidth
                            required
                            value = {this.state.project.name}
                            onChange = {(event) => this.setState({project : new Project(event.target.value)}) }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.onClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={() => this.props.onCreate(this.state.project)} color='primary'>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
    }
}

export default withStyles(styles)(CreateNewProjectDialog);