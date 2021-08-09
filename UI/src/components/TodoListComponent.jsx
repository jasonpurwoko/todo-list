import React, { Component } from 'react';
import TodoService from '../services/TodoService';

class TodoListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                todos: []
        }

        this.deleteTodo = this.deleteTodo.bind(this);
    }

    deleteTodo(id) {
        TodoService.deleteTodo(id).then( res => {
            this.setState({todos: this.state.todos.filter(list => list.id !== id)});
        });
    }

    componentDidMount(){
        TodoService.getTodos().then((res) => {
            this.setState({ todos: res.data});
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Todo List</h2>
                <div className = "card-body">
                    <form>
                        <div className = "form-group">
                            <label> First Name: </label>
        
                        </div>

                    </form>
                </div>

                 <div className = "row">
                        <table>
                            <thead>
                                <tr>
                                    <th> Task</th>
                                    <th> Done</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.todos.map(
                                        todo => 
                                        <tr key = {todo.id}>
                                             <td> { todo.task} </td>   
                                             <td> { String(todo.completed) }</td>
                                             <td>
                                             <button style={{marginLeft: "10px"}} onClick={ () => this.deleteTodo(todo.id)}>Delete </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>
            </div>
        );
    }
}

export default TodoListComponent;