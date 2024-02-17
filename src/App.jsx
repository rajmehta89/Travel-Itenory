import React, { useState, useEffect } from 'react';
import ItineraryCard from './ItenoryCard.jsx';
import SavedItineraryContainer from './SavedItineraryContainer';

export function App(props) {
  const [newPlace, setNewPlace] = useState('');
  const [savedItenory, setSavedItenory] = useState([]);
  const [itinerary, setItinerary] = useState([]);

  useEffect(() => {
    // Append the current itinerary to the savedItenory array
    setSavedItenory(prevSavedItenory => [...prevSavedItenory, savedItenory]);
  }, [itinerary]);

  const handleSave = () => {
    if (newPlace) {
      setItinerary(prevItinerary => [
        ...prevItinerary,
        {
          place: newPlace,
          startTime: '00:00',
          endTime: '00:00',
          id: new Date(),
        },
      ]);
      setNewPlace('');
    }
  };

  const handleDelete = id => {
    setItinerary(prevItinerary => prevItinerary.filter(item => item.id !== id));
  };

  const handleTimeChange = (id, startTime, endTime) => {
    setItinerary(prevItinerary =>
      prevItinerary.map(item =>
        item.id === id ? { ...item, startTime, endTime } : item
      )
    );
  };

  const [items, setItems] = useState([
    {
      id: 1,
      title: 'Section 1',
      content: 'Content for Section 1',
      isOpen: false,
      day: 'Monday,january 2024',
    },
    {
      id: 2,
      title: 'Section 2',
      content: 'Content for Section 2',
      isOpen: false,
      day: 'Tuesday,january 2024',
    },
    {
      id: 3,
      title: 'Section 3',
      content: 'Content for Section 3',
      isOpen: false,
      day: 'Wednesday,january 2024',
    },
  ]);

  const handleToggle = itemId => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, isOpen: !item.isOpen } : item
      )
    );
  };

  const AccordionItem = ({ date, title, isOpen, onToggle }) => {
    return (
      <div>
        <div
          onClick={onToggle}
          style={{ cursor: 'pointer', marginBottom: '8px' }}
        >
          {date}
        </div>
        {isOpen && (
          <div>
            {savedItenory.length > 1 && (
              <SavedItineraryContainer savedItenory={savedItenory} />
            )}
            <input
              type='text'
              placeholder='Enter place'
              value={newPlace}
              onChange={e => setNewPlace(e.target.value)}
              style={{
                padding: '10px',
                margin: '5px',
                fontSize: '16px',
                width: '300px',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <button
              onClick={handleSave}
              style={{
                cursor: 'pointer',
                backgroundColor: '#2196F3',
                color: 'white',
                padding: '10px 12px',
                borderRadius: '4px',
              }}
            >
              Save
            </button>
            {itinerary?.map(item => (
              <ItineraryCard
                key={item.id}
                place={item.place}
                startTime={item.startTime}
                endTime={item.endTime}
                onDelete={() => handleDelete(item.id)}
                onTimeChange={(startTime, endTime) =>
                  handleTimeChange(item.id, startTime, endTime)
                }
                onItenoryChange={setItinerary}
                setSavedItenory={setSavedItenory}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='App'>
      <div>
        <h2>Accordion</h2>
        {items.map(item => (
          <AccordionItem
            key={item.id}
            date={item.day}
            title={item.title}
            isOpen={item.isOpen}
            onToggle={() => handleToggle(item.id)}
          />
        ))}
      </div>
    </div>
  );
}

// Log to console
console.log('Hello console');
