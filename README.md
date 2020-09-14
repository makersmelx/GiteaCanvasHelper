### .env Setting

~~~shell
GITEA_BASE_URL=http://focs.ji.sjtu.edu.cn/git/api/v1/
CANVAS_BASE_URL=https://umjicanvas.com/api/v1/
GITEA_TOKEN=
CANVAS_TOKEN=
# for debug
CONNECTION=local
LOCAL_GITEA_URL=http://localhost:3000/api/v1/
LOCAL_GITEA_TOKEN=
~~~

Define CONNECTION and Set CONNECTION to 'local', so that the program will connect to local server (see axios/gitea.js) 

### Course Setting (Before running)

See src/Courses/courses.js

Update the course name or the course id on Canvas

### Command

~~~
npm start <usage> arg1 arg2 ... 
~~~



### Available Usage

- s: [createStudentTeam](#createStudentTeam)
- i: [initTeam](#initTeam)



### initTeam

According the group in a group set on Canvas, create relative teams on Canvas and add students to the team

**Warning: If a student are not added into a group in this group set on Canvas, for coding convenience, I will nothing about this student here. Please check him manually.**

~~~
npm start s <course name> <groupset name>
~~~

like

~~~
npm start s ve482 pgroup2
~~~



### CreateStudentTeam

Create a team called Student. Put all the students in this course on Canvas into this team

~~~
npm start i <course name>
~~~

like

~~~
npm start i ve482
~~~





