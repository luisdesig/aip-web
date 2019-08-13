import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Login from './containers/Login/Login';
import Main from './containers/Main/Main';
import { connect } from 'react-redux';

const RestrictedRoute = ({component: Component, isLoogedIn, ...rest}) => {
        return (<Route
            {...rest}
            render={ props =>
                isLoogedIn ? (
                    <Component {...props} />
                ) : <Redirect to={{pathname: '/login', state: { from: props.location }}}/>
            }
        />)
        }

const PublicRoutes = ({isLoogedIn}) => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Login}/>
                    <Route exact path='/login' component={Login}/>
                    <RestrictedRoute path="/main" component={Main} isLoogedIn={isLoogedIn}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default connect(state => ({
    isLoogedIn: state.auth.idToken !== null
}))(PublicRoutes)