import styled from "styled-components";
import { useState } from "react";
import DayTimePicker from "@mooncake-dev/react-day-time-picker";
import axios from "axios"; // Import Axios for making HTTP requests

const MyCalendar = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scheduleStatus, setScheduleStatus] = useState("");

  const Container = styled.div`
    width: 475px;
    margin: 1em auto;
    padding: 1em;
    background-color: #fff;
    color: #333;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 2px 4px #00000018;
    @media (max-width: 520px) {
      width: 100%;
    }
  `;

  const handleDateTimeChange = (dateTime) => {
    setSelectedDateTime(dateTime);
  };
  const timeSlotValidator = (dateTime) => {
    // Check if the selected day is Monday (1) through Saturday (6)
    const dayOfWeek = dateTime.getDay();
    if (dayOfWeek >= 1 && dayOfWeek <= 6) {
      // Check if the selected time is between 9 am (09:00) and 5 pm (17:00)
      const hours = dateTime.getHours();
      if (hours >= 9 && hours < 17) {
        return true; // Valid time slot
      } else {
        return null; // Invalid time slot, don't display starting slots
      }
    }
    return false; // Invalid time slot
  };
  
  

  const handleScheduled = async (dateTime) => {
    try {
      setLoading(true);
      setScheduleStatus("Scheduling..");

      // Convert dateTime to ISO format
      const isoDateTime = dateTime.toISOString();

      // Calculate the end time based on the selected time slot (30 minutes)
      const endDateTime = new Date(dateTime.getTime() + 30 * 60000).toISOString();

      // Send the selected date and time to the backend
      const response = await axios.post("http://127.0.0.1:5000/create-event", {
        summary: "Scheduled Event", // You can customize the event summary here
        startDateTime: isoDateTime,
        endDateTime: endDateTime,
        timeZone: "America/Los_Angeles", // Replace with the appropriate time zone
      });

      // Check if the event was successfully created
      if (response.data.success) {
        setScheduleStatus("Your event has been scheduled!");
        console.log("Event created:", response.data.eventLink);
      } else {
        setScheduleStatus("Failed to create event");
        console.error("Failed to create event:", response.data.error);
      }
    } catch (error) {
      console.error("Error creating event:", error);
      setScheduleStatus("Error scheduling");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h3>Pick a Day and Time</h3>
      <DayTimePicker
        timeSlotSizeMinutes={30}
        value={selectedDateTime}
        onChange={handleDateTimeChange}
        onConfirm={handleScheduled} // Pass onConfirm prop
        confirmText="Schedule?"
        loadingText="Scheduling.."
        doneText="Your event has been scheduled!"
        disabled={loading}
        timeSlotValidator={timeSlotValidator}

      />
      {loading && <p>{scheduleStatus}</p>}
    </Container>
  );
};

export default MyCalendar;
