import React, { useState, useEffect } from 'react'
import { ActionCableConsumer } from 'react-actioncable-provider'

function App() {
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/rooms')
    .then(r => r.json())
    .then(setRooms)
  }, [])

  function handleReceivedRoom(response) {
    console.log(response)
    const { room } = response
    setRooms(rooms => [...rooms, room])
  }
  console.log(rooms)

  return (
    <div className="App">
      <ActionCableConsumer 
        channel={{ channel: 'RoomsChannel' }}
        onReceived={handleReceivedRoom}
      />
    </div>
  );
}

export default App;
