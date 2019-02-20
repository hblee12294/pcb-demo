import { LoadingManager } from 'three'

export class PCDLoader {
  constructor(manager?: LoadingManager)

  manager: LoadingManager
  crossOrigin: string
  withCredentials: string
  path: string

  /**
   * Begin loading from url
   * @param url
   */
  load(
    url: string,
    onLoad?: (image: HTMLImageElement) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (event: ErrorEvent) => void
  ): HTMLImageElement;
  setCrossOrigin(crossOrigin: string): ImageLoader;
  setWithCredentials(value: string): ImageLoader;
  setPath(value: string): ImageLoader;
}
