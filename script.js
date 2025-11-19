// Task Manager Web App JavaScript
class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.init();
    }

    init() {
        this.renderTasks();
        this.updateTaskCount();
        this.setupEventListeners();
        
        // Focus on input when page loads
        document.getElementById('taskInput').focus();
    }

    setupEventListeners() {
        // Add task on Enter key press
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });

        // Auto-save tasks to localStorage whenever tasks change
        this.saveToLocalStorage();
    }

    addTask() {
        try {
            const taskInput = document.getElementById('taskInput');
            const taskText = taskInput.value.trim();

            // Validate input
            if (!taskText) {
                this.showMessage('Please enter a task description!', 'error');
                taskInput.focus();
                return;
            }

            if (taskText.length > 100) {
                this.showMessage('Task description is too long (max 100 characters)!', 'error');
                return;
            }

            // Check for duplicate tasks
            if (this.tasks.some(task => task.toLowerCase() === taskText.toLowerCase())) {
                this.showMessage('This task already exists!', 'error');
                return;
            }

            // Add task
            this.tasks.push(taskText);
            taskInput.value = '';
            
            this.renderTasks();
            this.updateTaskCount();
            this.saveToLocalStorage();
            
            this.showMessage(`Task "${taskText}" added successfully!`, 'success');
            taskInput.focus();

        } catch (error) {
            console.error('Error adding task:', error);
            this.showMessage('An error occurred while adding the task.', 'error');
        }
    }

    deleteTask(index) {
        try {
            if (index < 0 || index >= this.tasks.length) {
                this.showMessage('Invalid task selection!', 'error');
                return;
            }

            const deletedTask = this.tasks[index];
            
            // Confirm deletion
            if (confirm(`Are you sure you want to delete "${deletedTask}"?`)) {
                this.tasks.splice(index, 1);
                
                this.renderTasks();
                this.updateTaskCount();
                this.saveToLocalStorage();
                
                this.showMessage(`Task "${deletedTask}" deleted successfully!`, 'success');
            }

        } catch (error) {
            console.error('Error deleting task:', error);
            this.showMessage('An error occurred while deleting the task.', 'error');
        }
    }

    clearAllTasks() {
        try {
            if (this.tasks.length === 0) {
                this.showMessage('No tasks to clear!', 'error');
                return;
            }

            if (confirm(`Are you sure you want to delete all ${this.tasks.length} tasks?`)) {
                this.tasks = [];
                
                this.renderTasks();
                this.updateTaskCount();
                this.saveToLocalStorage();
                
                this.showMessage('All tasks cleared successfully!', 'success');
            }

        } catch (error) {
            console.error('Error clearing tasks:', error);
            this.showMessage('An error occurred while clearing tasks.', 'error');
        }
    }

    renderTasks() {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');

        // Clear existing tasks
        taskList.innerHTML = '';

        if (this.tasks.length === 0) {
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';

        // Render each task
        this.tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            
            taskItem.innerHTML = `
                <div class="task-content">
                    <div class="task-number">${index + 1}</div>
                    <div class="task-text">${this.escapeHtml(task)}</div>
                </div>
                <button class="delete-btn" onclick="taskManager.deleteTask(${index})">
                    Delete
                </button>
            `;

            taskList.appendChild(taskItem);
        });
    }

    updateTaskCount() {
        const taskCount = document.getElementById('taskCount');
        const count = this.tasks.length;
        
        if (count === 0) {
            taskCount.textContent = 'No tasks';
        } else if (count === 1) {
            taskCount.textContent = '1 task';
        } else {
            taskCount.textContent = `${count} tasks`;
        }
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            this.showMessage('Error saving tasks to local storage.', 'error');
        }
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());

        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;

        // Insert message at the top of main content
        const main = document.querySelector('main');
        main.insertBefore(messageDiv, main.firstChild);

        // Auto-remove message after 3 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Export tasks as JSON
    exportTasks() {
        try {
            if (this.tasks.length === 0) {
                this.showMessage('No tasks to export!', 'error');
                return;
            }

            const dataStr = JSON.stringify(this.tasks, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(dataBlob);
            link.download = 'tasks.json';
            link.click();
            
            this.showMessage('Tasks exported successfully!', 'success');
        } catch (error) {
            console.error('Error exporting tasks:', error);
            this.showMessage('Error exporting tasks.', 'error');
        }
    }

    // Import tasks from JSON
    importTasks(event) {
        try {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importedTasks = JSON.parse(e.target.result);
                    
                    if (!Array.isArray(importedTasks)) {
                        throw new Error('Invalid file format');
                    }

                    this.tasks = [...this.tasks, ...importedTasks];
                    this.renderTasks();
                    this.updateTaskCount();
                    this.saveToLocalStorage();
                    
                    this.showMessage(`${importedTasks.length} tasks imported successfully!`, 'success');
                } catch (error) {
                    this.showMessage('Error parsing imported file.', 'error');
                }
            };
            reader.readAsText(file);
        } catch (error) {
            console.error('Error importing tasks:', error);
            this.showMessage('Error importing tasks.', 'error');
        }
    }
}

// Global functions for HTML onclick events
function addTask() {
    taskManager.addTask();
}

function clearAllTasks() {
    taskManager.clearAllTasks();
}

// Initialize the task manager when the page loads
let taskManager;

document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});

// Handle page visibility change to sync with localStorage
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && taskManager) {
        // Reload tasks from localStorage when page becomes visible
        const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        if (JSON.stringify(taskManager.tasks) !== JSON.stringify(storedTasks)) {
            taskManager.tasks = storedTasks;
            taskManager.renderTasks();
            taskManager.updateTaskCount();
        }
    }
});