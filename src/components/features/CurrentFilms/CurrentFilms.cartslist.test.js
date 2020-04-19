import React from 'react';
import { shallow } from 'enzyme';
import CurrentFilms from './CurrentFilms';
import MatchMediaMock from 'jest-matchmedia-mock';
import {
  mockedScreenSizes,
  mockedPropsWithData,
} from './mockedDataForTests';

let matchMedia;

const checkGeneratedCarts = (instance, expectedAmount) => {
  const generatedCarts = instance.getGeneratedCarts();
  expect(generatedCarts.length).toBe(expectedAmount);
  expect(generatedCarts).toEqual(mockedPropsWithData.movies.slice(0, expectedAmount));
}

describe('CurrentFilms carts list updates', () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
  });
 
  afterEach(() => {
    matchMedia.clear();
    window.innerWidth = 1920;
  });

  it('started with good amount of carts in list depends on screen size', () => {
    // loop for all screens and sizes when component is just rednered and test expected carts amounts
    mockedScreenSizes.forEach(screen => {
      screen.sizes.forEach(size => {
        window.innerWidth = size;
        const component = shallow(<CurrentFilms {...mockedPropsWithData}/>
        );
        const instance = component.instance();
        expect(instance.state.cartsInList).toBe(screen.hasCartsAmount);
      });
    })
  });

  it('updates amount of carts in list when screen size updates', () => {
    const component = shallow(<CurrentFilms {...mockedPropsWithData}/>);

    const instance = component.instance();
    // started 10 cartsInList amount on large screen
    expect(instance.state.cartsInList).toBe(10); 
    // lopp for all media queries and sizes and test expected results
    mockedScreenSizes.forEach(screen => {
      screen.sizes.forEach(size => {
        window.innerWidth = size;
        matchMedia.useMediaQuery(screen.query);
        expect(instance.state.cartsInList).toBe(screen.hasCartsAmount);
      });
    });
    
  });

  it('updates lists amount properly when getMoreCarts method is used and generate proper amount of carts', () => {
    const component = shallow(<CurrentFilms {...mockedPropsWithData}/>);
    const instance = component.instance();

    const expectedMaxCartsInList = 18;

    // started 10 cartsInList amount on large screen with one expectedList so it should generate 10 carts
    expect(instance.state.cartsInList).toBe(10);
    expect(instance.state.lists).toBe(1);
    checkGeneratedCarts(instance, 10);
    

    // try to get one more lists so it should generate next carts - 18 at all
    instance.getMoreCarts();
    expect(instance.state.lists).toBe(2);
    checkGeneratedCarts(instance, expectedMaxCartsInList);

    // try to get one more lists - should fail because we have no more carts
    instance.getMoreCarts();
    expect(instance.state.lists).toBe(2); 

    // change size of the screen to big
    window.innerWidth = 1000;
    matchMedia.useMediaQuery(mockedScreenSizes[1].query);

    // should be 8 carts in list so on screen should be 2 lists of 8 carts so 16 carts at all
    expect(instance.state.cartsInList).toBe(8);
    expect(instance.state.lists).toBe(2);
    checkGeneratedCarts(instance, 16);

    // now it should be possible to update lists amount and again we should generate max amount of carts
    instance.getMoreCarts();
    expect(instance.state.lists).toBe(3);
    checkGeneratedCarts(instance, expectedMaxCartsInList);

    // try to get next list - should fail because we have no more carts
    instance.getMoreCarts();
    expect(instance.state.lists).toBe(3);
  

    // change size of the screen to medium
    window.innerWidth = 800;
    matchMedia.useMediaQuery(mockedScreenSizes[2].query);

    //should be 6 carts in list so on screen should be 3 lists of 6 carts so 18 carts - all carts we have
    expect(instance.state.cartsInList).toBe(6);
    expect(instance.state.lists).toBe(3);
    checkGeneratedCarts(instance, expectedMaxCartsInList);


    // try to get next list - should fail because we have no more carts
    instance.getMoreCarts();
    expect(instance.state.lists).toBe(3);

    // change size of the screen to small
    window.innerWidth = 500;
    matchMedia.useMediaQuery(mockedScreenSizes[3].query);

    //should be 4 carts in list so on screen should be 3 lists of 4 carts so 12 carts at all
    expect(instance.state.cartsInList).toBe(4);
    expect(instance.state.lists).toBe(3);
    checkGeneratedCarts(instance, 12);


    // now it should be possible to update lists amount and now we should have 16 carts on screen
    instance.getMoreCarts();
    expect(instance.state.lists).toBe(4);
    checkGeneratedCarts(instance, 16);

    // get one more list again - we should have 5 lists of 4 carts so max number of carts on screen again
    instance.getMoreCarts();
    expect(instance.state.lists).toBe(5);
    checkGeneratedCarts(instance, expectedMaxCartsInList);

    // we should have no more oportunity to update to next list of carts
    instance.getMoreCarts();
    expect(instance.state.lists).toBe(5);
  });
});