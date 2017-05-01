import React from 'react';

const ttl = (properties) => {
    return (
        <select value={properties.selected} onChange={properties.onChange} className="form-control" name="ttl">
            <option value="60">1 Minute</option>
            <option value="600">10 Minutes</option>
            <option value="3600">1 Hour</option>
            <option value="7200">2 Hours</option>
            <option value="14400">4 Hours</option>
            <option value="28800">8 Hours</option>
            <option value="43200">12 Hours</option>
            <option value="86400">1 Day</option>
            <option value="172800">2 Days</option>
            <option value="259200">3 Days</option>
        </select>
    );
};

export default ttl;
