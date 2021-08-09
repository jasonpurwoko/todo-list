import React, { Component } from 'react';
import TodoService from '../services/TodoService';

class TodoListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            task: '',
            completed: false,
            todos: []
        }

        this.changeTaskHandler = this.changeTaskHandler.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
    }

    changeTaskHandler = (event) => {
        this.setState({ task: event.target.value });
    }

    saveTodo = (e) => {
        e.preventDefault();
        let todo = { task: this.state.task, completed: this.state.completed };
        console.log('todo => ' + JSON.stringify(todo));

        TodoService.createTodo(todo).then(res => {
            TodoService.getTodos().then((res) => {
                this.setState({ todos: res.data});
            });
        });
    }

    updateTodo(todo) {
        let updatedTodo = { task: todo.task, completed: !todo.completed };
        console.log('updatedTodo => ' + JSON.stringify(updatedTodo));

        TodoService.updateTodo(updatedTodo, todo.id).then(res => {
            TodoService.getTodos().then((res) => {
                this.setState({ todos: res.data });
            });
        });
    }
    
    deleteTodo(id) {
        TodoService.deleteTodo(id).then( res => {
            this.setState({ todos: this.state.todos.filter(todo => todo.id !== id) });
        });
    }

    componentDidMount(){
        TodoService.getTodos().then((res) => {
            this.setState({ todos: res.data });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Todo List</h2>

                <div class="row m-1 p-3">
                    <div class="col col-11 mx-auto">
                        <div class="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center">
                            <div class="col">
                                <input class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded" type="text" placeholder="Add new task" value={this.state.task} onChange={this.changeTaskHandler}></input>
                            </div>
                            <div class="col-auto px-0 mx-0 mr-2">
                                <button type="button" class="btn btn-primary" onClick={this.saveTodo}>Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col col-lg-9 col-xl-7">
                        <div class="card-body p-4">
                            <table class="table mb-4">
                                <thead>
                                    <tr>
                                        <th scope="col">Task</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.todos.map(
                                            todo => 
                                            <tr key = {todo.id}>
                                                <td> {todo.task} </td>   
                                                <td> {todo.completed ? 'Completed': 'In Progress'}</td>
                                                <td>
                                                    <button type="submit" class="btn btn-danger" onClick={ () => this.deleteTodo(todo.id) }>Delete</button>
                                                    <button style={{marginLeft: "10px"}} type="submit" class="btn btn-success ms-1" onClick={ () => this.updateTodo(todo) }>Finished</button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>          
            </div>
        );
    }
}

export default TodoListComponent;