const ERROR_REQUIRED = " is a required field"
const ERROR_TYPE = " must be a number"
const ERROR_INTEGER = " must be integer"
const ERROR_POSITIVE = " must be positive"
const ERROR_MAX_LENGTH = " must be at most "
const ERROR_MATCH = " must match pattern"
const ERROR_EMAIL = " must be an e-mail"

export function getRequiredErrorMessage(fieldName: string): string {
    return "⚠ " + fieldName + ERROR_REQUIRED;
}

export function getTypeErrorMessage(fieldName: string): string {
    return "⚠ " + fieldName + ERROR_TYPE;
}

export function getIntegerErrorMessage(fieldName: string): string {
    return "⚠ " + fieldName + ERROR_INTEGER;
}

export function getPositiveErrorMessage(fieldName: string): string {
    return "⚠ " + fieldName + ERROR_POSITIVE;
}

export function getMaxLengthErrorMessage(fieldName: string, max: number): string {
    return "⚠ " + fieldName + ERROR_MAX_LENGTH + max + " characters";
}

export function getMatchErrorMessage(fieldName: string): string {
    return "⚠ " + fieldName + ERROR_MATCH;
}

export function getEmailErrorMessage(fieldName: string): string {
    return "⚠ " + fieldName + ERROR_EMAIL;
}

