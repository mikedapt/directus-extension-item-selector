import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'item-selector',
	name: 'Item Selector',
	icon: 'arrow_drop_down_circle',
	description: 'Select The Collection and Column to return the Items from the Collection.',
	component: InterfaceComponent,
	options: [
		{
			field: 'collect_select',
			type: 'string',
			name: 'Select Collection',
			meta: {
				interface: 'system-collection',
				width: 'half',
				options: {
					includeSystem: true,
					includeSingleton: false,
				},
				note: "Pick your Collection Here"
			},
		},
		
		{
			field: 'column_select',
			type: 'string',
			name: 'Select Column',
			meta: {
				interface: 'system-display-template',
				width: 'half',
				options: {
					collectionField: 'collect_select',
					placeholder: '{{ field }}',
				},
				note: "Pick your Column Here"
			},
		},
		
		{
			field: 'starts_with',
			type: 'string',
			name: 'Starts With',
			meta: {
				interface: 'input',
				width: 'full',
				options: {
					placeholder: 'example_',
				},
				note: "Filter collections based on prefix string. Keep blank for listing all collections."
			},
		},
	],
	types: ['string'],
});
