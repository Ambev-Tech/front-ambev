import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { LandingPage } from '../pages/LadingPage';
import { SignUp } from '../pages/SignUp';

export const PrincipalRoutes: React.FC = () => {
    const location = useLocation()
    return (
        <Switch location={location}>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/signup" component={SignUp} />
        </Switch>
    )
}