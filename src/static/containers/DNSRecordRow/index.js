import React from 'react';
import { Type, TTL } from '../../components';


class DNSRecordRow extends React.Component {
    static propTypes = {
        isEditable: React.PropTypes.bool.isRequired,
        dnsRecord: React.PropTypes.shape({
            type: React.PropTypes.string.isRequired,
            host: React.PropTypes.string,
            value: React.PropTypes.string,
            service: React.PropTypes.string,
            protocol: React.PropTypes.string,
            priority: React.PropTypes.number,
            weight: React.PropTypes.number,
            port: React.PropTypes.number,
            target: React.PropTypes.string,
            ttl: React.PropTypes.string.isRequired,
        }).isRequired,
        token: React.PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);

        this.state = {
            token: this.props.token,
            isEditable: this.props.isEditable,
            initialState: this.props.dnsRecord,
            dnsRecord: this.props.dnsRecord
        };
        this.changeIt = this.changeIt.bind(this);
        this.submitIt = this.submitIt.bind(this);
    }
    submitIt(e) {
        console.log(this.state.dnsRecord);
        e.preventDefault();
    }
    changeIt(e) {
        const changed = {};
        changed[e.target.name] = e.target.value;
        if (this.state.isEditable) {
            this.setState({
                dnsRecord: { ...this.state.dnsRecord,
                    ...changed
                }
            });
        }
    }
    render() {
        const type = (<Type selected={this.state.dnsRecord.type} onChange={this.changeIt}/>);
        let host = null;
        let value = null;
        const ttl = (<TTL selected={this.state.dnsRecord.ttl} onChange={this.changeIt}/>);
        const action = this.state.isEditable ? (
            <div className="form-group">
                <button type="submit" className="btn btn-success"><i className="fa fa-check"/></button>
                <button type="submit" className="btn btn-danger"> <i className="fa fa-times"/></button>
            </div>) : '';
        switch (this.state.dnsRecord.type) {
            case 'A' || 'Alias':
                host = (<input className="form-control pull-left stretch" value={this.state.dnsRecord.host}
                               name="host"
                              placeholder="Host" onChange={this.changeIt}
                />);
                value = (<input className="form-control pull-left stretch" value={this.state.dnsRecord.value}
                                name="value"
                               placeholder="IP Address" onChange={this.changeIt}
                />);
                break;
            case 'CNAME':
                host = (<input className="form-control pull-left stretch" value={this.state.dnsRecord.host}
                               name="host"
                              placeholder="Host" onChange={this.changeIt}
                />);
                value = (<input className="form-control pull-left stretch" value={this.state.dnsRecord.value}
                                name="value"
                               placeholder="Target" onChange={this.changeIt}
                />);
                break;
            case 'AAAA':
                host = (<input className="form-control pull-left stretch" value={this.state.dnsRecord.host}
                               name="host"
                              placeholder="Host" onChange={this.changeIt}
                />);
                value = (<input className="form-control pull-left stretch" value={this.state.dnsRecord.value}
                                name="value"
                               placeholder="IPV6 Address" onChange={this.changeIt}
                />);
                break;
            case 'NS':
                host = (<input className="form-control pull-left stretch" value={this.state.dnsRecord.host}
                               name="host"
                              placeholder="Host" onChange={this.changeIt}
                />);
                value = (<input className="form-control stretch" value={this.state.dnsRecord.value}
                                name="value"
                               placeholder="Nameserver" onChange={this.changeIt}
                />);
                break;
            case 'SRV':
                host = (<input className="form-control stretch" value={this.state.dnsRecord.host}
                               name="host"
                              placeholder="Host" onChange={this.changeIt}
                />);
                value = (<div className="row">
                    <div className="col-xs-2">
                        <input className="form-control pull-left stretch" value={this.state.dnsRecord.service}
                           name="service"
                           placeholder="Service" onChange={this.changeIt}
                        />
                    </div>
                    <div className="col-xs-2">
                        <input className="form-control pull-left stretch" value={this.state.dnsRecord.protocol}
                           name="protocol"
                           placeholder="Protocol" onChange={this.changeIt}
                        />
                    </div>
                    <div className="col-xs-2">
                        <input className="form-control pull-left stretch" value={this.state.dnsRecord.priority}
                           name="priority"
                           placeholder="Priority" onChange={this.changeIt}
                        />
                    </div>
                    <div className="col-xs-2">
                        <input className="form-control pull-left stretch" value={this.state.dnsRecord.weight}
                           name="weight"
                           placeholder="Weight" onChange={this.changeIt}
                        />
                    </div>
                    <div className="col-xs-2">
                        <input className="form-control pull-left stretch" value={this.state.dnsRecord.port}
                           name="port"
                           placeholder="Port" onChange={this.changeIt}
                        />
                    </div>
                    <div className="col-xs-2">
                        <input className="form-control pull-left stretch" value={this.state.dnsRecord.target}
                           name="target"
                           placeholder="Target" onChange={this.changeIt}
                        /></div>
                </div>);
                break;
            case 'TXT':
                host = (<input className="form-control stretch" value={this.state.dnsRecord.host}
                               name="host"
                              placeholder="Host" onChange={this.changeIt}
                />);
                value = (<input className="form-control stretch" value={this.state.dnsRecord.value}
                                name="value"
                               placeholder="Value" onChange={this.changeIt}
                />);
                break;
            case 'MX':
                host = (<input className="form-control stretch" value={this.state.dnsRecord.host}
                               name="host"
                              placeholder="Host" onChange={this.changeIt}
                />);
                value = (<section>
                    <input className="form-control stretch" value={this.state.dnsRecord.value}
                           name="value"
                           placeholder="Mail Server" onChange={this.changeIt}
                    />
                    <input className="form-control stretch" value={this.state.dnsRecord.priority}
                           name="priority"
                           placeholder="Priority" onChange={this.changeIt}
                    />
                </section>);
                break;
            default:
                host = (<input className="form-control stretch" value={this.state.dnsRecord.host}
                               name="host"
                              placeholder="Host"
                />);
                value = (<input className="form-control stretch" value={this.state.dnsRecord.value}
                                name="value"
                               placeholder="Value"
                />);
                break;
        }
        return (
            <form onSubmit={this.submitIt} className="form-inline ">
                <div className="form-group">{type}</div>
                <div className="form-group">{host}</div>
                <div className="form-group">{value}</div>
                <div className="form-group">{ttl}</div>
                <div className="form-group">{action}</div>
            </form>


        );
    }
}
export default DNSRecordRow;
