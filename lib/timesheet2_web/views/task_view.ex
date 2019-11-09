defmodule Timesheet2Web.TaskView do
  use Timesheet2Web, :view
  alias Timesheet2Web.TaskView

  def render("index.json", %{tasks: tasks}) do
    %{data: render_many(tasks, TaskView, "task.json")}
  end

  def render("show.json", %{task: task}) do
    %{data: render_one(task, TaskView, "task.json")}
  end

  def render("task.json", %{task: task}) do
    %{id: task.id,
      approved: task.approved,
      hours: task.hours,
      job_code: task.job_code,
      manager: task.manager}
  end
end
