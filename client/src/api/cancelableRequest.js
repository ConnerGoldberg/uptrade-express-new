import axios from "axios";

export const cancelableRequest = method => {
    let source;

    return (url, config) => {
        const { params, data } = config || { params: null, data: null };
        return new Promise((resolve, reject) => {
            if (source) {
                source.cancel("User cancelled the request!");
            }
            source = axios.CancelToken.source();
            axios({
                url,
                method,
                cancelToken: source.token,
                params,
                data
            })
                .then(response => resolve(response), error => reject(error))
                .catch(thrown => {
                    if (!axios.isCancel(thrown)) {
                        console.error(`Error attempting to get ${url}. Reason: ${thrown.message}`, );
                    } else {
                        console.warn(`Error cancelling the request: ${url}. Reason: ${thrown.message}`);
                }
                });
        });
    };
};

export const cancelableRequestWithCleanup = method => {
    let source;

    return (url, config) => {
        const { params, data } = config || { params: null, data: null };
        source = axios.CancelToken.source();
        return [
            new Promise((resolve, reject) => {
                axios({
                    url,
                    method,
                    cancelToken: source.token,
                    params,
                    data
                })
                    .then(response => resolve(response), error => reject(error))
                    .catch(thrown => {
                        if (!axios.isCancel(thrown)) {
                            console.error(`Error attempting to get ${url}. Reason: ${thrown.message}`, );
                        } else {
                            console.warn(`Error cancelling the request: ${url}. Reason: ${thrown.message}`);
                        }
                    });
            }),
            source
        ];
    };
};
