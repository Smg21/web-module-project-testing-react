import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';

// import fetchShow from './../api/fetchShow';
import fetchShow from '../../api/fetchShow';
jest.mock('../../api/fetchShow'); 



test('renders without errors with no props', async () => { 

    render(<Display />);

});

test('renders Show component when the button is clicked ', async () => { 

    fetchShow.mockResolvedValue({
        name: "Example Show",
        summary: "This is an example show.",
        seasons: [
          { id: 1, name: "Season 1", episodes: [] },
          { id: 2, name: "Season 2", episodes: [] },
          { id: 3, name: "Season 3", episodes: [] },
          { id: 4, name: "Season 4", episodes: [] },
          { id: 5, name: "Season 5", episodes: [] },
        ],

});

render(<Display />);
  
const fetchButton = screen.getByText("Press to Get Show Data");
fireEvent.click(fetchButton);

await waitFor(() => {
  const showComponent = screen.getByTestId("show-container");
  expect(showComponent).toBeInTheDocument();
});
});

test('renders show season options matching your data when the button is clicked', async () => {

    const exampleShowData = {
        name: "Example Show",
        summary: "This is an example show.",
        seasons: [
            { id: 1, name: "Season 1", episodes: [] },
            { id: 2, name: "Season 2", episodes: [] },
            { id: 3, name: "Season 3", episodes: [] },
            { id: 4, name: "Season 4", episodes: [] },
            { id: 5, name: "Season 5", episodes: [] },
        ],
    };
    
    fetchShow.mockResolvedValue(exampleShowData);
    
    render(<Display />);
    
    const fetchButton = screen.getByText("Press to Get Show Data");
    fireEvent.click(fetchButton);
    
    await waitFor(() => {
        const seasonOptions = screen.getAllByTestId("season-option");
        expect(seasonOptions.length).toBe(exampleShowData.seasons.length);
    });

 });



// ### The Display Component

// > _This component holds the state values of the application and handles api calls. 
// In this component's tests, you work with mocking external modules and working with async / await / waitFor_

// - [ ] Test that the Display component renders without any passed in props.
// - [ ] Rebuild or copy the show test data element as used in the previous 
// set of tests.
// - [ ] Test that when the fetch button is pressed, the show component will display. 
// Make sure to account for the api call and change of state in building your test.
// - [ ] Test that when the fetch button is pressed, the amount of select options 
// rendered is equal to the amount of seasons in your test data.
// - [ ] Notice the optional functional prop passed in to the Display component client 
// code. Test that when the fetch button is pressed, this function is called.