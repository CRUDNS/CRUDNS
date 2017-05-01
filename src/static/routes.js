import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import { HomeView, LoginView, ProtectedView, NotFoundView, RegisterView, DomainView, DNSRecord} from './containers';
import requireAuthentication from './utils/requireAuthentication';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={HomeView}/>
        <Route path="login" component={LoginView}/>
        <Route path="register" component={RegisterView}/>
        <Route path="dummy" component={DNSRecord}/>
        <Route path="protected" component={requireAuthentication(ProtectedView)}/>
        <Route path="dashboard" component={requireAuthentication(DomainView)}/>
        <Route path="*" component={NotFoundView}/>
    </Route>
);
