export class StringUtils {

    public static FORMAT_ONLY_NUMBER_REGX = /[^\d]/g;

    static onlyNumber(str: string) {
        return str.replace(StringUtils.FORMAT_ONLY_NUMBER_REGX, '');
    }
}