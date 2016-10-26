import React from 'react'
import Header from './header'
import DISH_STORE from '../store'
import ACTIONS from '../actions'
import {User} from '../models/models'

const Dashboard = React.createClass({

	getInitialState: function(){
		console.log(DISH_STORE.getData())
		return DISH_STORE.getData()
	},

	componentWillMount: function(){
		DISH_STORE.on('updateContent', () => {
			this.setState(DISH_STORE.getData())
		})
		ACTIONS.fetchDishes()
	},

	componentWillUnmount: function (){
		DISH_STORE.off('updateContent')
	},

	_handleTagSearch: function(evt){
		if(evt.keyCode === 13){
			ACTIONS.fetchDishes(evt.target.value)
		}
	},

	render: function() {
		let collData = this.state.collection
		let pageTitle = "Dishes"
		if(location.hash === "#dish/myDishes"){
			pageTitle = "My Dishes"
			collData = this.state.collection.where({authorId: User.getCurrentUser()._id})
		}

	 	return (
	 		<div className='dashboard' >
	 			<Header />
	 			<input onKeyDown={this._handleTagSearch} type="text" name="search" placeholder="search by tags" />
	 			<h3>{pageTitle}</h3>
	 			<DishContainer dishColl={collData}/>
	 		</div>
	 	)
 	}
})

const DishContainer = React.createClass({
	render: function() {
		return (
			<div className="dishContainer">
				{this.props.dishColl.map((dish) => <Dish dishModel={dish} key={dish.id}/>)}
			</div>
			)
	}
})

const Dish = React.createClass({

	_handleLikes: function(){
		ACTIONS.likeDish(this.props.dishModel,User.getCurrentUser())
	},

	_handleDelete: function(){
		ACTIONS.deleteDish(this.props.dishModel.id)
	},

	render: function() {
		console.log(this.props.dishModel.id)
		let rating = ""
		for(let i = 0; i < this.props.dishModel.get('rating'); i++){
			rating += String.fromCharCode(9733)
		}
		return (
			<div className="dish">
				<img src={this.props.dishModel.get('imageUrl')}/>
				<p>{this.props.dishModel.get('title')}</p>
				<p>{this.props.dishModel.get('description')}</p>
				<p>{this.props.dishModel.get('tags')}</p>
				<button onClick={this._handleLikes}>Like</button>
				<button onClick={this._handleDelete}>Delete</button>
				<p> Likes: {this.props.dishModel.get('likes').length}</p>
				<p> Rating: {rating}</p>
			</div>
			)
	}
})

export default Dashboard
