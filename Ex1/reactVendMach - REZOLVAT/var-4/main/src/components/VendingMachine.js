import React, { Component } from 'react'
import Product from './Product'
import ProductStore from '../stores/ProductStore'


class VendingMachine extends Component {
    constructor() {
        super()
        this.state = {
            products: new ProductStore().getAll(),
            tokens: 0
        }

        this.addToken = () => {
            this.setState((state) => {
                return { tokens: state.tokens + 1 };
            });
        }

        this.buyProduct = (price) => {
            if (price > this.state.tokens) return;

            this.setState((state) => {
                return { tokens: state.tokens - price };
            });
        }
    }


    render() {
        return (
            <div>
                {this.state.products.map((el, index) => <Product key={index} name={el.name} price={el.price} onBuy={this.buyProduct} />)}
                <div>Tokens: {this.state.tokens}</div>
                <input type="button" value="add token" onClick={this.addToken} />
            </div>
        )
    }
}

export default VendingMachine