import { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonInput, IonTextarea, IonButton, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonText
} from '@ionic/react';
import { postRepos } from '../services/githubService'; // CONEXIÓN con el service: solo necesitamos POST para crear un repo
import LoadingSpinner from '../components/LoadingSpinner';
import './Tab2.css';

const Tab2: React.FC = () => {
  // Estados locales del formulario: cada input controlado guarda su valor aquí
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [language, setLanguage] = useState<string>(''); // Nota: language no se envía al service, solo se valida que no esté vacío

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null); // Se guarda pero no se renderiza en ningún lado del JSX

  const handleSave = async () => {
    // Validación simple antes de llamar al service
    if (!name.trim() || !description.trim() || !language.trim()) {
      setError('Todos los campos son obligatorios');
      setSuccessMsg(null);
      return;
    }

    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      // Llamamos a postRepos del service, mandando solo name y description
      const nuevoRepo = await postRepos({ name, description });
      setSuccessMsg(`Repositorio "${nuevoRepo.name}" creado correctamente`);
      // Limpiamos el formulario tras crear exitosamente
      setName('');
      setDescription('');
      setLanguage('');
    } catch (err) {
      // Si postRepos lanza un error (throw), se captura aquí
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

            {/* CONEXIÓN con la UI: el clic dispara handleSave, que internamente llama al service */}
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