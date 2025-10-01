// app/dashboard/admin/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    pendingMembers: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalResources: 0,
    newMessages: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    isOnline: false,
    isMemberOnly: false,
    maxParticipants: '',
    registrationRequired: true,
    registrationDeadline: ''
  });
  const [eventLoading, setEventLoading] = useState(false);
  const [eventMessage, setEventMessage] = useState('');

  // Charger les données au démarrage
  useEffect(() => {
    const loadData = async () => {
      // Simuler un délai de chargement
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setStats({
        totalMembers: 247,
        activeMembers: 192,
        pendingMembers: 15,
        totalEvents: 42,
        upcomingEvents: 5,
        totalResources: 128,
        newMessages: 23
      });

      setRecentActivities([
        { id: 1, user: 'Sophie Leroy', action: 'Nouvelle inscription', time: 'Il y a 10 min', type: 'registration' },
        { id: 2, user: 'Pierre Martin', action: 'A téléchargé un document', time: 'Il y a 25 min', type: 'download' },
        { id: 3, user: 'Thomas Bernard', action: 'A modifié son profil', time: 'Il y a 1 heure', type: 'profile' },
        { id: 4, user: 'Marie Dupont', action: 'A posté un message', time: 'Il y a 2 heures', type: 'message' },
        { id: 5, user: 'Lucie Petit', action: 'A payé sa cotisation', time: 'Il y a 3 heures', type: 'payment' }
      ]);

      setPendingApprovals([
        { id: 1, user: 'Julie Moreau', type: 'Nouvelle inscription', date: '2023-09-12' },
        { id: 2, user: 'Laboratoires Dermatech', type: 'Adhésion entreprise', date: '2023-09-11' },
        { id: 3, user: 'Marc Dubois', type: 'Contenu à modérer', date: '2023-09-10' },
        { id: 4, user: 'Institut de Beauté', type: 'Paiement à vérifier', date: '2023-09-10' }
      ]);
    };

    loadData();
  }, []);

  // Fonction pour créer un événement
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setEventLoading(true);
    setEventMessage('');

    try {
      // Récupérer le token admin depuis localStorage
      const authToken = localStorage.getItem('authToken');
      
      if (!authToken) {
        throw new Error('Token d\'authentification manquant. Veuillez vous reconnecter.');
      }

      // Préparer les données pour l'API
      const eventData = {
        memberPrice:150,
        nonMemberPrice: 200,
        title: eventForm.title,
        description: eventForm.description,
        startDate: new Date(eventForm.startDate).toISOString(),
        endDate: new Date(eventForm.endDate).toISOString(),
        location: eventForm.location,
        isOnline: eventForm.isOnline,
        isMemberOnly: eventForm.isMemberOnly,
        maxParticipants: parseInt(eventForm.maxParticipants) || 0,
        registrationRequired: eventForm.registrationRequired,
        registrationDeadline: eventForm.registrationDeadline 
          ? new Date(eventForm.registrationDeadline).toISOString()
          : null
      };

      console.log('Données envoyées à l\'API:', eventData);

      // Appel à l'API pour créer l'événement
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(eventData)
      });

      const result = await response.json();

      if (result.success) {
        setEventMessage('✅ Événement créé avec succès !');
        // Réinitialiser le formulaire
        setEventForm({
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          location: '',
          isOnline: false,
          isMemberOnly: false,
          maxParticipants: '',
          registrationRequired: true,
          registrationDeadline: ''
        });
        
        // Fermer le modal après 2 secondes
        setTimeout(() => {
          setShowEventModal(false);
          setEventMessage('');
        }, 2000);
      } else {
        throw new Error(result.message || 'Erreur lors de la création de l\'événement');
      }
    } catch (error) {
      console.error('Erreur:', error);
      setEventMessage(`❌ ${error.message}`);
    } finally {
      setEventLoading(false);
    }
  };

  // Fonction pour gérer les changements dans le formulaire
  const handleEventFormChange = (field, value) => {
    setEventForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Composant pour le modal de création d'événement
  const EventCreationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-blue-800">Créer un nouvel événement</h3>
            <button
              onClick={() => setShowEventModal(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ✕
            </button>
          </div>

          {eventMessage && (
            <div className={`p-4 rounded-md mb-6 ${
              eventMessage.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {eventMessage}
            </div>
          )}

          <form onSubmit={handleCreateEvent} className="space-y-6">
            {/* Titre et Lieu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre de l'événement *
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => handleEventFormChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Congrès International de Cosmétologie 2024"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lieu *
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.location}
                  onChange={(e) => handleEventFormChange('location', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Centre de Congrès de Paris"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                required
                value={eventForm.description}
                onChange={(e) => handleEventFormChange('description', e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Description détaillée de l'événement..."
              />
            </div>

            {/* Dates de début et fin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de début *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={eventForm.startDate}
                  onChange={(e) => handleEventFormChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de fin *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={eventForm.endDate}
                  onChange={(e) => handleEventFormChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Participants et date limite */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre maximum de participants
                </label>
                <input
                  type="number"
                  value={eventForm.maxParticipants}
                  onChange={(e) => handleEventFormChange('maxParticipants', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date limite d'inscription
                </label>
                <input
                  type="datetime-local"
                  value={eventForm.registrationDeadline}
                  onChange={(e) => handleEventFormChange('registrationDeadline', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={eventForm.isOnline}
                  onChange={(e) => handleEventFormChange('isOnline', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Événement en ligne</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={eventForm.isMemberOnly}
                  onChange={(e) => handleEventFormChange('isMemberOnly', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Réservé aux membres</label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={eventForm.registrationRequired}
                  onChange={(e) => handleEventFormChange('registrationRequired', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 text-sm text-gray-700">Inscription requise</label>
              </div>
            </div>

            {/* Boutons */}
            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                disabled={eventLoading}
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={eventLoading}
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {eventLoading ? 'Création en cours...' : 'Créer l\'événement'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Composant pour les cartes de statistiques
  const StatCard = ({ title, value, change, icon, color }) => (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
            {change && (
              <span className={`ml-2 text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Composant pour les activités récentes
  const ActivityItem = ({ activity }) => {
    const getActivityIcon = (type) => {
      switch (type) {
        case 'registration': return '📝';
        case 'download': return '📥';
        case 'profile': return '👤';
        case 'message': return '💬';
        case 'payment': return '💳';
        default: return '🔔';
      }
    };

    return (
      <div className="flex items-start space-x-3 py-3">
        <span className="text-xl">{getActivityIcon(activity.type)}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{activity.user}</p>
          <p className="text-sm text-gray-600">{activity.action}</p>
        </div>
        <span className="text-xs text-gray-500">{activity.time}</span>
      </div>
    );
  };

  // Contenu de l'onglet Événements
  const renderEventsTab = () => (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gestion des Événements</h2>
        <button
          onClick={() => setShowEventModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          + Créer un événement
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800">Événements Totaux</h3>
          <p className="text-2xl font-bold">{stats.totalEvents}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium text-green-800">À venir</h3>
          <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-medium text-yellow-800">Participants moyens</h3>
          <p className="text-2xl font-bold">87</p>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Voir tous les événements
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Voir les participations
        </button>
      </div>

      {/* Section d'information */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">Comment créer un événement</h3>
        <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
          <li>Cliquez sur "Créer un événement" pour ouvrir le formulaire</li>
          <li>Remplissez tous les champs obligatoires (marqués d'un *)</li>
          <li>Les dates doivent être au format international</li>
          <li>Le token d'authentification sera automatiquement inclus</li>
        </ul>
      </div>
    </div>
  );

  // Contenu de l'onglet Membres
  const renderMembersTab = () => (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Gestion des Membres</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800">Membres Totaux</h3>
          <p className="text-2xl font-bold">{stats.totalMembers}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium text-green-800">Membres Actifs</h3>
          <p className="text-2xl font-bold">{stats.activeMembers}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-medium text-yellow-800">En Attente</h3>
          <p className="text-2xl font-bold">{stats.pendingMembers}</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Voir tous les membres
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Exporter la liste
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Ajouter un membre
        </button>
      </div>
    </div>
  );

  // Contenu de l'onglet Contenus
  const renderContentTab = () => (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Gestion des Contenus</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800">Ressources</h3>
          <p className="text-2xl font-bold">{stats.totalResources}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium text-green-800">Articles</h3>
          <p className="text-2xl font-bold">42</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-medium text-yellow-800">À modérer</h3>
          <p className="text-2xl font-bold">7</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Voir tous les contenus
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Ajouter une ressource
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Modérer les contenus
        </button>
      </div>
    </div>
  );

  // Contenu de l'onglet Finances
  const renderFinancesTab = () => (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Gestion Financière</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800">Revenus mensuels</h3>
          <p className="text-2xl font-bold">4 250€</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium text-green-800">Cotisations payées</h3>
          <p className="text-2xl font-bold">192</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-medium text-yellow-800">En attente</h3>
          <p className="text-2xl font-bold">15</p>
        </div>
      </div>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Voir les transactions
        </button>
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Exporter les données
        </button>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700">
          Générer un reçu
        </button>
      </div>
    </div>
  );

  // Contenu de l'onglet Rapports
  const renderReportsTab = () => (
    <div className="bg-white rounded-lg shadow p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Rapports et Statistiques</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium text-gray-800">Rapports disponibles</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex justify-between items-center">
              <span>Activité des membres</span>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Générer</button>
            </li>
            <li className="flex justify-between items-center">
              <span>Participation aux événements</span>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Générer</button>
            </li>
            <li className="flex justify-between items-center">
              <span>Statistiques financières</span>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Générer</button>
            </li>
            <li className="flex justify-between items-center">
              <span>Utilisation des ressources</span>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Générer</button>
            </li>
          </ul>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg">
          <h3 className="font-medium text-gray-800">Exporter des données</h3>
          <div className="mt-2 space-y-3">
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Exporter la liste des membres
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Exporter les événements
            </button>
            <button className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Exporter les transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Contenu de l'onglet Aperçu (par défaut)
  const renderOverviewTab = () => (
    <>
      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total des membres"
          value={stats.totalMembers}
          change="+12%"
          icon={<span className="text-white text-xl">👥</span>}
          color="bg-indigo-100"
        />
        <StatCard
          title="Membres actifs"
          value={stats.activeMembers}
          icon={<span className="text-white text-xl">✅</span>}
          color="bg-green-100"
        />
        <StatCard
          title="En attente"
          value={stats.pendingMembers}
          icon={<span className="text-white text-xl">⏳</span>}
          color="bg-yellow-100"
        />
        <StatCard
          title="Nouveaux messages"
          value={stats.newMessages}
          icon={<span className="text-white text-xl">✉️</span>}
          color="bg-blue-100"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activité récente */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Activité Récente</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
            <div className="mt-6">
              <Link href="/dashboard/admin/activity" className="text-blue-600 hover:text-blue-500 font-medium">
                Voir toute l'activité →
              </Link>
            </div>
          </div>
        </div>

        {/* Approbations en attente */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Approbations en Attente</h2>
          </div>
          <div className="p-6">
            {pendingApprovals.length > 0 ? (
              <div className="space-y-4">
                {pendingApprovals.map(approval => (
                  <div key={approval.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{approval.user}</p>
                      <p className="text-sm text-gray-600">{approval.type}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(approval.date).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                      Vérifier
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-4">Aucune approbation en attente</p>
            )}
            <div className="mt-6">
              <Link href="/dashboard/admin/approvals" className="text-blue-600 hover:text-blue-500 font-medium">
                Gérer les approbations →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Actions Rapides</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/admin/users/new" className="p-4 border border-gray-200 rounded-lg text-center hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <div className="p-2 bg-blue-100 rounded-lg inline-block mb-2">
                <span className="text-xl">👥</span>
              </div>
              <p className="text-sm font-medium text-gray-900">Ajouter un membre</p>
            </Link>

            <button 
              onClick={() => setShowEventModal(true)}
              className="p-4 border border-gray-200 rounded-lg text-center hover:border-green-300 hover:bg-green-50 transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-lg inline-block mb-2">
                <span className="text-xl">🎪</span>
              </div>
              <p className="text-sm font-medium text-gray-900">Créer un événement</p>
            </button>

            <Link href="/dashboard/admin/content/new" className="p-4 border border-gray-200 rounded-lg text-center hover:border-purple-300 hover:bg-purple-50 transition-colors">
              <div className="p-2 bg-purple-100 rounded-lg inline-block mb-2">
                <span className="text-xl">📝</span>
              </div>
              <p className="text-sm font-medium text-gray-900">Publier du contenu</p>
            </Link>

            <Link href="/dashboard/admin/reports" className="p-4 border border-gray-200 rounded-lg text-center hover:border-orange-300 hover:bg-orange-50 transition-colors">
              <div className="p-2 bg-orange-100 rounded-lg inline-block mb-2">
                <span className="text-xl">📊</span>
              </div>
              <p className="text-sm font-medium text-gray-900">Générer un rapport</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  // Fonction pour afficher le contenu selon l'onglet sélectionné
  const renderTabContent = () => {
    switch (activeTab) {
      case 'members':
        return renderMembersTab();
      case 'content':
        return renderContentTab();
      case 'events':
        return renderEventsTab();
      case 'finances':
        return renderFinancesTab();
      case 'reports':
        return renderReportsTab();
      default: // 'overview'
        return renderOverviewTab();
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord Administrateur</h1>
        <p className="text-gray-600">Gérez votre association et surveillez l'activité des membres</p>
      </div>

      {/* Navigation par onglets */}
      <div className="bg-white shadow-sm rounded-lg mb-6">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', name: 'Aperçu' },
            { id: 'members', name: 'Membres' },
            { id: 'content', name: 'Contenus' },
            { id: 'events', name: 'Événements' },
            { id: 'finances', name: 'Finances' },
            { id: 'reports', name: 'Rapports' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu de l'onglet sélectionné */}
      {renderTabContent()}

      {/* Modal de création d'événement */}
      {showEventModal && <EventCreationModal />}
    </div>
  );
}