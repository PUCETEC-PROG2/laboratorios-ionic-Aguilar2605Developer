import { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonInput, IonTextarea, IonButton, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonText
} from '@ionic/react';
import { postRepos } from '../services/githubService';
import LoadingSpinner from '../components/LoadingSpinner';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [language, setLanguage] = useState<string>(''); // Solo se guarda localmente, no se envía a la API

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSave = async () => {
    // Validación: ningún campo puede quedar vacío
    if (!name.trim() || !description.trim() || !language.trim()) {
      setError('Todos los campos son obligatorios');
      setSuccessMsg(null);
      return;
    }

    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      // Llamo al método POST del service
      const nuevoRepo = await postRepos({ name, description });
      setSuccessMsg(`Repositorio "${nuevoRepo.name}" creado correctamente`);
      setName('');
      setDescription('');
      setLanguage('');
    } catch (err) {
      setError((err as Error).message || 'No se pudo crear el repositorio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>DM - IONIC</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="tab2-content">
        {loading && <LoadingSpinner message="Creando repositorio..." />}

        <IonCard className="form-card">
          <IonCardHeader>
            <IonCardTitle>Nuevo Repositorio</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonInput
              className="form-input"
              label="Nombre:"
              labelPlacement="floating"
              placeholder="Ej: Mi proyecto"
              value={name}
              onIonInput={(e) => setName(e.detail.value ?? '')}
            />
            <IonTextarea
              className="form-input"
              label="Descripción:"
              labelPlacement="floating"
              placeholder="Escribe aquí..."
              value={description}
              onIonInput={(e) => setDescription(e.detail.value ?? '')}
            />
            <IonInput
              className="form-input"
              label="Lenguaje:"
              labelPlacement="floating"
              placeholder="Ej: TypeScript - Python - Javascript"
              value={language}
              onIonInput={(e) => setLanguage(e.detail.value ?? '')}
            />

            
            {error && (
              <IonText color="danger" className="ion-padding-top">
                <p>{error}</p>
              </IonText>
            )}

            <IonButton expand="block" className="save-button" onClick={handleSave} disabled={loading}>
              Guardar
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;