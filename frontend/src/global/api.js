export const uploadImage = async (file) => {
  const fd = new FormData();
  fd.append('file', file);
  const resp = await fetch('/api/v1/fileupload', { method: 'POST', body: fd });
  const { output, error } = await resp.json();
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return null;
  }
  return `/api/v1/fileupload/${output}`;
};

export const getAuthHeaders = () => ({
  authorization: `Bearer ${window.localStorage.getItem('auth-token')}`,
  'Content-Type': 'application/json',
});
