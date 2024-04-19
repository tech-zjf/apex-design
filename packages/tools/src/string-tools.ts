export class StringTools {
    static isIncludeSpacesOrLineBreak(str: string) {
        return /(\s+)|([\r\n])/gi.test(str);
    }
}
