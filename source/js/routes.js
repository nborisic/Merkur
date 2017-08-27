import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from 'views/App';
import NotFound from 'views/NotFound';
import startingPage from 'views/startingPage';
import SearchResults from 'views/SearchResults';
import DetailView from 'views/DetailView';

const publicPath = '/';
const quickSearch = '/:quickParameter';
const quickSearchItem = `${ quickSearch }/:id`;
const searchPath = '/:category/:structure/:service/:city/:area/:priceFrom/:priceTo/:areaFrom/:areaTo';
const item = `${ searchPath }/:id`;
const newEntrys = '/Novo_u_ponudi/:id';

export default class Routes extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path={ publicPath } component={ App }>
          <IndexRoute component={ startingPage } />
          <Route path={ searchPath } component={ SearchResults } />
          <Route path={ quickSearch } component={ SearchResults } />
          <Route path={ item } component={ DetailView } />
          <Route path={ newEntrys } component={ DetailView } />
          <Route path={ quickSearchItem } component={ DetailView } />
          <Route path='*' component={ NotFound } />
        </Route>
      </Router>
    );
  }
}
