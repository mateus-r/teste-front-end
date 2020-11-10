import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { SearchResults } from '../../pages/SearchResults';
import { VideoContent } from '../../pages/VideoContent';

export const Content = () => {

    return (
        <Switch>
            <Route path='/busca/:q' component={SearchResults} />
            <Route path='/video/:id' component={VideoContent} />
        </Switch>
    )
}