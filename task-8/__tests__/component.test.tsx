import axios from 'axios';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Joblist from '../app/component/jobCard';
import React from 'react';

// Mock axios
jest.mock('axios');

describe('Joblist Component', () => {
  let job = {
    id: '657063e2144042c215319530',
    title: 'Software Engineer',
    company: 'Acme Inc.',
    description: 'Develop and maintain web applications.',
    logoUrl: '/job1.png',
    bookmarked: new Set<string>(["657063e2144042c215319530"]),
    setBookmarked: jest.fn(),
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjIxMGIxNDk5MTYzMTk4NmIxNmUzZSIsInJvbGUiOiJ1c2VyIiwicHJvZmlsZVN0YXR1cyI6ImluY29tcGxldGUiLCJleHAiOjE3MjM4MDc2NjN9.W9mAfDKBKWMlNJOK9y4gSzYpjzns_AXofcCmkts0Jw4',
  };

  it('should render correctly with the job details', () => {
    render(<Joblist index={1} {...job} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Acme Inc.')).toBeInTheDocument();
    expect(screen.getByText('Develop and maintain web applications.')).toBeInTheDocument();
  });

  it('should bookmark and unbookmark a job', async () => {
    const mockPost = jest.spyOn(axios, 'post').mockResolvedValue({ status: 200 });
    const mockDelete = jest.spyOn(axios, 'delete').mockResolvedValue({ status: 200 });

    const { rerender } = render(<Joblist index={1} {...job} />);

    const bookmarkButton = screen.getByTestId('bookmark-button');
    
    // Unbookmark the job (currently bookmarked)
    fireEvent.click(bookmarkButton);

    await waitFor(() => {
      expect(mockDelete).toHaveBeenCalledWith(
        `https://akil-backend.onrender.com/bookmarks/${job.id}`,
        {
          headers: {
            Authorization: `Bearer ${job.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    });

    // Update job to reflect unbookmarked state
    job = {
      ...job,
      bookmarked: new Set<string>(), // Update the job state to reflect that it is no longer bookmarked
    };

    // Re-render component with updated job state
    rerender(<Joblist index={1} {...job} />);

    // Bookmark the job again
    fireEvent.click(bookmarkButton);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith(
        `https://akil-backend.onrender.com/bookmarks/${job.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${job.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    });

    mockPost.mockRestore();
    mockDelete.mockRestore();
  });
});
