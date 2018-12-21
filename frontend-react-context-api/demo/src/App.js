import React, { Component } from 'react';

const EmptyContext = React.createContext('Am I missing? 👀');
const WrapperContext = React.createContext();
const UserContext = React.createContext('');
const PersonContext = React.createContext();

class BaseProvider extends Component {
  state = {
    user: {username: 'vegaasen', mail: 'vegaasen@gmail.com'},
    family: [{name: 'Vegard Aasen', age: 29, cool: true}, {name: 'Vegard Aasen', age: 32, cool: true}, {name: 'Vegard Aasen', age: 31, cool: true}],
  };

  render () {
    return <UserContext.Provider value={{state: this.state}}>{this.props.children}</UserContext.Provider>
  }
}

class PersonProvider extends Component {
  state = {name: 'Vegard Aasen', age: 33, cool: true, cloths: ''};

  render () {
    const values = {
      state: this.state,
      growAYearOlder: () => this.setState({age: this.state.age + 1}),
      updateName: newName => this.setState({name: newName}),
      changeCloths: cloths => this.setState({cloths: cloths})
    };
    return <PersonContext.Provider value={values}>{this.props.children}</PersonContext.Provider>
  }
}

const Family = () => (
  <UserContext.Consumer>
    {user => <div className="familiy"><Person/></div>}
  </UserContext.Consumer>
);

const NameChanger = props => (
  <div>
    <PersonContext.Consumer>
      {context => (
        <div style={{backgroundColor: 'cadetblue'}}>
          <input type='text' onChange={e => context.updateName(e.target.value)}/>
        </div>
      )}
    </PersonContext.Consumer>
  </div>
);

class Person extends Component {
  render () {
    return (
      <div className="person">
        {JSON.stringify(this.props)}
        <PersonContext.Consumer>
          {(context) => (
            <React.Fragment>
              <p>Age: {context.state.age}</p>
              <p>Name: {context.state.name}</p>
              <p>Cloths: {context.state.cloths}</p>
              <button onClick={context.growAYearOlder}>Congrats! <span role='img'>🍰</span></button>
            </React.Fragment>
          )}
        </PersonContext.Consumer>
      </div>
    )
  }
}

const ChangeClothsComponent = () => {
  return (
    <PersonContext.Consumer>
      {(person) => (
        <>Cloths: <input type='text' onChange={e => person.changeCloths(e.target.value)}/></>
      )}
    </PersonContext.Consumer>
  )
};

const CoolComponent = () => (
  <WrapperContext.Consumer>
    {() => (
      <div style={{backgroundColor: 'antiquewhite'}}>
        <h1>Awesome app</h1>
        <Family persons={[{}]}/>
        <NameChanger/>
        <ChangeClothsComponent person={{name: 'vegard'}}/>
      </div>
    )}
  </WrapperContext.Consumer>
);

class App extends Component {
  render () {
    return (
      <WrapperContext.Provider value={{version: '1.0-💰'}}>
        <BaseProvider>
          <PersonProvider>
            <div><CoolComponent/></div>
          </PersonProvider>
        </BaseProvider>
      </WrapperContext.Provider>
    );
  }
}

export default App;