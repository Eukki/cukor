import React, { Component } from 'react';
import './Checkout-black.css';
import Autosuggest from 'react-autosuggest';
import InputMask from 'react-input-mask';

function addClass(id) {
	let inputDiv = document.getElementById(id);
	inputDiv.classList.add('input-empty');
}

function removeClass() {
	let inputDiv = document.getElementsByClassName('input-empty');
	for (var i = 0; i < inputDiv.length; i++) {	
		inputDiv[i].classList.remove('input-empty');
	}
}

function removeValue() {
	let inputDiv = document.getElementsByClassName('client-input');
	for (var i = 0; i < inputDiv.length; i++) {
		console.log(inputDiv[i])
		inputDiv[i].value = '';
	}
}

function addError() {
	let div = document.createElement('div');
	let parentDiv = document.getElementsByClassName('client-head-black')[0];
	div.classList.add('error');
	div.innerHTML = 'Заповніть необхiднi поля';
	parentDiv.appendChild(div);
}

function removeError() {
	let div = document.getElementsByClassName('error');
	for (var i = 0; i < div.length; i++) {
		div[i].outerHTML = '';
	}
}

function getSuggestions(value, streets) {
	function toReturn() {
		return inputLength === 0 ? [] : streets.filter(street =>
		street.toLowerCase().slice(0, inputLength) === inputValue
		);	
	}
	const inputValue = value.trim().toLowerCase();
	const inputLength = inputValue.length;
	if (streets) {
		return toReturn();
	} else {
		return setTimeout(function() {
				toReturn();
			 }, 500);
	}
}

function getSuggestionValue(suggestion) {
	return suggestion;
}

function renderSuggestion(suggestion) {
	return (
		<span>{suggestion}</span>
	);
}

class Checkout extends Component {
    constructor(props){
		super(props);
		this.state = {
			radio: false,
			value: '',
			name: '',
			tel: '',
			home: '',
			comment: 0,
      		suggestions: []
		}
		this.toggle = this.toggle.bind(this);
		this.toPage = this.toPage.bind(this);
		this.radioChange = this.radioChange.bind(this);
		this.order = this.order.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.removeValue = this.removeValue.bind(this);
		this.removeProduct = this.removeProduct.bind(this);
    }

    removeValue() {
		this.setState({
			value: '',
			name: '',
			tel: '',
			home: ''
		})
    }

    order() {
    	if (!this.props.isEmpty) {
	    	window.scrollTo(0, 0);

	    	let name = this.state.name;
	    	let tel = this.state.tel.replace(/\D/g, "");
	    	let comment = this.state.comment;
	    	let isSelf = this.state.radio;
	    	let street = this.state.value;
	    	let home = this.state.home;
	    	let apartment = this.state.apartment;

	    	if (isSelf === true) {
	    		street = 0;
	    		home = 0;
	    		apartment = 0;
	    	}

			if (name.length !== 0 && tel.length === 12 && home.length !== 0 && street.length !== 0) {
				if (!this.props.isEmpty) {
		    		this.props.order(name, tel, comment, isSelf, street, home, apartment);
		    		this.toggle();
		    		this.removeValue();
		    		removeValue();
		    		removeClass();
				}
		    	removeError();
			} else {
				addError();

				if (name.length === 0) {
					addClass('name');
				}
				if (tel.length < 12) {
					addClass('tel');
				}
				if (street.length === 0) {
					addClass('street');
				}
				if (home.length === 0) {
					addClass('home');
				}
			}
    	}
    }

    toggle() {
		if (this.props.darker === true) {
			this.props.toggleConfirm();
		}
	}

	toPage() {
		this.props.updateQuantity(1);
		this.props.toggleCheckout();
		this.props.toggleConfirm();
	}

	radioChange() {
		if (this.state.radio === true) {
			this.setState({radio: false});
		} else {
			this.setState({radio: true});
		}
	}

	removeProduct(e) {
		this.props.handleRemoveProduct(e.target.textContent, e);
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		target.classList.remove('input-empty');

		this.setState({
		  [name]: value
		});
  	}

	onChange = (event, { newValue, method }) => {
		event.target.classList.remove('input-empty');
		this.setState({
			value: newValue
		});
	};
  
	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
	  		suggestions: getSuggestions(value, this.props.streets)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: []
		});
	};

    render() {
    	let that = this;
    	const suggestions = this.state.suggestions;
    	const value = this.state.value;
	    const inputProps = {
	    	placeholder: "Вулиця",
	    	id: "street",
	    	name: "street",
	    	value,
	    	onChange: this.onChange
	    };
    	let totalAmount = this.props.totalAmount;
    	let local;
    	if (localStorage.cartBlack) {
   			local = JSON.parse(localStorage.cartBlack);
			var cartItem = local.map(item => {
				return(
					<div className="_cart-item" key={item.id}>
						<div className="_dropdown-labels"><span>Кiлькiсть</span><span className="_label-price">Цiна</span></div>
			            <img alt={item.name} className="_cart-item-image" src={item.image} />
			            <h2 className="_cart-item-title">{item.name}</h2>
			            <span className="_cart-item-price-black">{item.price}</span>
			            <div className="_cart-item-quantity">{item.quantity}</div>
			            <div className="cart-item-close _cart-item-close" onClick={this.removeProduct}>{item.id}</div>
			        </div>
				)
			})
    	}
    	let confirmText;
		if (that.state.radio) {
			confirmText = <div className="confirm-text">Ти можеш отримати своє замовлення за адресою <span className='client-address'>м. Львів, вул. Крива Липа, 3</span></div>;
		} else {
			confirmText = <div className="confirm-text">Чекайте на дзвінок адміністратора</div>;
		}
		return(
    		<div>
    			<div className={this.props.darker ? 'darker' : 'hide'}></div>
				<div className="header-black">
					<a className="header-back-link" onClick={this.toPage}>← Продовжити покупки</a>
				</div>
				<div className="order-black">
					<h2 className="order-head-black">ОФОРМЛЕННЯ ЗАМОВЛЕННЯ</h2>
					<div className="order-block">
						<div className="order-block-head">Склад замовлення:</div>
						<a className="order-block-change-black">Редагувати замовлення</a>
						<div className="items">
							{cartItem}
						</div>
						<div className={this.props.isEmpty ? 'hide' : 'summ-black'}>Всього: <span>{totalAmount} грн</span></div>
					</div>
				</div>
				<div className="client">
					<div className="client-margin">
						<h2 className="client-head-black">ВАШІ ДАНІ</h2>
						<input type="text" id="name" name="name" className="client-input" onChange={this.handleInputChange} placeholder="Ім’я"></input><br></br>
						<InputMask type="tel" id="tel" value={this.state.tel} mask="+38(099)999-99-99" name="tel" className="client-input" onChange={this.handleInputChange} placeholder="Моб. телефон" /><br></br>
						<input type="text" id="comment" name="comment" className="client-input" onChange={this.handleInputChange} placeholder="Коментар (не обов’язково)"></input>
						
						<h2 className="client-deliver">ДОСТАВКА ТА ОПЛАТА</h2>
						
						<input type="radio" className="radio-input" onChange={this.radioChange} name="isSelf" id="self"></input>
						<label htmlFor="self" className="radio-label">Самовивіз</label><br></br>
						
						<input type="radio" name="isSelf" onChange={this.radioChange} className="radio-input" id="courier" defaultChecked></input>
						<label htmlFor="courier" className="radio-label">Кур’єром</label>
						
						<div className={this.state.radio ? 'hide' : 'display'}>
							<label htmlFor="text" className="client-name"><span className="client-address-black">Адреса доставки</span></label>
							<input type="text" id="text" className="client-input input-readonly" value="Місто: Львів" readOnly="readonly"></input><br></br>
							<Autosuggest 
							    suggestions={suggestions}
							    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
							    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
							    getSuggestionValue={getSuggestionValue}
							    renderSuggestion={renderSuggestion}
							    inputProps={inputProps} />

							<input type="text" id="home" name="home" className="client-input client-house" onChange={this.handleInputChange} placeholder="Дiм"></input>
							<input type="text" id="apartment" name="apartment" className="client-input client-house client-apartment" onChange={this.handleInputChange} placeholder="Квартира"></input>

						</div>
						<div className="client-payment">Спосіб оплати: готівкою</div>
						<div className="button button-black client-button" onClick={this.order}>ВІДПРАВИТИ</div>
					</div>
				</div>
				<div className={this.props.confirm ? 'confirm' : 'hide'}>
					<div className="confirm-head">Твоє замовлення офрмлено!</div>
					{confirmText}
					<div className="button button-black menu-item-buy confirm-button" onClick={this.toPage}>Назад до головної</div>
					<div className="cart-item-close confirm-close" onClick={this.toggle}></div>
				</div>
				<div className={this.props.isError ? 'confirm-error' : 'hide'}>
					<div className="confirm-head"><span className="client-address">Помилка створення замовлення</span></div>
					<div className="confirm-text">На сайті технічні проблеми. Для того, щоб здійснити замовлення - зателефонуйте за номером - +380 (98) 679 82 25, м. Львів, вул. Крива Липа, 3</div>
					<div className="button button-black menu-item-buy confirm-button" onClick={this.toPage}>Назад до головної</div>
					<div className="cart-item-close confirm-close-error" onClick={this.toggle}></div>
				</div>
				<div className={this.props.loading ? "loading-checkout" : "hide"}>
	    			<div className="loading-checkout-head">Очікуйте, замовлення обробляється</div>
	    			<div className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
	    		</div>
    		</div>
    	)
    }
}

export default Checkout;