import { useState } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonText, useIonViewWillEnter } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { getRepos } from '../services/githubService'; // CONEXIÓN con el service: importamos solo la función GET que necesitamos
import type { Repository } from '../interfaces/Repository';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Se llama directamente a la función getRepos() 
     //está hecha la petición axios 
      setLoading(true);
      const response = await getRepos();
      setRepos(response); 
    } catch (err) {
      setError('No se pudieron cargar los repositorios');
    } finally {
      setLoading(false);
    }
  };

  useIonViewWillEnter(() => {
    fetchData(); 
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Laboratorio 8: API REST</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* Spinner de carga mientras llega la respuesta */}
        {loading && <LoadingSpinner message="Cargando repositorios..." />}

        {/* Si ocurre un error, mostramos el mensaje al usuario */}
        {error && (
          <IonText color="danger" className="ion-padding">
            <p>{error}</p>
          </IonText>
        )}

        {!loading && !error && (
          <IonList className="repo-list">
            {repos.map((repo) => (
              <RepoItem key={repo.id} repository={repo} onUpdated={fetchData} />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;