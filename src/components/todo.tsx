import { useState } from "react";
import "./todo.css";
export interface ITodo {
  id: string | number;
  title: string;
  isDone: boolean;
}
export default function TodoList(): JSX.Element {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  const addTodo = () => {
    const itemTodo: ITodo = { id: todos.length + 1, title: todo, isDone: false, };
    if (!todo) return;
    setTodos([...todos, itemTodo]);
    setTodo('');
  };

  const deleteTodo = (itemTodo: ITodo) => {
    const newTodos = todos.filter(item => item !== itemTodo);
    setTodos(newTodos);
  };

  const checkTodo = (itemTodo: ITodo) => {
    const newTodos = todos.map(item => item === itemTodo ? { ...item, isDone: !item.isDone } : item);
    setTodos(newTodos);
  };

  const clearTodo = () => {
    setTodos([]);
  };
  return (
    <div className="container">
      <div className="todo">
        <h1 className="todo-title">Todo List</h1>
        <div>
          <input type="text" placeholder="Type something....." className="todo-input" value={todo} onChange={(e) => setTodo(e.target.value)}></input>
          <button type='submit' className="todo-btn" onClick={addTodo}>Add</button>
        </div>
        <div className="todo-list">
          {todos.length > 0 ? (
            <ul id='todo-scroll'>
              {todos.map((item, index) => {
                return (
                  <li key={index} className='todo-items'>
                    <div className='todo-items-left'>
                      <input className="todo-items-left-box" type='checkbox' onClick={() => checkTodo(item)}></input>
                      <p className={'todo-items-left-title ' + (item.isDone ? 'text-stroke' : '')}>{item.title}</p>
                    </div>
                    <div className='todo-items-handle'>
                      <button className="todo-btn" onClick={() => deleteTodo(item)}>Delete</button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>
              <p className="todo-empty">Add some todo....</p>
            </div>
          )}
        </div>
        <div className="todo-footer">
          <button className="todo-btn" onClick={clearTodo}>Clear All</button>
        </div>
      </div>
    </div >
  );
}

