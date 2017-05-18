import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/dnsRecordRow';
import * as domainActionCreators from '../../actions/domain';

class DomainDashboard extends React.Component {
    static propTypes = {
        // isFailure: React.PropTypes.bool.isRequired,
        // statusText: React.PropTypes.string,
        fetched: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.shape({
            dataFetchDnsRecordData: React.PropTypes.func,
            toggleDnsRecordForm: React.PropTypes.func,
            updateDnsRecord: React.PropTypes.func,
            addDnsRecord: React.PropTypes.func,
        }),
        domainActions: React.PropTypes.shape({
            dataFetchDomainData: React.PropTypes.func,
            updateDomain: React.PropTypes.func,
        }),
        params: React.PropTypes.shape({
            domain: React.PropTypes.string.isRequired,
        }).isRequired,
        token: React.PropTypes.string.isRequired,
        records: React.PropTypes.arrayOf(React.PropTypes.shape({
            type: React.PropTypes.string.isRequired,
            host: React.PropTypes.string,
            zone: React.PropTypes.string,
            primary_ns: React.PropTypes.string,
            resp_person: React.PropTypes.string,
            data: React.PropTypes.string,
            service: React.PropTypes.string,
            protocol: React.PropTypes.string,
            mx_priority: React.PropTypes.number,
            serial: React.PropTypes.number,
            refresh: React.PropTypes.number,
            retry: React.PropTypes.number,
            expire: React.PropTypes.number,
            minimum: React.PropTypes.number,
            weight: React.PropTypes.number,
            port: React.PropTypes.number,
            target: React.PropTypes.string,
            ttl: React.PropTypes.number.isRequired,
            id: React.PropTypes.number,
            reverse: React.PropTypes.func,
        })).isRequired,
    };

    componentWillMount() {
        const token = this.props.token;
        this.props.actions.dataFetchDnsRecordData(token, this.props.params.domain);
        this.props.domainActions.dataFetchDomainData(token, this.props.params.domain);
    }

    render() {
        const c = [];
        let collaborate = null;
        let mydomain = null;
        if (this.props.domainFetch === false) {
            collaborate = (<ul className="list-unstyled">
                <li>Loading Data</li>
            </ul>);
        } else {
            this.props.domain.map((dom) => {
                if (dom.domain === this.props.params.domain) {
                    mydomain = dom;
                    dom.collaborator.map((col) => {
                        c.push(col.email);
                        return null;
                    });
                }
                return null;
            });
            collaborate = (<table className="table table-striped">
                <tbody>
                    {c.map((email) => {
                        return (
                            <tr key={email}><td>{email}</td></tr>
                        );
                    })}
                </tbody>
            </table>);
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <ol id="breadcrumb">
                            <li><a href="/">Home</a></li>
                            <li><a href="/dashboard/">Dashboard</a></li>
                            <li className="active">
                                <a href={`/dashboard/${this.props.params.domain}/`}>{this.props.params.domain}</a>
                            </li>

                        </ol>
                    </div>
                </div>
                <div className="row">
                    <h1 className="h2 text-center">{this.props.params.domain}</h1>
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
                                <h4><b>One Click Services</b></h4>
                                <p>Add all DNS records for a specific service at once.</p>
                                <div className="card-link">
                                    <a href={`/dashboard/${this.props.params.domain}/oneclick/`}>
                                        <h5><i className="fa fa-plus" aria-hidden="true"/> Manage Services</h5>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-container">
                                <h4><b>Collaborators</b></h4>
                                <p>Manage Collaborators to this Domain</p>
                                {collaborate}
                                {c.includes(this.props.username) ? '':
                                    <div className="card-link">
                                        <a href={`/dashboard/${this.props.params.domain}/oneclick/`}>
                                            <h5><i className="fa fa-plus" aria-hidden="true"/> Manage Collaborators</h5>
                                        </a>
                                    </div>
                                }
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
        domainFetch: state.domain.fetched,
        domain: state.domain.domains,
        userId: state.auth.userId,
        username: state.auth.userName,
        records: state.record.records,
        addRecord: state.record.addRecord
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actionCreators, dispatch),
        domainActions: bindActionCreators(domainActionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DomainDashboard);
export { DomainDashboard as DomainDashboardNotConnected };
