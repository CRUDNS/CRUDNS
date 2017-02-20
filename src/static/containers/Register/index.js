import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { push } from 'react-router-redux';
import t from 'tcomb-form';

import * as actionCreators from '../../actions/register';

const Form = t.form.Form;

const Register = t.struct({
    user_name: t.String,
    first_name: t.String,
    last_name: t.String,
    email: t.String,
    password: t.String,
    repeat_password: t.String
});

const RegisterFormOptions = {
    auto: 'placeholders',
    help: <i>Hint: a@a.com / qw</i>,
    fields: {
        password: {
            type: 'password'
        },
        repeat_password: {
            type: 'password'
        }
    }
};

class RegisterView extends React.Component {

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        isRegistering: React.PropTypes.bool.isRequired,
        isRegistered: React.PropTypes.bool.isRequired,
        isFailure: React.PropTypes.bool.isRequired,
        isAuthenticated: React.PropTypes.bool.isRequired,
        statusText: React.PropTypes.string,
        actions: React.PropTypes.shape({
            registerUser: React.PropTypes.func.isRequired
        }).isRequired,
        location: React.PropTypes.shape({
            query: React.PropTypes.object.isRequired
        })
    };

    constructor(props) {
        super(props);

        const redirectRoute = this.props.location ? this.props.location.query.next || '/login' : '/login';
        this.state = {
            formValues: {
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                repeat_password: ''
            },
            redirectTo: redirectRoute
        };
    }

    componentWillMount() {
        if (this.props.isAuthenticated) {
            this.props.dispatch(push('/'));
        } else if (this.props.isRegistered) {
            this.props.dispatch(push('/login'));
        }
    }

    onFormChange = (value) => {
        this.setState({ formValues: value });
    };

    register = (e) => {
        e.preventDefault();
        const value = this.registerForm.getValue();
        if (value) {
            this.props.actions.registerUser(value.user_name, value.first_name, value.last_name, value.email,
                value.password, this.state.redirectTo);
        }
    };

    render() {
        let statusText = null;
        let submitText = 'Submit';
        if (this.props.statusText) {
            const statusTextClassNames = classNames({
                'alert': true,
                'alert-danger': this.props.statusText.indexOf('You Have Successfully Registered.!!') === 0,
                'alert-success': this.props.statusText.indexOf('You Have Successfully Registered.!!') !== 0
            });

            statusText = (
                <div className="row">
                    <div className="col-sm-12">
                        <div className={statusTextClassNames}>
                            {this.props.statusText}
                        </div>
                    </div>
                </div>
            );
        }
        if (this.props.isFailure) {
            submitText = 'Retry';
        }
        return (
            <div className="container login">
                <h1 className="text-center">Register</h1>
                <div className="login-container margin-top-medium">
                    {statusText}
                    <form onSubmit={this.register}>
                        <Form ref={(ref) => {
                            this.registerForm = ref;
                        }}
                              type={Register}
                              options={RegisterFormOptions}
                              value={this.state.formValues}
                              onChange={this.onFormChange}
                        />
                        <button disabled={this.props.isRegistering}
                                type="submit"
                                className="btn btn-default btn-block"
                        >
                            {submitText}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isRegistering: state.reg.isRegistering,
        isRegistered: state.reg.isRegistered,
        isFailure: state.reg.isFailure,
        statusText: state.reg.statusText
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterView);
export { RegisterView as RegisterViewNotConnected };
