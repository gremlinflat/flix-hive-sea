export function getMonthAndYearOnly(date) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "long" });
  const year = dateObj.getFullYear();
  return `${month} ${year}`;
}

export function getMonthDateAndYearOnly(date) {
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("default", { month: "long" });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function getAgeRatingColor(ageRating) {
  const ageRatingInt = parseInt(ageRating);
  if (ageRating >= 18) {
    return "error";
  } else if (ageRating >= 13) {
    return "warning";
  } else {
    return "success";
  }
}

export function generateMovieIdentifier(movie) {
  const title = movie.title.replace(/\s+/g, "-").toLowerCase();
  return `${movie.id}-${title}`;
}
