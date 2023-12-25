<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");?>

<script type="importmap">
{
	"imports": {
		"ui.vue3": "/bitrix/js/ui/vue3/vue/prod/src/vue.js"
	}
}
</script>

<?php

use Bitrix\Main\UI\Extension;

Extension::load('ui.vue3');

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap
//		"ui.vue3": "/bitrix/js/ui/vue3/vue/prod/dist/vue.bundle.min.js"
?>

<h3>App1</h3>

<div id="application1">-1</div>

<script type="text/x-template" id="app-template1">
	<div>
		Counter: {{ counter }}
	</div>
	<p>
		<ButtonCounter/> | <ButtonCounter2/>
	</p>
</script>

<script type="module">

	//const BitrixVue = BX.Vue3.BitrixVue;
	const {
		BitrixVue,
		ref,
		//h,
		//reactive
	} = BX.Vue3;

	const ButtonCounter = {
		data()
		{
			return {
				count: 0
			}
		},
		// language=Vue
		template: '<button @click="count++">—чЄтчик кликов Ч {{ count }}</button>'
	};

	const ButtonCounter2 = BitrixVue.mutableComponent('ui-button-counter', {
		data()
		{
			return {
				count: 0
			}
		},
		// language=Vue
		template: '<button @click="count++">—чЄтчик кликов Ч {{ count }}</button>'
	});

	//console.log(h, ref, reactive);

	BitrixVue.createApp({
		components: {
			ButtonCounter,
			ButtonCounter2,
		},

		// new
		setup() {
			const counter = ref(0)

			const increment = () => counter.value++

			setInterval(increment, 1000)

			return {
				counter
			}
		},

		// old
		/*
		data()
		{
			return {
				counter: 0
			}
		},
		mounted()
		{
			setInterval(() => {
				this.counter++
			}, 1000)
		},
		*/

		template: '#app-template1'

	}).mount('#application1');

</script>

<hr>

<h3>App2</h3>
<div id="application"></div>

<script type="module">
import {BitrixVue} from 'ui.vue3';
BitrixVue.createApp({
	data()
	{
		return {
			counter: 0
		}
	},
	mounted()
	{
		setInterval(() => {
			this.counter++
		}, 1000)
	},
	// language=Vue
	template: `
		Counter: {{ counter }}
	`
}).mount('#application');
</script>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>