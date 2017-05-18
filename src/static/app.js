import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import classNames from 'classnames';

import {authLogoutAndRedirect} from './actions/auth';
import './styles/main.scss';

class App extends React.Component {

    static propTypes = {
        isAuthenticated: React.PropTypes.bool.isRequired,
        children: React.PropTypes.shape().isRequired,
        dispatch: React.PropTypes.func.isRequired,
        pathName: React.PropTypes.string.isRequired
    };

    logout = () => {
        this.props.dispatch(authLogoutAndRedirect());
    };

    goToIndex = () => {
        this.props.dispatch(push('/'));
    };

    goToProtected = () => {
        this.props.dispatch(push('/protected'));
    };

    goToDashboard = () => {
        this.props.dispatch(push('/dashboard'));
    };

    render() {
        const homeClass = classNames({
            active: this.props.pathName === '/'
        });
        // const protectedClass = classNames({
        //     active: this.props.pathName === '/protected'
        // });
        const loginClass = classNames({
            active: this.props.pathName === '/login'
        });
        const registerClass = classNames({
            active: this.props.pathName === '/register'
        });
        const dashboardClass = classNames({
            active: this.props.pathName === '/dashboard'
        });

        return (
            <div className="app">
                {/*<nav className="navbar navbar-inverse navbar-embossed">*/}
                <div>
                    <div id="logo">
                        <a tabIndex="0" onClick={this.goToIndex}>
                            CRUDNS
                        </a>
                    </div>
                    <div id="navbar">
                        {this.props.isAuthenticated ?
                            <ul>
                                <li className={homeClass}>
                                    <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
                                        <i className="fa fa-home"/> Home
                                    </a>
                                </li>
                                {/* <li className={protectedClass}>*/}
                                {/* <a className="js-go-to-protected-button"*/}
                                {/* tabIndex="0"*/}
                                {/* onClick={this.goToProtected}*/}
                                {/* >*/}
                                {/* <i className="fa fa-lock"/> Protected*/}
                                {/* </a>*/}
                                {/* </li>*/}
                                <li className={dashboardClass}>
                                    <a className="js-go-to-dashboard-button"
                                       tabIndex="0"
                                       onClick={this.goToDashboard}
                                    >
                                        <i className="fa fa-tachometer"/> Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a className="js-logout-button" tabIndex="0" onClick={this.logout}>
                                        Logout
                                    </a>
                                </li>
                            </ul>
                            :
                            <ul>
                                <li className={homeClass}>
                                    <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
                                        <i className="fa fa-home"/> Home
                                    </a>
                                </li>
                                <li className={loginClass}>
                                    <Link className="js-login-button" to="/login">Login</Link>
                                </li>
                                <li className={registerClass}>
                                    <Link className="js-login-button" to="/register">Register</Link>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
                <div>
                    <div className="row">
                        <div className="col-lg-12">
                            {this.props.children}</div>
                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pathName: ownProps.location.pathname
    };
};

export default connect(mapStateToProps)(App);
export {App as AppNotConnected};
