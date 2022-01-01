export class DateNumber {
    static fromIso(isoString) {
        return new Date(isoString).getTime();
    }

    static toIso(number) {
        return new Date(number).toISOString()
    }
}
