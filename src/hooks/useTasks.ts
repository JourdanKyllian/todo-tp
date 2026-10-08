import { useState, useEffect } from 'react';
import { Preferences } from '@capacitor/preferences';
import { Task } from '../components/TaskItem';

const STORAGE_KEY = 'my-native-todolist';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialisation au montage
  useEffect(() => {
    const loadTasks = async () => {
      const { value } = await Preferences.get({ key: STORAGE_KEY });
      if (value) setTasks(JSON.parse(value));
      setIsLoaded(true);
    };
    loadTasks();
  }, []);

  // Synchronisation automatique avec Capacitor
  useEffect(() => {
    if (isLoaded) {
      Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(tasks) });
    }
  }, [tasks, isLoaded]);

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now().toString(), text, done: false };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
};
