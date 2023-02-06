export function setRefreshCookieExpiration(days?: number) {
    var today = new Date();
    var resultDate = new Date(today);
    resultDate.setDate(today.getDate() + (days ? days : 14));
    return resultDate;
}

export function setAccessCookieExpiration(minutes?: number) {
    let now = new Date();
    let expMinutes = minutes ? 30 : 30;
    const minutesExp = now.setTime(now.getTime() + (expMinutes * 60 * 1000));
    return new Date(minutesExp);
}