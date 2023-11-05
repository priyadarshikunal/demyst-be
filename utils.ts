export function isInLastTwelveMonths(inputYear: number, inputMonth: number): boolean {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // getMonth is indexed from 0-11

    // Calculate the month difference from current date to the given month/year
    const monthsDifference = (currentYear - inputYear) * 12 + (currentMonth - inputMonth);

    return monthsDifference >= 0 && monthsDifference < 12;
}

export function getDecisionEngineResponse(id: number, yearEstablished: number, profitLoss: number, preAssessmentValue: number) {
    // Decision engine is implemented as per the requirement hence returning only preAssessmentValue from this method.
    // Ideally this would be a service call to decision engine.
    return preAssessmentValue;
}