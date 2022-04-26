import axios, { RequestConfig } from './axios';
import * as apis from '../api';

const services = new Map<string, string>();
Object.values(apis).map(api => {
  Object.entries(api).map(([k, v]) => {
    services.set(`${api.namespace}/${k}`, v);
  });
});

type JsonData = Record<string, string | number | boolean>;

interface RequestProps {
  apiurl: string;
  prefix?: string;
  headers?: JsonData;
  data?: JsonData;
  segment?: JsonData;
}

function request(props: RequestProps) {
  const { apiurl, data, headers, segment, prefix } = props;
  let [method, url]: any = services.get(apiurl)?.split(' ') || [];

  if (segment) {
    url = url.replace(/:(\w+)/g, (_:string, $1: string) => segment[$1].toString());
  }

  if (prefix) {
    url = prefix + url;
  }

  const config: RequestConfig = {
    url,
    method
  };

  if (method === 'get') {
    config.params = data;
  } else {
    config.data = data;
  }

  if (headers) {
    config.headers = headers;
  }
  
  return new Promise(resolve => {
    axios(config).then((result) => {
      resolve([null, result]);
    }).catch((err) => {
      resolve([err, null]);
    });
  });
}

export default {
  request
};
