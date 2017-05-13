import React from 'react';

class OneClickRow extends React.Component {
    static propTypes = {
        actions: React.PropTypes.shape({
            dataFetchDnsRecordData: React.PropTypes.func,
            toggleDnsRecordForm: React.PropTypes.func,
            addDnsRecord: React.PropTypes.func,
        }),
        line: React.PropTypes.shape({
            record: React.PropTypes.arrayOf(React.PropTypes.shape({
                type: React.PropTypes.string,
                host: React.PropTypes.string,
                data: React.PropTypes.string,
                ttl: React.PropTypes.number,
                length: React.PropTypes.number,
                map: React.PropTypes.func
            })),
            head: React.PropTypes.string,
            image: React.PropTypes.string,
            tagline: React.PropTypes.string,
        }),
        domain: React.PropTypes.string.isRequired,
        token: React.PropTypes.string.isRequired,
    };
    constructor(props) {
        super(props);
        this.add = this.add.bind(this);
    }
    add() {
        this.props.line.record.map((r) => {
            return (
            this.props.actions.addDnsRecord({
                ...r,
                domain: this.props.domain,
                zone: this.props.domain,
            }, this.props.token)
            );
        });
    }
    render() {
        return (
            <div className="row">
                <img alt={this.props.line.head} className="oneclick-image" src={this.props.line.image}/>
                <div className="oneclick-head">
                    <h2>{this.props.line.head}</h2>
                    <p>{this.props.line.tagline}</p>
                    <div>
                        <h4>Adds {this.props.line.record.length} Records</h4>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Name</th>
                                    <th>Content</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.line.record.map((rec) => {
                                    return (
                                        <tr key={rec.host}>
                                            <td>{rec.type}</td>
                                            <td>{rec.host}</td>
                                            <td>{rec.data}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                    </div>

                </div>
                <div className="oneclick-action">
                    <button className="btn btn-default" onClick={this.add}>Add</button>
                </div>
                <div/>
            </div>
        );
    }
}

export default OneClickRow ;
