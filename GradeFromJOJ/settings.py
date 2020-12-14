from datetime import datetime

# Get them on Canvas (look at the website url, you will know the id)
course_id = 1826
assignment_id = 14865

full_points = 100

"""
CSV
Notice: all the column starts from 0
"""
# notice the csv should be exported from joj notice that this python script will be started in the root directory,
# write the path of the csv file according to GiteaCanvasHelper root directory
csv_path = 'tmp/Project1FinalTest.csv'
# the row of the first student
content_row = 1
# the column that records SJTU id
csv_sjtu_id_column = 2

"""
write all the column index (of the csv, start from 0) of the score that you would like to include
remember that for each column index please give them a weight in the second list
example: csv_score_column = [7, 8], weight = [1, 2], final grade is ``csv[7] * 1 + csv[8] * 2``
"""
csv_score_column = [3]
weight = [0.1]

"""How to decide the final submission time? Suppose you will define the time of the latest submission of three 
problems as the final submission time of this assignment, write down the column of the used time (in seconds) of 
three problems here """
csv_last_submission_timestamp_column = [9, 48]

"""
Date settings
"""
start_date = datetime(2020, 9, 25)

due_date = datetime(2020, 10, 11, 23, 59, 59)
# late deduction is multiplied to the full point of this assignment rather than the current score rather than,
# and then deducted from the current score
# late_deduction = [0.1, 0.1, 0.1] means 10% deduction per day, and 0 pt for more than three days
late_deduction = [0.1, 0.1, 0.1]

# Bonus settings
has_bonus = True
bonus_date = datetime(2020, 10, 4, 23, 59, 59)
# bonus portion is multiplied to the current score rather than the full point of this assignment
bonus_portion = 0.1

# adjust to canvas score
extra_adjust = {
    "517370910104": 18,
    "518021910935": 36,
    "517370910011": 17,
    "517370910241": 64,
    "516370910123": 23,
    "517370910054": 18,
}

# direct reassign point on Canvas to a student, will do this after all the add-weight calculation, bonus and deduction
direct_reassign = {

}
