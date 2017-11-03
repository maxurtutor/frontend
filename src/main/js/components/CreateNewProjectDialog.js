// @flow
'use strict';

import React from 'react';
import Button from 'material-ui/Button';

import {withStyles} from 'material-ui/styles';

import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';


const styles = () => ({
});

type Props = {
    classes: any,
    open: boolean,
    onClose: () => void,
    onCreate: () => void,
}

const CreateNewProjectDialog = (props: Props) => {
    return (
            <Dialog open={props.open} onRequestClose={props.onClose}>
                <DialogTitle>Create new project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To create new project, please enter it's name here.
                    </DialogContentText>
                    <TextField
                            autoFocus
                            margin='dense'
                            id='name'
                            label='Project Name'
                            type='email'
                            fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color='primary'>
                        Cancel
                    </Button>
                    <Button onClick={props.onCreate} color='primary'>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
    );
};

export default withStyles(styles)(CreateNewProjectDialog);