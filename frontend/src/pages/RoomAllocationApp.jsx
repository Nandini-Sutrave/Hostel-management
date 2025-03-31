import React, { useState } from 'react';

// Sample data - replace with your actual API calls
const initialRooms = [
  { id: 101, building: 'A', floor: 1, type: 'Single', status: 'Occupied', studentId: 'ST001' },
  { id: 102, building: 'A', floor: 1, type: 'Single', status: 'Available', studentId: null },
  { id: 103, building: 'A', floor: 1, type: 'Double', status: 'Occupied', studentId: 'ST002' },
  { id: 104, building: 'A', floor: 1, type: 'Double', status: 'Available', studentId: null },
  { id: 201, building: 'B', floor: 2, type: 'Single', status: 'Occupied', studentId: 'ST003' },
  { id: 202, building: 'B', floor: 2, type: 'Single', status: 'Available', studentId: null },
  { id: 203, building: 'B', floor: 2, type: 'Double', status: 'Available', studentId: null },
  { id: 204, building: 'B', floor: 2, type: 'Double', status: 'Occupied', studentId: 'ST004' },
];

const initialStudents = [
  { id: 'ST001', name: 'John Doe', year: 2, preferences: 'Single room, Ground floor', currentRoom: 101 },
  { id: 'ST002', name: 'Jane Smith', year: 3, preferences: 'Single room, Quiet area', currentRoom: 103 },
  { id: 'ST003', name: 'Michael Johnson', year: 1, preferences: 'Double room', currentRoom: 201 },
  { id: 'ST004', name: 'Emily Williams', year: 4, preferences: 'Near library', currentRoom: 204 },
  { id: 'ST005', name: 'Robert Brown', year: 2, preferences: 'Ground floor', currentRoom: null },
  { id: 'ST006', name: 'Sarah Davis', year: 1, preferences: 'Double room', currentRoom: null },
];

// Main application
const RoomAllocationApp = () => {
  const [rooms, setRooms] = useState(initialRooms);
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    building: '',
    floor: '',
    roomType: '',
    status: ''
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const filteredRooms = rooms.filter(room => {
    return (
      (filters.building === '' || room.building === filters.building) &&
      (filters.floor === '' || room.floor.toString() === filters.floor) &&
      (filters.roomType === '' || room.type === filters.roomType) &&
      (filters.status === '' || room.status === filters.status)
    );
  });

  const filteredStudents = students.filter(student => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.name.toLowerCase().includes(searchLower) ||
      student.id.toLowerCase().includes(searchLower) ||
      (student.preferences && student.preferences.toLowerCase().includes(searchLower))
    );
  });

  const handleRoomClick = (room) => {
    setSelectedRoom(room);
    if (room.studentId) {
      const student = students.find(s => s.id === room.studentId);
      setSelectedStudent(student);
    } else {
      setSelectedStudent(null);
    }
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    if (student.currentRoom) {
      const room = rooms.find(r => r.id === student.currentRoom);
      setSelectedRoom(room);
    } else {
      setSelectedRoom(null);
    }
  };

  const openAssignModal = (student) => {
    setSelectedStudent(student);
    setShowAssignModal(true);
  };

  const assignRoom = (studentId, roomId) => {
    // Update room status
    const updatedRooms = rooms.map(room => {
      if (room.id === roomId) {
        return { ...room, status: 'Occupied', studentId };
      }
      
      // If student is moving from another room, update the old room
      if (studentId && room.studentId === studentId) {
        return { ...room, status: 'Available', studentId: null };
      }
      
      return room;
    });
    
    // Update student's room assignment
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return { ...student, currentRoom: roomId };
      }
      return student;
    });
    
    setRooms(updatedRooms);
    setStudents(updatedStudents);
    setShowAssignModal(false);
  };

  const AssignRoomModal = () => {
    const [selectedRoomId, setSelectedRoomId] = useState('');
    
    const availableRooms = rooms.filter(room => room.status === 'Available');
    
    return (
      <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg">
          <h2 className="mb-4 text-xl font-semibold">
            Assign Room for {selectedStudent?.name}
          </h2>
          
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Select Room:</label>
            <select 
              className="w-full p-2 border border-gray-300 rounded-md"
              value={selectedRoomId}
              onChange={(e) => setSelectedRoomId(Number(e.target.value))}
            >
              <option value="">-- Select a room --</option>
              {availableRooms.map(room => (
                <option key={room.id} value={room.id}>
                  Room {room.id} - Building {room.building}, Floor {room.floor}, {room.type}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button 
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={() => setShowAssignModal(false)}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
              disabled={!selectedRoomId}
              onClick={() => assignRoom(selectedStudent.id, Number(selectedRoomId))}
            >
              Assign Room
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="container flex items-center justify-between px-4 py-3 mx-auto">
          <h1 className="text-xl font-bold">Room Allocation System</h1>
          <div className="text-sm">
            <span>Warden Dashboard</span>
          </div>
        </div>
      </header>

      <div className="container p-4 mx-auto mt-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Search and Student List */}
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-lg font-semibold">Students</h2>
            
            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by name, ID or preferences..."
                className="w-full p-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Student List */}
            <div className="h-96 overflow-y-auto border border-gray-200 rounded-md">
              {filteredStudents.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <li 
                      key={student.id}
                      className={`p-3 cursor-pointer hover:bg-gray-50 ${selectedStudent?.id === student.id ? 'bg-indigo-50' : ''}`}
                      onClick={() => handleStudentClick(student)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-gray-600">ID: {student.id}</p>
                        </div>
                        <div className="text-sm text-gray-600">
                          {student.currentRoom ? `Room ${student.currentRoom}` : 'No Room'}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No students found matching your search
                </div>
              )}
            </div>
          </div>

          {/* Room Grid */}
          <div className="lg:col-span-2">
            <div className="p-4 mb-4 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-lg font-semibold">Room Filter</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Building</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.building}
                    onChange={(e) => setFilters({...filters, building: e.target.value})}
                  >
                    <option value="">All</option>
                    <option value="A">Building A</option>
                    <option value="B">Building B</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Floor</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.floor}
                    onChange={(e) => setFilters({...filters, floor: e.target.value})}
                  >
                    <option value="">All</option>
                    <option value="1">Floor 1</option>
                    <option value="2">Floor 2</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Room Type</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.roomType}
                    onChange={(e) => setFilters({...filters, roomType: e.target.value})}
                  >
                    <option value="">All</option>
                    <option value="Single">Single</option>
                    <option value="Double">Double</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium">Status</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={filters.status}
                    onChange={(e) => setFilters({...filters, status: e.target.value})}
                  >
                    <option value="">All</option>
                    <option value="Available">Available</option>
                    <option value="Occupied">Occupied</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-md">
              <h2 className="mb-4 text-lg font-semibold">Rooms</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {filteredRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`p-3 border rounded-md cursor-pointer 
                      ${room.status === 'Available' ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50'} 
                      ${selectedRoom?.id === room.id ? 'ring-2 ring-indigo-500' : ''}`}
                    onClick={() => handleRoomClick(room)}
                  >
                    <div className="text-center">
                      <p className="font-medium">Room {room.id}</p>
                      <p className="text-xs">Building {room.building}, Floor {room.floor}</p>
                      <p className="text-xs">{room.type}</p>
                      <p className={`mt-1 text-xs font-semibold ${room.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                        {room.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Details and Assignment Panel */}
        {(selectedStudent || selectedRoom) && (
          <div className="p-4 mt-6 bg-white rounded-lg shadow-md">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {selectedStudent && (
                <div>
                  <h2 className="mb-4 text-lg font-semibold">Student Details</h2>
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p><span className="font-medium">Name:</span> {selectedStudent.name}</p>
                    <p><span className="font-medium">ID:</span> {selectedStudent.id}</p>
                    <p><span className="font-medium">Year:</span> {selectedStudent.year}</p>
                    <p><span className="font-medium">Preferences:</span> {selectedStudent.preferences}</p>
                    <p><span className="font-medium">Current Room:</span> {selectedStudent.currentRoom ? `Room ${selectedStudent.currentRoom}` : 'None'}</p>
                    
                    <div className="mt-4">
                      <button
                        onClick={() => openAssignModal(selectedStudent)}
                        className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                      >
                        {selectedStudent.currentRoom ? 'Change Room' : 'Assign Room'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedRoom && (
                <div>
                  <h2 className="mb-4 text-lg font-semibold">Room Details</h2>
                  <div className="p-4 border border-gray-200 rounded-md">
                    <p><span className="font-medium">Room Number:</span> {selectedRoom.id}</p>
                    <p><span className="font-medium">Building:</span> {selectedRoom.building}</p>
                    <p><span className="font-medium">Floor:</span> {selectedRoom.floor}</p>
                    <p><span className="font-medium">Type:</span> {selectedRoom.type}</p>
                    <p><span className="font-medium">Status:</span> {selectedRoom.status}</p>
                    <p>
                      <span className="font-medium">Occupant:</span> {
                        selectedRoom.studentId ? 
                          (students.find(s => s.id === selectedRoom.studentId)?.name || 'Unknown') : 
                          'None'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Modals */}
      {showAssignModal && <AssignRoomModal />}
    </div>
  );
};

export default RoomAllocationApp;