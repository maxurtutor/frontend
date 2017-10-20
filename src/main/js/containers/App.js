import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import User from '../components/User'
import Page from '../components/Page'
import * as pageActions from '../actions/PageActions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {
    render() {
        const {user, page, loader} = this.props;
        const {getPhotos} = this.props.pageActions;

        return <MuiThemeProvider>
            <div className='row'>
                <Page photos={page.photos} year={page.year} getPhotos={getPhotos} fetching={loader.fetching}/>
                <User name={user.name}/>
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