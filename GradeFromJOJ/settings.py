"""
Canvas fast grading script
by makersmelx <makersmelx@gmail.com>
"""

from datetime import datetime

"""
Get them on Canvas (look at the url of the assignment, you will know the id)
"""
# REQUIRED FIELDS
course_id = 0

# REQUIRED FIELDS
assignment_id = 0
"""
Get them on Canvas (look at the url of the assignment, you will know the id)
"""

"""
CSV path. Ignore this if you have type the file path in program arguments
Notice: all the column starts from 0
"""
# notice the csv should be exported from joj notice that this python script will be started in the root directory,
# write the path of the csv file according to GiteaCanvasHelper root directory
# REQUIRED
csv_path = ''

"""
the row that records the first student's scores
Start from 0, usually no need to change
REQUIRED
"""
content_row = 1
"""
the column that records student name
Start from 0, usually no need to change and no use
REQUIRED
"""
csv_name_column = 1

"""
the column that records SJTU id
Start from 0, usually no need to change
REQUIRED
"""
csv_sjtu_id_column = 2

"""
write all the column index (of the csv, start from 0) of the score that you would like to include
remember that for each column index please give them a weight in the second list
"""
# example: csv_score_column = [7, 8], weight = [0.1, 0.2], suppose that all data in one row is a list called row.
# Grade for this student is ``row[7] * 0.1 + row[8] * 0.2``
csv_score_column = [3]
weight = [0.1]

"""
adjust to canvas score
"""
# This adjust is applied after calculating Canvas score from csv and before bonus/deduction
# Modify the example below, the value should be the Canvas score
extra_adjust = {
    "517370910xxx": 10,
    "517370910xxy": -10
}

# direct reassign point on Canvas to a student, will do this after all the add-weight calculation, bonus and deduction
direct_reassign = {
    "517370910xxx": 100,
    "517370910xxy": 0
}


"""
Below are some features that are nonsense now
"""
# """
# How to decide the final submission time? Suppose you will define the time of the latest submission of three
# problems as the final submission time of this assignment, write down the column of the used time (in seconds) of
# three problems here
# """
# # Usually no need to fill this field if you are using from JOJ
# csv_last_submission_timestamp_column = []

# """
# Date settings
# """
# # Usually no need to fill these field if you are using from JOJ
#
# start_date = datetime(2020, 9, 25)
#
# due_date = datetime(2020, 10, 11, 23, 59, 59)
# # late deduction is multiplied to the full point of this assignment rather than the current score rather than,
# # and then deducted from the current score
# # late_deduction = [0.1, 0.1, 0.1] means 10% deduction per day, and 0 pt for more than three days
# late_deduction = []
#
# # Bonus settings
# has_bonus = False
# bonus_date = datetime(2020, 10, 4, 23, 59, 59)
# # bonus portion is multiplied to the current score rather than the full point of this assignment
# bonus_portion = 0.1
