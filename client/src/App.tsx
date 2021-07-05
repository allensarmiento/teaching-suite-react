import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import TopNavigation from './components/top-navigation/top-navigation.component';

import Classroom from './pages/classroom/classroom.component';
import Homepage from './pages/homepage/homepage.component';
import SignIn from './pages/sign-in/sign-in.component';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <TopNavigation title="Teaching Suite" />
        <Switch>
          <Route path="/classroom/:id" component={Classroom} />
          <Route path="/sign-in" component={SignIn} />
          <Route path="/" component={Homepage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
