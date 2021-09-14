import React, {FC} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {privateRoutes, publicRoutes, RouteNames} from "../routes";
import {useTypeSelector} from "../hooks/useTypeSelector";

const AppRouter:FC = () => {
    const {isAuth} = useTypeSelector(state => state.auth)
    return (
        isAuth ?
        <Switch>
            {privateRoutes.map(key => {
               return <Route exact={key.exact} path={key.path} component={key.component} key={key.path}/>
            })}
            <Redirect to={RouteNames.EVENT}/>
        </Switch>

            :
            <Switch>
                {publicRoutes.map(key => {
                    return <Route exact={key.exact} path={key.path} component={key.component} key={key.path}/>
                })}
                <Redirect to={RouteNames.LOGIN}/>
            </Switch>
    );
}

export default AppRouter;
