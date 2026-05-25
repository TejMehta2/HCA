const getFormattedDate = () => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const suffixes = ["st", "nd", "rd"];

    const d = new Date();
    const month = months[d.getMonth()];
    const day = d.getDate();
    const suffix = (day < 4) ? suffixes[day - 1] : 'th';
    const year = d.getFullYear();

    return `${month} ${day}${suffix}, ${year}`;
}

export default getFormattedDate;
