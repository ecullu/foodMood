import React from 'react'
import Header from './header'
import ACTIONS from '../actions'
import {User} from '../models/models'
import ReactFilepicker from 'react-filepicker'

const ComposeView = React.createClass({
	 render: function() {
	 	return (
	 		<div className="composeView" >
	 			<Header />
	 			<h3>post a dish!</h3>
	 			<DishPostingForm />
	 		</div>
	 	)
 	}
})

const DishPostingForm = React.createClass({
	getInitialState: function(){
		return {
			dishRating: 0
			}
	},

	_handleSubmit: function(e){
		console.log(e.currentTarget.rating)
		e.preventDefault()
		ACTIONS.saveDish({
			title: e.currentTarget.title.value,
			description: e.currentTarget.description.value,
			location: e.currentTarget.location.value,
			rating: this.state.dishRating,
			authorId: User.getCurrentUser()._id,
			authorEmail: User.getCurrentUser().email,
			imageUrl: this.url ? this.url: '/images/empty-plate.jpg',
			tags: e.currentTarget.tags.value.split(",")
		})
	},

	_handleImage: function(result){
		this.url = result.url
	},

	_handleRating: function (e){
		console.log(e.target.dataset.rating)
		this.state.dishRating = e.target.dataset.rating
	},

	_genStar: function (num){
		let output = ""
		for(let i = 0; i < num; i++){
			output += String.fromCharCode(9733)
		}
		return output
	},

	_starJsxArray: function (){
		console.log('hre comes jsx array star')
		let ratingArr = []
		let ratedStyle = {color: 'yellow'}
		let unratedStyle = {color: 'black'}
		// if(this.state.dishRating > 0){

		// }
		for( let i = 1; i <= this.state.dishRating; i++){
			ratingArr.push(<span style={ratedStyle} onClick={this._handleRating} key={i} data-rating={i} >&#9733;</span>)
		}
		for( let i = this.state.dishRating; i < 5 ; i++){
			console.log('looping for unrated stars')
			ratingArr.push(<span style={unratedStyle} onClick={this._handleRating} key={i+1} data-rating={i} >&#9733;</span>)
		}

		console.log('rating array', ratingArr)
		return ratingArr
	},
// {this._starJsxArray()}
	render: function() {
		return (
			<div className="dishPostingForm">
				<form onSubmit={this._handleSubmit}>
					<input type="text" name="title" placeholder="Enter the dish title"/>
					<input type="textarea" name="description" placeholder="Enter the description"/>
					<input type="text" name="location" placeholder="Enter the location"/>
					<span>Rate the dish</span>
					
					<select name="rating">
					  <option value="1">{this._genStar(1)}</option>
					  <option value="2">{this._genStar(2)}</option>
					  <option value="3">{this._genStar(3)}</option>
					  <option value="4">{this._genStar(4)}</option>
					  <option value="5" defaultValue>{this._genStar(5)}</option>
					</select>
					<ReactFilepicker apikey='AYHhYa3wkR260tKYdxQ3dz' onSuccess={this._handleImage}/>
					<input type="text" name="tags" placeholder="Enter tags separated by comma"/>
					<button type="submit">Submit</button>
				</form>

			</div>
			)
	}
})

export default ComposeView
