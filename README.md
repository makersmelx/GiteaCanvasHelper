# Gitea and Canvas helper
This repo contains scripts that
- Upload students grade on Canvas based on their scores on JOJ
- Set students ready on Gitea based on their Canvas infomation

## Available Usage
### Python part

- [Create a personal repo for everyone in an organization](#Create a personal repo for everyone in an organization)
- [Grade Canvas from JOJ exported CSV](#Grade Canvas from JOJ exported CSV)

### Node.js part
- s: [createEveryoneTeam](#createEveryoneTeam)
- labLoop: [createEveryoneTeamLoop](#createEveryoneTeamLoop)
- i: [initTeam](#initTeam)



## .env Setting

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
Example is at example/.env.example.  Make a copy of it to the root dir. Rename it to .env

(Node.js part only): Define CONNECTION and Set CONNECTION to 'local', so that the program will connect to local server (see axios/gitea.js) 
If you have not set the environment variable, you will be asked to input it at the start of the program



## Node.js part
Run `npm install` before everything (skip it for Python usage)
~~~
npm start <usage> arg1 arg2 ... 
~~~
### Course Setting (Before running)

See example/courses.json.example. Make a copy of it to the root dir. Rename it to courses.json

Update the course name or the id of the course on Canvas


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


### To loop in the lab (to be fixed)
It will in a loop run createEveryoneTeam and Create a personal repo for everyone in an organization

I don't know what I am writing now......

`It will be fixed if I remember this and that time I am bored.`
~~~shell
./loop.sh
~~~


## Python Part
### Create a personal repo for everyone in an organization
Notice that it only works when the working dir is this `GiteaCanvasHelper` root directory. \
On Gitea, every student will have his own personal repository with name `${his_name}${sjtu_id}`\
the Python program shares the same environment variable with Node.js in .env
~~~shell
python CreatePersonalRepo/CreatePersonalRepo.py
~~~

### Grade Canvas from JOJ exported CSV
See `GradeFromJOJ` folder \
Notice that it only works when the working dir is this `GiteaCanvasHelper` root directory.
It is used to upload grades on Canvas based on JOJ 1.0 score. But you can also use this script to upload scores on Canvas based on your own csv file (you should include students' sjtu id. OR you can think that your csv should have the same first three columns as JOJ 1.0 csv format)
1. Set `CANVAS_TOKEN` at .env in `GiteaCanvasHelper` root directory
2. Modify all the settings in `settings.py`
3. You must set a default grade for this assignment before running this script
~~~shell script
python GradeFromJOJ/GradeFromJOJ.py
~~~

