import { CustomChart } from "./chart.js";


/**
 * The function `countDaysBetweenDates` calculates the number of days between two given dates.
 * @param date1 - The first date in the format of a Date object or a string that can be parsed into a
 * Date object.
 * @param date2 - The `date2` parameter is the later date that you want to calculate the number of days
 * between.
 * @returns the number of days between two dates.
 */
export function countDaysBetweenDates(date1, date2) {
    // Convert the dates to UTC to avoid timezone differences
    const utcDate1 = new Date(date1.toUTCString());
    const utcDate2 = new Date(date2.toUTCString());

    // Calculate the difference in milliseconds
    const timeDifference = utcDate2.getTime() - utcDate1.getTime();

    // Convert milliseconds to days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}


/**
 * The function `assignDataForChart` takes in a data object and creates a chart using the data
 * provided.
 * @param data - The `data` parameter is an object that contains various temperature data. It has the
 * following properties:
 */
export function assignDataForChart(data) {
    const labels = data.TIME_DATA;
    let label = '';
    const datasets = [];

    if (data.APPARENT_TEMP_MAX_DATA) {
        label = 'Apparent maximum temperature';
        datasets.push({
            label: label,
            data: data.APPARENT_TEMP_MAX_DATA,
            borderWidth: 1
        })
    }
    if (data.APPARENT_TEMP_MEAN_DATA) {
        label = 'Apparent mean temperature';
        datasets.push({
            label: label,
            data: data.APPARENT_TEMP_MEAN_DATA,
            borderWidth: 1
        })
    }
    if (data.APPARENT_TEMP_MIN_DATA) {
        label = 'Apparent minimum temperature';
        datasets.push({
            label: label,
            data: data.APPARENT_TEMP_MIN_DATA,
            borderWidth: 1
        })
    }
    if (data.TEMP_MAX_DATA) {
        label = 'Maximum Temperature';
        datasets.push({
            label: label,
            data: data.TEMP_MAX_DATA,
            borderWidth: 1
        })
    }
    if (data.TEMP_MEAN_DATA) {
        label = 'Mean temperature';
        datasets.push({
            label: label,
            data: data.TEMP_MEAN_DATA,
            borderWidth: 1
        })
    }
    if (data.TEMP_MIN_DATA) {
        label = 'Minimum temperature';
        datasets.push({
            label: label,
            data: data.TEMP_MIN_DATA,
            borderWidth: 1
        })
    }

    //Creates new chart
    let chart = new CustomChart();
    setTimeout(() => {
        chart.createChart(labels, datasets);
    }, 300);
}