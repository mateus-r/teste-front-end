import { Row } from 'antd';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SearchResults } from '../../pages/SearchResults';
import { VideoContent } from '../../pages/VideoContent';
import './styles.less'

interface ContentProps {
    visible: boolean;
}

export const Content = (props: ContentProps) => {

    return (
        <Switch>
            <Row align='middle' justify='center' className={props.visible ? 'content-container' : 'display-none'}>
                <Route path='/busca/:q' component={SearchResults} />
                <Route path='/video/:id' component={VideoContent} />
            </Row>
        </Switch>
    )
}