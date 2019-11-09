Timesheet Application:

Timesheet is an application to log and track user efforts on a job.

Objects in Timesheet Application:

Jobs: Jobs are the tasks on which users work and log and their effort.

Users: Users are the one who will be using this application. All employees 
including Manager will be Users.

Functionality: Workers: (A List of workers and their passwords are given below)

 1. Workers have to login by giving their email and password.
 2. Workers will have a screen to check their timesheets status, see the jobs 
    which are present in the jobs table.
 3. Workers can submit their timesheet by entering effort on a particular job.
    If the logged hours are greater than 8, system will show error.

Managers: (A List of manager and their passwords are given below)

1. Manager can approve timesheets of workers for whom they are supervising.
2. A manager may have many workers and the manager will be able to see and approve his workers.



Design Choices:

(******* NOTE: Users have to login first to submit and check timesheets *******)

1. All the users of timesheet application are present in a single table and all users will
have a Manager and the manager's manager will be himself.
2. There will be a path(repository) for checking which all jobs are available for the users to 
submit a timesheet. No longer than 8 hour rule is enforced.
3. There will be a path for the users to check the timesheet. This is a table where all the 
User's timesheet will be visible. 
4. When the Manager login, he will be able to approve Timesheets for Users he is supervising
   When a manager Logs out, the page will not be cleared. if any user tries to access Manager's
   stuff, he will be getting Access Denied Message.
5. Once the manager approves a timesheet, he can check the status by navigating to "CheckStatus",
all other Users can check their status by navigating to that path.
6. Manager will approve each task by clicking on "Approve Button" and that status will be reflected
   in CheckSheets.
7. Any user can  perform operations if they are logged in and if they have Correct Access. 
8. There will be a notification bar, which will be only visible to the Manager. The table will con
-tain all the tasks which are less than 8 hours.
9. Users can access Jobs page,  timesheet page(data will not logged to database), without loggin in.
 

 Note:
 1. Messages are not being cleared
 2. after the user log outs, his last page will be still visible, but other users cannot 
 perform any operations on that(validation present).

Managers:

alice@example.com (alice (id = 1) 

Workers: 
bob@example.com (bob id = 2)
charlie@example.com (id = 3, manager = alice (id = 1))

Jobs: VAOR01 VAOR02 VAOR03 VAOR04 
password : password for all the users


