module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      console.log("hello", date)
      return date.toLocaleDateString();
    },
}