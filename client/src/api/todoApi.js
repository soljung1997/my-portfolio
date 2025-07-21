// Fetch all todos
export const getTodos = async (token) => {
  try {
    const res = await fetch('/api/todos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch todos:', err);
  }
};

// Fetch one todo
export const getTodoById = async (id, token) => {
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch todo by ID:', err);
  }
};

// Update a todo
export const updateTodo = async (id, updatedData, token) => {
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to update todo:', err);
  }
};

// Delete a todo
export const deleteTodo = async (id, token) => {
  try {
    const res = await fetch(`/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return await res.json();
  } catch (err) {
    console.error('Failed to delete todo:', err);
  }
};
