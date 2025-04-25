/**
 * Generates a random number between 0 and the specified maxNumber (exclusive).
 * @param maxNumber - The upper limit (not inclusive) for the random number.
 * @returns A random integer between 0 and maxNumber - 1.
 */
export const getRandomNumber = (maxNumber: number) =>
  Math.floor(Math.random() * maxNumber);

/**
 * Converts minutes into a readable time format (e.g., "2h 30m").
 * @param minutes - The total number of minutes.
 * @returns A formatted string representing hours and minutes.
 */
export const formatMinuteToReadable = (minutes: number) => {
  const h = Math.floor(minutes / 60); // Get full hours
  const m = minutes - h * 60; // Remaining minutes after subtracting full hours

  if (h > 0) {
    return `${h}h ${m}m`; // Format as "Xh Ym" if there are hours
  } else {
    return `${m}m`; // Format as "Ym" if there are no hours
  }
};

/**
 * Converts a given number of bytes into a human-readable format (e.g., KB, MB, GB).
 * @param bytes - The file size in bytes.
 * @param decimals - Number of decimal places to include in the output (default: 2).
 * @returns A formatted string representing the file size with appropriate units.
 */
export const formatBytes = (bytes: number, decimals: number = 2) => {
  if (!+bytes) return "0 Bytes"; // If bytes is 0, return "0 Bytes"

  const k = 1024; // 1 KB = 1024 Bytes
  const dm = decimals < 0 ? 0 : decimals; // Ensure decimal places are non-negative
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ]; // Array of units

  const i = Math.floor(Math.log(bytes) / Math.log(k)); // Determine unit index

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`; // Format output
};

/**
 * Converts a given number of seconds into a readable time format (HH:MM:SS or MM:SS).
 * @param current - The total time in seconds.
 * @returns A formatted string in either "HH:MM:SS" or "MM:SS" format.
 */
export const formatTime = (current: number) => {
  const h = Math.floor(current / 3600); // Get full hours
  const m = Math.floor((current - h * 3600) / 60); // Get remaining minutes
  const s = Math.floor(current % 60); // Get remaining seconds

  // Format seconds and minutes to always have two digits
  const sString = s < 10 ? "0" + s.toString() : s.toString();
  const mString = m < 10 ? "0" + m.toString() : m.toString();

  if (h > 0) {
    // If hours exist, format as "HH:MM:SS"
    const hString = h < 10 ? "0" + h.toString() : h.toString();
    return `${hString}:${mString}:${sString}`;
  } else {
    // If no hours, format as "MM:SS"
    return `${mString}:${sString}`;
  }
};
