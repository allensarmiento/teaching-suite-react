import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Classroom from './pages/classroom/classroom.component';
import Homepage from './pages/homepage/homepage.component';
import TopNavigation from './components/top-navigation/top-navigation.component';

function App() {
  return (
    <div className="App">
      <TopNavigation title="Teaching Suite" username="Test" />
      <BrowserRouter>
        <Switch>
          <Route path="/classroom" component={Classroom} />
          <Route path="/" component={Homepage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
