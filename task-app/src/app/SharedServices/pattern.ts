export const Patterns = {   
    Email: `[a-zA-Z0-9._%+-]{1,}@[a-zA-Z0-9.-]{2,}[.]{1}[a-zA-Z]{2,}$`,
    OnlyArabicLetters: `[\u0600-\u06FF\s]`,
    mobile: /^(?:0|\+)[0-9\\s.\\/-]{9,13}$/,
    OnlyEnglishLetters: `^[A-Za-z\s]+$`,
    OnlyNumbers: `^[0-9]*$`,
    OnlyNumbersLargerThanZero: `^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$`,
    PhoneMobile: `^[0-9]{9,13}$`,
    DateMMDDYYYY: `^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$`,
    DateDDMMYYYY: `^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$`,
    Decimal: `^\d*\.\d{1,4}$`,
    URL: /^((https?|ftp|smtp):\/\/)?(www.)?[a-zA-Z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/
}
