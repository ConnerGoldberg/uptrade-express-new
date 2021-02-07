import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import authRoutes from '../routes/authroutes.jsx';
import Loading from '../views/recycle-components/Loading';

export default class BlankLayout extends React.Component {
    render() {
        return (
            <div className="authentications">
                <Suspense fallback={<Loading/>}>
                    <Switch>
                        {authRoutes.map((prop, key) => {
                            if (prop.redirect)
                                return (
                                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                                );
                            return (
                                <Route path={prop.path} component={prop.component}  key={key} />
                            );
                        })}
                    </Switch>
                </Suspense>
            </div>
        )
    }
}
