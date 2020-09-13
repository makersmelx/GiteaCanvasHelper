### .env Setting

~~~
GITEA_BASE_URL=http://focs.ji.sjtu.edu.cn/git/api/v1/
CANVAS_BASE_URL=https://umjicanvas.com/api/v1/
GITEA_TOKEN=
CANVAS_TOKEN=
~~~



### initTeam

According the group in a group set on Canvas, create relative teams on Canvas and add students to the team

**Warning: If a student are not added into a group in this group set on Canvas, for coding convenience, I will nothing about this student here. Please check him manually.**

#### Usage

~~~
npm start <course name> <groupset name>
~~~

like

`npm start ve482 pgroup2`

