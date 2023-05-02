# database docs

This code imports all types from a file located at "../../contracts/types" and then declares an interface called "ProjectDao".
The interface contains several functions that define the behavior of a project data access object that interacts with a database.
The functions are as follows:

- `createProject(newProject: type.CreateProjectDB)`:
  This function receives an argument of type CreateProjectDB from the imported type module and returns a promise that resolves to a number.

- `getProject(project_id: number)`: This function receives an argument of type number and returns a promise that resolves to a Project object imported from the type module.

- `getProjectCopy(project_id: number)`: This function receives an argument of type number and returns a promise that resolves to a ProjectCopy object imported from the type module.

- getProjects(user_id: string): This function receives an argument of type string and returns a promise that resolves to an array of Project objects.
  updateProjectName(project_id: number, name: string): This function receives two arguments, a number and a string, and updates the name of a project based on the project id.
  moveProjectToTrash(project_id: number): This function receives an argument of type number and moves a project to the trash based on project id.
  restoreProjectFromTrash(project_id: number): This function receives an argument of type number and restores a project from the trash based on project id.
  deleteProject(project_id: number): This function receives an argument of type number and deletes a project from the database based on project id.

Overall, this code declares an interface with functions that interact with a project database and defines the expected behavior of those functions.

This code defines an asynchronous function named createProject. The function takes an argument called newProjectDB of type type.CreateProjectDB. It returns a Promise that resolves to a number, which represents the ID of the project that was created.
Inside the function, an empty array named project is created. Then, an array of keys called keys is defined to maintain the order of keys from the newProjectDB object.
forEach loop is used to iterate over each key in the keys array, and the corresponding value from the newProjectDB object is pushed into the project array.
The function then tries to execute a SQL query to create a project using the conn object. If the query is successful, it resolves the Promise with the newly created project_id. If the SQL query fails, it rejects the Promise with the error.
