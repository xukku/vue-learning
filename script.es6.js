
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js';
import 'https://unpkg.com/vuex';
import 'https://unpkg.com/vue-router/dist/vue-router.js';
import { ComponentNotice } from './component.notice.js';

Vue.use(Vuex);
Vue.use(VueRouter);

const store = new Vuex.Store({
	strict: true, // Не используйте строгий режим в production!
  state: {
  	message: 'Привет, Vue!',
    count: 0,
    todos: [
		{ id: 0, text: 'Изучить JavaScript', done: false, },
		{ id: 1, text: 'Изучить Vue', done: false, },
		{ id: 2, text: 'Создать еще один JS фреймворк', done: true, }
	]
  },
  mutations: {
    increment(state) {
      state.count++
    },
    add(state, n) {
      state.count += n;
    },
    addObj(state, obj) {
      state.count += obj.amount;
    },
    addTodo(state, todo) {
    	state.todos.push(todo);
    },
    updateMessage(state, message) {
    	state.message = message;
    }
  },
  getters: {
  	doneTodos(state) {
      return state.todos.filter(todo => todo.done);
    },
    doneTodosCount(state, getters) {
		return getters.doneTodos.length;
	},
	getTodoById(state) {
		return (id) => {
			return state.todos.find(todo => todo.id === id);
		}
	}
  },
  actions: {
    incrementAsync(context) {
    	setTimeout(() => {
    		context.commit('increment');
    		context.commit('increment');
    		context.commit('increment');
    		context.commit('add', 1);
    		console.log(context.state.count);
    	});
    },
    async actionA ({ commit }) {
	    commit('gotData', await getData())
	  },
	  async actionB ({ dispatch, commit }) {
	    await dispatch('actionA') // дожидаемся завершения действия `actionA`
	    commit('gotOtherData', await getOtherData())
	  }
  }
});

Vue.component('anchored-heading', {
  render(createElement) {
    return createElement(
      'h' + this.level,   // имя тега
      this.$slots.default // массив дочерних элементов
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
});

Vue.directive('focus', {
	// Когда привязанный элемент вставлен в DOM...
	inserted(el) {
		// Переключаем фокус на элемент
		console.log(el);
		el.focus()
	},
	bind(el, binding, vnode) {
	    console.log('focus directive bind', {
	      'name'       : (binding.name),
	      'value'      : (binding.value),
	      'expression' : (binding.expression),
	      'argument'   : (binding.arg),
	      'modifiers: '  : (binding.modifiers),
	      'vnode keys: ' : Object.keys(vnode).join(', ')
	  });
	}
});

var MyPlugin = {
	install(Vue, options) {

		Vue.mixin({
			created() {
				var myOption = this.message;
				if (myOption) {
					console.log('наверное можно использовать для отладки', myOption);
				}
			}
		});

		Vue.directive('focus', {
			// Когда привязанный элемент вставлен в DOM...
			inserted(el) {
				// Переключаем фокус на элемент
				console.log(el);
				el.focus()
			},
			bind(el, binding, vnode) {
			    console.log('focus directive bind', {
			      'name'       : (binding.name),
			      'value'      : (binding.value),
			      'expression' : (binding.expression),
			      'argument'   : (binding.arg),
			      'modifiers: '  : (binding.modifiers),
			      'vnode keys: ' : Object.keys(vnode).join(', ')
			  });
			}
		});

		Vue.directive('color-switch', function (el, binding) {
			el.style.backgroundColor = binding.value
		});

		Vue.filter('capitalize', function (value) {
		  if (!value) return ''
		  value = value.toString()
		  return value.charAt(0).toUpperCase() + value.slice(1)
		});

		Vue.filter('uppercase', function (value, arg1) {
			console.log('uppercase filter', arg1);
		  if (!value) return ''
		  value = value.toString()
		  return value.toUpperCase()
		});
	}
};

Vue.use(MyPlugin);

Vue.component(
	'lazy-header',
	() => import('./component.lazy-header.js')
)

var LocalComponentMikrofrontend = {
	props: [
		'n',
	],
	data() {
		return {

		};
	},
	methods: {
		alert(msg) {
			alert(msg);
		},
		warn(message, event) {
		    if (event) {
		    	event.preventDefault();
		    	message += ' ' + event.target.textContent;
		    }
		    alert(message);
		}
	},
	template: `
		<div>
			<b @click="alert(n)">Повторяющееся</b>
			<button type="submit" @click="warn(n, $event)">сообщение</button> <u>{{ n }}</u><br>
		</div>
	`
};

Vue.component('custom-input', {
	props: [
		'value',
		'placeholder',
	],
	created() {
	    setTimeout(() => {
	    	this.$emit('input', 'привет от Скайнет');
	    }, 10000);
	},
	template: `
		<input
		  :placeholder="placeholder"
	      :value="value"
	      @input="$emit('input', $event.target.value)"
	    >
	`
});

Vue.component('app-nav', {
	template: `
		<div>
			<slot :message="message">
				<b>{{ message | uppercase }}</b>
			</slot>
		</div>
	`,
	computed: {
	  message: {
	    get() {
	      return this.$store.state.message;
	    },
	    set(value) {
	      this.$store.commit('updateMessage', value);
	    }
	  }
	},
	data: () => {
		return {
			classList: null,
		};
	},
	//!!! Не используйте стрелочные функции в свойствах экземпляра и в коллбэках, например created: () => console.log(this.a) или vm.$watch('a', newVal => this.myMethod())
	created() {
	    setTimeout(() => {
	    	this.message = 'Видоизменённый заголовок...';
	    }, 4000);
	}/*,
	mounted() {
	},
	updated() {
	},
	destroyed() {
	}*/
});

Vue.component('app-sidebar', {
	template: `
		<span :title="message">
		    Наведи на меня курсор на пару секунд,
		    чтобы увидеть динамически связанное значение title!
		</span>
	`,
	data: () => {
		return {
			message: 'Вы загрузили эту страницу: ' + new Date().toLocaleString()
		};
	},
	created() {
	    setTimeout(() => {
	    	this.message = 'Видоизменённый title: ' + Math.ceil(Math.random() * 10 + 90);
	    }, 2000);
	}
});

Vue.component('todo-item', {
	// Компонент  принимает входной параметр.
	props: [
	  	'todo',
	  	'prefix',
	  	'idx',
	],
	inject: ['getMap'],
	inheritAttrs: false,
	template: `
		<li :id="'js-todo-item-' + todo.id">
			{{ prefix }} [{{ idx }}]
			<ul id="v-for-object" class="demo" v-bind="$attrs">
				<li v-for="(value, name, index) in todo">
			    	<i>{{ index + 1}}.</i> {{ getTitle(name) }}: {{ value }}
			    	<button @click="$emit('event-for-parent-component', index, name)">[+]</button>
				</li>
			</ul>
		</li>
	`,
	methods: {
		getTitle(code) {
			console.log('test inject', this.getMap());

			switch (code) {
				case 'id':
					return 'Идентификатор';
				case 'text':
					return 'Название';
				default:
					return '';
			}
		},
		test1(event) {
			console.log(event.target);
		}
	}
});

Vue.component('app-content', {
	template: `
		<div>
			<header>
				<slot name="header">
					<h3>Total + 1: {{ todos.length + 1 }}</h3>
				</slot>
			</header>
			<main>
				<slot>
					<ol @click="processTodos">
						<todo-item
							required
							enabled
							selected
							v-for="(item, index) in todos"
							:todo="item"
							:key="item.id"
							class="selected removed"
							:prefix="prefix"
							:idx="index"
							@event-for-parent-component="testEventForParentComponent1"
						></todo-item>
					</ol>
				</slot>
			</main>
			<footer>
				<slot name="footer">
					<h4>{{ todos.length > 3 ? 'todos.length > 3' : 'todos.length <= 3' }}</h4>
				</slot>
			</footer>
		</div>
	`,
	provide() {
		return {
			getMap: this.getMap
		}
	},
	data: () => {
		return {
			prefix: ' ----> ',
			todos: [
				{ id: 0, text: 'Изучить JavaScript' },
				{ id: 1, text: 'Изучить Vue' },
				{ id: 2, text: 'Создать еще один JS фреймворк' }
			]
		};
	},
	created() {
	    setTimeout(() => {
	    	store.commit('increment');
	    	this.todos.push({id: 3, text: 'Profit.'});
	    	console.log('store: ', store.state.count);
	    }, 1500);
	},
	methods: {
		getMap() {
			return {
				'this-is': 'map'
			};
		},
		processTodos(event) {
			console.log('processTodos', event);
			this.todos.sort((v) => Math.random() > 0.5);
			this.increment();
			this.increment();
			this.increment();
			console.log('increment = 3', this.$store.state.count);
			this.$store.dispatch('incrementAsync');
			this.incrementAsync();
		},
		testEventForParentComponent1(index, name) {
			console.log(['testEventForParentComponent1', index, name]);
		},
		...Vuex.mapMutations([
	      'increment',
	    ]),
	    ...Vuex.mapActions([
	    	'incrementAsync'
	    ])
	},
});

Vue.component('app-view', {
	components: {
		'component-notice': ComponentNotice,
	},
	template: `
		<div>
			<slot>
				<b>Значение по умолчанию</b>
			</slot>
			<br>

			<transition name="fade">
				<component-notice
				 	v-if="seen"
					target="_blank"
					:this-is-message="message + ' '"
					:font-size="9"
					:data="['?', '?', '?']"
					:data2="{ colored: true }"
					class="bfg2000"
				></component-notice>
			</transition>

			<component-notice
				:this-is-message.sync="message"
				:data="['?', '?', '?']"
			></component-notice>

			<template v-if="seen" :[someAttr]="message" @[eventName]="onClick">
				<p>{{ message | capitalize }}</p>
	  			<p>Абзац 2</p>
		  		<p>Абзац 3</p>
			</template>
			<template v-else-if="Math.random() > 0.5">
				<big>Какой-то баг...</big>
			</template>
			<template v-else>
				<b>Содержимое</b> <i>скрыто</i>
			</template>
		</div>
	`,
	data: () => {
		return {
			seen: false,
			someAttr: null,
			eventName: 'click',
			message: 'Сейчас меня видно',
		};
	},
	created() {
	    setTimeout(() => {
	    	this.seen = true;
	    }, 2500);
	},
	computed: {
		// геттер вычисляемого значения
		reversedMessage() {
			// `this` указывает на экземпляр vm
			return this.message.split('').reverse().join('');
		}
	},
	methods: {
		onClick(event) {
			this.reverseMessage();
			this.eventName = null;
			this.someAttr = 'title';
			console.log(event);
		},
		reverseMessage() {
			this.message = this.reversedMessage;
		}
	}
});

const Foo = {
	props: [
		'x',
	],
	template: `
		<lazy-header>
			{{ x }} Route1 {{ x }}
		</lazy-header>
	`
}
const Bar = {
	props: [
		'x',
	],
	template: `
		<lazy-header>
			{{ x }} Route2 {{ x }}
		</lazy-header>
	`
}
const User = { template: `
		<lazy-header>
			<h1>Это раздел пользователя [ {{ $route.params.id }} ]</h1>
			<router-view></router-view>
		</lazy-header>
	`,

	beforeRouteUpdate(to, from, next) {
	    // обрабатываем изменение параметров маршрута...
	    console.log(to, from);
	    // не забываем вызвать next()
	    next();
	}
}

const UserProfile = {
	props: [
		'query',
	],
	template: `
		<lazy-header>
			Это профиль пользователя [ {{ query }} ]
		</lazy-header>
	`
}

const UserPost = {
	props: [
		'id',
		'post_id',
	],
	template: `
	<lazy-header>
		Это сообщение [ {{ post_id }} ] пользователя [ {{ id }} ]
	</lazy-header>
` }

const Page404NotFound = { template: `
	<lazy-header>
		<h1>404 Not found</h1>
		<p>{{ $route.params }}</p>
		<p>{{ $route.query }}</p>
		<p>{{ $route.hash }}</p>
	</lazy-header>
` }

const UserHome = { template: `
	<pre>H O M E  P A G E</pre>
` }

const LoginPage = { template: `
	<pre><i>LOGIN PAGE</i></pre>
` }


const router = new VueRouter({
	mode: 'history', // "нормальные" урл - приложение должно быть расположено в корне сайта
	routes: [
	  {
	  	path: '/foo/:x',
	  	components: {
	  		default: Foo,
	  		a: Bar,
	  	},
	  	props: {
	  		default: true,
	  		a: true
	  	},
	  	alias: '/bbb',
	  },
	{
		path: '/bar/:x',
		component: Bar,
		props: {
		  	x: 'Проверка',
		}
	},
	  { path: '/aaa', redirect: '/bar' },
	  { path: '/login', component: LoginPage },
	  {
	  	path: '/test-is-login',
	  	meta: { requiresAuth: true }
	  },
      { path: '/user/:id', component: User,
      	 children: [
	        {
	          path: 'profile',
	          component: UserProfile,
	          props: (route) => ({ query: route.query.q })
	        },
	        {
	        	name: 'user_post',
	          path: 'post/:post_id',
	          component: UserPost,
				props: true
	        },
	        {
	        	path: '',
	        	component: UserHome
	        }
	      ]
  		},
      //{ path: '/user/:username/post/:post_id', component: UserPost },

      {
      	// example /#/sadsadsdasd?test=1#sss

		  // сопоставляется со всем
		  path: '*', component: Page404NotFound
		}
	]
})

const auth = {
	loggedIn() {
		return false;
	}
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // этот путь требует авторизации, проверяем залогинен ли
    // пользователь, и если нет, перенаправляем на страницу логина
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // всегда так или иначе нужно вызвать next()!
  }
})

var app = new Vue({
	router,
	el: '#app',
	template: '#app-template',
	data: {
	},
	store,
	created() {
		this.$router.push('/user/tester');
		setTimeout(() => {
			this.$router.push('/user/tester/post/100');
		}, 2000);
		setTimeout(() => {
			this.$router.push({
				name: 'user_post',
				params: {
					id: 'tester5',
					post_id: 1000,
				}
			});
		}, 4000);
		setTimeout(() => {
			router.go(-1);
		}, 5000);
	},
	computed: {
		classList() {
			return {
				selected: true,
				removed: true
			};
		},
		 doneTodosCount () {
		    return this.$store.getters.doneTodosCount
		  },
		countLocal() {
			return this.$store.state.count;
		},
		username() {
	      // Мы скоро разберём что такое `params`
	      return this.$route.params.username
	    },
		...Vuex.mapState([
		    'count',
		])
	},
	methods: {
		goBack() {
     		window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
	    }
	}
});

var app5 = new Vue({
	el: '#app5',
	template: '#app5-template',
	data: {
		message: 'Привет, Vue.js!',
		isActive: false,
		classSelected: 'selected',
		classRemoved: 'removed',
		showForm: false,
		checked: false,
	},
	components: {
		'component-mikrofrontend': LocalComponentMikrofrontend,
	},
	created() {
	    setTimeout(() => {
	    	this.showForm = true;
	    }, 1500);
	},
	computed: {
		// геттер вычисляемого значения
		reversedMessage() {
			// `this` указывает на экземпляр vm
			return this.message.split('').reverse().join('');
		},
		classList() {
			return {
				active: this.isActive,
				'text-danger': this.hasError()
			}
		},
	},
	methods: {
		reverseMessage() {
			this.message = this.reversedMessage;
		},
		hasError() {
			var res = (Math.random() * 50);
			console.log(res);
			return res > 25;
		},
		onClick1(event) {
			console.log(event);
			this.reverseMessage();
			this.isActive = !this.isActive;
		},
		alert(msg) {
			alert(msg);
		},
		warn(message, event) {
		    if (event) {
		    	event.preventDefault();
		    	message += ' ' + event.target.textContent;
		    }
		    alert(message);
		}
	}
});

var app6 = new Vue({
	el: '#app6',
	template: '#app6-template',
	data: {
		message: 'Привет, Vue!',
		isInputDisabled: false,
		firstName: '',
		lastName: '',
		activeColor: 'green',
		fontSize: 18,
		fontWeight: 'normal',
		loginType: 'username',
		userName: 'test5',

		sets: [
			[ 1, 2, 3, 4, 5 ],
			[6, 7, 8, 9, 10]
		],
		numbers: [ 1, 2, 3, 4, 5 ],
	},
	watch: {
	    // эта функция запускается при любом изменении вопроса
	    message(newValue, oldValue) {
			console.log('ajax search: ', newValue, oldValue);
	    },
	    userName(newValue, oldValue) {
	    	console.log(newValue + ' -> ' + oldValue);
	    },
	},
	computed: {
		fullName: {
			get() {
				return this.firstName + ' ' + this.lastName;
			},
			set(newValue) {
				var names = newValue.split(' ');
				this.firstName = names[0];
				this.lastName = names[names.length - 1];
			}
		},
		styleList() {
			return {
				'font-size': '12px',
				'color': 'orange',
				'text-decoration': 'underline',
			};
		},
		evenNumbers() {
			return this.numbers.filter((n) => n % 2 === 0);
		},
	},
	methods: {
		onClick(event) {
			this.fullName = this.message;
			this.activeColor = 'brown';
			this.fontSize = 24;
			this.fontWeight = 'bold';
			this.loginType = this.loginType == 'username'? '' : 'username';
			console.log(event);
		},
		even(numbers) {
			return numbers.filter((n) => n % 2 === 0);
		},
	}
});

setTimeout(() => {
	app6.message = '<i><b>12345</b></i>';
	app6.isInputDisabled = true;
}, 1000);

// dynamic component

Vue.component("tab-home", {
	data() {
		return {
			userName: 'user name 1',
		};
	},
	template: `
		<div>
			<label>Имя пользователя</label>
		  	<custom-input v-focus v-color-switch="'yellow'" v-model="userName" :placeholder="'Введите имя пользователя'" key="username-input"></custom-input>
		</div>
	`
});

Vue.component("tab-posts", {
	template: `
		<div>
			<label>Email</label>
			<input placeholder="Введите адрес email" key="email-input">
		</div>
	`
});

Vue.component("tab-archive", {
	template: `
		<div>
			<anchored-heading :level="1">PHP</anchored-heading>
			<anchored-heading :level="2">HTML</anchored-heading>
			<anchored-heading :level="3">MYSQL</anchored-heading>
		</div>
	`
});

new Vue({
	el: "#dynamic-component-demo",
	template: '#dynamic-component-demo-template',
	data: {
	  currentTab: "Home",
	  tabs: [
	  	"Home",
	  	"Posts",
	  	"Archive",
	  ]
	},
	computed: {
	  currentTabComponent() {
	    return 'tab-' + this.currentTab.toLowerCase();
	  }
	}
});

var myMixin = {
  created() {
    this.hello();
  },
  methods: {
    hello() {
      console.log('примеси - это наследование не как у всех');
    }
  }
};

console.log(12345);

var ComponentMixedHeader = Vue.extend({
  mixins: [myMixin],
  created() {
    console.log('вызван хук компонента');
  },
  methods: {
    hello() {
      console.log('все нормально!');

	  console.log('this.$store.getters.doneTodosCount: ', this.$store.getters.doneTodosCount);
    }
  },
  store
});
new ComponentMixedHeader();
