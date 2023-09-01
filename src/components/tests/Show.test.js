import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';


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

test('renders without errors', () => { 
    render(<Show show={exampleShowData} selectedSeason="none" />);
});

test('renders Loading component when prop show is null', () => { 

    render(<Show show={null} selectedSeason="none" />);
    const loadingComponent = screen.getByTestId("loading-container");
    expect(loadingComponent).toBeInTheDocument();

});

test('renders same number of options seasons are passed in', () => { 

    render(<Show show={exampleShowData} selectedSeason="none" />);
    const seasonOptions = screen.getAllByTestId("season-option");
    expect(seasonOptions.length).toBe(exampleShowData.seasons.length);

});

test('handleSelect is called when an season is selected', () => { 

    const mockHandleSelect = jest.fn();
    render(<Show show={exampleShowData} selectedSeason="none" handleSelect={mockHandleSelect} />);
    
    const selectElement = screen.getByLabelText("Select A Season");
    fireEvent.change(selectElement, { target: { value: "1" } });
  
    expect(mockHandleSelect).toHaveBeenCalledTimes(1);

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {

    const mockHandleSelect = jest.fn();
    const { rerender } = render(<Show show={exampleShowData} selectedSeason="none" handleSelect={mockHandleSelect} />);
    let episodesComponent = screen.queryByTestId("episodes-component");
    expect(episodesComponent).not.toBeInTheDocument();
    rerender(<Show show={exampleShowData} selectedSeason="1" handleSelect={mockHandleSelect} />);
    episodesComponent = screen.getByTestId("episodes-container");
    expect(episodesComponent).toBeInTheDocument();

 });


// // ### The Show Component

// // > _This component holds all general information on our featured show. Here we will once again work with data props, mock a function for testing and rerender our component for a change in data._

// // - [ ] Build an example data structure that contains the show data in the correct format.
//  A show should contain a name, a summary and an array of seasons, each with a id, name and an (empty) list of episodes within them. 
//  Use console.logs within the client code if you need to to verify the structure of show data.
// // - [ ] Test that the Show component renders when your test data is passed in through 
// show prop and "none" is passed in through selectedSeason prop.
// // - [ ] Test that the Loading component displays when null is passed into the show prop 
// (look at the Loading component to see how to test for it's existence)
// // - [ ] Test that when your test data is passed through the show prop, 
// the same number of season select options appear as there are seasons within your test data.
// // - [ ] Test that when an item is selected, 
// the handleSelect function is called. Look at your code to see how to get access to the select 
// DOM element and [userEvent reference materials](https://testing-library.com/docs/ecosystem-user-event/)
// to see how to trigger a selection.
// // - [ ] Test that the episode component DOES NOT render when the selectedSeason 
// props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.