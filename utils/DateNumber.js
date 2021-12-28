export class DateNumber {
    static fromIso(isoString) {
        return new Date(isoString).getTime();
    }
}
