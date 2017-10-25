import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import TopAppBar from '../components/TopAppBar'
import LeftDrawer from '../components/LeftDrawer'
import Page from '../components/Page'
import User from '../components/User'
import * as pageActions from '../actions/PageActions'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import lightGreen from 'material-ui/colors/lightGreen';
import purple from 'material-ui/colors/purple';
import red from 'material-ui/colors/red';


const theme = createMuiTheme({
    palette: {
        primary: lightGreen,
        secondary: purple,
        error: red,
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

        return <MuiThemeProvider theme={theme}>
            <div>
                <TopAppBar onLeftIconButtonTouchTap={this.handleToggle} elementRight={<User name={user.name}/>} />
                <Page photos={page.photos} year={page.year} getPhotos={getPhotos} fetching={loader.fetching}/>
                <LeftDrawer open={this.state.open} onRequestClose={this.handleToggle}/>
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