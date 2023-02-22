import * as Blockly from 'blockly/core';

let reactTurnField = {
    "type": "turn",
    "message0": "turn: %1",
    "args0": [
        {
            "type": "field_number",
            "min": 0,
            "max": 9999,
            "precision": 1
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
};

let reactMoveField = {
    "type": "move",
    "message0": "move: %1",
    "args0": [
        {
            "type": "field_number",
            "min": 0,
            "max": 9999,
            "precision": 1
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
};

Blockly.Blocks['move'] = {
    init: function() {
        this.jsonInit(reactMoveField);
        this.setStyle('loop_blocks');
    }
}

Blockly.Blocks['turn'] = {
    init: function() {
        this.jsonInit(reactTurnField);
        this.setStyle('loop_blocks');
    }
}