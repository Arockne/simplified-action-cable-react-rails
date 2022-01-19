class RoomsController < ApplicationController
  def index
    render = Room.all
    render json: rooms, include: "**"
  end

  def create
    room = Room.find_by(name: params[:name]) || Room.create(room_params)
    ActionCable.server.broadcast 'rooms_channel', room
  end
end
