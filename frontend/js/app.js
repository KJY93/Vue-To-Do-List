/* global Vue, todoStorage */

(function (exports) {

	'use strict';

	var filters = {
		active: function (todos) {
			return todos.filter(function (todo) {
				return !todo.completed;
			});
		},
		// this function was never used in the script
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

			}
		},

		mounted: function () {
			this.all();
		},

		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: {
			remaining: function () {
				return filters.active(this.todos).length;
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

			// READ to-do-list items from Database (READ)
			all: async function () {
				let response = await fetch(`http://localhost:8000/api/todos/`);
				let data = await response.json();

				// update both this.filteredTodos and this.todos
				console.log(data);
				this.filteredTodos = data;
				this.todos = data;
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
						id: todo.id,
						completed: false
					})
				});
				this.editedTodo = null;
				this.all();
				console.log(response);
			},
			// End Update

			cancelEdit: function (todo) {
				this.editedTodo = null;
				todo.title = this.beforeEditCache;
			},

			removeCompleted: function () {
				this.todos = filters.active(this.todos);
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
