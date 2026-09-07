// Комбинира дата (ден/месец/година) с време (час/минути) в едно Date.
// Ползва се от Create/Edit Task екраните, където датата и часът
// се избират през отделни picker-и.
export function combineDateAndTime(date, time) {
    const combined = new Date(date);
    combined.setHours(time.getHours());
    combined.setMinutes(time.getMinutes());
    combined.setSeconds(0);
    combined.setMilliseconds(0);
    return combined;
}
