import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/domain';

class Collaborator extends React.Component {
    static propTypes = {
        actions: React.PropTypes.shape({
            dataFetchDnsRecordData: React.PropTypes.func,
            toggleDnsRecordForm: React.PropTypes.func,
            updateDnsRecord: React.PropTypes.func,
            addDnsRecord: React.PropTypes.func,
            updateDomain: React.PropTypes.func,
            getDomain: React.PropTypes.func,
        }),
        params: React.PropTypes.shape({
            domain: React.PropTypes.string.isRequired,
            id: React.PropTypes.string.isRequired,
        }).isRequired,
        token: React.PropTypes.string.isRequired,
        statusText: React.PropTypes.string,
        domain: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                domain: React.PropTypes.string.isRequired,
                id: React.PropTypes.number.isRequired,
                user: React.PropTypes.shape({
                    email: React.PropTypes.string.isRequired,
                    id: React.PropTypes.string.isRequired,
                    first_name: React.PropTypes.string,
                    last_name: React.PropTypes.string,
                }),
                collaborator: React.PropTypes.arrayOf(React.PropTypes.string)
            })
        )
    };

    constructor(props) {
        super(props);
        this.deleteIt = this.deleteIt.bind(this);
    }

    componentWillMount() {
        const token = this.props.token;
        this.props.actions.getDomain(token, this.props.params.id);
    }

    deleteIt(id) {
        const domain = { ...this.props.domain[0] };
        const cols = [];
        for (let i = 0; i < domain.collaborator.length; i += 1) {
            if (id !== domain.collaborator[i].id) {
                cols.push(domain.collaborator[i].id);
            }
        }
        delete domain.user;
        delete domain.collaborator;
        domain.collaborator = cols;
        this.props.actions.updateDomain(domain, this.props.token).then(() => {
            const token = this.props.token;
            this.props.actions.getDomain(token, this.props.params.id);
        });
    }


    render() {
        return (
            <div className="card">
                <div className="row">
                    <div className="col-md-10">
                        <h1 className="text-center">Collaborators</h1>
                        <table className="table table-striped center">
                            <thead>
                                <tr>
                                    <th><strong>Name</strong></th>
                                    <th><strong>Email</strong></th>
                                    <th><strong>Type</strong></th>
                                    <th/>
                                </tr>
                            </thead>

                            {this.props.statusText === null ?
                                <tbody>
                                    <tr>
                                        <td>Loading Data...</td>
                                        <td/>
                                        <td/>
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                    <tr>
                                        <td>{this.props.domain[0].user.first_name}
                                            {this.props.domain[0].user.last_name}</td>
                                        <td>{this.props.domain[0].user.email}</td>
                                        <td>Owner</td>
                                        <td/>
                                    </tr>
                                    {this.props.domain[0].collaborator.map((col) => {
                                        return (
                                            <tr key={col.id}>
                                                <td>{col.first_name} {col.last_name}</td>
                                                <td>{col.email}</td>
                                                <td>Collaborator</td>
                                                <td>
                                                    <button onClick={() => {
                                                        this.deleteIt(col.id);
                                                    }}
                                                        className="btn btn-danger"
                                                    >
                                                        <i className="fa fa-trash"/></button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            }

                        </table>
                    </div>
                </div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collaborator);
export { Collaborator as CollaboratorNotConnected };
