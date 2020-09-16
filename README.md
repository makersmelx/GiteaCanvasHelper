### .env Setting

~~~shell
GITEA_BASE_URL=https://focs.ji.sjtu.edu.cn/git/api/v1/
CANVAS_BASE_URL=https://umjicanvas.com/api/v1/
GITEA_TOKEN=
CANVAS_TOKEN=
# for debug
CONNECTION=local
LOCAL_GITEA_URL=http://localhost:3000/api/v1/
LOCAL_GITEA_TOKEN=
~~~

Define CONNECTION and Set CONNECTION to 'local', so that the program will connect to local server (see axios/gitea.js) 

If you have not set the environment variable, you will be asked to input it at the start of the program

### Course Setting (Before running)

See courses.json.example. Rename it to courses.json

Update the course name or the id of the course on Canvas


### Command

~~~
npm start <usage> arg1 arg2 ... 
~~~



### Available Usage

- s: [createEveryoneTeam](#createEveryoneTeam)
- labLoop: [createEveryoneTeamLoop](#createEveryoneTeamLoop)
- i: [initTeam](#initTeam)



### initTeam

According the group in a group set on Canvas, create relative teams on Canvas and add students to the team

**Warning: If a student are not added into a group in this group set on Canvas, for coding convenience, I will nothing about this student here. Please check him manually.**

~~~
npm start i <course name> <groupset name>
~~~

like

~~~
npm start i ve482 pgroup2
~~~



### CreateEveryoneTeam

Create a team, put all the students of this course on Canvas into this team

~~~
npm start s <course name> <team name>
~~~

like

~~~
npm start s ve482 Students
~~~


### CreateEveryoneTeamLoop

Create a team, put all the students of this course on Canvas into this team. Repeat this every <interval> ms.

~~~
npm start labLoop <course name> <team name> <interval>
~~~

like

~~~
npm start labLoop ve482 Students 30000
~~~





