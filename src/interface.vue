<template>
	<VSelect :model-value="value" :items="itemlist" @update:model-value="itemSelected" />
</template>

<script lang="ts">
import { defineComponent, computed, ref, toRefs, unref, watch } from "vue";
import { useStores, useCollection, useItems} from "@directus/extensions-sdk";
import type { Collection, Item } from "@directus/types";

export default defineComponent({
	props: {
		value: {
			type: String,
			default: null,
		},
		collection: {
			type: String,
			required: true,
		},
		field: {
			type: String,
			required: true,
		},
		collect_select: {
			type: String,
			default: null,
		},
		column_select: {
			type: String,
			default: null,
		},
		starts_with: {
			type: String,
			default: null,
		},
	},
	emits: ["input"],
	setup(props, { emit }) {
		const { useCollectionsStore } = useStores();
		const collectionsStore = useCollectionsStore();
		const collectionRef = ref(props.collect_select);
		
		const { useFieldsStore } = useStores();
		const fieldsStore = useFieldsStore();
		
		const allCollections = collectionsStore.databaseCollections;
		let finalCollections: Collection[] = allCollections;

		const displayField = props.column_select.replace('{{','').replace('}}','');
		
		const itemlist : any = ref([]);
		
		var filtval = null;
		
		if(props.starts_with){
			filtval = props.starts_with;
		}
		
		if(props.column_select) {
			
		    async function fetchItems(){
			
			    const query = { 
				fields: ref([displayField]),
				limit: ref(1000), 
				sort: ref(null), search: 
				ref(null), 
				filter: ref(filtval), 
				page: ref(1),}
				
			    const { getItemCount, itemCount, getItems, items } = useItems(collectionRef, query);
			
				await getItems();
				await getItemCount();
			
				const data = items.value;
				const count = itemCount.value;
				
				var loops = 0;
				
				data.forEach((itemdict) => {

					for (let key in itemdict) {
						 if (key.replace('"','') == "STATE_CODE") {
							let keyvalue = itemdict[key];
							itemlist.value.push({
				                text: keyvalue,
				                value: keyvalue,
			                });
					     }
					}

				    loops = loops + 1;
				});
				
				return data;

			}
			
			async function fetchResults() {
			
				const results = await fetchItems();
				const parse = JSON.stringify(results)

				return results;
			}
			fetchResults()
			
		}

		
		function itemSelected(item: string) {
			emit("input", item);
		}

		return {
		    itemlist,
			itemSelected,
		};
	},
});
</script>