import * as React from 'react';
import {Component} from 'react';

// import {bindActionCreators} from "redux";

import {ActionCreator, connect, Dispatch} from 'react-redux';

import List, {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
import {StyleRulesCallback, withStyles} from 'material-ui/styles';

import {CircularProgress} from 'material-ui/Progress';

import Check from 'material-ui-icons/Check';
import CreateNewFolder from 'material-ui-icons/CreateNewFolder';
import Delete from 'material-ui-icons/Delete';
import OpenInBrowser from 'material-ui-icons/OpenInBrowser';
import Save from 'material-ui-icons/Save';

import green from 'material-ui/colors/green';
// import CreateNewProjectDialog from "../components/CreateNewProjectDialog";

import Project from '../domain/Project';

// import * as mainMenuActions from "../actions/MainMenuActions";
import {WithStyles} from 'material-ui';

const styles: StyleRulesCallback<any> = () => ({
    button: {
        padding: 12,
    },
    fabProgress: {
        color: green[500],
        left: -2,
        position: 'absolute',
        top: 102,
        zIndex: 1,
    },
    mainMenu: {
        marginTop: 48,
        position: 'relative',
    },
});

interface ItemProps {
    classes?: any;
    disabled?: boolean;
    open: boolean;
    icon: any;
    text: string;
    onClick: () => void;
}

const MainMenuItem = (props: ItemProps) => (
    <ListItem
        tabIndex={0}
        button
        disabled={props.disabled}
        className={props.classes.button}
        onClick={props.onClick}
    >
        <ListItemIcon>{props.icon}</ListItemIcon>
        {props.open && <ListItemText inset primary={props.text}/>}
    </ListItem>
);

interface State {
    showNewDialog: boolean;
}

interface Props {
    classes?: any;
    open: boolean;
    project: Project;
    actions: ActionCreator<any>;
    onHideMenu: () => void;
}

export class MainMenu extends Component<Props & WithStyles<any>, State> {

    public state = {
        showNewDialog: false,
    };

    public save() {
        if (this.props.project.isChanged()) {
            //          this.props.actions.save();
        }
    }

    public create(project: Project) {
        this.setState(
            {showNewDialog: false},
//            () => this.props.actions.create(project),
        );
    }

    public render() {
        const project = this.props.project;
        const {classes, open, onHideMenu} = this.props;
        return (
            <List className={classes.mainMenu}>
                <MainMenuItem
                    onClick={() => this.setState({showNewDialog: true})}
                    open={open}
                    icon={<CreateNewFolder/>}
                    text="New Project..."
                />
                <MainMenuItem
                    onClick={() => this.setState({showNewDialog: true})}
                    open={open}
                    icon={<CreateNewFolder/>}
                    text="New Project..."
                />
                <MainMenuItem onClick={onHideMenu} open={open} icon={<OpenInBrowser/>} text="Open Project..."/>
                <MainMenuItem
                    onClick={() => this.save()}
                    open={open}
                    disabled={!project.isChanged()}
                    icon={(project.isChanged()) ? <Save/> : <Check/>}
                    text="Save All"
                />
                {project.isSaving() && <CircularProgress size={50} className={classes.fabProgress}/>}
                <MainMenuItem onClick={onHideMenu} open={open} icon={<Delete/>} text="Delete Project..."/>
            </List>
        );
        /*        return <List className={classes.mainMenu}>
                    <CreateNewProjectDialog open={this.state.showNewDialog}
                                            onClose={() => this.setState({showNewDialog: false})}
                                            onCreate={(project) => this.create(project)}/>
                </List>*/

    }
}

const mapStateToProps = (state: any) => ({
    project: state.project,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    // actions: bindActionCreators(mainMenuActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainMenu));
