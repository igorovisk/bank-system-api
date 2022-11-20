import { DateTime } from "luxon";

class DateTimeUtils {

    static BIRTHDATE_ISO_REGX = /(\d{4})-(\d{2})-(\d{2})/

    static fromFormat(text:string, format: string, opts?: Object) : DateTime {
        return DateTime.fromFormat(text, format, opts)
    }

    static validateIsoBirthdate(date: string): boolean {
        return new RegExp(DateTimeUtils.BIRTHDATE_ISO_REGX).test(date);
    }
}

export { DateTimeUtils }