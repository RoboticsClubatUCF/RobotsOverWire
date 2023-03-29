import * as Blocky from 'blockly';

export const robotControlGenerator = new Blocky.Generator('robotControl');

robotControlGenerator.PRESEDENCE = 0;
robotControlGenerator.scrub_ = function (
	/** @type {{ nextConnection: { targetBlock: () => any; }; }} */ block,
	/** @type {string | number} */ code,
	/** @type {any} */ thisOnly
) {
	const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
	if (nextBlock) {
		return code + robotControlGenerator.blockToCode(nextBlock).toString();
	}
	code = code.toString().replace(/\s/g, '');
	console.log(code);
	return code.toString();
};

robotControlGenerator['move_block'] = function (block) {
	var moveTime = Math.floor(block.getFieldValue('Second to Move') * 1000).toString();
	const length = 4 - moveTime.length;
	for (let i = 0; i < length; i++) {
		moveTime = '0' + moveTime;
	}
	const forward = block.getFieldValue('Forwards?').toString() == 'TRUE' ? '1' : '0';
	console.log(block.getFieldValue('Forwards?'));
	return 'M' + moveTime + forward;
};

robotControlGenerator['turn_block'] = function (block) {
	var turnTime = Math.floor(block.getFieldValue('Seconds') * 1000).toString();
	const length = 4 - turnTime.length;
	for (let i = 0; i < length; i++) {
		turnTime = '0' + turnTime;
	}
	const clockwise = block.getFieldValue('Clockwise?').toString() == 'TRUE' ? '1' : '0';
	return 'T' + turnTime + clockwise;
};
robotControlGenerator['start_block'] = function (block) {
	return '';
};
robotControlGenerator['end_block'] = function (block) {
	return '';
};
robotControlGenerator['move_loop'] = function (block) {
	var number_loop_count = block.getFieldValue('loop_count');
	var statements_loop_code = robotControlGenerator.statementToCode(block, 'loop_code');
	// TODO: Assemble JavaScript into code variable.
	var code = multiplyString(statements_loop_code, Number(number_loop_count.toString()));
	console.log(code);
	return code;
};

function multiplyString(string, n) {
	var output = '';
	for (let i = 0; i < n; i++) {
		output += string;
	}
	return output;
}
