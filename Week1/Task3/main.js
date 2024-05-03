const date1_str = prompt("Please enter the first date (DD.MM.YYYY): ");
const date2_str = prompt("Please enter the second date (DD.MM.YYYY): ");

function calculateDaysBetweenDates(date1_str, date2_str) {
    const date1_parts = date1_str.split(".");
    const date2_parts = date2_str.split(".");

    const date1 = new Date(date1_parts[2], date1_parts[1] - 1, date1_parts[0]);
    const date2 = new Date(date2_parts[2], date2_parts[1] - 1, date2_parts[0]);

    const difference_ms = date2 - date1;

    const num_days = Math.round(difference_ms / (1000 * 60 * 60 * 24));

    return num_days;
}

const days_difference = calculateDaysBetweenDates(date1_str, date2_str);
const dateElement = document.getElementById("date");
dateElement.innerHTML = "Number of days between the two dates: " + days_difference;