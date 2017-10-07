import React from 'react'
import renderer from 'react-test-renderer';
import Page from '../main/js/components/Page'

const getPhotos = () => {};

// This is the actual test written for Jest
it('test to see if the Page renders correctly', () => {
    const tree = renderer
            .create(<Page year={2016} getPhotos={getPhotos} photos={[1, 2, 3, 4, 5]}/>)
            .toJSON();
    expect(tree).toMatchSnapshot();
});
