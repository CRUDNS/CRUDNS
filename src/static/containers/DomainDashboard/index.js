import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/dnsRecordRow';

class DomainDashboard extends React.Component {
    static propTypes = {
        isFailure: React.PropTypes.bool.isRequired,
        statusText: React.PropTypes.string,
        fetched: React.PropTypes.bool.isRequired,
    };

    componentWillMount() {
        const token = this.props.token;
        this.props.actions.dataFetchDnsRecordData(token, this.props.params.domain);
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-container">
                                <h4><b>DNS Records</b></h4>
                                <p>Below are the last 5 DNS records Created</p>
                                {this.props.fetched === false ?
                                    <p className="text-center">Loading data...</p>
                                    :
                                    <div>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th><b>Type</b></th>
                                                    <th><b>Name</b></th>
                                                    <th><b>Content</b></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.records.reverse().slice(0, 5).map((rec) => {
                                                    return (
                                                        <tr key={rec.host + rec.data}>
                                                            <td>{rec.type}</td>
                                                            <td>{rec.host}</td>
                                                            <td>{rec.data}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                }
                                <div className="card-link">
                                    <a href={`/dashboard/${this.props.params.domain}/records/`}>
                                        <h5><i className="fa fa-plus" aria-hidden="true"/> Manage Records</h5>
                                    </a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-6">
                        <div className="card">
                            <div className="card-container">
                                <h4><b>John Doe</b></h4>
                                <p>Architect & Engineer</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fetched: state.record.fetched,
        isFailure: state.record.isFailure,
        statusText: state.record.statusText,
        userId: state.auth.userId,
        records: state.record.records,
        addRecord: state.record.addRecord
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DomainDashboard);
export { DomainDashboard as DomainDashboardNotConnected };
