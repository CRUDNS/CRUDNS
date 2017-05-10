import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/dnsRecordRow';
import { DNSRecordRow } from '../../containers';

class DNSRecord extends React.Component {
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
        console.log(this.props);
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
                    <div className="col-lg-7">
                        <DNSRecordRow token={this.props.token} domain={this.props.params.domain}
                                      actions={this.props.actions} dnsRecord={r} isEditable
                        />
                    </div>
                </div>
            );
        }
        return (
            <div>
                {this.props.fetched === false ?
                    <p className="text-center">Loading data...</p>
                    :
                    <div>

                        { this.props.records.reverse().map((rec) => {
                            return (
                                <div className="row" key={rec.id}>
                                    <div className="col-lg-7">
                                        <DNSRecordRow token={this.props.token} domain={this.props.params.domain}
                                                      actions={this.props.actions} dnsRecord={rec} isEditable={false}
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
                } className="btn-success"
                > New Record
                </button>
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
