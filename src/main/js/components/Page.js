import React, {Component} from 'react'
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardMedia} from 'material-ui/Card';

export default class Page extends Component {

    onYearBtnClick(event) {
        this.props.getPhotos(+event.target.innerText)
    }

    render() {
        const {year, photos, fetching} = this.props;

        const Loader = () => <div className='loader'/>;

        const YearBtn = (props) => (
                <RaisedButton disabled={year === props.year}
                              secondary={true}
                              label={props.year}
                              onClick={::this.onYearBtnClick}/>
        );

        return <div className='ib page'>
            {[2014, 2015, 2016].map((year) => <YearBtn key={year.toString()} year={year}/>)}

            <Card>
                <CardHeader title={`${year} год`}/>
                <CardMedia>
                    {
                        fetching > 0 ?
                                <div>
                                    <Loader/>
                                    <p>Загрузка...</p>
                                </div>
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