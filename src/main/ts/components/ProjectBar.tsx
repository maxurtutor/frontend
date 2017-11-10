import * as React from 'react';
import {Component} from 'react';

import {WithStyles} from 'material-ui';
import {StyleRulesCallback, withStyles} from 'material-ui/styles';

import Typography from 'material-ui/Typography';

import Project from '../domain/Project';

const styles: StyleRulesCallback<any> = () => ({
    flex: {
        flex: 1,
    },
});

interface Props {
    classes?: any;
    project: Project;
}

interface State {
    open: boolean;
}

export class ProjectBar extends Component<Props & WithStyles<any>, State> {

    constructor(props: Props & WithStyles<any>) {
        super(props);
        this.state = {
            open: false,
        };
    }

    public render() {
        const {classes, project}: Props = this.props;
        return (
            <Typography type="title" color="inherit" className={classes.flex}>
                {project.name}
            </Typography>
        );
    }
}

export default withStyles(styles)(ProjectBar);
