aitribe launchpad rating app

The functionalities supported
1) Add the course
2) View all the courses
3) View the course information
4) Get the average rating of the course
5) Modify the average rating of the course

packages to be installed

body-parser
cors
express

Commands to be run

1) Installing the packages - npm install
2) Starting the server - nodemon index.js


1) curl to create the course (Modify the course name and other details as per the need)
Method: POST

curl -X POST -d '{"course": "node js","courseId": 1,"cohort": 1,"college": "Lovely professional university","semester": 2,"instructor": "Pawan Panjwani","averageRating": 0}' -H 'Content-Type: application/json' 'http://localhost:3000/courses' | jq

2) curl to get the course info
Method: GET

curl 'http://localhost:3000/courses/4' | jq

3) curl to get all the courses
Method GET

curl 'http://localhost:3000/courses' | jq

4) curl to get the average rating of the course
Method GET

curl 'http://localhost:3000/courses/1/averageRating' | jq

5) curl to modify the average rating of the course
Method: POST

curl -X POST -d '{"rating":10}' -H 'Content-Type: application/json' 'http://localhost:3000/courses/2/averageRating'

