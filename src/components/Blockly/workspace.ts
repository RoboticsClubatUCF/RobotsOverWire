/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
import * as Blockly from 'blockly';
export const workspace = (container: HTMLElement, toolbox: HTMLElement) => {

	var options = {
		toolbox: toolbox,
		collapse: true,
		comments: true,
		disable: true,
		maxBlocks: Infinity,
		trashcan: true,
		horizontalLayout: false,
		toolboxPosition: 'start',
		css: true,
		media: 'https://blockly-demo.appspot.com/static/media/',
		rtl: false,
		scrollbars: true,
		sounds: true,
		oneBasedIndex: true,
		grid: {
			spacing: 20,
			length: 1,
			colour: '#888',
			snap: true
		},
		zoom: {
			controls: true,
			wheel: true,
			startScale: 1,
			maxScale: 3,
			minScale: 0.3,
			scaleSpeed: 1.2
		}
	};

	//@ts-ignore
	const ws = Blockly.inject(container, options);
	/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
	var workspaceBlocks = document.getElementById('workspaceBlocks');

	/* Load blocks to workspace. */
	Blockly.Xml.domToWorkspace(workspaceBlocks!, ws);
};
