<script lang="ts">
	import Blockly from 'blockly/core.js';
	import En from 'blockly/msg/en.js';
	import 'blockly/blocks.js';
	import 'blockly/javascript.js';
	import { robotControlGenerator } from './Blockly/RobotControl';
	var codeString = '';
	import BlocklyComponent, { type Locale, type Transform } from 'svelte-blockly';

	const en: Locale = {
		rtl: false,
		msg: {
			...En
		}
	};
	const locales: Record<string, Locale> = { en };
	const move_blockJson = {
		type: 'move_block',
		message0: 'Move %1 seconds, Forwards? %2',
		args0: [
			{
				type: 'field_number',
				name: 'Second to Move',
				value: 0,
				min: 0,
				max: 9.999,
				precision: 0.001
			},
			{
				type: 'field_checkbox',
				name: 'Forwards?',
				checked: true
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 230,
		tooltip: 'Set how many seconds the robot should move for',
		helpUrl: ''
	};
	const turn_blockJson = {
		type: 'turn_block',
		message0: 'Turn for %1 seconds, Clockwise? %2',
		args0: [
			{
				type: 'field_number',
				name: 'Seconds',
				seconds: 0,
				value: 0,
				min: 0,
				max: 9.999,
				precision: 0.001
			},
			{
				type: 'field_checkbox',
				name: 'Clockwise?',
				checked: true
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 345,
		tooltip: 'How many seconds the bot should turn for',
		helpUrl: ''
	};
	const loop_blockJson = {
		type: 'move_loop',
		message0: '%1 %2 %3 %4 %5',
		args0: [
			{
				type: 'field_label_serializable',
				name: 'title',
				text: 'Loop Commands'
			},
			{
				type: 'field_number',
				name: 'loop_count',
				value: 0,
				min: 0,
				max: 10,
				precision: 1
			},
			{
				type: 'field_label_serializable',
				name: 'title_2',
				text: 'Times'
			},
			{
				type: 'input_dummy'
			},
			{
				type: 'input_statement',
				name: 'loop_code'
			}
		],
		previousStatement: null,
		nextStatement: null,
		colour: 105,
		tooltip: '',
		helpUrl: ''
	};
	const start_blockJson = {
		type: 'starter',
		lastDummyAlign0: 'CENTRE',
		message0: 'Start Code',
		nextStatement: null,
		colour: 140,
		tooltip: 'Start point for the Robot code',
		helpUrl: ''
	};
	const end_blockJson = {
		type: 'end',
		lastDummyAlign0: 'CENTRE',
		message0: 'End Code',
		previousStatement: null,
		colour: 45,
		tooltip: 'End point for the Robot code',
		helpUrl: ''
	};
	Blockly.Blocks['move_block'] = {
		init: function () {
			this.jsonInit(move_blockJson);
			var thisBlock = this;
		}
	};
	Blockly.Blocks['turn_block'] = {
		init: function () {
			this.jsonInit(turn_blockJson);
			var thisBlock = this;
		}
	};
	Blockly.Blocks['move_loop'] = {
		init: function () {
			this.jsonInit(loop_blockJson);
			var thisBlock = this;
		}
	};
	Blockly.Blocks['start_block'] = {
		init: function () {
			this.jsonInit(start_blockJson);
		}
	};
	Blockly.Blocks['end_block'] = {
		init: function () {
			this.jsonInit(end_blockJson);
		}
	};
	const toolbox: Blockly.utils.toolbox.ToolboxDefinition = {
		kind: undefined,
		contents: [
			{
				...(undefined as unknown as Blockly.utils.toolbox.StaticCategoryInfo),
				kind: 'category',
				name: 'Movement',
				colour: 60,
				contents: [
					{ kind: 'block', type: 'move_block' },
					{ kind: 'block', type: 'turn_block' }
				]
			},
			{
				...(undefined as unknown as Blockly.utils.toolbox.StaticCategoryInfo),
				kind: 'category',
				name: 'Logic',
				colour: 300,
				contents: [
					{ kind: 'block', type: 'start_block' },
					{ kind: 'block', type: 'end_block' },
					{ kind: 'block', type: 'move_loop' }
				]
			}
		]
	};

	const config = {
		toolbox,
		move: {
			scrollbars: true,
			drag: true,
			wheel: false
		},
		zoom: {
			controls: false,
			wheel: true,
			maxScale: 1.5,
			minScale: 0.4,
			scaleSpeed: 1.02
		},
		grid: {
			spacing: 20,
			length: 3,
			colour: '#ccc',
			snap: true
		},
		trashcan: true
	};

	let locale = 'en';
	let transform: Transform;
	let workspace: Blockly.WorkspaceSvg;

	let saved: [string, Transform] | undefined = undefined;
	let code = '';

	function handleSave() {
		const xml = Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace));
		saved = [xml, transform];
		window.sessionStorage.setItem('ws', JSON.stringify(saved));
	}

	function handleRestore() {
		saved = JSON.parse(window.sessionStorage.getItem('ws')!);
		Blockly.Xml.clearWorkspaceAndLoadFromXml(Blockly.Xml.textToDom(saved![0]), workspace);
		transform = saved![1];
	}

	function onChange() {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const lang = (Blockly as any)['JavaScript'];
		try {
			code = lang.workspaceToCode(workspace);
		} catch (_err) {
			// Happens e.g. when deleting a function that is used somewhere.
			// Blockly will quickly recover from this, so it's not a big deal.
			// Just make sure the app doesn't crash until then.
		}
	}
	function updateCodeString() {
		codeString = robotControlGenerator.workspaceToCode(workspace);
		handleSave();
		return codeString;
	}
	let botid: number;
</script>

<main>
	<div>
		Select Bot ID
		<select name="botid" id="botid" bind:value={botid}>
			<option value="0">0</option>
			<option value="1">1</option>
		</select>
		<button class="load_button" on:click={handleRestore}> Load Workspace </button>
		<button class="save_button" on:click={handleSave}> Save Workspace </button>
		<div class="blockly-container">
			<BlocklyComponent
				{config}
				locale={locales[locale]}
				bind:workspace
				bind:transform
				on:change={onChange}
			/>
		</div>
		<hr />
		<p>
			{codeString}
		</p>
		<div style="display:inline-flex;">
			<button class="generate_button" on:click={updateCodeString}>Generate Code String</button>
			<form action="?/publishCode" method="post">
				<button class="send_button" type="submit" on:click={updateCodeString}>Send Code!</button>
				<input
					style="visibility: hidden;"
					type="text"
					name="code"
					id="code"
					bind:value={codeString}
				/>
				<input
					style="visibility: hidden;"
					type="number"
					name="botid"
					id="botid"
					bind:value={botid}
				/>
			</form>
		</div>
	</div>
</main>

<style>
	button {
		padding: 10px;
		margin: 10px;
		border: none;
		text-align: center;
		text-decoration: none;
		font-size: 16px;
		flex: 2;
	}
	.send_button {
		background-color: rgb(96, 194, 63);
	}
	.send_button:hover {
		background-color: rgb(123, 223, 90);
	}
	.save_button {
		background-color: rgb(131, 202, 203);
	}
	.load_button {
		background-color: rgb(138, 139, 58);
	}
	.generate_button {
		background-color: rgb(85, 59, 13);
	}
	.generate_button:hover {
		background-color: rgb(223, 126, 96);
	}
	.load_button:hover {
		background-color: rgb(163, 170, 71);
	}
	.save_button:hover {
		background-color: rgb(146, 235, 236);
	}
	main {
		display: flex;
		flex-direction: row;
		color: azure;
		margin-top: -30px;
	}

	main > div {
		padding: 1rem;
	}

	.blockly-container {
		height: 600px;
		width: 95vw;
		border: 1px solid black;
		color: black;
	}

	pre {
		overflow-x: auto;
	}
</style>
