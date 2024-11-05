const BASE_URL = "http://localhost:8000"; 

export const registerUser = async (userData: {
  id: string;
  name: string;
  password: string;
  role: string;
  gender: string;
}) => {
  const response = await fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to register user");
  }

  return response.json();
};

export const updateUser = async (userData: {
  id: string;
  name: string;
  password: string;
  gender: string;
  classes_enrolled: string[];
  class_scores: { [key: string]: any };
  total_score: number;
  action: string;
}) => {
  const response = await fetch(`${BASE_URL}/users/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};

export const deleteUser = async (userId: string) => {
  const response = await fetch(`${BASE_URL}/users/delete/${userId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return response.json();
};

export const queryUsersByCourse = async (courseId: string) => {
  const response = await fetch(`${BASE_URL}/users/query/${courseId}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to query users");
  }

  return response.json();
};

export const loginUser = async (loginData: { id: string, password: string }) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};
