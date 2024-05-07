

const SlotDisplay = () => {
  // Function to generate an array of time slots
  const generateTimeSlots = () => {
    const startTime = new Date();
    startTime.setHours(8, 0, 0); // Start from 8:00 AM
    const endTime = new Date();
    endTime.setHours(17, 0, 0); // End at 5:00 PM

    const timeSlots = [];
    let currentTime = new Date(startTime);

    while (currentTime < endTime) {
      const timeSlot = {
        start: new Date(currentTime),
        end: new Date(currentTime.getTime() + 15 * 60000) // Add 15 minutes
      };
      timeSlots.push(timeSlot);
      currentTime = timeSlot.end;
    }

    return timeSlots;
  };

  // Render time slots
  const renderTimeSlots = () => {
    const timeSlots = generateTimeSlots();

    return timeSlots.map((slot, index) => (
      <div key={index}>
        {slot.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
        {slot.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    ));
  };

  return (
    <div>
      <h2>Available Slots:</h2>
      {renderTimeSlots()}
    </div>
  );
};

export default SlotDisplay;
