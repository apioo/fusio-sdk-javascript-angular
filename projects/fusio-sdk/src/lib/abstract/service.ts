import {CommonCollection, CommonMessage} from "fusio-sdk";

/**
 * A general service to access CRUD operations, this service can be reused at different components
 */
export abstract class Service<E> implements ServiceInterface<E> {

  /**
   * @internal
   */
  private configurationResolve?: Function|undefined;

  /**
   * @internal
   */
  private configurationReject?: Function|undefined;

  abstract getAll(parameters: Array<any>): Promise<CommonCollection<E>>;

  abstract get(id: string): Promise<E>;

  abstract create(entity: E): Promise<CommonMessage>;

  abstract update(entity: E): Promise<CommonMessage>;

  abstract delete(entity: E): Promise<CommonMessage>;

  /**
   * Returns an empty new entity
   */
  abstract newEntity(): E;

  /**
   * Returns the base link
   */
  abstract getLink(): Array<string>;

  public async getAllWithIdAndName(parameters: Array<any>): Promise<CommonCollection<IdAndName<E>>>
  {
    const result = await this.getAll(parameters);

    const entries: Array<IdAndName<E>> = [];
    result.entry?.forEach((entry) => {
      entries.push(this.convert(entry));
    });

    return {
      totalResults: result.totalResults,
      startIndex: result.startIndex,
      itemsPerPage: result.itemsPerPage,
      entry: entries,
    };
  }

  public async getWithIdAndName(id: string): Promise<IdAndName<E>>
  {
    return this.convert(await this.get(id));
  }

  /**
   * Returns the id key of the entity, normally this is the property "id"
   */
  protected getIdKey(): string
  {
    return 'id';
  }

  /**
   * Returns the display name key, normally a property like "name" or "title"
   */
  protected getNameKey(): string
  {
    return 'name';
  }

  /**
   * In case you service needs other parameters from the url to execute the list query you can overwrite this method
   * and only return true in case every parameter is available, by default it is always true
   */
  public isConfigured(): boolean
  {
    return true;
  }

  /**
   * Returns a promise which gets resolved in case the configuration is completed
   */
  public onReady(): Promise<ServiceInterface<E>>
  {
    if (this.isConfigured()) {
      return new Promise<ServiceInterface<E>>((resolve) => {
        resolve(this);
      });
    }

    // if we have already a promise reject the existing
    if (this.configurationReject !== undefined) {
      this.configurationReject(this);
    }

    const me = this;

    return new Promise<ServiceInterface<E>>((resolve, reject) => {
      me.configurationResolve = resolve;
      me.configurationReject = reject;
    });
  }

  /**
   * Must be called by every setter which sets a required parameter
   */
  protected checkConfiguration(): void
  {
    if (this.configurationResolve !== undefined && this.isConfigured()) {
      this.configurationResolve(this);
    }
  }

  private convert(entity: E): IdAndName<E>
  {
    const id = this.getIdValue(entity);
    if (id === undefined) {
      throw new Error('Configured id value does not exist, got: ' + JSON.stringify(entity));
    }

    const name = this.getNameValue(entity);
    if (name === undefined) {
      throw new Error('Configured name value does not exist, got: ' + JSON.stringify(entity));
    }

    return {
      id: id,
      name: name,
      raw: entity
    };
  }

  private getIdValue(entity: E): string|undefined
  {
    if (typeof entity === 'object' && entity && entity.hasOwnProperty(this.getIdKey())) {
      const id = (entity as any)[this.getIdKey()];
      if (id === undefined || id === null) {
        return undefined;
      }

      return '' + id;
    }

    return undefined;
  }

  private getNameValue(entity: E): string|undefined
  {
    if (typeof entity === 'object' && entity && entity.hasOwnProperty(this.getNameKey())) {
      const name = (entity as any)[this.getNameKey()];
      if (name === undefined || name === null) {
        return undefined;
      }

      return '' + name;
    }

    return undefined;
  }

}

interface ServiceInterface<E> {
  getAll(parameters: Array<any>): Promise<CommonCollection<E>>;

  get(id: string): Promise<E>;

  create(entity: E): Promise<CommonMessage>;

  update(entity: E): Promise<CommonMessage>;

  delete(entity: E): Promise<CommonMessage>;

  getLink(): Array<string>;
}

export interface IdAndName<T> {
  id: string
  name: string
  raw: T
}
