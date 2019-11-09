defmodule Timesheet2.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :approved, :boolean, default: false, null: false
      add :hours, :integer
      add :job_code, :string
      add :manager, :integer

      timestamps()
    end

  end
end
