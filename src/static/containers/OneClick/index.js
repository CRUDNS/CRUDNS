import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../../actions/dnsRecordRow';
import { OneClickRow } from '../../containers';
import blogger from './images/blogger.png';
import tumbler from './images/tumbler.png';

class OneClick extends React.Component {
    static propTypes = {
        isFailure: React.PropTypes.bool.isRequired,
        statusText: React.PropTypes.string,
        fetched: React.PropTypes.bool.isRequired,
    };
    constructor(props) {
        super(props);
        const services = [
            {
                head: 'Blogger',
                tagline: 'Use Blogger for your blog',
                image: blogger,
                record: [{
                    type: 'CNAME',
                    host: 'www',
                    data: 'ghs.google.com.',
                    ttl: 3600,
                }]
            }

        ];
        this.states = {
            services
        };
    }


    render() {
        return (
            <div>
                <ul>
                    {this.states.services.map((service) => {
                        return (
                            <li key={service.head}>
                            <OneClickRow line={service} token={this.props.token} domain={this.props.params.domain}
                                      actions={this.props.actions}
                            />
                            </li>
                        );
                    })}
                </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(OneClick);
export { OneClick as OneClickNotConnected };
