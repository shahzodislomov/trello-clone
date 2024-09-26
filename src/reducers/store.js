import { configureStore } from "@reduxjs/toolkit";
import taskReducer from './reducer/slice'

const store = configureStore({
  reducer:{
    task: taskReducer
  }
})
export default store