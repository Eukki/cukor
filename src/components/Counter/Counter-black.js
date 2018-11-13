import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Counter-black.css'

class Counter extends Component {
	constructor(props){
		super(props);
		this.state = { value: this.props.productQuantity };
		this.increment = this.increment.bind(this);
		this.decrement = this.decrement.bind(this);
		this.resetQuantity = this.resetQuantity.bind(this);
	}
	increment(e){
    	this.setState(prevState => ({
      		value: Number(prevState.value) + 1
    	}), function(){
				this.props.updateQuantity(this.state.value);
		});
		e.preventDefault();
  	};

	decrement(e){
		e.preventDefault();
		if (this.state.value <= 1){
			return this.state.value;
		}
		else {
			this.setState(prevState => ({
				value: Number(prevState.value) - 1
			}), function(){
				this.props.updateQuantity(this.state.value);
			});
		}
	};

	feed(e){
		this.setState({
			value: this.refs.feedQty.value
		}, function(){
			this.props.updateQuantity(this.state.value);
		})
	};
	componentWillReceiveProps(props) {
		if (props.reset) this.setState({
			value: 1
		})
	}
	resetQuantity(){
		this.setState({
			value: 1
		})
	}
	render() {
		let value = this.state.value;
		return (
			<div className="stepper-input hidden">
				<a href="" className="decrement" onClick={this.decrement}>–</a>
				<input ref="feedQty" type="number" readOnly className="quantity" value={value} onChange={this.feed.bind(this)}/>
				<a href="" className="increment" onClick={this.increment}>+</a>
			</div>
		)
	}
}

Counter.propTypes = {
  value: PropTypes.number
};

export default Counter;