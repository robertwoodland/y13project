# Stuff yet to do
## General:
Set up with icon and name in tab bar  
Set up so that it can be installed as a web app  
Push notifications on nearing due date??  

### Tasks
Standardise task states as output of getTasks  
Standardise project states as output of getProjects  
Standardise array of functions to pass as props  

Overdue section, use UNIX for due dates too...  

Fix white box height on mobile on ShowTasksPage (if even possible)  

### Projects
Project in firebase stores a count of how many tasks have been marked complete for it.  



## All other areas of the app  
### Timers  
Can't fix pagination when timer deleted  
Toast?  
Add limits to .get()s  
Updating timers changes them to today, which it shouldn't  

### Reports
Total time spent count  

<br/><br/>


# Files completed
getProjects returns projects correctly
(0 is project name, 1 is accessed time, 2 is project ID)   
getTasks returns tasks correctly
(0 is name, 1 is project name, 2 is due date, 3 is task ID, 4 is project ID)  

LoginPage functions work fine  

ProjectDropdown is seemingly passable

DatePicker placeholder updated

Added tasks menu and updated navbar  

Marking tasks as complete on ShowTasksPage  

Made updateTasks update tasks as well as adding new ones  

Validated adding tasks so as not to include commas  

Replaced unnecessary .get from firebase to get projectId by projectName in TaskDetails.js   

All styled components function as expected  

Fix issues where tasks not being updated properly (no projectId)  

Changed keys to use indeces from .map rather than names  

Fixed toast on AddTasksPage  

Fixed sorting of getProjects  

Break out ShowRecentTasks from ShowTasksPage  

Use Bootstrap toasts with autohide property to show task being added to database or updated  

Fix not getting the tasks only for that user  

Sorting tasks  

Make updateTaskCount work  

Completed tasks count (stored as state, increment when task completed through markComplete())  
