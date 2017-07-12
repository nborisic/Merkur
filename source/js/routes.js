import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from 'views/App';
//import Dashboard from 'views/Dashboard';
//import About from 'views/About';
import NotFound from 'views/NotFound';
import startingPage from 'views/startingPage';
import SearchResults from 'views/SearchResults';
import DetailView from 'views/DetailView';

const publicPath = '/';
const searchPath = '/:Category/:Service/:City/:Area/:priceFrom/:priceTo/:areaFrom/:areaTo';
const item = `${searchPath}/:id`;
const newEntrys = '/Novo_u_ponudi/:id';

export const routeCodes = {
  //DASHBOARD: publicPath,
  //ABOUT: `${ publicPath }about`,
};

export default class Routes extends Component {
  render() {
    return (
      <Router  history={ browserHistory }>
        <Route path={ publicPath } component={ App }>
          <IndexRoute component={startingPage} />
          
          <Route path={searchPath} component={SearchResults} />
          <Route path={newEntrys} component={ DetailView } />
          <Route path={item} component={ DetailView } />
          <Route path='*' component={ NotFound } />
        
        </Route>
      </Router>
    );
  }
}
          //<IndexRoute component={ Dashboard } />
          //<Route path={ routeCodes.DASHBOARD } component={ Dashboard } />
          //<Route path={ routeCodes.ABOUT } component={ About } />*/