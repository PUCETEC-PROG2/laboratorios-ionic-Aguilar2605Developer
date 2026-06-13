import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import RepoItem from '../components/RepoItem';
import './Tab1.css';

const repos = [
  {
    name: 'Colección de Proyectos',
    description: 'Proyectos desarrollados en Django, Kotlin y Typescript',
    language: 'python, kotlin, typescript',
    avatarUrl: 'https://download-warehouse.sketchup.com/warehouse/v1.0/content/public/a27b0928-759c-43c2-b4e6-a44af9311ffb'
  },
  {
    name: 'Proyecto Integrador',
    description: 'Proyectos de titulación',
    language: 'python, kotlin, typescript',
    avatarUrl: 'https://download-warehouse.sketchup.com/warehouse/v1.0/content/public/a27b0928-759c-43c2-b4e6-a44af9311ffb'
  },
  {
    name: 'Parcial 2',
    description: 'Desarrollo Movil - Desarrollo Multiplataforma',
    language: 'JavaScript',
    avatarUrl: 'https://download-warehouse.sketchup.com/warehouse/v1.0/content/public/a27b0928-759c-43c2-b4e6-a44af9311ffb'
  }
];

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Laboratorio 7: Componentes GUI de Ionic</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonList className="repo-list">
          {repos.map((repo, index) => (
            <RepoItem key={index} repository={repo} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;