#!/usr/bin/env python3
"""
Task Manager CLI Application

A simple command-line interface for managing tasks.
Users can add, view, delete tasks, and quit the application.

Author: Task Manager App
Date: November 19, 2025
"""

# Global task list to store all tasks
tasks = []


def display_welcome():
    """Display welcome message to the user."""
    print("=" * 50)
    print("    Welcome to the Task Manager CLI!")
    print("=" * 50)
    print()


def display_menu():
    """Display the main menu options."""
    print("\n--- MAIN MENU ---")
    print("1. Add Task")
    print("2. View Tasks")
    print("3. Delete Task")
    print("4. Quit Application")
    print("-" * 20)


def get_user_choice():
    """
    Get and validate user menu choice.
    
    Returns:
        int: Valid menu choice (1-4)
        
    Raises:
        ValueError: If input is not a valid integer
        IndexError: If choice is not in valid range
    """
    try:
        choice = input("Please select an option (1-4): ").strip()
        
        # Check if input is empty
        if not choice:
            raise ValueError("Empty input is not allowed")
            
        # Convert to integer
        choice_int = int(choice)
        
        # Validate range
        if choice_int not in [1, 2, 3, 4]:
            raise IndexError("Choice must be between 1 and 4")
            
        return choice_int
        
    except ValueError as e:
        if "invalid literal" in str(e):
            raise ValueError("Please enter a valid number")
        else:
            raise e
    except Exception as e:
        raise ValueError(f"Unexpected error: {str(e)}")


def add_task():
    """
    Add a new task to the task list.
    
    Handles empty task validation and provides user feedback.
    """
    try:
        print("\n--- ADD TASK ---")
        task_description = input("Enter task description: ").strip()
        
        # Validate that task is not empty
        if not task_description:
            raise ValueError("Task description cannot be empty")
            
        # Add task to the list
        tasks.append(task_description)
        print(f"✓ Task '{task_description}' added successfully!")
        
    except ValueError as e:
        print(f"❌ Error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error occurred: {e}")
    finally:
        print("Add task operation completed.")


def view_tasks():
    """
    Display all tasks in the task list.
    
    Handles empty list scenario and displays tasks with numbering.
    """
    try:
        print("\n--- YOUR TASKS ---")
        
        # Check if task list is empty
        if not tasks:
            raise IndexError("No tasks available to display")
            
        # Display all tasks with numbering
        for i, task in enumerate(tasks, 1):
            print(f"{i}. {task}")
            
        print(f"\nTotal tasks: {len(tasks)}")
        
    except IndexError as e:
        print(f"❌ {e}")
    except Exception as e:
        print(f"❌ Unexpected error occurred: {e}")
    finally:
        print("View tasks operation completed.")


def delete_task():
    """
    Delete a specific task from the task list.
    
    Handles various error scenarios including empty list,
    invalid input, and out of range selections.
    """
    try:
        print("\n--- DELETE TASK ---")
        
        # Check if task list is empty
        if not tasks:
            raise IndexError("No tasks available to delete")
            
        # Display current tasks first
        print("Current tasks:")
        for i, task in enumerate(tasks, 1):
            print(f"{i}. {task}")
            
        # Get task number to delete
        task_input = input(f"\nEnter task number to delete (1-{len(tasks)}): ").strip()
        
        # Validate input is not empty
        if not task_input:
            raise ValueError("Please enter a task number")
            
        # Convert to integer and validate
        task_number = int(task_input)
        
        # Check if task number is in valid range
        if task_number < 1 or task_number > len(tasks):
            raise IndexError(f"Task number must be between 1 and {len(tasks)}")
            
        # Delete the task (convert to 0-based index)
        deleted_task = tasks.pop(task_number - 1)
        print(f"✓ Task '{deleted_task}' deleted successfully!")
        
    except ValueError as e:
        if "invalid literal" in str(e):
            print("❌ Error: Please enter a valid number")
        else:
            print(f"❌ Error: {e}")
    except IndexError as e:
        print(f"❌ Error: {e}")
    except Exception as e:
        print(f"❌ Unexpected error occurred: {e}")
    finally:
        print("Delete task operation completed.")


def quit_application():
    """
    Handle application exit with a goodbye message.
    """
    try:
        print("\n--- GOODBYE ---")
        print("Thank you for using Task Manager!")
        print("Have a productive day! 🚀")
        
    except Exception as e:
        print(f"Error during quit: {e}")
    finally:
        print("Application shutting down...")


def main():
    """
    Main application loop that handles user interaction and menu navigation.
    
    Implements the core application flow with proper error handling
    and user input validation.
    """
    # Display welcome message
    display_welcome()
    
    # Main application loop
    while True:
        try:
            # Display menu and get user choice
            display_menu()
            choice = get_user_choice()
            
            # Process user choice
            if choice == 1:
                add_task()
            elif choice == 2:
                view_tasks()
            elif choice == 3:
                delete_task()
            elif choice == 4:
                quit_application()
                break
            else:
                # This should not happen due to validation, but added for safety
                raise ValueError("Invalid menu selection")
                
        except ValueError as e:
            print(f"❌ Input Error: {e}")
            print("Please try again with a valid option.")
        except IndexError as e:
            print(f"❌ Selection Error: {e}")
            print("Please try again with a valid option.")
        except KeyboardInterrupt:
            print("\n\n⚠️  Application interrupted by user (Ctrl+C)")
            print("Goodbye!")
            break
        except Exception as e:
            print(f"❌ Unexpected error: {e}")
            print("Please try again.")
        finally:
            # This block always executes after each menu interaction
            input("\nPress Enter to continue...")


# Entry point of the application
if __name__ == "__main__":
    main()