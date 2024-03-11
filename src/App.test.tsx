import { fireEvent, render, screen } from '@testing-library/react';
import { FetchAppState } from './types';
import * as apiHooks from './customHooks/api-hooks';
import App from './App';

describe('<App />', () => {
  const renderComponent = () => render(<App />);
  const defaultText =
    'Click the button to fetch data from a sample API';
  const loadingText = 'Fetching API Data...';
  const errorText = 'Oops! Something went wrong. Please try again.';
  const successText = "Here's the sample data from API :-";

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render default state', () => {
    renderComponent();

    const stateEl = screen.queryByText(defaultText);

    expect(stateEl).toBeInTheDocument();
  });

  it('should render loading state on loading', () => {
    const fetchAppState = FetchAppState.LOADING;

    jest
      .spyOn(apiHooks, 'useFetchPosts')
      .mockReturnValue([[], fetchAppState, jest.fn()]);

    renderComponent();

    const stateEl = screen.queryByText(loadingText);

    expect(stateEl).toBeInTheDocument();
  });

  it('should render error state on error', () => {
    const fetchAppState = FetchAppState.ERROR;

    jest
      .spyOn(apiHooks, 'useFetchPosts')
      .mockReturnValue([[], fetchAppState, jest.fn()]);

    renderComponent();

    const stateEl = screen.queryByText(errorText);

    expect(stateEl).toBeInTheDocument();
  });

  it('should render success state on success', () => {
    const fetchAppState = FetchAppState.SUCCESS;
    const dummyAPIData = [
      {
         userId: 1,
         id: 1,
         title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
         body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
      }
    ];

    jest
      .spyOn(apiHooks, 'useFetchPosts')
      .mockReturnValue([dummyAPIData, fetchAppState, jest.fn()]);

    renderComponent();

    const stateEl = screen.queryByText(successText);
    const item = dummyAPIData[0];
    const itemTitle = `${item.id} / ${item.title}`;
    const itemEl = screen.queryByText(itemTitle);

    expect(stateEl).toBeInTheDocument();
    expect(itemEl).toBeInTheDocument();
  });

  it('should call API on button click', () => {
    const fetchDataMock = jest.fn();

    jest
      .spyOn(apiHooks, 'useFetchPosts')
      .mockReturnValue([[], FetchAppState.DEFAULT, fetchDataMock]);

    renderComponent();

    const btnEl = screen.queryByText('Fetch Sample Data') as HTMLButtonElement;

    fireEvent.click(btnEl);

    expect(fetchDataMock).toBeCalledTimes(1);
  });
});