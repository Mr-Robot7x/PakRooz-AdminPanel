import moment from "moment"
export default function formatDate(dbDate: string): string {
    const date = new Date(dbDate);
    return moment(date).format("DD MMM, YYYY");
}

// Example usage
const dbDate = "ISODate('2024-11-20T12:52:30.944Z')";
console.log(formatDate(dbDate)); // Output: 20 Nov, 2024
