import Start from './components/Start'
import Genre from './components/Genre'
import Duration from './components/Duration'
import Year from './components/Year'
import Results from './components/Results'
import './styles.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle)



function App() {

  return (
    <div className="App wawa">
      <Router>
          <Route exact path='/' component={Start}></Route>
          <Route path='/genre' component={Genre}></Route>
          <Route path='/duration' component={Duration}></Route>
          <Route path='/year' component={Year}></Route>
          <Route path='/results' component={Results}></Route>
      </Router>
    </div>
  );
}

export default App;
