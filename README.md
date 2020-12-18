These are some scripts that I am using when syncing students information and grades from/to Canvas to/from Gitea and JOJ
### Available Usage
### Python part

- [Create a personal repo for everyone in an organization](#Create a personal repo for everyone in an organization)
- [Grade Canvas from JOJ exported CSV](#Grade Canvas from JOJ exported CSV)

#### Node part
Run `npm install` before everything (skip it for Python usage)
~~~
npm start <usage> arg1 arg2 ... 
~~~

- s: [createEveryoneTeam](#createEveryoneTeam)
- labLoop: [createEveryoneTeamLoop](#createEveryoneTeamLoop)
- i: [initTeam](#initTeam)



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

Example is at example/.env.example.  Make a copy of it to the root dir. Rename it to .env

If you have not set the environment variable, you will be asked to input it at the start of the program

### Course Setting (Before running)

See example/courses.json.example. Make a copy of it to the root dir. Rename it to courses.json

Update the course name or the id of the course on Canvas


### To loop in the lab (to be fixed)
It will in a loop run createEveryoneTeam and Create a personal repo for everyone in an organization

I don't know what I am writing now......

`It will be fixed if I remember this and that time I am bored.`
~~~shell
./loop.sh
~~~


### initTeam

According the group in a group set on Canvas, create relative teams on Canvas and add students to the team

**Notice: when groupset name is `pgroup2`, this function will go through all the groups with name `pgroup2 {id}` rather than all the groups in the group set `pgroup2` on Canvas**

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

### Create a personal repo for everyone in an organization
the Python program shares the same environment variable with Node.js in .env
~~~shell
python CreatePersonalRepo/CreatePersonalRepo.py
~~~

#### Grade Canvas from JOJ exported CSV
See `GradeFromJOJ` folder

Notice that it only works when starting from this `GiteaCanvasHelper` root directory.

1. Set `CANVAS_BASE_URL` and `CANVAS_TOKEN` at .env in `GiteaCanvasHelper` root directory
2. Modify all the settings in `settings.py`
3. You must set a default grade for this assignment
~~~shell script
python GradeFromJOJ/GradeFromJOJ.py
~~~

