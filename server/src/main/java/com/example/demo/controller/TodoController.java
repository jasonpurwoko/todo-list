package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Todo;
import com.example.demo.repository.TodoRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class TodoController {
	@Autowired
	private TodoRepository todoRepository;
	
	@GetMapping("/todos")
	public List<Todo> getAllTodos() {
		return todoRepository.findAll();
	}
	
	@PostMapping("/todos")
	public Todo createTodo(@RequestBody Todo todo) {
		return todoRepository.save(todo);
	}
	
	@PutMapping("/todos/{id}")
	public ResponseEntity<Todo> updateEmployee(@PathVariable Long id, @RequestBody Todo todoDetails){
		Todo todo = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Todo not exist with id :" + id));
		
		todo.setTask(todoDetails.getTask());
		todo.setCompleted(todoDetails.isCompleted());

		
		Todo updatedTodo = todoRepository.save(todo);
		return ResponseEntity.ok(updatedTodo);
	}
	
	@DeleteMapping("/todos/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteTodo(@PathVariable Long id) {
		Todo item = todoRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		todoRepository.delete(item);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}
