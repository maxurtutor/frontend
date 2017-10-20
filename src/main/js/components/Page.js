import React, {Component} from 'react'
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';

export default class Page extends Component {

    onYearBtnClick(e) {
        this.props.getPhotos(+e.target.innerText)
    }
    render() {
        const { year, photos, fetching } = this.props;

        const Loader = () => <div className='loader'/>;

        return <div className='ib page'>
                <RaisedButton onClick={::this.onYearBtnClick}>2016</RaisedButton>{' '}
                <RaisedButton onClick={::this.onYearBtnClick}>2015</RaisedButton>{' '}
                <RaisedButton onClick={::this.onYearBtnClick}>2014</RaisedButton>{' '}

            <Card>
                <CardHeader title={`${year} год`}/>
                <CardMedia>
                    {
                        fetching > 0 ?
                                <Loader/>
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