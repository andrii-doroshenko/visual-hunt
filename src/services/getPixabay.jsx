const { REACT_APP_BASE_URL, REACT_APP_API_KEY } = process.env;

export const getPixabayQuery = async (queryValue, page) => {
  const url = `${REACT_APP_BASE_URL}?q=${queryValue}&page=${page}&key=${REACT_APP_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      throw new Error();
    }

    return resp;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
