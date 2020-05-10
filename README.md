# TodoMVC

## Assignment Overview
This is a todolist application that allows user to perform CRUD operation on it, i.e. CREATE,
READ, UPDATE, DELETE

## Demo Link on Features Implemented Thus Far
Screencast Link: http://youtu.be/YQLKsTJyh90?hd=1
Note: Demo performed on local PC FE running at http://localhost:3000/while BE running at http://localhost:8000/api/todos/



## Features Implemented
a. CRUD Features
- User is able to add new to-do-items to their to-do-lists (CREATE)
- User is able to view their to-do-list items (READ)
- User is able to update the status of their to-do-list-items (UPDATE)
- User is able to update the status of their to-do-list-items (DELETE)
- User is able to update the title of their to-do-list items (UPDATE)
- User is able to view the remaining to-do-list-items at the footer section of the to-do-list container (READ)

## Project folder description
There main project folders and files in this application are as below:
i. Backend
Backend contains the Django backend that was configured to handle the CRUD operation
route to it via API. Inside the backend folder, apart from the Django file, there are also the
Docker and bashfile that was used to build the docker image.
The Docker container for backend was successfully built with Postgres and Nginx
and is hosted on docker hub. 
```
dockerjy93/docker_todolist_backend
```

ii. Frontend
Frontend contains the VueJS todolist application that was cloned from todomvc.com.
It also contains the Docker file that is needed to containarized it in Docker.
Note: Currently, the build for the Docker container was not successful.Based on
the error log, it seems like the NPM run build command cannot be executed as the
build script in the package.json file is not there as compared to the rest of the Vue application
that was created from scratch, there will usually be a build script attribute in the
package.json file.

iii. Nginx
Nginx is the folder that contains the Docker and nginx.conf file that is used to configure
the Gunicorn application server to interface with the todo list application.

## Bugs and Limitations Discovered
The two limitations with the web application discovered thus far is as below:
1. Clicking on the checkbox button on the left hand side of "What Needs to Be Done" does not allow the user
to do a bulk update all the status of the to-do-list items to the database.
2. The remove completed button functionality is not fully implemented yet as it does not remove the 
completed to-do-list items from display

## Features to be implemented in the future
1. To implement the dockerization of the frontend VueJS application
2. To implement the bulk update of the to-do-list items to the database when user clicked on the
checkbox beside "What needs to be done"
3. To implement the remove completed button functionality that allows the completed to-do-list items to be
removed from display.

## Test Cases (Manual Testing)
| Test Case     | Description                   | Outcome  |
| ------------- |-----------------------------  | -------- |
|1              | Users will be able to add in new to-do-items. Once they press enter, the to-do-item will persist in the database. | Pass     |
|2              | User will be able to delete completed to-do-list items. Once they click on the X button on the right, the item will be deleted from the database. | Pass     |
|3              | User will be able to update the status of each to-do-list-items by clicking on the check-box on their left. | Pass     |
|4              | User will be able to update the title of each to-do-list items after they have completed changing the title of the to-do-list items | Pass     |
|5              | User will be able to view their to-do-list items. | Pass     |
|6              | The to-do-lists will re-render after each CRUD action performed by the user. | Pass     |
|6              | User is able to view their remaining to-do-list items no matter they clicked on either the All, Active or Completed tab at the footer section | Pass     |

Credits & Acknowledgements:
Below are some of the useful articles that I have come across when trying to figure out how to perform containerization
in Docker. 
1. https://uwsgi-docs.readthedocs.io/en/latest/tutorials/Django_and_nginx.html
2. https://github.com/twtrubiks/docker-django-nginx-uwsgi-postgres-tutorial/blob/master/README.en.md
3. https://testdriven.io/blog/dockerizing-django-with-postgres-gunicorn-and-nginx/#gunicorn
4. https://medium.com/@samy_raps/flask-vue-mysql-on-docker-part-i-ii-lets-dockerize-1ca3737ebc7c
