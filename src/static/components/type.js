import React from 'react';

const type = (properties) => {
    return (
        <select value={properties.selected} onChange={properties.onChange} className="form-control" name="type">
            <option value="A">A Record</option>
            <option value="Alias">Alias Record</option>
            <option value="AAAA">AAAA Record</option>
            <option value="CNAME">CNAME Record</option>
            <option value="NS">NS Record</option>
            <option value="SRV">SRV Record</option>
            <option value="MX">MX Record</option>
            <option value="TXT">TXT Record</option>
            {/* <option value="SPF">SPF Record</option>*/}
            {/* <option value="HINFO">HINFO Record</option>*/}
        </select>
    );
};

export default type;
