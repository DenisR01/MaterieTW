import React, { Component } from 'react'

class Company extends Component {

  render() {
    return <div>
      <p>{this.props.item.id} - {this.props.item.name} - {this.props.item.employees} - {this.props.item.revenue}</p>
      <button value="edit" onClick={() => this.props.onClickEvent(this.props.item)}>edit</button>
    </div>
  }

}
export default Company
