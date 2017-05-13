import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/dnsRecordRow';
import { DNSRecordRow } from '../../containers';

class DNSRecord extends React.Component {
    static propTypes = {
        // isFailure: React.PropTypes.bool.isRequired,
        // statusText: React.PropTypes.string,
        fetched: React.PropTypes.bool.isRequired,
        actions: React.PropTypes.shape({
            dataFetchDnsRecordData: React.PropTypes.func,
            toggleDnsRecordForm: React.PropTypes.func,
        }),
        addRecord: React.PropTypes.bool.isRequired,
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
    }

    render() {
        const r = {
            type: 'CNAME',
            host: '',
            data: '',
            ttl: 3600
        };
        let newRecordForm = '';
        if (this.props.addRecord) {
            newRecordForm = (
                <div className="row">
                    <div className="col-lg-10">
                        <DNSRecordRow token={this.props.token} domain={this.props.params.domain}
                                      actions={this.props.actions} dnsRecord={r} isEditable
                        />
                    </div>
                </div>
            );
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <ol className="breadcrumb-arrow">
                            <li><a href="/">Home</a></li>
                            <li><a href="/dashboard/">Dashboard</a></li>
                            <li>
                                <a href={`/dashboard/${this.props.params.domain}/`}>{this.props.params.domain}</a>
                            </li>
                            <li className="active">
                                <a href="">Manage DNS Records</a>
                            </li>
                        </ol>
                    </div>
                </div>
                <div>
                    <div className="row"><h3>Manage DNS Records of {this.props.params.domain}</h3></div>
                    {this.props.fetched === false ?
                        <p className="text-center">Loading data...</p>
                        :
                        <div>

                            { this.props.records.reverse().map((rec) => {
                                return (
                                    <div className="row" key={rec.id}>
                                        <div className="col-lg-10">
                                            <DNSRecordRow token={this.props.token} domain={this.props.params.domain}
                                                          actions={this.props.actions} dnsRecord={rec}
                                                          isEditable={false}
                                            />
                                        </div>
                                    </div>

                                );
                            })
                            }
                            {newRecordForm}


                        </div>
                    }
                    <button onClick={() => {
                        this.props.actions.toggleDnsRecordForm(this.props.addRecord);
                    }
                    } className="btn btn-success"
                    > New Record
                    </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(DNSRecord);
export { DNSRecord as DNSRecordNotConnected };
