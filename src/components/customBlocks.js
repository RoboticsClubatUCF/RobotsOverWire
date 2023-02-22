import * as Blockly from 'blockly/core';

let reactTurnField = {
    "type": "turn",
    "message0": "turn: %1 ms",
    "args0": [
        {
            "type": "field_number",
            "min": 0,
            "max": 9999,
            "precision": 1
        }
    ],
    "message1": "forward: %1",
    "args1": [
        {
            "type": "field_checkbox"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
};

let reactMoveField = {
    "type": "move",
    "message0": "move: %1 ms",
    "args0": [
        {
            "type": "field_number",
            "min": 0,
            "max": 9999,
            "precision": 1
        }
    ],
    "message1": "forward: %1",
    "args1": [
        {
            "type": "field_checkbox"
        }
    ],
    "previousStatement": null,
    "nextStatement": null,
};

Blockly.Blocks['move'] = {
    init: function() {
        this.jsonInit(reactMoveField);
        this.setStyle('loop_blocks');
        this.setColour(0);
    }
}

Blockly.Blocks['turn'] = {
    init: function() {
        this.jsonInit(reactTurnField);
        this.setStyle('loop_blocks');
        this.setColour(80);
    }
}