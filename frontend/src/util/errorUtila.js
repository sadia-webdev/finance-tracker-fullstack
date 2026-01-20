export const extractErrorMessages = (error) => {
  if (!error) return null;

  // Network error (no response)
  if (!error.response) {
    return "Network error. Please check your connection.";
  }

  const data = error.response.data;

  // Zod / validation errors
  if (data?.errors && Array.isArray(data.errors)) {
    return data.errors.map((err) => err.message).join(", ");
  }

  // Common API message
  if (data?.message) {
    return data.message;
  }

  if (data?.error) {
    return data.error;
  }

  // Axios fallback
  if (error.message) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
};
