import React from 'react';

class OneClickRow extends React.Component {

    add() {
        console.log(this.props);
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
                    <button className="btn btn-default" onClick={this.add.bind(this)}>Add</button>
                </div>
                <div/>
            </div>
        );
    }
}

export default OneClickRow ;
