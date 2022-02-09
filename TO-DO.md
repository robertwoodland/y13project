# Stuff yet to do
Standardise task states as output of getTasks  
Standardise project states as output of getProjects  

Break out ShowRecentTasks from ShowTasksPage  

Fix white box height on mobile on ShowTasksPage  

Maybe use Bootstrap toasts with autohide property to show task being added to database  

Completed tasks count (store in users, use as context, increment when task completed)  

Change keys to use indeces from .map rather than names  



## All other areas of the app  
### Timers
### Preferences

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