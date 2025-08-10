/**
 * Formats a date string to display in the format "10th Aug, 2025"
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date string or 'N/A' if invalid
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return 'N/A';
  
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  
  // Add ordinal suffix to day
  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
};

/**
 * Formats a date string to display time in 12-hour format
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted time string or 'N/A' if invalid
 */
export const formatTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return 'N/A';
  
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
};

/**
 * Formats a date string to display both date and time
 * @param {string} dateString - The date string to format
 * @returns {string} - Formatted date and time string or 'N/A' if invalid
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  
  const formattedDate = formatDate(dateString);
  const formattedTime = formatTime(dateString);
  
  if (formattedDate === 'N/A' || formattedTime === 'N/A') return 'N/A';
  
  return `${formattedDate} at ${formattedTime}`;
};
