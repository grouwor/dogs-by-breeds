// Default data for breeds and images
const defaultBreedsData = {
  'bulldog': [
    'boston',
    'english'
  ],
};

const defaultImages = {
  bulldog: [
    'https://dog.ceo/api/breeds/bulldog-boston/20200710_175933.jpg',
    'https://dog.ceo/api/breeds/bulldog-boston/20200710_175944.jpg',
    'https://dog.ceo/api/breeds/bulldog-english/bunz.jpg',
  ],
  'bulldog-boston': [
    'https://dog.ceo/api/breeds/bulldog-english/jager-1.jpg'
  ],
  'bulldog-english': [
    'https://dog.ceo/api/breeds/bulldog-english/jager-2.jpg',
    'https://dog.ceo/api/breeds/bulldog-english/mami.jpg',
  ]
};

// Regular expressions for different API endpoints
const breedImagesPattern = /^https:\/\/dog\.ceo\/api\/breed\/(\w+)\/images$/;
const subBreedImagesPattern = /^https:\/\/dog\.ceo\/api\/breed\/(\w+)\/(\w+)\/images$/;
const randomBreedImagePattern = /^https:\/\/dog\.ceo\/api\/breed\/(\w+)\/images\/random$/;
const randomSubBreedImagePattern = /^https:\/\/dog\.ceo\/api\/breed\/(\w+)\/(\w+)\/images\/random$/;

/**
 * Mocked fetch function for the Dog API
 * @param {Object} breedsData - Mocked data for breeds and sub-breeds
 * @param {Object} images - Mocked data for images
 * @returns {Function} - Mocked fetch function
 */
export const mockedDogAPIFetch = (
  breedsData: any = defaultBreedsData,
  images: {
    [prop: string]: Array<string>
  } = defaultImages
) => async (input: RequestInfo | URL) => {
  const url = input as string;
  let match = null;
  let data: any = null;

  // Check the URL and determine the appropriate response
  if (url === 'https://dog.ceo/api/breeds/list/all') {
    // Return the mocked breeds data
    data = breedsData;
  } else if (match = url.match(breedImagesPattern)) {
    // Return the images for the specified breed
    data = images[match[1]];
  } else if (match = url.match(subBreedImagesPattern)) {
    // Return the images for the specified sub-breed
    data = images[`${match[1]}-${match[2]}`];
  } else if (match = url.match(randomBreedImagePattern)) {
    // Return a random image for the specified breed
    data = url;
  } else if (match = url.match(randomSubBreedImagePattern)) {
    // Return a random image for the specified sub-breed
    data = url;
  } else {
    // Return a 404 response for unknown URLs
    return {
      ok: false,
      status: 404
    } as Response;
  }

  // Return a successful response with the mocked data
  return {
    ok: true,
    status: 200,
    json: async () => ({
      message: data,
      status: 'success'
    })
  } as Response;
};