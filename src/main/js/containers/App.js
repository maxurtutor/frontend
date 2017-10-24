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
    render() {
        const {user, page, loader} = this.props;
        const {getPhotos} = this.props.pageActions;

        return <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
            <div>
                <AppBar
                    title='Title'
                    iconElementRight={<User name={user.name}/>}
                />
                <div className='row'>
                    <Page photos={page.photos} year={page.year} getPhotos={getPhotos} fetching={loader.fetching}/>

                </div>
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