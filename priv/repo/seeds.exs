# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Timesheet2.Repo.insert!(%Timesheet2.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Timesheet2.Repo
alias Timesheet2.Users.User
alias Timesheet2.Jobs.Job

pass = Argon2.hash_pwd_salt("password")

Repo.insert!(%User{username: "Alice", email: "alice@example.com", password_hash: pass, manager: 0})
Repo.insert!(%User{username: "Bob", email: "bob@example.com", password_hash: pass, manager: 1})
Repo.insert!(%User{username: "Charlie", email: "charlie@example.com", password_hash: pass, manager: 1})

Repo.insert!(%Job{job_code: "VAOR01", budget: 100, name: "Cyborg Arm", description: "Description for Cyborg Arm"})
Repo.insert!(%Job{job_code: "VAOR02", budget: 100, name: "Rat Cancer", description: "Description for Rat Cancer"})
Repo.insert!(%Job{job_code: "VAOR03", budget: 100, name: "Java Arm", description: "Description for Java Arm"})
Repo.insert!(%Job{job_code: "VAOR04", budget: 100, name: "Sobriety Pill", description: "Description for Sobriety Pill"})