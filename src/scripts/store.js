import Backbone from 'backbone'
import _ from 'underscore'
import {DishCollection, User} from './models/models'

const DISH_STORE = _.extend(Backbone.Events, {
	data: {
		collection: new DishCollection()
	},

	emitChange: function(){
		this.trigger('updateContent')
	},

	getData: function(){
		return _.clone(this.data)
	},

	initialize: function (){
		this.data.collection.on('sync update', this.emitChange.bind(this))
	}
})
DISH_STORE.initialize()
export default DISH_STORE


