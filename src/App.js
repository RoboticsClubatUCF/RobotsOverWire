import { BlocklyWorkspace } from 'react-blockly';
import './components/customBlocks';
import './App.css';


function App() {
  const initialXml =
    '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="move" x="30" y="30"><field name="TEXT"></field></block></xml>';
  const toolboxCategories = {
    kind: "categoryToolbox",
    contents: [
      {
        kind: "category",
        name: "Commands",
        colour: "#3FA7D6",
        contents: [
          {
            kind: "block",
            type: "move",
          },
          {
            kind: "block",
            type: "turn",
          },
        ],
      },
    ],
  };
  return (
    <div className="App">
      <div className="Block">
        <BlocklyWorkspace
          className="fill-height"
          initialXml={initialXml}
          toolboxConfiguration={toolboxCategories}
          workspaceConfiguration={{
            grid: {
              spacing: 20,
              length: 3,
              colour: "#ccc",
              snap: true,
            },
          }}
        ></BlocklyWorkspace>
      </div>
    </div>
  );
}

export default App;
