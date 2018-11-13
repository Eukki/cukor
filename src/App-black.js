import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import MenuPage from './components/MenuPage/MenuPage-black';
import Checkout from './components/Checkout/Checkout-black';
// import ProductsArray from '../src/products.json';

function formatDate(date) {
	var monthNames = [
		"01", "02", "03",
		"04", "05", "06", "07",
		"08", "09", "10",
		"11", "12"
	];

	var time = date.toLocaleTimeString();
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	return year + '-' + monthNames[monthIndex] + '-' + day + ' ' + time;
}

window.onbeforeunload = function() {
	localStorage.removeItem('cartBlack');
	return undefined;
};

class App extends Component {
  constructor(props){
		super(props);
		this.state = {
			allProducts: [],
			products: [],
			cart: [],
			totalItems: 0,
			totalAmount: 0,
			allCategory: [],
			category: '',
			cartBounce: false,
			quantity : 1,
			quickViewProduct: {},
			checkoutActive: false,
            isEmpty: true,
            currentPage: 1,
            streets: false,
            reset: false,
            confirm: false,
            darker: false, 
            isError: false,
            loadingCheckout: false
		};
		this.handleCategory = this.handleCategory.bind(this);
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.sumTotalItems = this.sumTotalItems.bind(this);
		this.sumTotalAmount = this.sumTotalAmount.bind(this);
		this.checkProduct = this.checkProduct.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
		this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
		this.toggle = this.toggle.bind(this);
		this.componentWillMount = this.componentWillMount.bind(this);
		this.events = this.events.bind(this);
		this.order = this.order.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.getStreets = this.getStreets.bind(this);
		this.cartItem = this.cartItem.bind(this);
		this.toggleConfirm = this.toggleConfirm.bind(this);

		this.events();
		this.getStreets();
	}
	// Fetch Initial Set of Products from external API
	getProducts(parentId){
		//For Localhost use the below url
	  // const url = "../src/products.json";

		// For Production use the below url
		const url="https://cukor-lviv.herokuapp.com/menu/black";
		var config = {
	    		headers: {
	    			"Access-Control-Allow-Origin": "*",
	    			"Access-Control-Allow-Credentials": "true",
	    			"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE"
	    		}
			};

 		if (parentId) {
			let products = [];
			for (var i = 0; i < this.state.allProducts.length; i++) {
				if (this.state.allProducts[i].parentGroup === parentId) {
					products.push(this.state.allProducts[i]);
				}
			}
			this.setState({
				products: products,
				currentPage: 1
			})
			this.events();
		} else {
			axios.get(url, config)
			 	.then(response => {
				    let category = [];
				    response.data.groups.map(item => {
				    	let object = {
				    		name: item.name,
				    		id: item.id
				    	}
				    	category.push(object);
				    })
				    this.setState({
				    	products : response.data.products,
						allProducts: response.data.products,
				    	allCategory: category
				    })
				    this.events();
				});
		}

		 	// for localhost
		// if (parentId) {
		// 	console.log(parentId)
	 //    	let products = [];
	 //    	for (var i = 0; i < ProductsArray.products.length; i++) {
	 //    		if (ProductsArray.products[i].parentGroup === parentId) {
	 //    			products.push(ProductsArray.products[i]);
	 //    		}
	 //    	}
	 //    	this.setState({
	 //    		products: products,
	 //    		currentPage: 1
	 //    	})
	 //    } else {
	 //       	this.setState({
		//         products : ProductsArray.products,
		//         allProducts: ProductsArray.products
		//     })
	 //    }
		this.cartItem();
	}

	cartItem() {
		let that = this;
		setTimeout(() => {

			let cartItem = document.getElementsByClassName('cart-item')[0];
			if (typeof cartItem === "undefined") {
					this.setState({
						isEmpty: true,
						cart: []
					})
				} else {
					this.setState({
						isEmpty: false
					})
			}
			if (localStorage.cartBlack) {
			 		this.setState({
			 			cart: JSON.parse(localStorage.cartBlack)
			 		})
		 		}
				this.sumTotalAmount();
			this.sumTotalItems();
		}, 50)
	}

	getStreets() {
		const url="https://cukor-lviv.herokuapp.com/streets";
		var config = {
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Credentials": "true",
					"Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE"
				}
		};

		if (!this.state.streets) {
			axios.get(url, config)
			 	.then(response => {
				    let streetsName = [];
				    response.data.map(item => {
				    	streetsName.push(item.name);
				    })
				    this.setState({
				    	streets: streetsName
				    });
				});
		}
	}

	handleClick(event) {
		let id = Number(event.target.id)
		if (id !== this.state.currentPage) {
			this.setState({
				quantity: 1
			})
		}
		this.setState({
			currentPage: id
		});
		this.events();
	}

	events() {
		let that = this;
		setTimeout(function(){
			let category = document.getElementsByClassName('dropdown-menu-item');
			let item = document.getElementsByClassName('menu-item');
			for (let i = 0; i < category.length; i++) {
				category[i].addEventListener('click', e => {
					setTimeout(function() {
						that.handleCategory(e);
						that.getProducts(e.target.id);
					}, 50);
				})
			}
			for (let i = 0; i < item.length; i++) {
				item[i].addEventListener('mouseenter', e => {
					if (e.target.childNodes[4])
					e.target.childNodes[4].classList = 'stepper-input';
				}, true)
				item[i].addEventListener('mouseleave', e => {
					if (e.target.childNodes[4])
					e.target.childNodes[4].classList = 'stepper-input hidden';
				})
			}
		}, 50);
	}

	order(name, tel, comment, isSelf, street, home, apartment) {
		let that = this;
		let time = new Date();
		let products = this.state.allProducts;
		let date = formatDate(time);
		try {
			var order = JSON.parse(localStorage.cartBlack);
		} catch(e) {
			console.log(e);
		}
		let orderList = [];
		let toReturn = {
				"organization": 0,
				"customer": {
					"name": name,
					"phone": tel
				},
				"order": {
					"phone": tel,
					"isSelfService": isSelf,
					"date": date,
					"address": {
						"city": "Львiв",
						"street": street,
						"home": home,
						"apartment": apartment,
						"comment": comment
					},
				"items": []
				}
			}

		this.setState({
			loadingCheckout: true,
			darker: true
		})

		for (let i = 0; i < order.length; i++) {
			let j = 0;
			var search = function(i, j) {
				if (order[i].id === products[j].id) {
					orderList.push(products[j])
				} else {
					search(i, j+1);
				}
			}
			search(i, j);
		}

		for (let i = 0; i < orderList.length; i++) {
			let orderObj = {
				"id": orderList[i].id,
				"name": orderList[i].name,
				"amount": order[i].quantity,
				"code": orderList[i].code
			}
			toReturn.order.items.push(orderObj);
		}
    	axios({
    		method: 'post',
    		url: 'https://cukor-lviv.herokuapp.com/order/black',
    		data: toReturn,
    		headers: { 
		        'Content-Type':  'application/json',
		        'Accept':        'application/json',
		        "Access-Control-Allow-Origin": "*"
		    }
    	})
			.then(function(response) {
				console.log(response);
				localStorage.setItem('cartBlack', []);
				
				that.setState({
					confirm: true,
					isEmpty: true,
					cart: [],
					loadingCheckout: false
				});

				that.sumTotalAmount();
				that.sumTotalItems();
			})
			.catch(function(error) {
				console.log(error);
				that.setState({
					isError: true,
					loadingCheckout: false
				})
			});
	}

	componentWillMount(){
    	this.getProducts();
	}

	// Filter by Category
	handleCategory(event){
		this.setState({category: event.target.value});
	}
	// Add to Cart
	handleAddToCart(selectedProducts){
		let cartItem = this.state.cart;
		let productID = selectedProducts.id;
		let productQty = selectedProducts.quantity;
		if (this.checkProduct(productID)){
			let index;
			cartItem.map((item, i) => {
				if (item.id === productID) index = i;
			});
			cartItem[index].quantity = Number(cartItem[index].quantity) + Number(productQty);
			this.setState({
				cart: cartItem
			})
		} else {
			cartItem.push(selectedProducts);
		}
		this.setState({
			cart : cartItem,
			cartBounce: true,
			isEmpty: false
		});
		
		this.events();
		localStorage.setItem('cartBlack', JSON.stringify(cartItem));

		setTimeout(function(){
			this.setState({
				cartBounce: false,
				quantity: 1
			});
    	}.bind(this), 1000);  
		
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
	}
	handleRemoveProduct(id, e){
		let cart = this.state.cart;
		cart.map((item, i) => {
			if (item.id === id) {
				cart.splice(i, 1);
			}
		})
		localStorage.setItem('cartBlack', JSON.stringify(cart));
		this.setState({
			cart: cart
		})
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
		e.preventDefault();

		if (!cart.length) {
			this.setState({
				isEmpty: true
			})
		}

	}
	checkProduct(productID){
		let cart = this.state.cart;
		let status = false;
		for (var i = 0; i < cart.length; i++) {
			if (cart[i].id === productID) status = true;
		}
		return status;
	}
	sumTotalItems(){
        let total = 0;
        let cart = this.state.cart;
		total = cart.length;
		this.setState({
			totalItems: total
		})
    }
	sumTotalAmount(){
        let total = 0;
        let cart;
        if (localStorage.cartBlack) {
        	cart = JSON.parse(localStorage.cartBlack);
		    cart.map(i => {
		    	total += i.price * parseInt(i.quantity);
		    })
        }
		this.setState({
			totalAmount: total
		})
    }

	//Reset Quantity
	updateQuantity(qty){
		this.setState({
			quantity: qty
		})
	}

	toggle(){
		if (this.state.checkoutActive === true) {
			this.setState({
				checkoutActive: false,
				reset: true
			});
			this.events();
			setTimeout(() => {
				this.setState({
					reset: false
				})
			}, 500)
		} else {
			this.setState({checkoutActive: true});
		}
	}

	toggleConfirm(){
		this.setState({
			confirm: false,
			isError: false,
			darker: false
		})
	}

  render() {
    let toReturn;
	if (this.state.checkoutActive === false) {
		toReturn =
			<div>
			  <MenuPage 
			     productsList={this.state.products}
			     searchTerm={this.state.term}
			     addToCart={this.handleAddToCart}
			     productQuantity={this.state.quantity}
			     updateQuantity={this.updateQuantity}
			     openModal={this.openModal}
				 isEmpty={this.state.isEmpty}
				 totalItems={this.state.totalItems}
				 totalAmount={this.state.totalAmount}
				 category={this.state.allCategory}
				 toggleCheckout={this.toggle}
				 currentPage={this.state.currentPage}
				 handleClick={this.handleClick}
				 resetCounter={this.state.reset}
				 handleRemoveProduct={this.handleRemoveProduct}
				 toRedPage={this.props.toRedPage}
			  />
			</div>
	} else {
		toReturn =
			<div>
				<Checkout
	    			totalAmount={this.state.totalAmount}
	    			toggleCheckout={this.toggle}
	    			componentWillMount={this.componentWillMount}
	    			events={this.events}
	    			order={this.order}
	    			streets={this.state.streets}
	    			updateQuantity={this.updateQuantity}
				 	handleRemoveProduct={this.handleRemoveProduct}
	     			confirm={this.state.confirm}
				 	darker={this.state.darker}
				 	isError={this.state.isError}
				 	isEmpty={this.state.isEmpty}
				 	toggleConfirm={this.toggleConfirm}
	     			loading={this.state.loadingCheckout}
	     		/>
			</div>
	}
    return (
    	toReturn
    );
	
  }
}


export default App;
