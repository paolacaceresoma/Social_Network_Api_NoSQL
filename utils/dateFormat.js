function formatDate(date) {
  const month = String(new Date(date).getMonth() + 1).padStart(2, "0"); // Month starts from 0, so add 1
  const day = String(new Date(date).getDate()).padStart(2, "0");
  const year = String(new Date(date).getFullYear());

  return `${month}/${day}/${year}`;
}

module.exports = formatDate;
