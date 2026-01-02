import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { http } from "@/utils/axios";
import { useToast } from "@/hooks/use-toast";

// Calendar Selection Page
function CalendarSelection() {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingFullDays, setBookingFullDays] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  useEffect(() => {
    const fetchBookingFullDays = async () => {
      // setIsLoading(true);
      try {
        const response = await http.get(
          "/api/auth/appointments/bookings/full-days"
        );
        if (response.data.data && response.data.data.length > 0) {
          const bookingFullDaysEvents = response.data.data.map((day) => ({
            title: "Booking Full",
            start: day,
            display: "background",
            backgroundColor: "rgba(239, 68, 68, 0.05)",
            classNames: ["busy-day"],
          }));
          setBookingFullDays(bookingFullDaysEvents);
          // setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching busy days:", error);
        // setIsLoading(false);
      }
    };

    fetchBookingFullDays();
  }, []);

  const handleDateSelect = (info) => {
    const selectedDateObj = new Date(info.dateStr);
    selectedDateObj.setHours(0, 0, 0, 0);

    // Check if the selected date is in the past
    if (selectedDateObj < today) {
      toast({
        variant: "destructive",
        description: "Please select a date from today onwards.",
      });
      return;
    }

    const selectedDateStr = info.dateStr;
    const isBusy = bookingFullDays.some((day) => day.start === selectedDateStr);

    if (isBusy) {
      toast({
        variant: "destructive",
        description:
          "This day is already fully booked. Please select another date.",
      });
      return;
    }

    setSelectedDate(info.date);
  };

  const dayCellDidMount = (info) => {
    const { el, date } = info;
    const dateObj = new Date(date);
    dateObj.setHours(0, 0, 0, 0);

    // Check if this date is in the past
    if (dateObj < today) {
      el.classList.add("disabled-date");

      // Create and append the disabled indicator
      const disabledOverlay = document.createElement("div");
      disabledOverlay.className = "disabled-overlay";
      el.appendChild(disabledOverlay);
    }

    // Check if this is today's date
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    if (dateObj.getTime() === todayDate.getTime()) {
      el.classList.add("today-date");
    }

    // Check if this is the selected date
    if (selectedDate) {
      const selectedDateObj = new Date(selectedDate);
      selectedDateObj.setHours(0, 0, 0, 0);
      if (dateObj.getTime() === selectedDateObj.getTime()) {
        el.classList.add("selected-date");
      }
    }
  };

  const handleGo = () => {
    localStorage.setItem("selectedDate", selectedDate.toISOString());
    navigate("/appointment/form");
  };

  return (
    <div className="container mx-auto mt-20 bg-gradient-to-r from-[#141122] to-secondary-500 text-white rounded-lg shadow-lg p-6">
      <style>
        {`
          .today-date {
            background-color: #727272 !important;
            color: white !important;
            font-weight: bold !important;
          }
          
          .selected-date {
            background-color: #8b5cf6 !important;
            color: white !important;
            font-weight: bold !important;
          }
          
          .selected-date:hover {
            background-color: #7c3aed !important;
          }
          
          .today-date:hover {
            background-color: #110E0E !important;
          }
        `}
      </style>
      <div className="grid md:grid-cols-3 gap-6 md:items-center">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Select Booking Date
          </h1>
          <div className="calendar-container bg-gradient-to-r from-[#141122] to-secondary-500 border rounded-lg p-4 shadow-inner">
            <FullCalendar
              key={selectedDate ? selectedDate.toISOString() : "no-date"}
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              selectable={true}
              events={bookingFullDays}
              dateClick={handleDateSelect}
              dayCellDidMount={dayCellDidMount}
              eventClassNames="busy-day"
              eventContent={(eventInfo) => {
                return (
                  <div className="busy-day-tag">{eventInfo.event.title}</div>
                );
              }}
              height="auto"
            />
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 mr-2"></div>
                <span className="text-sm">Booking Full</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-[#727272] mr-2"></div>
                <span className="text-sm">Today Date</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-primary-500 mr-2"></div>
                <span className="text-sm">Selected Date</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          {selectedDate && (
            <div className="mt-6 text-center p-4 bg-primary-950/15">
              <p className="text-lg">
                Selected date:{" "}
                <strong>{selectedDate.toLocaleDateString()}</strong>
              </p>
              <button
                className="mt-3 astro-primary-btn mx-auto"
                onClick={() => handleGo()}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarSelection;
