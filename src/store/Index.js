import { createStore, combineReducers } from 'redux';
import config from './reducer/config'
import job from './reducer/job'
import department from './reducer/department'
import app from './reducer/app'




// combineReducers
const allReducers = {
    department: department,
    job: job,
    config: config,
    app: app
}
const rootReducer = combineReducers(allReducers)


const Store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default Store;
