<script lang="ts">
	import Blockly from 'blockly';
	import { onMount } from 'svelte';
	import {move_block} from './Blockly/moveBlock'
	import tools from './Blockly/tools.json'

	onMount(() => {
		const blocklyDiv = document.getElementById('blocklyDiv')!;
		const toolboxDiv = document.getElementById('toolbox')!;
		Blockly.defineBlocksWithJsonArray(move_block)
		// @ts-ignore
		const workspace = Blockly.inject(blocklyDiv, {
			toolbox: tools,
			trashcan:true
		});
	});
</script>

<div id="blocklyArea">
	<div id="blocklyDiv" />
	<div id="toolbox" />
</div>

<style>
	#blocklyDiv {
		position: absolute;
		top: 80px;
		left: 0px;
		right: 0px;
		bottom: 0px;
	}
</style>
