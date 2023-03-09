type TAuthGetters = {
  getAccessToken: (state: any) => void;
};

const getAccessToken = (state: any) => {
  return state.access_token;
};

export const handleAuthGetters: TAuthGetters = {
  getAccessToken,
};
