import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  todos: [],
  completed: 0,
  unCompleted: 0
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addTodo: (state, { payload }) => {},
    removeTodo: (state, { payload }) => {},
    changeTodoStatus: (state, { payload }) => {},
    calculateTotal: (state, { payload }) => {}
  }
})

export const { addTodo, removeTodo, changeTodoStatus, calculateTotal } = counterSlice.actions
export default counterSlice.reducer