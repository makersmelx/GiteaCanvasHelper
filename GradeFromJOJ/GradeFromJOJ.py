import utils
import os
import csv
from datetime import timedelta
from canvasapi import Canvas
import settings


def joj_score_to_canvas_score(_student):
    print('==============================')
    print(_student[1])
    _score = 0
    if len(settings.csv_score_column) != len(settings.weight):
        print("Make sure that you can add a weight to all the columns you would like to include")
        exit(1)
    for i in range(len(settings.csv_score_column)):
        _column_grade = _student[settings.csv_score_column[i]]
        if _column_grade == '-':
            _column_grade = 0
        _score += float(_column_grade) * settings.weight[i]

    # adjustment
    if _student[settings.csv_sjtu_id_column] in settings.extra_adjust:
        _adjust = settings.extra_adjust[_student[settings.csv_sjtu_id_column]]
        _score += _adjust
        print("Extra adjust: {}".format(_adjust))

    # bonus or deduction
    bonus_second = 0
    if settings.has_bonus:
        bonus_second = (settings.bonus_date - settings.start_date).total_seconds()
    due_second = (settings.due_date - settings.start_date).total_seconds()

    # calculate final submission timestamp
    available_second = due_second + 3600 * 24 * 3 + 1
    last_submissions = []
    for item in settings.csv_last_submission_timestamp_column:
        if _student[item] != '-':
            last_submissions.append(int(_student[item]))
    finish_second = max(last_submissions) if len(last_submissions) > 0 else available_second

    finish_delta = timedelta(seconds=finish_second)
    finish_datetime = settings.start_date + finish_delta
    print('Submission at: {}'.format(finish_datetime))

    print('Raw score: {}'.format(_score))
    if settings.has_bonus and finish_second <= bonus_second:
        _score += _score * settings.bonus_portion
    elif finish_second > due_second:
        one_day_in_seconds = 3600 * 24
        max_late_day = len(settings.late_deduction)
        if max_late_day > 0:
            if finish_second > due_second + max_late_day * one_day_in_seconds:
                _score = 0
            else:
                for i in range(max_late_day):
                    if finish_second > due_second + i * one_day_in_seconds:
                        _score -= settings.late_deduction[i] * settings.full_points
                    else:
                        break
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
    course = umji_canvas.get_course(settings.course_id)
    assignment = course.get_assignment(settings.assignment_id)
    students = {}

    for _student in course.get_users(enrollment_type=['student']):
        students[_student.id] = _student.sis_login_id

    joj_scores = {}
    with open(settings.csv_path) as joj_csv:
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
            this_joj_score = int(joj_scores[this_student_sjtu_id])
        _submission.edit(submission={'posted_grade': this_joj_score})
