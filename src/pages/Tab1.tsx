import { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar, IonText } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { getRepos } from '../services/githubService'; // Importamos el servicio donde está la lógica de la API
import type { Repository } from '../interfaces/Repository';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Uso el método GET que implemente en el servicio
        setLoading(true);
        const response = await getRepos();
        setRepos(response); // getRepos() ya devuelve el array de repos (response.data se resuelve dentro del servicio)
      } catch (err) {
        setError('No se pudieron cargar los repositorios');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

        
        {loading && <LoadingSpinner message="Cargando repositorios..." />}
        {error && (
          <IonText color="danger" className="ion-padding">
            <p>{error}</p>
          </IonText>
        )}

        {/* Solo mostramos la lista si no está cargando y no hay errores */}
        {!loading && !error && (
          <IonList className="repo-list">
            {repos.map((repo) => (
              <RepoItem key={repo.id} repository={repo} />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;