import React from 'react'
import renderer from 'react-test-renderer';
import Page from '../main/js/components/Page'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const getPhotos = () => {};

// This is the actual test written for Jest
it('test to see if the Page renders correctly', () => {
    let element = <MuiThemeProvider>
        <Page year={2016} getPhotos={getPhotos} photos={[1, 2, 3, 4, 5]}/>
    </MuiThemeProvider>;
    const tree = renderer
            .create(element)
            .toJSON();
    expect(tree).toMatchSnapshot();
});
