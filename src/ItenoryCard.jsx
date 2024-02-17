import React, { useState } from 'react';
import TimePicker from 'react-time-picker';

const ItineraryCard = ({
  place,
  startTime,
  endTime,
  onDelete,
  onTimeChange,
  onItenoryChange,
  setSavedItenory,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newStartTime, setNewStartTime] = useState(startTime);
  const [newEndTime, setNewEndTime] = useState(endTime);
  const [displayTime, setDisplayTime] = useState(false);

  const handleSaveAfterChange = () => {
    onItenoryChange(prevItinerary => [
      ...prevItinerary,
      { startTime: newStartTime, endTime: newEndTime, id: Date.now() },
    ]);

    const makeItenory = {
      place: place,
      startTime: newStartTime,
      endTime: newEndTime,
      id: Date.now(),
    };

    setSavedItenory(makeItenory);
  };

  const handleEdit = () => {
    setDisplayTime(true);
    setEditMode(true);
  };

  const handleSave = () => {
    onTimeChange(newStartTime, newEndTime);
    setDisplayTime(true);
    setEditMode(false);
  };

  const headerStyle = {
    fontSize: '2rem',
    color: '#333', // Set your desired color
    marginBottom: '10px',
  };

  const timeStyle = {
    fontSize: '1.5rem',
    color: '#666', // Set your desired color
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        backgroundColor: 'white',
        color: 'black',
        borderRadius: '6px',
      }}
    >
      <h1 style={headerStyle}>{place}</h1>
      <h2 style={timeStyle}>
        {!displayTime ? `${newStartTime}->${newEndTime}` : null}
      </h2>

      {editMode ? (
        <div>
          <TimePicker
            value={newStartTime}
            onChange={time => setNewStartTime(time)}
            format='HH:mm'
            clearIcon={null}
            disableClock
            placeholder='Select start time'
          />
          <TimePicker
            value={newEndTime}
            onChange={time => setNewEndTime(time)}
            format='HH:mm'
            clearIcon={null}
            disableClock
            placeholder='Select end time'
          />
          <button
            onClick={handleSave}
            style={{
              cursor: 'pointer',
              backgroundColor: '#2196F3',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
            }}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row', // or 'column' for vertical alignment
              justifyContent: 'center', // or other values like 'flex-start', 'flex-end', 'center', 'space-around', 'space-evenly'
              alignItems: 'center', // or other values like 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'
              gap: '16px', // or other spacing values
              marginTop: '8px',
            }}
          >
            <div
              style={{
                cursor: 'pointer',
                backgroundColor: '#2196F3',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
              onClick={handleEdit}
            >
              Set Duration
            </div>
            <button
              onClick={handleSaveAfterChange}
              style={{
                cursor: 'pointer',
                backgroundColor: '#2196F3',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
            >
              Save
            </button>
            <button
              onClick={onDelete}
              style={{
                cursor: 'pointer',
                backgroundColor: '#2196F3',
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItineraryCard;
