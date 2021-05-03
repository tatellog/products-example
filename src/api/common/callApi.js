

const callApi = ({ method, path, request, timeout, isBlob }) => {
  const API_TIMEOUT = 30000;
  const abortController = new window.AbortController();

  let opts = {
    method: method,
    signal: abortController.signal
  };
  let fullPath = path;

  if (['POST', 'PUT'].includes(method)) {
    if (!isBlob) {
      opts.headers = {
        'Content-Type': 'application/json'
      };
    }
    opts.body = isBlob ? request : JSON.stringify(request);
  } else if (request) {
    fullPath = fullPath + '?' + new URLSearchParams(request).toString();
  }

  const toId = setTimeout(() => {
    console.warn('callApi: aborting request to ' + path + ' after ' + API_TIMEOUT + 'ms');
    abortController.abort();
  }, timeout || API_TIMEOUT);

  let httpError = {
    status: 540,
    statusText: 'Response Timeout'
  };
  return new Promise((resolve, reject) => {
    fetch(fullPath, opts)
      .then((response) => {
        clearTimeout(toId);
        httpError = {
          status: response.status,
          statusText: response.statusText
        };
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          data.error.http = httpError;
        } else {
          data.error = {
            http: httpError
          };
        }
      })
      .catch((error) => {
        const data = {
          error: {
            http: httpError,
            exception: error.toString()
          }
        };
        reject(data);
      });
  });
};

export default callApi;
