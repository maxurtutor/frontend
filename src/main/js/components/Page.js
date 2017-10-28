// @flow
'use strict';

import React, {Component} from 'react'
import Button from 'material-ui/Button';
import Card, {CardContent} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

type Props = {
    +year: number,
    +photos: Array<*>,
    +fetching: number,
    +getPhotos: (number) => void,
}

export default class Page extends Component<Props> {

    render() {
        const {year, photos, fetching} = this.props;

        const Loader = () => <div className='loader'/>;

        const YearBtn = (props) => (
            <Button raised
                    disabled={year === props.year}
                    onClick={props.onClick}>
                {props.year}
            </Button>
        );

        return <div>
            {[2014, 2015, 2016].map((year) => <YearBtn key={year.toString()} year={year} onClick={() => this.props.getPhotos(year)}/>)}

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
