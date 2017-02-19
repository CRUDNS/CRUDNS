import React from 'react';
import t from 'tcomb-form';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/domain';


const Form = t.form.Form;

const AddDomain = t.struct({
    domain_name: t.String,
});

const AddDomainFormOptions = {
    auto: 'placeholders'
};


class DomainView extends React.Component {

    static propTypes = {
        dispatch: React.PropTypes.func.isRequired,
        isAdding: React.PropTypes.bool.isRequired,
        isAdded: React.PropTypes.bool.isRequired,
        isFailure: React.PropTypes.bool.isRequired,
        addDomain: React.PropTypes.bool.isRequired,
        statusText: React.PropTypes.string,
        isFetching: React.PropTypes.bool.isRequired,
        domains: React.PropTypes.arrayOf(React.PropTypes.shape({
            domain: React.PropTypes.string.isRequired,
            status: React.PropTypes.bool.isRequired
        })),
        token: React.PropTypes.string.isRequired,
        userId: React.PropTypes.string.isRequired,
        actions: React.PropTypes.shape({
            dataFetchDomainData: React.PropTypes.func.isRequired,
            addDomain: React.PropTypes.func.isRequired,
            toggleDomainForm: React.PropTypes.func.isRequired
        }).isRequired
    };
    constructor(props) {
        super(props);

        this.state = {
            formValues: {
                domain: ''
            }
        };
    }
    componentWillMount() {
        const token = this.props.token;
        this.props.actions.dataFetchDomainData(token);
    }
    onFormChange = (value) => {
        this.setState({ formValues: value });
    };
    add = (e) => {
        e.preventDefault();
        const value = this.addDomainForm.getValue();
        if (value) {
            this.props.actions.addDomain(value.domain_name, this.props.userId, this.props.token);
        }
    };
    render() {
        let submitText = 'Submit';
        if (this.props.isFailure) {
            submitText = 'Retry';
        }
        let newDomainForm = null;
        if (this.props.addDomain) {
            newDomainForm = (
                <form onSubmit={this.add}>
                    <Form ref={(ref) => {
                        this.addDomainForm = ref;
                    }}
                          type={AddDomain}
                          options={AddDomainFormOptions}
                          value={this.state.formValues}
                          onChange={this.onFormChange}
                    />
                    <button disabled={this.props.isAdding}
                            type="submit"
                            className="btn btn-default btn-block"
                    >
                        {submitText}
                    </button>
                </form>
            );
        }
        let statusText = null;
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
        return (
            <div className="protected">
                <div className="container">
                    <h1 className="text-center margin-bottom-medium">Domains</h1>
                    {this.props.isFetching === true ?
                        <p className="text-center">Loading data...</p>
                        :
                        <div className="row">
                            <div className="col-lg-4">
                                {statusText}
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>
                                                <a className="btn btn-sm btn-default btn-dashboard-header icon-add"
                                                   onClick={() =>{this.props.actions.toggleDomainForm(this.props.addDomain)}}>
                                                    <i className="fa fa-plus"> Add Domain</i>
                                                </a>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>{newDomainForm}</td></tr>
                                        {
                                            this.props.domains.map((domain) => {
                                                return (
                                                    <tr key={domain.domain}>
                                                        <td>{domain.domain}</td>
                                                        <td>{domain.status === true ?
                                                            <i className="fa fa-check" aria-hidden="true"/>
                                                            : <i className="fa fa-repeat" aria-hidden="true"/>}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-lg-4"/>
                            <div className="col-lg-4"/>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        domains: state.domain.domains,
        isFetching: state.domain.isFetching,
        isAdding: state.domain.isAdding,
        isAdded: state.domain.isAdded,
        isFailure: state.domain.isFailure,
        statusText: state.domain.statusText,
        addDomain: state.domain.addDomain,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DomainView);
export { DomainView as DomainViewNotConnected };
