import moment from "moment";

export const getWeeksOfMonth = ({ year, month }) => {
    const baseDate = moment(`${year}-${month}-01`);
    const firstWeek = baseDate.week();
    const lastWeek = baseDate.endOf("month").week();

    const weeknumbers: number[] = [];
    for (let weeknumber = firstWeek; weeknumber <= (firstWeek+5); weeknumber++) {
        weeknumbers.push(weeknumber)
    }

    return weeknumbers;
}