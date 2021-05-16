# Gitea and Canvas helper
This repo contains scripts that
- Upload students grade on Canvas based on their scores on JOJ
- Set students ready on Gitea based on their Canvas information

## Available Usage
### Python part

- [Create a personal repo for everyone in an organization](#CreatePersonalRepo)
- [Grade Canvas from JOJ exported CSV](#GradeFromJOJ)

### Node.js part
- [Create a team in the organization which have all students of this course on Canvas page as its members.
](#createEveryoneTeam) while Its loop version is [Loop version](#createEveryoneTeamLoop).
- [According the group in a group set on Canvas, create relative teams on Canvas and add students to the team
](#initTeam)



## .env Setting

~~~shell
GITEA_BASE_URL=https://focs.ji.sjtu.edu.cn/git/api/v1/
CANVAS_BASE_URL=https://umjicanvas.com/api/v1/
GITEA_TOKEN=
CANVAS_TOKEN=
# for local Gitea instance (not essential, can run without them)
CONNECTION=local
LOCAL_GITEA_URL=http://localhost:3000/api/v1/
LOCAL_GITEA_TOKEN=
~~~
Example is at example/.env.example.  Make a copy of it to the root dir. Rename it to .env

If you have not set the environment variable, you will be asked to input the missing variable through CLI at the start of the program.

(Only for testing local Gitea): If you would like to test your local Gitea instance, otherwise please ignore. Define CONNECTION and Set CONNECTION to 'local', so that the program will connect to local server (see axios/gitea.js) 

## Org and Team in Gitea
In Gitea, you cannot add a user to an organization directly. Instead, you should invite the user to at least one team in this organization, to add the user to the organization.

## Node.js part
Run `npm install` before everything (skip it for Python usage)
Basic usage will all be like:
~~~
npm start <usage> arg1 arg2 ... 
~~~

### Course Setting (Before running)

See example/courses.json.example. Make a copy of it to the root dir. Rename it to courses.json

Please update the course name, or the id of the course on Canvas.

For the below usage, please use the course name that appears in the json file.


### initTeam

According the group in a group set on Canvas, create relative teams on Canvas and add students to the team

**Notice: when group set name is `pgroup2`, this function will go through all the groups from all the group sets with name `pgroup2 {id}` rather than all the groups in the group set `pgroup2` on Canvas**

**Warning: If a student are not added into a group in this group set on Canvas, for coding convenience, I will nothing about this student here. Please check him manually.**


~~~
npm start i <course name> <Gitea org name> <groupset name>
~~~

like

~~~
npm start i ve482 ve482-org pgroup2
~~~



### CreateEveryoneTeam

Create a team in the organization which have all students of this course on Canvas page as its members.

Notice that this function will only add students who have registered on Gitea. If they are to be taught how to register on the lab, you can try loop version so that it can run itself.
~~~
npm start s <course name> <Gitea org name> <team name>
~~~

like

~~~
npm start s ve482 ve482-org Students
~~~


### CreateEveryoneTeamLoop(under maintainance)

Loop version of CreateEveryoneTeam. Create a team in the organization which have all students of this course on Canvas page as its members.
. Repeat this every <interval> ms.

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
### CreatePersonalRepo
Create a personal repo for everyone in an organization.

Notice that it only works when the working dir is this `GiteaCanvasHelper` root directory.

On Gitea, every student will have his own personal repository with name `${his_name}${sjtu_id}`

This Python program shares the same environment variable with Node.js in .env

Make sure the first arg is in the course.json
~~~shell
python CreatePersonalRepo/CreatePersonalRepo.py [course name] [organization name]
~~~

### GradeFromJOJ
Grade Canvas from JOJ exported CSV.

See `GradeFromJOJ` folder 

Notice that it only works when the working dir is this `GiteaCanvasHelper` root directory.

It is used to upload grades on Canvas based on JOJ 1.0 score. 

1. Set `CANVAS_TOKEN` at .env in `GiteaCanvasHelper` root directory
2. Modify all the settings in `settings.py`
3. You must set a default grade for this assignment for each student before running this script

You can also use this script to upload scores on Canvas based on your own csv file (you should include students' sjtu id. OR if your csv have the same first three columns as JOJ 1.0 csv format)

~~~shell script
python GradeFromJOJ/GradeFromJOJ.py
~~~

