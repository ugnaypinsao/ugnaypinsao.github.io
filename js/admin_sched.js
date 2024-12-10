
document.addEventListener('DOMContentLoaded', function () {
    const calendarEl = document.getElementById('calendar');
    const pendingRequestsEl = document.getElementById('pending-requests');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: [],
    });
    calendar.render();

    // Load bookings from localStorage
    function loadBookings() {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        pendingRequestsEl.innerHTML = ''; // Clear the list

        bookings.forEach((booking) => {
            if (booking.status === 'pending') {
                const bookingEl = document.createElement('div');
                bookingEl.className = 'booking-item';
                bookingEl.innerHTML = `
                            <div class="booking-details">
                                <h3>${booking.name}</h3>
                                <p>Email: ${booking.email}</p>
                                <p>Date: ${booking.date}</p>
                                <p>Time: ${booking.time}</p>
                                <p>Details: ${booking.details}</p>
                            </div>
                            <div class="booking-actions">
                                <button class="accept-btn">Accept</button>
                                <button class="reschedule-btn">Reschedule</button>
                                <button class="reject-btn">Reject</button>
                            </div>
                        `;

                // Add action listeners
                bookingEl.querySelector('.accept-btn').addEventListener('click', () => updateBooking(booking.id, 'accepted'));
                bookingEl.querySelector('.reschedule-btn').addEventListener('click', () => rescheduleBooking(booking));
                bookingEl.querySelector('.reject-btn').addEventListener('click', () => updateBooking(booking.id, 'rejected'));

                pendingRequestsEl.appendChild(bookingEl);
            }

            // Add accepted events to calendar
            if (booking.status === 'accepted') {
                calendar.addEvent({
                    title: booking.name,
                    start: `${booking.date}T${booking.time}`,
                });
            }
        });
    }

    // Update booking status
    function updateBooking(id, status) {
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const updatedBookings = bookings.map((b) => (b.id === id ? { ...b, status } : b));
        localStorage.setItem('bookings', JSON.stringify(updatedBookings));
        loadBookings();
    }

    // Reschedule booking
    function rescheduleBooking(booking) {
        const newDate = prompt('Enter new date (YYYY-MM-DD):', booking.date);
        const newTime = prompt('Enter new time (HH:MM):', booking.time);
        if (newDate && newTime) {
            updateBooking(booking.id, 'pending');
            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            const updatedBookings = bookings.map((b) =>
                b.id === booking.id ? { ...b, date: newDate, time: newTime } : b
            );
            localStorage.setItem('bookings', JSON.stringify(updatedBookings));
            loadBookings();
        }
    }

    loadBookings(); // Initial load
});
