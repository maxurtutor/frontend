import React, {Component} from 'react'
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

export default class Page extends Component {

    onYearBtnClick(event) {
        this.props.getPhotos(+event.target.innerText)
    }

    render() {
        const {year, photos, fetching} = this.props;

        const Loader = () => <div className='loader'/>;

        const YearBtn = (props) => (
            <Button raised
                    disabled={year === props.year}
                    onClick={::this.onYearBtnClick}>
                {props.year}
            </Button>
        );

        return <div>
            {[2014, 2015, 2016].map((year) => <YearBtn key={year.toString()} year={year}/>)}

            <Card>
                <CardContent>
                    <Typography type='body1'>
                        {`${year} год`}
                    </Typography>
                    {
                        fetching > 0 ?
                            <div>
                                <Loader/>
                                <p>Загрузка...</p>
                            </div>
                            :
                            <p>У тебя {photos.length} фото.</p>
                    }
                </CardContent>
            </Card>
        </div>
    }
}

Page.propTypes = {
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    getPhotos: PropTypes.func.isRequired
};