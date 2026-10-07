import React, { useState, useEffect } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonInput, IonButton 
} from '@ionic/react';
import { Preferences } from '@capacitor/preferences';
import TaskItem, { Task } from '../components/TaskItem';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false); // Sécurité anti-écrasement

  // Changement
  useEffect(() => {
    const loadSavedTasks = async () => {
      const { value } = await Preferences.get({ key: 'my-native-todolist' });
      if (value) {
        setTasks(JSON.parse(value));
      }
      setIsLoaded(true); // Indique que le chargement initial est terminé
    };
    loadSavedTasks();
  }, []);

  // Sauvegarde
  useEffect(() => {
    const saveTasks = async () => {
      // On sauvegarde uniquement si les données initiales ont bien été chargées
      if (isLoaded) { 
        await Preferences.set({
          key: 'my-native-todolist',
          value: JSON.stringify(tasks),
        });
      }
    };
    saveTasks();
  }, [tasks, isLoaded]);

  // Ajout d'une tâche
  const addTask = () => {
    if (newTaskText.trim() !== '') {
      const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText,
        done: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  // Modifier une tâche
  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  // Supprimer une tâche
  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todolist TP1</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Todolist</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonInput 
            placeholder="Ajouter une tâche..." 
            value={newTaskText}
            onIonInput={(e: any) => setNewTaskText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
          />
          <IonButton slot="end" onClick={addTask}>Ajouter</IonButton>
        </IonItem>

        <IonList>
          {tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
              onDelete={deleteTask} 
            />
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Home;
