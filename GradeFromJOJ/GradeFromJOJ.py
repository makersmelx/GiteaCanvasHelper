"""
Canvas fast grading script
by makersmelx <makersmelx@gmail.com>
"""

import utils
import os
import csv
from datetime import timedelta
from canvasapi import Canvas
import sys
import settings

canvas_full_score = sys.argv[4]
joj_full_score = sys.argv[5]
cli_weight = float(canvas_full_score)/float(joj_full_score)


def joj_score_to_canvas_score(_student):
    print('==============================')
    print("{}\t{}".format(
        _student[settings.csv_name_column], _student[settings.csv_sjtu_id_column]))
    _score = 0
    if len(settings.csv_score_column) != len(settings.weight):
        print("Make sure that you can add a weight to all the columns you would like to include")
        exit(1)
    if len(sys.argv) == 6:
        # if set canvas and joj full score in cli args, then simply use the full score on JOJ to calculate
        settings.weight = [cli_weight]
    for i in range(len(settings.csv_score_column)):
        _column_grade = _student[settings.csv_score_column[i]]
        # todo: complete non number detection
        if _column_grade == '-':
            _column_grade = 0
        _score += float(_column_grade) * settings.weight[i]

    # adjustment
    if _student[settings.csv_sjtu_id_column] in settings.extra_adjust:
        _adjust = settings.extra_adjust[_student[settings.csv_sjtu_id_column]]
        _score += _adjust
        print("Extra adjust: {}".format(_adjust))

    print('Now score: {}'.format(_score))

    if _student[settings.csv_sjtu_id_column] in settings.direct_reassign:
        _reassign = settings.direct_reassign[_student[settings.csv_sjtu_id_column]]
        _score = _reassign
        print('Score is directly re-assigned to: {}'.format(_reassign))
    print('==============================')
    return _score


if __name__ == '__main__':
    utils.import_env()
    canvas_base_url = os.environ['CANVAS_BASE_URL']
    canvas_token = os.environ['CANVAS_TOKEN']
    umji_canvas = Canvas('https://umjicanvas.com', canvas_token)
    course = umji_canvas.get_course(sys.argv[2])
    assignment = course.get_assignment(sys.argv[3])
    students = {}

    for _student in course.get_users(enrollment_type=['student']):
        students[_student.id] = _student.sis_login_id

    joj_scores = {}
    csv_path = sys.argv[1] if sys.argv[1] else settings.csv_path
    with open(csv_path) as joj_csv:
        joj_score = csv.reader(joj_csv)
        skip_line = 0
        for student_row in joj_score:
            if skip_line < settings.content_row:
                skip_line += 1
                continue
            score = joj_score_to_canvas_score(student_row)
            student_id = student_row[settings.csv_sjtu_id_column]
            joj_scores[student_id] = score

    all_submissions = assignment.get_submissions()

    for _submission in all_submissions:
        if _submission.user_id in students:
            this_student_sjtu_id = students[_submission.user_id]
            this_joj_score = joj_scores.get(this_student_sjtu_id, 0)
            print('SJTU ID:{}, Score:{}'.format(
                this_student_sjtu_id, this_joj_score))
        _submission.edit(submission={'posted_grade': this_joj_score})
