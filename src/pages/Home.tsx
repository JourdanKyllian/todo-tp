import React, { useMemo, useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonButtons, IonButton, IonIcon, IonSearchbar,
  IonSegment, IonSegmentButton, IonLabel
} from '@ionic/react';
import { addOutline, searchOutline, checkboxOutline } from 'ionicons/icons';
import TaskItem from '../components/TaskItem';
import AddTaskSheet from '../components/AddTaskSheet';
import { useTasks } from '../hooks/useTasks';
import './Home.css';

type TaskFilter = 'todo' | 'done' | 'all';

const Home: React.FC = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<TaskFilter>('all');

  const remainingCount = tasks.filter(task => !task.done).length;
  const remainingLabel = remainingCount <= 1
    ? `${remainingCount} restante`
    : `${remainingCount} restantes`;

  const visibleTasks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return tasks.filter(task => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'todo' && !task.done) ||
        (filter === 'done' && task.done);

      const matchesSearch = query === '' || task.text.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, searchQuery]);

  const handleAddTask = (text: string) => {
    addTask(text);
  };

  const handleBackgroundClick = () => {
    if (isModalOpen) setIsModalOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(open => {
      if (open) setSearchQuery('');
      return !open;
    });
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle>ToDo</IonTitle>
          <IonButtons slot="end">
            <IonButton
              color={isSearchOpen ? 'primary' : undefined}
              onClick={toggleSearch}
            >
              <IonIcon slot="icon-only" icon={searchOutline} />
            </IonButton>
            <IonButton onClick={() => setIsModalOpen(true)}>
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen onClick={handleBackgroundClick}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">ToDo</IonTitle>
          </IonToolbar>
        </IonHeader>

        {isSearchOpen && (
          <IonSearchbar
            className="task-searchbar"
            value={searchQuery}
            debounce={150}
            placeholder="Rechercher une tâche"
            showCancelButton="never"
            onIonInput={(event) => setSearchQuery(event.detail.value ?? '')}
          />
        )}

        {tasks.length > 0 && (
          <>
            <IonSegment
              className="task-filter"
              value={filter}
              onIonChange={(event) => {
                const value = event.detail.value;
                if (value === 'todo' || value === 'done' || value === 'all') {
                  setFilter(value);
                }
              }}
            >
              <IonSegmentButton value="todo">
                <IonLabel>À faire</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="done">
                <IonLabel>Fait</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="all">
                <IonLabel>Tout</IonLabel>
              </IonSegmentButton>
            </IonSegment>
            <p className="remaining-count">{remainingLabel}</p>
          </>
        )}

        {tasks.length === 0 ? (
          <div className="empty-state">
            <IonIcon icon={checkboxOutline} className="empty-state-icon" />
            <h2 className="empty-state-title">Aucune tâche</h2>
            <p className="empty-state-text">
              Touchez + en haut à droite pour ajouter votre première tâche.
            </p>
            <IonButton shape="round" onClick={() => setIsModalOpen(true)}>
              Ajouter une tâche
            </IonButton>
          </div>
        ) : visibleTasks.length === 0 ? (
          <div className="empty-state">
            <IonIcon icon={searchOutline} className="empty-state-icon" />
            <h2 className="empty-state-title">Aucun résultat</h2>
            <p className="empty-state-text">
              Aucune tâche ne correspond à votre recherche ou au filtre choisi.
            </p>
          </div>
        ) : (
          /* Le paddingBottom dynamique permet de scroller au-dessus de la modale */
          <IonList
            className="task-list"
            style={{ paddingBottom: isModalOpen ? '35vh' : '32px' }}
          >
            {visibleTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </IonList>
        )}

      </IonContent>
      
      <AddTaskSheet 
        isOpen={isModalOpen} 
        onDidDismiss={() => setIsModalOpen(false)} 
        onAddTask={handleAddTask} 
      />
    </IonPage>
  );
};

export default Home;
