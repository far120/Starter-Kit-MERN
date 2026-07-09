export default function normalizeError(error, fallbackMessage) {
    const apiMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message;

    return new Error(apiMessage || fallbackMessage);
}