import * as React from "react";

import IconButton from "material-ui/IconButton";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

import MenuClose from "material-ui-icons/Close";
import MenuIcon from "material-ui-icons/Menu";

import {StyleRulesCallback, withStyles} from "material-ui/styles";

const styles: StyleRulesCallback<any> = () => ({
    toolbar: {
        justifyContent: "space-between",
        padding: 0,
        minHeight: 48,
    },
    title: {
        flex: 1,
        textAlign: "center",
    },
    menuButton: {},
});

interface Props {
    classes?: any;
    open: boolean;
    minHeight?: string | number;
    onShowMenu: () => void;
    onHideMenu: () => void;
}

function MainMenuBar(props: Props) {
    const {classes, open, onShowMenu, onHideMenu, minHeight} = props;
    const toolbarStyle = minHeight ? {minHeight} : {};
    return (
        <Toolbar className={classes.toolbar} style={toolbarStyle}>
            {!open && <IconButton className={classes.menuButton}
                                  onClick={onShowMenu} color="contrast"
                                  aria-label="Menu">
                <MenuIcon/>
            </IconButton>}

            {open && <IconButton className={classes.menuButton}
                                 onClick={onHideMenu} color="contrast"
                                 aria-label="Menu">
                <MenuClose/>
            </IconButton>}
            {open && <Typography type="title" color="inherit" className={classes.title}>
                Frontend
            </Typography>
            }
        </Toolbar>
    );
}

export default withStyles(styles)(MainMenuBar);
