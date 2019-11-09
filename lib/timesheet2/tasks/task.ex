defmodule Timesheet2.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :approved, :boolean, default: false
    field :hours, :integer
    field :job_code, :string
    field :manager, :integer

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:approved, :hours, :job_code, :manager])
    |> validate_required([:approved, :hours, :job_code])
    |> validate_inclusion(:hours, 1..8)
  end
end
