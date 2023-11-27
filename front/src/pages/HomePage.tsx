import { CircularProgress } from '@mui/material';
import { AxiosResponse, isAxiosError } from "axios";
import React, { useEffect, useRef, useState } from 'react';
import styled from "styled-components";
import TaskList from '../components/TaskList';
import { api } from "../services/api";

const ContainerLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
`;

interface IUser {
  id: number; 
  name: string; 
  email: string;
}; 

interface ITask {
  id: number; 
  title: string;
  description: string; 
  tags: Array<string>;
  created_at: string; 
  updated_at: string; 
  responsible: IUser | null;
};

interface ITasksResponse {
  tasks: Array<ITask>;
};

const HomePage: React.FC = () => {
  const componentInitialized = useRef(false);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<ITask[]>([]);

  function fetchTasks() {
    console.log(api.defaults.headers.common);
    api.get('/tasks')
      .then((response:  AxiosResponse<ITasksResponse>) => {
        const { data } = response;

        console.log(data);

        setTasks(data.tasks);
  
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        if(isAxiosError(error)){
          alert(error?.response?.data.message);
        }
      });
  }

  useEffect(() => {
    if (!componentInitialized.current) {
      componentInitialized.current = true;
      fetchTasks();
    }
  }, []);

  return (
    loading ? <ContainerLoader><CircularProgress /></ContainerLoader> : 
    <div>
      <h1>Task List</h1>
      <TaskList />
    </div>
  );
};

export default HomePage;
