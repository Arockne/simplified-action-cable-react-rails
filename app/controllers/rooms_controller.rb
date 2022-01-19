class RoomsController < ApplicationController
  def index
    rooms = Room.all
    render json: rooms, include: "**"
  end

  def create
    room = Room.find_by(name: params[:name]) || Room.create(room_params)
    ActionCable.server.broadcast 'rooms_channel', room
  end

  private

  def room_params
    params.permit(:name)
  end
end
