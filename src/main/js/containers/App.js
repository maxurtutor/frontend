import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import * as pageActions from '../actions/PageActions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import {white, darkBlack} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Download from 'material-ui/svg-icons/file/file-download';
import Delete from 'material-ui/svg-icons/action/delete';

const muiTheme = getMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: {
        primary1Color: '#44583B',
        primary2Color: '#3b5846',
        primary3Color: '#53583b',
        accent1Color: '#583b44',
        accent2Color: '#58453b',
        accent3Color: '#3b4d58',
        textColor: darkBlack,
        secondaryTextColor: fade(white, 0.54),
        alternateTextColor: white,
        disabledColor: fade(darkBlack, 0.3),
    },
    appBar: {
        height: 40,
    },
});

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        const {user, page, loader} = this.props;
        const {getPhotos} = this.props.pageActions;

        return <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
            <div>
                <AppBar
                    title='Title'
                    iconElementRight={<User name={user.name}/>}
                    onLeftIconButtonTouchTap={this.handleToggle}
                />
                <div className='row'>
                    <Page photos={page.photos} year={page.year} getPhotos={getPhotos} fetching={loader.fetching}/>
                </div>
                <Drawer open={this.state.open}>
                    <AppBar title='AppBar'
                            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                            onLeftIconButtonTouchTap={this.handleToggle}
                    />
                    <MenuItem primaryText='Preview' leftIcon={<RemoveRedEye />} />
                    <MenuItem primaryText='Share' leftIcon={<PersonAdd />} />
                    <MenuItem primaryText='Get links' leftIcon={<ContentLink />} />
                    <Divider />
                    <MenuItem primaryText='Make a copy' leftIcon={<ContentCopy />} />
                    <MenuItem primaryText='Download' leftIcon={<Download />} />
                    <Divider />
                    <MenuItem primaryText='Remove' leftIcon={<Delete />} />
                </Drawer>
            </div>
        </MuiThemeProvider>
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    page: state.page,
    loader: state.loader,
});

const mapDispatchToProps = (dispatch) => ({
    pageActions: bindActionCreators(pageActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App)