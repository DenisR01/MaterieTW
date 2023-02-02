import React, { Component } from 'react'

class CompanyDetails extends Component {

    render() {
        const { item } = this.props;

        return (<div>
            <h2>Select mode</h2>
            <p>Name {item.name} with {item.employees} employees {item.revenue} revenue</p>
            <button name='cancel' id='cancel' value='cancel' onClick={this.props.onCancel}>cancel</button>
        </div>)
    }

}

export default CompanyDetails
