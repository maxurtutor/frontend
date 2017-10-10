import React, {Component} from 'react'
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';

const CircularProgressExampleSimple = () => (
        <div>
            <CircularProgress />
        </div>
);

export default class Page extends Component {
    onYearBtnClick(e) {
        this.props.getPhotos(+e.target.innerText)
    }
    render() {
        const { year, photos, fetching } = this.props;
        return <div className='ib page'>
                <RaisedButton onClick={::this.onYearBtnClick}>2016</RaisedButton>{' '}
                <RaisedButton onClick={::this.onYearBtnClick}>2015</RaisedButton>{' '}
                <RaisedButton onClick={::this.onYearBtnClick}>2014</RaisedButton>{' '}

            <Card>
                <CardHeader title={`${year} год`}/>
                <CardMedia>
                    {
                        fetching ?
                                <CircularProgressExampleSimple/>
                                :
                                <p>У тебя {photos.length} фото.</p>
                    }
                </CardMedia>

            </Card>

        </div>
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    getPhotos: PropTypes.func.isRequired
};