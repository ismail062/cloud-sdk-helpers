import pino from 'pino';

const logger = pino({
    level: 'info', // Set your desired log level
    serializers: {
        error: (e) => {
            return {
                ...e,
                code: e?.code,
                message: e?.message,
                stack: e?.stack,
            };
        },
    }
});

export default logger;
