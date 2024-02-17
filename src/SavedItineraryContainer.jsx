import React from 'react';

const SavedItineraryContainer = ({ savedItenory }) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        padding: '10px',
        margin: '10px',
        backgroundColor: 'lightgray',
        borderRadius: '6px',
      }}
    >
      {savedItenory.map(
        (itinerary, index) =>
          // Check if the index is odd
          index % 2 !== 0 && (
            <div key={index} style={{ marginBottom: '10px' }}>
              {itinerary.map((item, itemIndex) => (
                <div key={itemIndex}>
                  <p>{`Place: ${item.place}, Start Time: ${item.startTime}, End Time: ${item.endTime}`}</p>
                </div>
              ))}
            </div>
          )
      )}
    </div>
  );
};

export default SavedItineraryContainer;
