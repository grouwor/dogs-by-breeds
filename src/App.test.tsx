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

test('should only display "No Images To Preview" message inside the random image by sub breed section if no sub breeds are available', async () => {
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
  const randomImageBySubBreedHeader = getByText('Random Image By Sub Breed');

  // Find the option element with value "poodle"
  expect(randomImageBySubBreedHeader.nextElementSibling?.children.length).toBe(0);
  expect(randomImageBySubBreedHeader.nextElementSibling?.textContent).toBe('No Images To Preview');
});

test('should only display "No Images To Preview" message inside the random image by breed section if no breeds are available', async () => {
  const breedsData = {};

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData));

  // Render the component
  const { getByText } = render(<App />);

  // Find the select element by its label
  const randomImageByBreedHeader = getByText('Random Image By Breed');

  // Find the images by breed
  expect(randomImageByBreedHeader.nextElementSibling?.children.length).toBe(0);
  expect(randomImageByBreedHeader.nextElementSibling?.textContent).toBe('No Images To Preview');
});

test('should populate sub breed options when the user selects the different breed', async () => {
  const breedsData = {
    smirl: ['bg'],

    afgan: [],
    bulldog: [
      'boston',
      'english',
    ],
  };

  jest.spyOn(window, 'fetch').mockImplementation(mockedDogAPIFetch(breedsData));

  const { getByLabelText } = render(<App />);
  const breedSelect = getByLabelText('Breed:');
  const subBreedSelect = getByLabelText('Sub Breed:');


  // Wait for the sub-breed options to be populated
  await waitFor(() => {
    fireEvent.change(breedSelect, { target: { value: 'bulldog' } });
    // Assert that the sub-breed options are populated correctly
    expect(subBreedSelect.children.length).toBe(2);
  });
});