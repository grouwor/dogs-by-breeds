import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import App from './App';
import { mockedDogAPIFetch } from './mocks/mockedDogAPIFetch';

test('should populate breed options on the page load', async () => {

  const breedsData = {
    'bulldog': [],
    'boston': [],
    'english': [
      'tell',
      'good'
    ],
  };

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData));

  // Render the component
  const { getByLabelText } = render(<App />);

  // Find the select element by its label
  const breedSelect = getByLabelText('Breed:');

  // Find the option element with the breeds
  await waitFor(() => {
    Object.keys(breedsData).map(breed => {
      const breedOption = breedSelect.querySelector(`option[value=${breed}`);
      expect(breedSelect).toContainElement(breedOption as HTMLElement);
    });
  });

});

test('should populate sub breed options on the page load', async () => {
  const breedsData = {
    bulldog: [
      'tell',
      'good'
    ],
    boston: [],
    english: [],
  };

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData));

  // Render the component
  const { getByLabelText } = render(<App />);

  // Find the select element by its label
  const subBreedSelect = getByLabelText('Sub Breed:');

  // Find the option element with the sub breeds

  await waitFor(() => {
    breedsData['bulldog'].forEach(subBreed => {
      const subBreedOption = subBreedSelect.querySelector(`option[value=${subBreed}`);
      expect(subBreedSelect).toContainElement(subBreedOption as HTMLElement);
    });
  });
});

test('should display random image by breed on the page load', async () => {
  const breedsData = {
    'bulldog': [],
  };
  const randomImageByBreedSrc = 'https://dog.ceo/api/breed/bulldog/images/random';

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch());

  // Render the component that contains the images
  const { container } = render(<App />);

  // Wait for the specific image with a certain src to be displayed
  await waitFor(() => {
    const randomImageByBreed = container.querySelector(`img[src='${randomImageByBreedSrc}']`);
    expect(randomImageByBreed).toBeInTheDocument();
  });
});


test('should display random image by sub breed on the page load', async () => {
  const breedsData: any = {
    bulldog: [
      'english'
    ],
  };
  const randomImageBySubBreedSrc = 'https://dog.ceo/api/breed/bulldog/english/images/random';

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData));

  // Render the component that contains the images
  const { container } = render(<App />);

  // Wait for the specific image with a certain src to be displayed
  await waitFor(() => {
    const randomImageBySubBreed = container.querySelector(`img[src='${randomImageBySubBreedSrc}']`);
    expect(randomImageBySubBreed).toBeInTheDocument();
  });

});
/*
test('should only display "No images to preview" message inside the random image by sub breed section if no sub breeds are available', async () => {
  const breedsData = {
    bulldog: [
      'tell',
      'good'
    ],
    boston: [],
    english: [],
  };

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData));

  // Render the component
  const { getByText } = render(<App />);

  // Find the select element by its label
  const randomImageBySubBreedHeader = getByText('Random Image by Sub Breed');

  // Find the option element with value "poodle"
  expect(randomImageBySubBreedHeader.nextElementSibling?.children.length).toBe(0);
  expect(randomImageBySubBreedHeader.nextElementSibling?.textContent).toBe('No Images To Preview');
});
/*
test('should only display "No images to preview" message inside the random image by breed section if no breeds are available', async () => {
  const breedsData = {};

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData));

  // Render the component
  const { getByText } = render(<App />);

  // Find the select element by its label
  const randomImageBySubBreedHeader = getByText('Random Image By Breed');

  // Find the option element with value "poodle"
  expect(randomImageBySubBreedHeader.nextElementSibling?.children.length).toBe(0);
  expect(randomImageBySubBreedHeader.nextElementSibling?.textContent).toBe('No images to preview');
});

test('should populate sub breed options when the user selects the different breed', async () => {
  const breedsData = {
    bulldog: [],
    boston: [],
    english: [
      'tell',
      'good'
    ],
  };

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData));

  const { getByLabelText } = render(<App />);
  const breedSelect = getByLabelText('Select Breed');
  const subBreedSelect = getByLabelText('Select Sub-Breed');

  fireEvent.change(breedSelect, { target: { value: 'english' } });

  // Wait for the sub-breed options to be populated
  await waitFor(() => {
    // Assert that the sub-breed options are populated correctly
    expect(subBreedSelect.children.length).toBe(2);
  });
});

test('should display random image by breed when the user selects the different breed', async () => {
  const breedsData = {
    bulldog: [],
    boston: [],
    english: [
      'tell',
      'good'
    ],
  };
  const randomImageByBreedSrc = 'https://images.dog.ceo/breeds/english/random';

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData));

  const { container, getByLabelText } = render(<App />);
  const breedSelect = getByLabelText('Select Breed');
  const subBreedSelect = getByLabelText('Select Sub-Breed');

  fireEvent.change(breedSelect, { target: { value: 'english' } });


  expect(subBreedSelect.children.length).toBeGreaterThan(0);

  // Wait for the specific image with a certain src to be displayed
  await waitFor(() => {
    const randomImageBySubBreed = container.querySelector(`img[src=${randomImageByBreedSrc}]`);
    expect(randomImageBySubBreed).toBeInTheDocument();
  });
});

test('should display random image by sub breed when the user selects the different sub breed', async () => {
  const breedsData = {
    bulldog: [
      'boston',
      'english'
    ],
  };
  const randomImageBySubBreedSrc = 'https://images.dog.ceo/breeds/bulldog-english/random';

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData));

  const { container, getByLabelText } = render(<App />);
  const subBreedSelect = getByLabelText('Sub Breed:');

  fireEvent.change(subBreedSelect, { target: { value: 'english' } });

  expect(subBreedSelect.children.length).toBeGreaterThan(0);

  // Wait for the specific image with a certain src to be displayed
  await waitFor(() => {
    const randomImageBySubBreed = container.querySelector(`img[src=${randomImageBySubBreedSrc}]`);
    expect(randomImageBySubBreed).toBeInTheDocument();
  });
});

test('should display images by breed when the user selects the different breed', async () => {
  const breedsData = {
    bulldog: [],
    boston: [],
    tell: []
  };
  const images = {
    bulldog: [
      'https://images.dog.ceo/breeds/bulldog/1',
      'https://images.dog.ceo/breeds/bulldog/2',
      'https://images.dog.ceo/breeds/bulldog/3',
    ],
    boston: [
      'https://images.dog.ceo/breeds/boston/1',
      'https://images.dog.ceo/breeds/boston/2',
    ],
    tell: [
      'https://images.dog.ceo/breeds/tell/1',
      'https://images.dog.ceo/breeds/tell/2',
      'https://images.dog.ceo/breeds/tell/3',
      'https://images.dog.ceo/breeds/tell/4',
      'https://images.dog.ceo/breeds/tell/5',
      'https://images.dog.ceo/breeds/tell/6',
    ]
  }

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData, images));

  const { getByLabelText, getByText } = render(<App />);

  const breedSelect = getByLabelText('Breed:');

  fireEvent.change(breedSelect, { target: { value: 'tell' } });

  // Find the select element by its label
  const imagesByBreedHeader = getByText('Images By Breed');
  // Wait for the specific image with a certain src to be displayed
  await waitFor(() => {
    expect(imagesByBreedHeader.nextElementSibling?.children.length).toBe(6);
  });
});

test('should display images by sub breed when the user selects the different sub breed', async () => {
  const breedsData = {
    bulldog: [
      'boston',
      'tell'
    ],
  };

  const images = {
    bulldog: [
      'https://images.dog.ceo/breeds/bulldog/1',
      'https://images.dog.ceo/breeds/bulldog/2',
      'https://images.dog.ceo/breeds/bulldog/3',
    ],
    'bulldog-boston': [
      'https://images.dog.ceo/breeds/boston/1',
      'https://images.dog.ceo/breeds/boston/2',
    ],
    'bulldog-tell': [
      'https://images.dog.ceo/breeds/tell/1',
      'https://images.dog.ceo/breeds/tell/2',
      'https://images.dog.ceo/breeds/tell/3',
      'https://images.dog.ceo/breeds/tell/4',
      'https://images.dog.ceo/breeds/tell/5',
      'https://images.dog.ceo/breeds/tell/6',
    ]
  };

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData, images));

  const { getByLabelText, getByText } = render(<App />);

  const subBreedSelect = getByLabelText('Sub Breed:');

  fireEvent.change(subBreedSelect, { target: { value: 'tell' } });

  // Find the select element by its label
  const imagesBySubBreedHeader = getByText('Images By Sub Breed');
  // Wait for the specific image with a certain src to be displayed
  await waitFor(() => {
    expect(imagesBySubBreedHeader.nextElementSibling?.children.length).toBe(6);
  });
});

test('should only display "No images to preview" message when the user selects a different breed with no sub breeds', async () => {
  const breedsData = {
    bulldog: [
      'tell',
    ],
    boston: [
      'english',
    ],
    other: []
  };
  const images = {
    bulldog: [
      'https://images.dog.ceo/breeds/bulldog/1',
      'https://images.dog.ceo/breeds/bulldog/2',
    ],
    'bulldog-tell': [
      'https://images.dog.ceo/breeds/boston/1',
      'https://images.dog.ceo/breeds/boston/2',
    ],
    boston: [
      'https://images.dog.ceo/breeds/bulldog/3',
    ],
    'boston-english': [
      'https://images.dog.ceo/breeds/tell/1',
      'https://images.dog.ceo/breeds/tell/2',
      'https://images.dog.ceo/breeds/tell/3',
      'https://images.dog.ceo/breeds/tell/4',
      'https://images.dog.ceo/breeds/tell/5',
      'https://images.dog.ceo/breeds/tell/6',
    ],
    other: [
      'https://images.dog.ceo/breeds/tell/1',
      'https://images.dog.ceo/breeds/tell/2',
    ]
  };
  
  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData, images));

  const { getByLabelText, getByText } = render(<App />);
  const breedSelect = getByLabelText('Breed:');
  const imagesBySubBreedHeader = getByText('Images By Sub Breed');

  fireEvent.change(breedSelect, { target: { value: 'other' } });

  // Wait for the specific image with a certain src to be displayed
  await waitFor(() => {
    expect(imagesBySubBreedHeader.nextElementSibling?.children.length).toBe(0);
    expect(imagesBySubBreedHeader.nextElementSibling?.textContent).toBe('No images to preview');
  });
});
