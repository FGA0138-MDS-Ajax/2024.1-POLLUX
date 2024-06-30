# app/controllers/tasks_controller.rb
class TasksController < ApplicationController
    before_action :set_task, only: %i[show update destroy]
    skip_before_action :set_task, only: :batch_update
  
    # GET /tasks
    def index
      @tasks = Task.all.order(:position)
      render json: @tasks
    end
  
    # GET /tasks/:id
    def show
      render json: @task
    end
  
    # POST /tasks
    def create
        Rails.logger.info "Task Params: #{task_params.inspect}"
        @task = Task.new(task_params)
    
        if @task.save
          render json: @task, status: :created
        else
          Rails.logger.error "Task Errors: #{@task.errors.full_messages}"
          render json: @task.errors, status: :unprocessable_entity
        end
    end
  
    # PATCH/PUT /tasks/:id
    def update
      if @task.update(task_params)
        render json: @task
      else
        render json: @task.errors, status: :unprocessable_entity
      end
    end
  
    # DELETE /tasks/:id
    def destroy
      @task.destroy
      head :no_content
    end
  
    # PATCH /tasks/batch_update
    def batch_update
      if params[:tasks].blank?
        render json: { error: "No tasks provided for batch update" }, status: :unprocessable_entity
        return
      end

      Task.transaction do
        params[:tasks].each do |task_params|
          task = Task.find(task_params[:id])
          task.update!(task_params.permit(:position, :status))
        end
      end

      render json: { status: 'ok' }
    rescue => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  
    private
  
    def set_task
      @task = Task.find_by(id: params[:task_id] || params[:id])
      unless @task
        render json: { error: "Task not found with ID #{params[:task_id] || params[:id]}" }, status: :not_found
      end
    end
  
    def task_params
        params.require(:task).permit(:title, :assignee, :status, :position)
    end
  end
  