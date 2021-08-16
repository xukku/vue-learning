
export default {
	template: `
		<header>
			<slot>
				<hr>
				<center>[[[ Lazy header ]]]</center>
				<hr>
			</slot>
		</header>
	`,
	created() {
		setTimeout(() => {
			this.$store.commit('addTodo', {id: 3, text: 'Profit.', done: true});
			console.log(this.$store.getters.getTodoById(1));
			this.$store.commit('add', 10);
			console.log('TODOS: ', this.$store.state.todos.length);
		}, 1000);

		setTimeout(() => {
			this.$store.commit('addTodo', {id: 3, text: 'Profit.', done: true});
			this.$store.commit('addObj', { amount: 11 });
			console.log('TODOS: ', this.$store.state.todos.length);
		}, 2000);

		setTimeout(() => {
			this.$store.commit('addTodo', {id: 3, text: 'Profit.', done: true});
			console.log(this.$store.getters.getTodoById(1));
			this.$store.commit({
			  type: 'addObj',
			  amount: 200
			});
			console.log('TODOS: ', this.$store.state.todos.length);
		}, 3000);
	}
};