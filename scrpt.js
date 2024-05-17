document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('text');
    const todoContainer = document.querySelector('.todo-con');
    const itemsLeft = document.querySelector('.left');
    const filters = document.querySelectorAll('.choice p');
    const clearCompleted = document.querySelector('.clear');
  
    let todos = [];
  
    // Update items left text
    const updateItemsLeft = () => {
      const activeTodos = todos.filter(todo => !todo.completed);
      itemsLeft.textContent = `${activeTodos.length} items left`;
    };
  
    // Render todos based on filter
    const renderTodos = (filter = 'All') => {
      todoContainer.innerHTML = '';
      let filteredTodos = todos;
  
      if (filter === 'Active') {
        filteredTodos = todos.filter(todo => !todo.completed);
      } else if (filter === 'Completed') {
        filteredTodos = todos.filter(todo => todo.completed);
      }
  
      filteredTodos.forEach((todo, index) => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        if (todo.completed) {
          todoItem.classList.add('completed');
        }
  
        todoItem.innerHTML = `
          <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
          <span>${todo.text}</span>
          <button data-index="${index}">X</button>
        `;
  
        todoContainer.appendChild(todoItem);
      });
  
      updateItemsLeft();
    };
  
    // Add new todo
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && todoInput.value.trim()) {
        todos.push({ text: todoInput.value.trim(), completed: false });
        todoInput.value = '';
        renderTodos();
      }
    });
  
    // Mark todo as completed or delete
    todoContainer.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      if (e.target.tagName === 'INPUT') {
        todos[index].completed = e.target.checked;
        renderTodos();
      } else if (e.target.tagName === 'BUTTON') {
        todos.splice(index, 1);
        renderTodos();
      }
    });
  
    // Filter todos
    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        filters.forEach(f => f.classList.remove('active'));
        filter.classList.add('active');
        renderTodos(filter.textContent);
      });
    });
  
    // Clear completed todos
    clearCompleted.addEventListener('click', () => {
      todos = todos.filter(todo => !todo.completed);
      renderTodos();
    });
  
    // Initial render
    renderTodos();
  });
  