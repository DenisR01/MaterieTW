import React, { Component } from 'react'

class Product extends Component {

    render() {
        return <div style={{ display: 'flex' }}>
            <p>{this.props.name} - {this.props.price}</p >
            <button value="buy" onClick={() => this.props.onBuy(this.props.price)}>buy</button>
        </div >
    }
}

export default Product

