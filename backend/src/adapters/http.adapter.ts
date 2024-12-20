import { EnvConfigService } from '@config/env/env-config.service';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface HttpRestAdapter {
  GET({
    path,
    queryParams,
  }: {
    path: string;
    queryParams: object;
    data: object;
  }): Promise<AxiosResponse>;
  POST({
    path,
    queryParams,
    data,
  }: {
    path: string;
    queryParams: object;
    data: object;
  }): Promise<AxiosResponse>;
  PUT({
    path,
    queryParams,
    data,
  }: {
    path: string;
    queryParams: object;
    data: object;
  }): Promise<AxiosResponse>;
  PATCH({
    path,
    queryParams,
    data,
  }: {
    path: string;
    queryParams: object;
    data: object;
  }): Promise<AxiosResponse>;
  DELETE({
    path,
    queryParams,
    data,
  }: {
    path: string;
    queryParams: object;
    data: object;
  }): Promise<AxiosResponse>;
}

@Injectable()
export class HttpAdapter implements HttpRestAdapter {
  private instance: AxiosInstance;
  constructor(private readonly envConfigService: EnvConfigService) {
    this.instance = axios.create({});
  }

  private async fetchTo({ method = 'GET', path, data = {}, queryParams = {} }) {
    return this.instance({
      method,
      url: path,
      data,
      params: queryParams,
      headers: {
        Authorization: 'Bearer token',
      },
    });
  }
  setBaseUrl(baseUrl: string) {
    this.instance.defaults.baseURL = baseUrl;
  }
  async GET({ path, queryParams = {} }) {
    return this.fetchTo({ path, method: 'GET', queryParams });
  }
  async POST({ path, data = {}, queryParams = {} }) {
    return this.fetchTo({
      path,
      method: 'POST',
      data,
      queryParams,
    });
  }
  async PUT({ path, data = {}, queryParams = {} }) {
    return this.fetchTo({
      path,

      method: 'PUT',
      data,
      queryParams,
    });
  }
  async PATCH({ path, data = {}, queryParams = {} }) {
    return this.fetchTo({
      path,

      method: 'PATCH',
      data,
      queryParams,
    });
  }
  async DELETE({ path, data = {}, queryParams = {} }) {
    return this.fetchTo({
      path,

      method: 'DELETE',
      data,
      queryParams,
    });
  }
}
