import axios from 'axios';
import { UserCreateRequest, UserLoginRequest, UserLoginResponse, UserResponse, UserEnrollRequest, CourseCreateRequest, CourseUpdateRequest, Course, Class, ClassUpdateRequest, ScoreCreateRequest, ScoreUpdateRequest, ScoreResponse } from '../../interface/types';

const BASE_URL = "http://localhost:8000";

// User API
export const registerUser = async (data: UserCreateRequest): Promise<UserResponse> => {
  const response = await axios.post(`${BASE_URL}/user/register`, data);
  return response.data;
};

export const loginUser = async (data: UserLoginRequest): Promise<UserLoginResponse> => {
  const response = await axios.post(`${BASE_URL}/user/login`, data);
  return response.data;
};

export const updateUser = async (id: string, data: Partial<UserResponse>): Promise<UserResponse> => {
  const response = await axios.patch(`${BASE_URL}/user/update/${id}`, data);
  return response.data;
};

export const enrollUser = async (id: string, data: UserEnrollRequest): Promise<string> => {
  const response = await axios.patch(`${BASE_URL}/user/${id}/enroll`, data);
  return response.data;
};

// Course API
export const createCourse = async (data: CourseCreateRequest): Promise<Course> => {
  const response = await axios.post(`${BASE_URL}/course`, data);
  return response.data;
};

export const updateCourse = async (course_id: string, data: CourseUpdateRequest): Promise<Course> => {
  const response = await axios.patch(`${BASE_URL}/course/${course_id}`, data);
  return response.data;
};

export const deleteCourse = async (course_id: string): Promise<string> => {
  const response = await axios.delete(`${BASE_URL}/course/${course_id}`);
  return response.data;
};

export const getCourse = async (course_id: string): Promise<Course> => {
  const response = await axios.get(`${BASE_URL}/course/${course_id}`);
  return response.data;
};

// Class API
export const createClass = async (data: Class): Promise<Class> => {
  const response = await axios.post(`${BASE_URL}/class`, data);
  return response.data;
};

export const updateClass = async (id: string, data: ClassUpdateRequest): Promise<Class> => {
  const response = await axios.patch(`${BASE_URL}/class/${id}`, data);
  return response.data;
};

export const deleteClass = async (id: string): Promise<string> => {
  const response = await axios.delete(`${BASE_URL}/class/${id}`);
  return response.data;
};

export const getClass = async (id: string): Promise<Class> => {
  const response = await axios.get(`${BASE_URL}/class/${id}`);
  return response.data;
};

export const groupClass = async (id: string): Promise<string> => {
  const response = await axios.patch(`${BASE_URL}/class/${id}/grouping`);
  return response.data;
};

// Score API
export const createScore = async (data: ScoreCreateRequest): Promise<ScoreResponse> => {
  const response = await axios.post(`${BASE_URL}/score`, data);
  return response.data;
};

export const updateScore = async (class_id: string, data: ScoreUpdateRequest): Promise<ScoreResponse> => {
  const response = await axios.patch(`${BASE_URL}/score/${class_id}`, data);
  return response.data;
};

export const getScore = async (class_id: string): Promise<ScoreResponse> => {
  const response = await axios.get(`${BASE_URL}/score/${class_id}`);
  return response.data;
};