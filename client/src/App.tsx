import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Classroom } from './components/classroom/classroom.component';
import { HomePage } from './components/home-page/home-page.component';
import {
  TopNavigation
} from './components/top-navigation/top-navigation.component';
import './App.css';

function App() {
  return (
    <div className="App">
      <TopNavigation title="Teaching Suite" username="Test" />
      <BrowserRouter>
        <Switch>
          <Route path="/classroom">
            <Classroom />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
