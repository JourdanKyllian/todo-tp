import React, { useState, useRef } from 'react';
import { IonModal, IonContent, IonItem, IonInput, IonButton } from '@ionic/react';

interface AddTaskSheetProps {
  isOpen: boolean;
  onDidDismiss: () => void;
  onAddTask: (text: string) => void;
}

const AddTaskSheet: React.FC<AddTaskSheetProps> = ({ isOpen, onDidDismiss, onAddTask }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLIonInputElement>(null);

  const handleAdd = () => {
    if (text.trim() !== '') {
      onAddTask(text);
      setText('');
      
      setTimeout(() => {
        inputRef.current?.setFocus();
      }, 50);
    }
  };

  return (
    <IonModal 
      isOpen={isOpen} 
      onDidDismiss={onDidDismiss}
      initialBreakpoint={0.30}
      breakpoints={[0, 0.30, 0.5]}
      backdropBreakpoint={1}
      onIonModalDidPresent={() => inputRef.current?.setFocus()}
      className="bottom-sheet-modal" /* Ajout de la classe ici */
    >
      <IonContent className="ion-padding modal-content" /* Et ici */>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '4px' }}>
          <IonButton fill="clear" color="medium" size="small" onClick={onDidDismiss}>
            Fermer
          </IonButton>
        </div>

        <IonItem lines="none" className="modal-input-item">
          <IonInput 
            ref={inputRef}
            placeholder="Que devez-vous faire ?" 
            value={text}
            onIonInput={(e: any) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            clearInput
          />
        </IonItem>
        
        <IonButton expand="block" shape="round" className="modal-add-button" onClick={handleAdd}>
          Ajouter
        </IonButton>

      </IonContent>
    </IonModal>
  );
};

export default AddTaskSheet;
