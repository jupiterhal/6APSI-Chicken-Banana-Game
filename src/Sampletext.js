function Welcome(props){
    return <h2>Welcome, {props.name}!</h2>;
}

function App(){
    return(
        <div>
            <Welcome name = "Ralpheus"/>
            <Welcome name = "Euniced"/>
            <Welcome name = "Ceejay"/>
        </div>
    );
}

export default App;