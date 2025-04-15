# Assignment #5 - REST APIs

The description of this assignment can be found in Canvas at [Assignment #5](https://canvas.harvard.edu/courses/150064/assignments/906135) (Spring 2025)

You should build your application in this repo cloned for you in Github Classroom. You'll submit your project and github URLs in Canvas.

Testing SSH setup by appending a new line. // add new line to file

// CRUD Notes

// Create a Blog Post

curl -X POST http://174.138.46.237:8084/api/blogs \
     -H "Content-Type: application/json" \
     -d '{"title":"Test Post","content":"Just testing!","author":"Author","tags":["debug","test"]}'

// Read Blog Posts

curl -X GET http://174.138.46.237:8084/api/blogs

// Update Blog Posts

curl -X PUT http://174.138.46.237:8084/api/blogs/<id> \
     -H "Content-Type: application/json" \
     -d '{"title":"Updated Title","content":"Updated content"}'

// Delete a Blog

curl -X DELETE http://174.138.46.237:8084/api/blogs/<id>