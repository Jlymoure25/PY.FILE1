# Task Manager Application

A task management application available in two versions:
1. **CLI Version** - Python command-line interface
2. **Web Version** - Modern web application deployable to Netlify

## 🌐 Web Version (Netlify Deployment)

The web version is a modern, responsive task manager that runs entirely in the browser with local storage persistence.

### Features
- **Modern UI**: Beautiful gradient design with smooth animations
- **Local Storage**: Tasks persist across browser sessions
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Updates**: Instant task additions and deletions
- **Input Validation**: Prevents empty, duplicate, or overly long tasks
- **User Feedback**: Success and error messages for all operations

### Live Demo
Visit the deployed application at: [Your Netlify URL will appear here after deployment]

### Deployment to Netlify

#### Option 1: Deploy via Netlify UI (Recommended)
1. Fork or clone this repository
2. Log in to [Netlify](https://www.netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub account and select this repository
5. Netlify will automatically detect the `netlify.toml` configuration
6. Click "Deploy site"
7. Your site will be live at a Netlify URL (e.g., `your-site-name.netlify.app`)

#### Option 2: Deploy via Netlify CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy the site
netlify deploy --prod
```

#### Option 3: Deploy via GitHub Integration
1. Connect your repository to Netlify
2. Enable automatic deployments
3. Every push to the main branch will trigger a new deployment

### Configuration
The `netlify.toml` file includes:
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Performance optimizations (caching for static assets)
- SPA routing fallback to index.html

### Web Files
- `index.html` - Main HTML structure
- `styles.css` - Styling and responsive design
- `script.js` - Task management logic with localStorage
- `netlify.toml` - Netlify deployment configuration

## 📋 CLI Version Features

### Core Functionality
- **Add Tasks**: Create new tasks with descriptive names
- **View Tasks**: Display all current tasks in a numbered list
- **Delete Tasks**: Remove specific tasks by their number
- **Quit Application**: Exit the program gracefully

### User Experience
- **Welcome Screen**: Friendly greeting when starting the application
- **Interactive Menu**: Clear menu options with numbered choices
- **Input Validation**: Comprehensive validation for all user inputs
- **Error Handling**: Robust error handling with informative messages
- **User Feedback**: Clear success and error messages for all operations

### Technical Features
- **Persistent Session**: Tasks remain in memory during the session
- **Edge Case Handling**: Manages empty lists, invalid inputs, and out-of-range selections
- **Keyboard Interrupt**: Graceful handling of Ctrl+C interruption
- **Clean Code Structure**: Well-organized functions with proper documentation

## 🚀 How to Run the CLI Version

### Prerequisites
- Python 3.6 or higher installed on your system
- A terminal or command prompt

### Running the Application

1. **Clone the repository** (if using Git):
   ```bash
   git clone <repository-url>
   cd PY.FILE1
   ```

2. **Navigate to the project directory**:
   ```bash
   cd /path/to/PY.FILE1
   ```

3. **Run the application**:
   ```bash
   python task_manager.py
   ```
   
   Or if you have Python 3 specifically:
   ```bash
   python3 task_manager.py
   ```

4. **Make it executable** (optional, on Unix-like systems):
   ```bash
   chmod +x task_manager.py
   ./task_manager.py
   ```

## 💡 How to Use

### Starting the Application
When you run the application, you'll see a welcome screen followed by the main menu:

```
==================================================
    Welcome to the Task Manager CLI!
==================================================

--- MAIN MENU ---
1. Add Task
2. View Tasks
3. Delete Task
4. Quit Application
--------------------
```

### Menu Options

#### 1. Add Task
- Select option `1` from the main menu
- Enter a descriptive name for your task
- The task will be added to your list
- You'll receive a confirmation message

**Example:**
```
--- ADD TASK ---
Enter task description: Complete Python assignment
✓ Task 'Complete Python assignment' added successfully!
```

#### 2. View Tasks
- Select option `2` from the main menu
- All your current tasks will be displayed with numbers
- Shows total task count

**Example:**
```
--- YOUR TASKS ---
1. Complete Python assignment
2. Buy groceries
3. Call dentist

Total tasks: 3
```

#### 3. Delete Task
- Select option `3` from the main menu
- View the current list of tasks
- Enter the number of the task you want to delete
- Confirm the deletion

**Example:**
```
--- DELETE TASK ---
Current tasks:
1. Complete Python assignment
2. Buy groceries
3. Call dentist

Enter task number to delete (1-3): 2
✓ Task 'Buy groceries' deleted successfully!
```

#### 4. Quit Application
- Select option `4` from the main menu
- The application will display a goodbye message and exit

## 🛡️ Error Handling

The application includes comprehensive error handling for various scenarios:

### Input Validation Errors
- **Empty Input**: Alerts when no input is provided
- **Invalid Numbers**: Handles non-numeric input for menu choices
- **Out of Range**: Prevents selection of non-existent menu options

### Task Management Errors
- **Empty Task List**: Informs users when trying to view/delete from empty list
- **Invalid Task Numbers**: Prevents deletion of non-existent tasks
- **Empty Task Description**: Requires meaningful task descriptions

### System Errors
- **Keyboard Interruption**: Graceful handling of Ctrl+C
- **Unexpected Errors**: Generic error handling with informative messages

## 🏗️ Code Structure

### Functions Overview

- `display_welcome()`: Shows welcome message
- `display_menu()`: Displays main menu options
- `get_user_choice()`: Validates and returns user menu selection
- `add_task()`: Handles adding new tasks with validation
- `view_tasks()`: Displays all current tasks
- `delete_task()`: Manages task deletion with error handling
- `quit_application()`: Handles application exit
- `main()`: Main application loop and error handling

### Error Handling Blocks
Each function implements proper `try`, `except`, `else`, and `finally` blocks:
- **try**: Main function logic
- **except**: Specific error handling for different exception types
- **finally**: Cleanup and completion messages

## 📊 Testing

The application has been thoroughly tested for:

### Normal Operations
- Adding tasks successfully
- Viewing tasks when list has items
- Deleting tasks by valid numbers
- Quitting application normally

### Edge Cases
- Starting with empty task list
- Adding empty or whitespace-only tasks
- Viewing tasks when list is empty
- Deleting from empty list
- Deleting with invalid task numbers
- Invalid menu selections
- Non-numeric input for numeric fields

### Error Scenarios
- Keyboard interruption (Ctrl+C)
- Invalid input formats
- Out-of-range selections
- System-level exceptions

## 🔧 Technical Details

### Storage Method
- Tasks are stored in a Python list (`tasks = []`)
- Data persists only during the application session
- No file-based persistence (tasks are lost when application exits)

### Dependencies
- No external dependencies required
- Uses only Python standard library functions
- Compatible with Python 3.6+

### Code Quality
- **PEP 8 Compliant**: Follows Python style guidelines
- **Documented**: Comprehensive docstrings for all functions
- **Modular**: Well-organized function structure
- **Readable**: Clear variable names and logical flow

## 🐛 Known Limitations

1. **Session-Only Storage**: Tasks don't persist after closing the application
2. **No Task Editing**: Cannot modify existing tasks (only add/delete)
3. **No Task Categories**: All tasks are in a single flat list
4. **No Due Dates**: No time-based task management features
5. **No Task Priorities**: No priority or importance levels

## 🔮 Future Enhancements

Potential improvements for future versions:
- File-based persistence (save/load from file)
- Task editing capabilities
- Task categories or tags
- Due dates and reminders
- Priority levels
- Search and filter functionality
- Task completion status (mark as done)
- Export tasks to different formats

## 📝 License

This project is created for educational purposes. Feel free to use, modify, and distribute as needed.

## 👨‍💻 Author

Created as part of a Python programming assignment focusing on CLI applications, error handling, and code organization.

---

**Happy Task Managing! 📝✨**
