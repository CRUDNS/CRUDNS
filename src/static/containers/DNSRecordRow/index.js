import React from 'react';
import { Type, TTL } from '../../components';


class DNSRecordRow extends React.Component {
    static propTypes = {
        isEditable: React.PropTypes.bool.isRequired,
        dnsRecord: React.PropTypes.shape({
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
        }).isRequired,
        token: React.PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            token: this.props.token,
            isEditable: this.props.isEditable,
            initialState: this.props.dnsRecord,
            dnsRecord: this.props.dnsRecord,
        };
        this.changeIt = this.changeIt.bind(this);
        this.submitIt = this.submitIt.bind(this);
    }

    submitIt(e) {
        e.preventDefault();
        if (this.state.dnsRecord.id != null) {
            this.props.actions.updateDnsRecord({
                ...this.state.dnsRecord,
                domain: this.props.domain,
                zone: this.props.domain,
            }, this.state.token);
        } else {
            this.props.actions.addDnsRecord({
                ...this.state.dnsRecord,
                domain: this.props.domain,
                zone: this.props.domain,
            }, this.state.token).then(
                () => {
                    const token = this.props.token;
                    this.props.actions.dataFetchDnsRecordData(token, this.props.domain);
                }
            );
        }
    }

    deleteIt(e) {
        console.log('delete');
        e.preventDefault();
    }

    changeIt(e) {
        const changed = {};
        if (!this.state.isEditable) {
            this.setState({
                isEditable: true
            });
        }
        changed[e.target.name] = e.target.value;
        if (this.state.isEditable) {
            this.setState({
                dnsRecord: {
                    ...this.state.dnsRecord,
                    ...changed
                }
            });
        }
    }

    render() {
        const type = (<Type selected={this.state.dnsRecord.type} onChange={this.changeIt}/>);
        let host = null;
        let data = null;
        const ttl = (<TTL selected={this.state.dnsRecord.ttl} onChange={this.changeIt}/>);
        const action = this.state.isEditable ? (
            <div className="form-group">
                <button type="submit" className="btn btn-success"><i className="fa fa-check"/></button>
                <button onClick={this.deleteIt} className="btn btn-danger"><i className="fa fa-times"/></button>
            </div>) : '';
        switch (this.state.dnsRecord.type) {
            case 'A' || 'Alias':
                host = (<input className="pull-left stretch" value={this.state.dnsRecord.host}
                               name="host"
                               placeholder="Host" onChange={this.changeIt}
                />);
                data = (<input className="pull-left stretch" value={this.state.dnsRecord.data}
                               name="data"
                               placeholder="IP Address" onChange={this.changeIt}
                />);
                break;
            case 'CNAME':
                host = (<input className="pull-left stretch" value={this.state.dnsRecord.host}
                               name="host"
                               placeholder="Host" onChange={this.changeIt}
                />);
                data = (<input className="pull-left stretch" value={this.state.dnsRecord.data}
                               name="data"
                               placeholder="Target" onChange={this.changeIt}
                />);
                break;
            case 'AAAA':
                host = (<input className="pull-left stretch" value={this.state.dnsRecord.host}
                               name="host"
                               placeholder="Host" onChange={this.changeIt}
                />);
                data = (<input className="pull-left stretch" value={this.state.dnsRecord.data}
                               name="data"
                               placeholder="IPV6 Address" onChange={this.changeIt}
                />);
                break;
            case 'NS':
                host = (<input className="pull-left stretch" value={this.state.dnsRecord.host}
                               name="host"
                               placeholder="Host" onChange={this.changeIt}
                />);
                data = (<input className="stretch" value={this.state.dnsRecord.data}
                               name="data"
                               placeholder="Nameserver" onChange={this.changeIt}
                />);
                break;
            case 'SRV':
                host = (<input className="stretch" value={this.state.dnsRecord.host}
                               name="host"
                               placeholder="Host" onChange={this.changeIt}
                />);
                data = (<div className="row">
                    <div >
                        <input className="pull-left stretch16" value={this.state.dnsRecord.service}
                               name="service"
                               placeholder="Service" onChange={this.changeIt}
                        />
                    </div>
                    <div >
                        <input className="pull-left stretch16" value={this.state.dnsRecord.protocol}
                               name="protocol"
                               placeholder="Protocol" onChange={this.changeIt}
                        />
                    </div>
                    <div >
                        <input className="pull-left stretch16" value={this.state.dnsRecord.mx_priority}
                               name="mx_priority"
                               placeholder="Priority" onChange={this.changeIt}
                        />
                    </div>
                    <div >
                        <input className="pull-left stretch16" value={this.state.dnsRecord.weight}
                               name="weight"
                               placeholder="Weight" onChange={this.changeIt}
                        />
                    </div>
                    <div >
                        <input className="pull-left stretch16" value={this.state.dnsRecord.port}
                               name="port"
                               placeholder="Port" onChange={this.changeIt}
                        />
                    </div>
                    <div >
                        <input className="pull-left stretch16" value={this.state.dnsRecord.target}
                               name="target"
                               placeholder="Target" onChange={this.changeIt}
                        /></div>
                </div>);
                break;
            case 'TXT':
                host = (<input className="stretch" value={this.state.dnsRecord.host}
                               name="host"
                               placeholder="Host" onChange={this.changeIt}
                />);
                data = (<input className="stretch" value={this.state.dnsRecord.data}
                               name="data"
                               placeholder="Value" onChange={this.changeIt}
                />);
                break;
            case 'MX':
                host = (<input className="stretch" value={this.state.dnsRecord.host}
                               name="host"
                               placeholder="Host" onChange={this.changeIt}
                />);
                data = (<section>
                    <input className="stretch50" value={this.state.dnsRecord.data}
                           name="data"
                           placeholder="Mail Server" onChange={this.changeIt}
                    />
                    <input className="stretch50" value={this.state.dnsRecord.mx_priority}
                           name="mx_priority"
                           placeholder="Priority" onChange={this.changeIt}
                    />
                </section>);
                break;
            default:
                host = (<input className="stretch" value={this.state.dnsRecord.host}
                               name="host"
                               placeholder="Host"
                />);
                data = (<input className="stretch" value={this.state.dnsRecord.data}
                               name="data"
                               placeholder="Value"
                />);
                break;
        }
        return (
            <form onSubmit={this.submitIt} className="form-inline">
                <div className="form-group stretch20 dns-row">{type}</div>
                <div className="form-group stretch15 dns-row">{host}</div>
                <div className="form-group stretch30 dns-row">{data}</div>
                <div className="form-group stretch10 dns-row">{ttl}</div>
                <div className="form-group stretch15 dns-row">{action}</div>
            </form>


        );
    }
}
export default DNSRecordRow;
