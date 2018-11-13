import React, { Component } from 'react';
import './MenuItem.css';
//import menuItem from'../../assets/menu-item-img.png';
import Counter from '../Counter/Counter';

class MenuItem extends Component {
    constructor(props){
		super(props);
        this.state = {
            selectedProduct: {},
            isAdded: false,
            reset: false
        }
    }
    componentWillUnmount() {
        this.isCancelled = true;
    }
    addToCart(image, name, price, id, quantity){
        this.setState({
            selectedProduct: {
                image: image,
                name: name,
                price: price,
                id: id,
                quantity: quantity
            }
        }, function(){
            this.props.addToCart(this.state.selectedProduct);
        })
        this.setState({
            isAdded: true,
            reset: true
        }, function(){
            setTimeout(() => {
                this.setState({
                    isAdded: false,
                    selectedProduct: {}
                });
            }, 3500);
            setTimeout(() => {
                this.setState({
                    reset: false
                })
            }, 50)
        });
    }
    render() {
        let image = this.props.image;
        let name = this.props.name;
        let price = this.props.price;
        let id = this.props.id;
        let description = this.props.description;
        let quantity = this.props.productQuantity;
        let reset = this.state.reset;
        if (this.props.resetCounter) reset = this.props.resetCounter;

        return (
            <div className="menu-item">
                <span className="menu-item-price">{price} <span>грн</span></span>
                <img alt={name} className="menu-item-image" src={image} />
                <h2 className="menu-item-title">{name}</h2>
                <p className="menu-item-description">{description}</p>
                <Counter productQuantity={quantity} updateQuantity={this.props.updateQuantity} reset={reset}/>
                <a className={!this.state.isAdded ? "button button-red menu-item-buy" : "button button-red menu-item-buy added"} onClick={this.addToCart.bind(this, image, name, price, id, quantity)} >{!this.state.isAdded ? "ДО КОШИКА" : "✔ ДОДАНО"}</a>
            </div>
        );
    }
}

export default MenuItem;