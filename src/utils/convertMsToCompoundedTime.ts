function convertMsToCompoundedTime(ms: number) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const secondsRemainder = seconds % 60;
    const minutesRemainder = minutes % 60;
    const hoursRemainder = hours % 24;

    let result = '';
    if (days > 0) {
        result += `${days} day${days > 1 ? 's' : ''} `;
    }
    if (hoursRemainder > 0) {
        result += `${hoursRemainder} hour${hoursRemainder > 1 ? 's' : ''} `;
    }
    if (minutesRemainder > 0) {
        result += `${minutesRemainder} minute${minutesRemainder > 1 ? 's' : ''} `;
    }
    if (secondsRemainder > 0) {
        result += `${secondsRemainder} second${secondsRemainder > 1 ? 's' : ''}`;
    }
    return result.trim();
}

export default convertMsToCompoundedTime