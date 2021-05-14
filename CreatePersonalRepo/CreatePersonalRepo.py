import requests
import json
import os
import re
import sys

dotenv_path = '.env'


def import_env():
    with open(dotenv_path) as dotenv:
        for line in dotenv:
            var = line.strip().split('=')
            if len(var) == 2:
                key, value = var[0].strip(), var[1].strip()
                os.environ[key] = value


course_name = sys.argv[1]
organization_name = sys.argv[2]
course_id_json_path = 'courses.json'

if __name__ == "__main__":
    import_env()

    canvas_base_url = os.environ['CANVAS_BASE_URL']
    gitea_base_url = os.environ['GITEA_BASE_URL']
    canvas_token = os.environ['CANVAS_TOKEN']
    gitea_token = os.environ['GITEA_TOKEN']
    with open(course_id_json_path) as json_file:
        course_id_dict = json.load(json_file)
        course_id = course_id_dict[course_name]

        url = canvas_base_url + '/courses/{}/students'.format(course_id)
        r = requests.get(url,
                         params={'access_token': canvas_token})

        student_list = json.loads(r.text)

        for student in student_list:
            student_sjtu_id = student['login_id']
            student_name = student['name']

            url = gitea_base_url + '/users/search'
            r = requests.get(url, params={
                'access_token': gitea_token,
                'q': student_sjtu_id,
            })

            user_list = json.loads(r.text)['data']
            if len(user_list) == 0:
                print('{} has not registered yet'.format(student_name))
                continue

            username = user_list[0]['username']

            repo_name = re.sub(r'[(\u4e00-\u9fa5), ]', '', student_name) + str(student_sjtu_id)

            # Create personal repo
            r = requests.post(url, {
                "auto_init": True,
                "description": "Personal repo for {} in {}".format(student_name, organization_name),
                "name": repo_name,
                "private": True,
            }, params={'access_token': gitea_token})

            url = gitea_base_url + \
                  '/repos/{}/{}/collaborators/{}'.format(organization_name, repo_name, username)
            r = requests.put(url, {'permission': 'write'}, params={
                'access_token': gitea_token})

            # delete here
            # url = gitea_base_url + '/orgs/{}/repos'.format(organization_name)
            # r = requests.delete(gitea_base_url + '/repos/{}/{}'.format(organization_name, repo_name),
            #                     params={'access_token': gitea_token})
