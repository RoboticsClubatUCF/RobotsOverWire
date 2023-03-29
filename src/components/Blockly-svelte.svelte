<script lang="ts">
	import Blockly from 'blockly';
	import { onMount } from 'svelte';
	import tools from './Blockly/tools.json';
	import { workspace } from './Blockly/workspace';

	onMount(() => {
		setTimeout(() => {
			workspace(document.getElementById('blocklyArea')!, document.getElementById('toolbox')!);
		}, 1000);
	});
</script>

<div id="blocklyArea">
	<div class="toolbox">
		<category name="Actions" colour="#000000" />
		<sep />
		<category name="Setup" colour="#745ba5" />
	</div>
	<div class="workspaceBlocks">
		<block type="starter" id="Y:r`ZG1SkSf?Qv6ntEs#" x="138" y="63">
			<next>
				<block type="move_block">
					<field name="Second to Move">0</field>
					<field name="Forwards?">TRUE</field>
					<next>
						<block type="turn_block">
							<field name="Degrees">0</field>
						</block>
					</next>
				</block>
			</next>
		</block>
	</div>
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
