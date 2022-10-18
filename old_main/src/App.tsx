import ToolBar from '@rom/Head/ToolBar';

function App() {
    return (
        <div className="App">
            <ToolBar user={{email: 'teste@teste.com', level: 5}} />
            Main
        </div>
    )
}

export default App;
