
// The function of obtaining the NBRB refinancing rate for the current day.
async function getRefinancingRate() {
    // Getting today's date.
    let dateTime = new Date()
    let day = dateTime.getDate();
    let month = dateTime.getMonth() + 1;
    let year = dateTime.getFullYear();
    // Sending a request to the website to get the value of the refinancing rate on the specified date.
    const api_url = await fetch(`https://www.nbrb.by/api/refinancingrate?onDate=${year}-${month}-${day}`);
    const api_url_json = await api_url.json();
    const dataInfo = api_url_json[0];
    // Assignment of the received value of the refinancing rate to another variable in the form of a string.
    let dataValue = dataInfo.Value.toString();
    return (Number(dataValue) + 5);
}
export default getRefinancingRate;