import axios from 'axios';

function serialize(val) {
  if('object' !== typeof(val))
    return val;

  return JSON.stringify(val)
    .replace(
      /[\u007F-\uFFFF]/g,
      function(chr) {
        return "\\u" + ("0000" + chr.charCodeAt(0).toString(16)).substr(-4)
      }
    );
}

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export default function () {
  return {
    get: (url, values, opt) => {
      const data = new FormData();
      for (var name in values) {
        data.set(name, serialize(values[name]));
      }

      const options = Object.assign(
        { headers: {'Content-Type': 'multipart/form-data'} },
        opt || {}
      );

      return axiosInstance.post(url, data, options);
    }
  }
};
