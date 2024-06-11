
const formatMS = (ms) => {
    if (ms) {
        let seconds = Math.floor(ms / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        let milliseconds = ms % 1000;
        return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
    }
    return '0:00.000';
};

export default {
    formatMS,
};