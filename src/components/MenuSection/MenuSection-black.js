import React, {Component} from 'react';
import MenuItem from '../MenuItem/MenuItem-black';
import './MenuSection-black.css';
import LoadingProducts from '../loaders/Products';
import CartImage from "../../assets/cart-image.png";
// import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class MenuSection extends Component{
	constructor(props){
		super(props);
        this.state = {
            activeCart: false,
            activeMenu: false,
            todos: [],
            currentPage: 1,
          	todosPerPage: 6
     	};

     	this.toggleCart = this.toggleCart.bind(this);
     	this.toggleMenu = this.toggleMenu.bind(this);
     	this.toCheckout = this.toCheckout.bind(this);
     	this.pagClick = this.pagClick.bind(this);
     	this.removeProduct = this.removeProduct.bind(this);

     	document.addEventListener('click', e => {
			if (e.target.className === 'hamburger' || e.target.className === 'hamburger-box' || e.target.className === 'cart-indicator-black' || e.target.className === 'hamburger-inner' || e.target.className === 'cart-image' || e.target.className === 'cart-item' || e.target.className === 'cart-item-close' || e.target.className === 'button button-black menu-item-buy empty-button') {
				return;
			} else {
				this.setState({activeCart: false, activeMenu: false});
			}
		})
 	}
 	removeProduct(e) {
 		this.props.handleRemoveProduct(e.target.textContent, e);
 	}

 	pagClick(event) {
 		 this.props.handleClick(event);
    }
	toggleCart(){
		if (this.state.activeCart === true) {
			this.setState({activeCart: false});
		} else {
			this.setState({activeCart: true});
			this.setState({activeMenu: false});
		}
	}
	toggleMenu(){
		if (this.state.activeMenu === true) {
			this.setState({activeMenu: false});
		} else {
			this.setState({activeMenu: true});
			this.setState({activeCart: false});
		}
	}
	toCheckout(){
		this.props.toggleCheckout()
	}
  	render() {
  		let todos = this.props.productsList;
  		let currentPage = this.props.currentPage;
  		const { todosPerPage } = this.state;

        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
        	let className = '';
        	if (currentPage === number) {
        		className = 'pag-number pag-active';
        	} else {
        		className = 'pag-number';
        	}
          return (
            <div key={number} className={className} id={number} onClick={this.pagClick}>
              {number}
            </div>
          );
        });

        const renderTodos = currentTodos.map(product => {
        	let imageUrl;
        	if (typeof product.images[0] !== 'undefined') {
        		imageUrl = product.images[0].imageUrl;
        	}
		  	return(
				<MenuItem key={product.id} price={product.price} name={product.name} image={imageUrl} id={product.id} addToCart={this.props.addToCart} productQuantity={this.props.productQuantity} updateQuantity={this.props.updateQuantity} resetCounter={this.props.resetCounter}/>
			)
        });

  		let totalItems = this.props.totalItems;
  		let isEmpty = this.props.isEmpty;
		let	category = this.props.category.map((item, key) => {
				return(
					<div className="dropdown-menu-item" key={key} id={item.id}>{item.name}</div>
				)
			});
		if (localStorage.cartBlack) {
			let local = JSON.parse(localStorage.cartBlack);
			var cartItem = local.map(item => {
				return(
					<div className="cart-item" key={item.id}>
			            <img alt={item.name} className="cart-item-image" src={item.image} />
			            <h2 className="cart-item-title">{item.name}</h2>
			            <span className="cart-item-price-black">{item.price}</span>
			            <div className="cart-item-quantity-black">{item.quantity}</div>
			            <div className="cart-item-close" onClick={this.removeProduct}>{item.id}</div>
			        </div>
				)
			})
		}
		let view;
		if (renderTodos.length <= 0) {
            view = <LoadingProducts />
		} else {
			view = <div className="products-wrapper-main">{renderTodos}</div>
		}
		return(
			<section className="menu-section" id='menu'>
			<div className="menu-bar-black">
				<span className="menu-text">МЕНЮ</span>
				<button className="hamburger" type="button" onClick={this.toggleMenu}>
					<span className="hamburger-box">
						<span className="hamburger-inner"></span>
					</span>
				</button>
				<div className="cart">				
					<div className={this.state.activeMenu ? 'dropdown-menu' : 'hide'}>
						{category}
					</div>
					<div className={this.state.activeCart ? 'dropdown-cart' : 'dropdown-cart hide'}>
						<div className={!isEmpty ? 'dropdown-labels' : 'hide'}><span>Кiлькiсть</span><span className="label-price">Цiна</span></div>
						<div className="items">
							{cartItem}
							<div className={!isEmpty ? 'hide' : 'display'}>
								<div className="empty">Твоя корзина порожня</div>
								<a onClick={this.toggleCart} className="button button-black menu-item-buy empty-button">ВИБРАТИ ТОВАР</a>
							</div>
						</div>
						<div onClick={this.toCheckout} className={isEmpty ? 'hide' : 'button button-black menu-item-buy button-checkout'}>Оформити</div>
					</div>
					<img className="cart-image" onClick={this.toggleCart} src={CartImage} alt="" />
					<div className={isEmpty ? 'hide' : 'cart-indicator-black'} onClick={this.toggleCart}>{totalItems}</div>
				</div>	
			</div>
			<div className="pag">
				{renderPageNumbers}
		    </div>
				{view}
			</section>
		)
	}
}
export default MenuSection;