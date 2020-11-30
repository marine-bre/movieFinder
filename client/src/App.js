import Start from './components/Start'
import './styles.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faTimesCircle)



function App() {

  return (
    <div className="App">
      <div className='background-image' />

      <Router>
        <Route exact path='/' component={Start}></Route>
      </Router>
    </div>
  );
}

export default App;
