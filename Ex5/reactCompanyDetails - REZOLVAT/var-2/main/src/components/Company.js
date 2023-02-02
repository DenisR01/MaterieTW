import React, { Component } from 'react'

class Company extends Component {
  render() {
    let { item } = this.props;

    return (
      <div>
        <p>Name {item.name} with {item.employees} employees {item.revenue} revenue</p>
        <button id='select' name='select' value='select' onClick={() => this.props.onSelect(item)}>select</button>
      </div>
    )
  }
}

export default Company
