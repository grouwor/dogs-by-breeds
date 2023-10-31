interface Breed {
  [breed: string]: Array<string>;
}

interface DogAPIResponse {
  status: string;
  message: any;
}

type DogAPIMultiImageResponse = Array<string>;
type DogAPISingleImageResponse = string;

export interface ImageData {
  id: string;
  src: string;
}

/**
 * A service for interacting with the Dog API.
 */
class DogAPIService {
  private static baseUrl = 'https://dog.ceo/api';

  /**
   * Extracts the image ID from a given URL.
   * @param url The URL to extract the ID from.
   * @returns The image ID.
   */
  private static getImageIdFromUrl(url: string): string {
    // The URL format is https://images.dog.ceo/breeds/breed/sub-breed/image.jpg
    const regex = /\/breeds\/(.+?)\/(.+?)\/(.+?)\.\w+$/;
    const match = url.match(regex);
    const id = match ? `${match[1]}-${match[2] || 'none'}-${match[3]}` : url;

    return id;
  }

  /**
   * Fetches data from a given URL.
   * @param url The URL to fetch data from.
   * @returns The fetched data.
   * @throws An error if the data could not be fetched.
   */
  private static async fetchData(url: string): Promise<any> {
    const response = await fetch(url);
    const data: DogAPIResponse = await response.json();

    if (data.status !== 'success') {
      throw new Error('Failed to fetch data');
    }

    return data.message;
  }

  /**
   * Gets a random image for a breed.
   * @param breed The breed to get an image for.
   * @returns The random image data for the breed, or null if no image could be found.
   */
  static async getRandomImageByBreed(breed: string): Promise<ImageData | null> {
    const endPoint = `${this.baseUrl}/breed/${breed}/images/random`;
    return await this.getRandomImageData(endPoint);
  }

  /**
   * Gets a random image for a sub-breed of a breed.
   * @param breed The breed to get a sub-breed image for.
   * @param subBreed The sub-breed to get an image for.
   * @returns The random image data for the sub-breed, or null if no image could be found.
   */
  static async getRandomImageBySubBreed(breed: string, subBreed: string): Promise<ImageData | null> {
    const endPoint = `${this.baseUrl}/breed/${breed}/${subBreed}/images/random`;
    return await this.getRandomImageData(endPoint);
  }

  /**
   * Gets all images for a breed.
   * @param breed The breed to get images for.
   * @returns An array of image data for the breed.
   */
  static async getImagesByBreed(breed: string): Promise<Array<ImageData>> {
    const endPoint = `${this.baseUrl}/breed/${breed}/images`;
    return await this.getImagesData(endPoint);
  }

  /**
   * Gets all images for a sub-breed of a breed.
   * @param breed The breed to get a sub-breed's images for.
   * @param subBreed The sub-breed to get images for.
   * @returns An array of image data for the sub-breed.
   */
  static async getImagesBySubBreed(breed: string, subBreed: string): Promise<Array<ImageData>> {
    const endPoint = `${this.baseUrl}/breed/${breed}/${subBreed}/images`;
    return await this.getImagesData(endPoint);
  }

  /**
   * Gets data for all breeds and their sub-breeds.
   * @returns An object containing all breeds and their sub-breeds.
   */
  static async getAllBreedsData(): Promise<Breed> {
    try {
      const data: Breed = await this.fetchData(`${this.baseUrl}/breeds/list/all`);
      return data;
    } catch {
      return {};
    }
  }

  /**
   * Gets a random image from a given endpoint.
   * @param url The URL to get a random image from.
   * @returns The random image data, or null if no image could be found.
   * @throws An error if the image data could not be fetched.
   */
  private static async getRandomImageData(url: string): Promise<ImageData | null> {
    try {
      const data: DogAPISingleImageResponse = await this.fetchData(url);

      return {
        id: this.getImageIdFromUrl(data),
        src: data,
      };
    } catch {
      return null;
    }
  }

  /**
   * Gets all images from a given endpoint.
   * @param url The URL to get images from.
   * @returns An array of image data.
   * @throws An error if the image data could not be fetched.
   */
  private static async getImagesData(url: string): Promise<Array<ImageData>> {
    try {
      const data: DogAPIMultiImageResponse = await this.fetchData(url);

      return data.map((imageUrl: string) => ({
        id: this.getImageIdFromUrl(imageUrl),
        src: imageUrl,
      }));
    } catch {
      return [];
    }
  }
}

export default DogAPIService;