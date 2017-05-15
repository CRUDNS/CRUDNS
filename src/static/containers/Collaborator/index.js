import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../../actions/domain';

class OneClick extends React.Component {
    static propTypes = {
        // isFailure: React.PropTypes.bool.isRequired,
        // statusText: React.PropTypes.string,
        fetching: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.shape({
            dataFetchDnsRecordData: React.PropTypes.func,
            toggleDnsRecordForm: React.PropTypes.func,
            updateDnsRecord: React.PropTypes.func,
            addDnsRecord: React.PropTypes.func,
        }),
        params: React.PropTypes.shape({
            domain: React.PropTypes.string.isRequired,
        }).isRequired,
        token: React.PropTypes.string.isRequired,
    };

    constructor(props) {
        super(props);
        this.deleteIt = this.deleteIt.bind(this);
    }

    deleteIt(id) {
        const domain = {...this.props.domain};
        let index = 0;
        for (let i = 0; i < domain.collaborator.length; i++) {
            if (id === domain.collaborator.id) {
                index = i;
            }
        }
        domain.collaborator.splice(index, 1);
        delete domain.user;
        this.props.actions.updateDomain(domain, this.props.token);
    }


    componentWillMount() {
        const token = this.props.token;
        this.props.actions.getDomain(token, this.props.params.id);
    }

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Type</th>
                        <th/>
                    </tr>
                    </thead>

                    {this.props.statusText === null ?
                        <tbody>
                        <tr>
                            <td>Loading Data</td>
                            <td/>
                            <td/>
                        </tr>
                        </tbody>
                        :
                        <tbody>
                        <tr>
                            <td>{this.props.user.first_name} {this.props.user.last_name}</td>
                            <td>{this.props.user.email}</td>
                            <td>Owner</td>
                            <td/>
                        </tr>
                        {console.log(this.props.statusText)}
                        {this.props.domain.collaborator.map((col) => {
                            return (
                                <tr key={col.id}>
                                    <td>{col.first_name} {col.last_name}</td>
                                    <td>{col.email}</td>
                                    <td>Collaborator</td>
                                    <td>
                                        <button onClick={() => {
                                            this.deleteIt(col.id);
                                        }}
                                                className="btn btn-danger">
                                            <i className="fa fa-trash"/></button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    }

                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fetching: state.domain.isFetching,
        isFailure: state.domain.isFailure,
        statusText: state.domain.statusText,
        userId: state.auth.user,
        records: state.record.records,
        addRecord: state.record.addRecord,
        domain: state.domain.domains,
        user: state.domain.domains.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneClick);
export {OneClick as OneClickNotConnected};
