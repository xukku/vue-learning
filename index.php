<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");?>

<?php

use Bitrix\Main\UI\Extension;

Extension::load('ui.vue3');

?>

<?php if (0) { ?>

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

<?php } ?>


<div id="application2">-1</div>

<script type="text/x-template" id="app-template2">
	<div>
		Counter: {{ counter }}
	</div>
</script>

<script type="module">
	const BitrixVue = BX.Vue3.BitrixVue;

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
		template: '#app-template2'
	}).mount('#application2');

</script>

<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>