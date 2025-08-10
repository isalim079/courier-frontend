export const GetUserNameInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(" ");

  if (words.length >= 2) {
    // Take first letter of first word and first letter of last word
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  } else if (words.length === 1 && words[0].length >= 2) {
    // Take first two letters of the single word
    return words[0].substring(0, 2).toUpperCase();
  } else if (words.length === 1 && words[0].length === 1) {
    // If only one letter, return it
    return words[0].toUpperCase();
  }

  return "";
};
