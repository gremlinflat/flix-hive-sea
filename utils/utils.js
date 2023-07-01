export function getMonthAndYearOnly(date) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();
  return `${month} ${year}`;
}

export function getAgeRatingColor(ageRating) {
  if (ageRating >= 18) {
    return "badge-error"; // Set the appropriate color class for 18+
  } else if (ageRating >= 13) {
    return "badge-warning"; // Set the appropriate color class for 13+
  } else {
    return "badge-success"; // Set the appropriate color class for PG or other ratings
  }
}

export function generateMovieIdentifier(movie) {
  const title = movie.title.replace(/\s+/g, "-").toLowerCase();
  return `${movie.id}-${title}`;
}
