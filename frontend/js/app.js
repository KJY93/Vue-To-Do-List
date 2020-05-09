/* global Vue, todoStorage */

(function (exports) {

	'use strict';

	var filters = {
		active: function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			});
		},
		completed: function (todos) {
			return todos.filter(function (todo) {
				return todo.completed;
			});
		}
	};

	exports.app = new Vue({

		// the root element that will be compiled
		el: '.todoapp',

		data() {
			return {
				todos: [],
				newTodo: '',
				editedTodo: null,
				visibility: 'all',
				filteredTodos: [],
				remainingActive: [],
			}
		},

		mounted: function () {
			this.all();
		},

		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: {
			remaining: function () {
				return filters.active(this.remainingActive).length;
			},
			allDone: {	
				get: function () {
					return this.remaining === 0;
				},
				set: function (value) {
					this.todos.forEach(function (todo) {
						todo.completed = value;
					});
				}
			}
		},

		methods: {
			// When showAll Link is clicked on
			showAll: function() {
				this.all();
			},

			// When showActive link is clicked on
			showActive: async function () {
				let response = await fetch(`http://localhost:8000/api/todos/`);
				let data = await response.json();
				let filteredActiveArray = [];

				data.forEach(element => {
					if (element.completed == false) {
							filteredActiveArray.push(element)
						}
					}
				);
				this.filteredTodos = filteredActiveArray;
				this.todos = filteredActiveArray;
			},

			// When showCompleted link is clicked on
			showCompleted: async function () {
				let response = await fetch(`http://localhost:8000/api/todos/`);
				let data = await response.json();
				let filteredCompletedArray = [];

				data.forEach(element => {
					if (element.completed == true) {
							filteredCompletedArray.push(element)
						}
					}
				);
				this.filteredTodos = filteredCompletedArray;
				this.todos = filteredCompletedArray;
			},

			// READ to-do-list items from Database (READ)
			all: async function () {
				let response = await fetch(`http://localhost:8000/api/todos/`);
				let data = await response.json();

				// update both this.filteredTodos and this.todos
				console.log(data);
				this.filteredTodos = data;
				this.todos = data;

				// declare an empty array called filteredTodosArray
				let filteredTodosArray = []
				
				this.filteredTodos.forEach(element => {
					if (element.completed == false) {
						filteredTodosArray.push(element)
						}
					}
				);

				this.remainingActive = filteredTodosArray
			},
			// End READ

			pluralize: function (word, count) {
				return word + (count === 1 ? '' : 's');
			},

			addTodo: function () {
				var value = this.newTodo && this.newTodo.trim();
				if (!value) {
					return;
				}

				// ADD Data to Database (CREATE)
				fetch('http://localhost:8000/api/todos/', {
					method: 'POST',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					// serialize JSON
					body: JSON.stringify({
						title: value,
						completed: false
					})
				}).then(res => {
					this.newTodo = '',
					this.all(),
					console.log(res)
				})
				// End CREATE 
			},

			// DELETE to-do-list items from Database (DELETE)
			removeTodo: async function (todo) {				
				const response = await fetch(`http://localhost:8000/api/todos/${todo.id}`, {
					method: 'DELETE', 
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
				});
				console.log(response);
				this.all();
			},
			// End Delete

			editTodo: function (todo) {
				this.beforeEditCache = todo.title;
				this.editedTodo = todo;
			},

			// UPDATE to-do-list-items in Database
			doneEdit: function (todo) {

				if (!this.editedTodo) {
					return;
				}
				this.editedTodo = null;

				if (!todo.title) {
					this.removeTodo(todo);
				}

				this.updateEdit(todo);
			},

			updateEdit: async function (todo) {				
				const response = await fetch(`http://localhost:8000/api/todos/${todo.id}/`, {
					method: 'PUT', 
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					// serialize JSON
					body: JSON.stringify({
						title: todo.title,
						completed: false
					})
				});
				this.editedTodo = null;
				this.all();
				console.log(response);
			},
			// End Update

			// Update Task Status
			handleChange: async function (todo) {	
				const response = await fetch(`http://localhost:8000/api/todos/${todo.id}/`, { 
					method: 'PUT', 
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					// serialize JSON
					body: JSON.stringify({
						title: todo.title,
						completed: todo.completed
					})
				});

				this.all();
				console.log(response);
				console.log(todo)
			},
		

			cancelEdit: function (todo) {
				this.editedTodo = null;
				todo.title = this.beforeEditCache;
			},

			removeCompleted: function () {
				this.todos = filters.active(this.remainingActive);
			}


		},

		// a custom directive to wait for the DOM to be updated
		// before focusing on the input field.
		// http://vuejs.org/guide/custom-directive.html
		directives: {
			'todo-focus': function (el, binding) {
				if (binding.value) {
					el.focus();
				}
			}
		}
	});

})(window);
