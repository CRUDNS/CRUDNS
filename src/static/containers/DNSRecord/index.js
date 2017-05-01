import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/domain';
import { DNSRecordRow } from '../../containers';

class DNSRecord extends React.Component {
    render() {
        const record = {
            type: 'CNAME',
            host: '@a',
            value: '1.1.1.1',
            ttl: '600'
        };
        return (
            <div className="row">
                <div className="col-lg-10">
                    <DNSRecordRow token="sds" dnsRecord={record} isEditable/>
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

export default connect(mapStateToProps, mapDispatchToProps)(DNSRecord);
export { DNSRecord as DNSRecordNotConnected };
