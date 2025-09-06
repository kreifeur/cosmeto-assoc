// pages/events.js
"use client"
import { useState } from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Events() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);

  // Données des événements
  const events = [
    {
      id: 1,
      title: "Congrès Annuel de Cosmétologie 2023",
      date: "2023-09-15",
      endDate: "2023-09-17",
      type: "congress",
      location: "Paris Convention Center",
      description: "Notre événement phare réunissant les experts du secteur pour échanger sur les dernières innovations, tendances et défis de la cosmétologie.",
      image: "/events/congres-annuel.jpg",
      price: "299",
      memberPrice: "199",
      status: "upcoming",
      program: [
        "Keynote: L'avenir de la cosmétique durable",
        "Panel: Innovations en formulation",
        "Ateliers pratiques",
        "Session de networking",
        "Cérémonie de remise des prix"
      ]
    },
    {
      id: 2,
      title: "Atelier Formulation Naturelle",
      date: "2023-10-05",
      type: "workshop",
      location: "Laboratoire Cosmetech, Paris",
      description: "Session pratique sur la formulation de cosmétiques naturels et bio. Apprenez les techniques de pointe avec nos experts.",
      image: "/events/atelier-formulation.jpg",
      price: "150",
      memberPrice: "90",
      status: "upcoming",
      program: [
        "Introduction aux ingrédients naturels",
        "Démonstration de formulation",
        "Session pratique",
        "Échanges avec les experts"
      ]
    },
    {
      id: 3,
      title: "Salon des Innovations Cosmétiques",
      date: "2023-11-20",
      endDate: "2023-11-22",
      type: "exhibition",
      location: "Expo Porte de Versailles, Paris",
      description: "Découvrez les dernières innovations produits, technologies et services lors de ce salon professionnel incontournable.",
      image: "/events/salon-innovations.jpg",
      price: "0",
      memberPrice: "0",
      status: "upcoming",
      program: [
        "Exposition des nouveautés",
        "Conférences techniques",
        "Rencontres B2B",
        "Espace networking"
      ]
    },
    {
      id: 4,
      title: "Soirée Networking Cosmétique",
      date: "2023-12-07",
      type: "networking",
      location: "Hôtel Renaissance, Paris",
      description: "Une soirée conviviale pour rencontrer d'autres professionnels du secteur et échanger dans une ambiance détendue.",
      image: "/events/soiree-networking.jpg",
      price: "50",
      memberPrice: "30",
      status: "upcoming",
      program: [
        "Cocktail d'accueil",
        "Session de speed networking",
        "Dîner",
        "Échanges informels"
      ]
    },
    {
      id: 5,
      title: "Formation Réglementation Cosmétique",
      date: "2023-08-10",
      type: "training",
      location: "En ligne",
      description: "Formation complète sur la réglementation cosmétique européenne et internationale. Mise à jour des dernières évolutions.",
      image: "/events/formation-reglementation.jpg",
      price: "200",
      memberPrice: "120",
      status: "past",
      program: [
        "Règlementation UE",
        "Exigences documentation",
        "Cas pratiques",
        "Questions-réponses"
      ]
    },
    {
      id: 6,
      title: "Visite d'Usine Partenaire",
      date: "2023-07-22",
      type: "visit",
      location: "Usine CosméProduction, Normandie",
      description: "Visite exclusive d'une usine de production cosmétique de pointe. Découverte des processus de fabrication et contrôle qualité.",
      image: "/events/visite-usine.jpg",
      price: "80",
      memberPrice: "50",
      status: "past",
      program: [
        "Présentation de l'usine",
        "Visite des lignes de production",
        "Démo contrôle qualité",
        "Échanges avec l'équipe"
      ]
    }
  ];

  // Filtres disponibles
  const filters = [
    { key: 'all', label: 'Tous les événements' },
    { key: 'upcoming', label: 'Événements à venir' },
    { key: 'past', label: 'Événements passés' },
    { key: 'congress', label: 'Congrès' },
    { key: 'workshop', label: 'Ateliers' },
    { key: 'training', label: 'Formations' }
  ];

  // Filtrer les événements selon le filtre actif
  const filteredEvents = activeFilter === 'all' 
    ? events 
    : events.filter(event => event.type === activeFilter || event.status === activeFilter);

  // Ouvrir modal d'inscription
  const openRegistrationModal = (event) => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  };

  // Formater la date
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <div>
      <Head>
        <title>Événements - Association de Cosmétologie</title>
        <meta name="description" content="Découvrez tous les événements organisés par l'Association de Cosmétologie : congrès, ateliers, formations et networking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-blue-800 mb-4">Événements</h1>
          <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto mb-12">
            Découvrez notre programme d'événements : congrès, ateliers pratiques, formations et sessions de networking 
            pour tous les professionnels de la cosmétologie.
          </p>

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map(filter => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-blue-800 text-white'
                    : 'bg-white text-blue-800 hover:bg-blue-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Liste des événements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {filteredEvents.map(event => (
              <div 
                key={event.id} 
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Image {event.title}</span>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-2">
                        {event.type === 'congress' && 'Congrès'}
                        {event.type === 'workshop' && 'Atelier'}
                        {event.type === 'training' && 'Formation'}
                        {event.type === 'exhibition' && 'Salon'}
                        {event.type === 'networking' && 'Networking'}
                        {event.type === 'visit' && 'Visite'}
                      </span>
                      <h3 className="text-xl font-semibold text-blue-800 mb-1">{event.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{formatDate(event.date)}</div>
                      {event.endDate && (
                        <div className="text-sm text-gray-500">au {formatDate(event.endDate)}</div>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{event.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📍</span>
                      {event.location}
                    </div>
                    <div className="text-right">
                      {event.price === "0" ? (
                        <span className="text-green-600 font-semibold">Gratuit</span>
                      ) : (
                        <>
                          <div className="text-gray-500 line-through text-sm">{event.price}€</div>
                          <div className="text-blue-800 font-semibold">{event.memberPrice}€ membres</div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      onClick={() => openRegistrationModal(event)}
                      className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      {event.status === 'upcoming' ? "S'inscrire" : "Voir le replay"}
                    </button>
                    <button className="px-4 py-2 border border-blue-800 text-blue-800 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium">
                      Détails
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">Aucun événement trouvé dans cette catégorie.</p>
              <button 
                onClick={() => setActiveFilter('all')}
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Voir tous les événements
              </button>
            </div>
          )}

          {/* Newsletter Événements */}
          <div className="bg-blue-800 rounded-lg p-8 text-center text-white mb-16">
            <h2 className="text-2xl font-semibold mb-4">Ne manquez aucun événement</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter événements pour recevoir en avant-première 
              les annonces de nos prochains congrès, ateliers et formations.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-500 text-blue-900 rounded-md hover:bg-yellow-400 transition-colors font-medium"
              >
                S'inscrire
              </button>
            </form>
          </div>

          {/* Calendrier des événements */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Calendrier 2023-2024</h2>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Automne 2023 */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">Automne 2023</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">15-17 Sept</span>
                      <span className="text-sm">Congrès Annuel</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">5 Oct</span>
                      <span className="text-sm">Atelier Formulation</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">20-22 Nov</span>
                      <span className="text-sm">Salon Innovations</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">7 Déc</span>
                      <span className="text-sm">Networking</span>
                    </div>
                  </div>
                </div>
                
                {/* Hiver 2024 */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">Hiver 2024</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">25 Jan</span>
                      <span className="text-sm">Formulation Hiver</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">15 Fév</span>
                      <span className="text-sm">Atelier Packaging</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">8 Mar</span>
                      <span className="text-sm">Journée Femmes</span>
                    </div>
                  </div>
                </div>
                
                {/* Printemps 2024 */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-xl font-semibold text-blue-800 mb-4 text-center">Printemps 2024</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">5 Avr</span>
                      <span className="text-sm">Formation Règlementation</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">3 Mai</span>
                      <span className="text-sm">Salon Printanier</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <span className="font-medium">15 Juin</span>
                      <span className="text-sm">Visite Laboratoire</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <button className="px-6 py-2 border border-blue-800 text-blue-800 rounded-md hover:bg-blue-50 transition-colors font-medium">
                  Télécharger le calendrier complet (PDF)
                </button>
              </div>
            </div>
          </section>

          {/* Témoignages */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Ce que disent les participants</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-800 font-semibold">ML</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Marie Laurent</h4>
                    <p className="text-sm text-gray-600">Responsable R&D</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Le congrès annuel est toujours un moment fort de l'année. J'y ai rencontré des experts incroyables 
                  et découvert des innovations qui ont inspiré nos propres développements."
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-800 font-semibold">PD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Pierre Dubois</h4>
                    <p className="text-sm text-gray-600">Formulateur indépendant</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Les ateliers pratiques sont d'une qualité exceptionnelle. Les formateurs sont des experts 
                  qui savent partager leur savoir-faire de manière très pédagogique."
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-800 font-semibold">SC</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sophie Chen</h4>
                    <p className="text-sm text-gray-600">Directrice de laboratoire</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "La visite d'usine organisée par l'association a été une révélation. Nous avons pu 
                  observer des processus innovants que nous avons ensuite implémentés dans notre propre structure."
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Modal d'inscription */}
        {showRegistrationModal && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Inscription à {selectedEvent.title}</h3>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Date et lieu :</h4>
                <p className="text-gray-700">{formatDate(selectedEvent.date)} {selectedEvent.endDate && `au ${formatDate(selectedEvent.endDate)}`}</p>
                <p className="text-gray-700">{selectedEvent.location}</p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Tarifs :</h4>
                <div className="flex justify-between items-center mb-2">
                  <span>Non-membre :</span>
                  <span className="font-semibold">{selectedEvent.price}€</span>
                </div>
                <div className="flex justify-between items-center text-blue-800">
                  <span>Membre de l'association :</span>
                  <span className="font-semibold">{selectedEvent.memberPrice}€</span>
                </div>
                <a href="/membership" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                  Devenir membre pour bénéficier du tarif réduit
                </a>
              </div>
              
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" required />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Êtes-vous membre ?</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option value="no">Non, pas encore membre</option>
                    <option value="yes">Oui, je suis membre</option>
                  </select>
                </div>
                
                <div className="flex justify-between pt-4">
                  <button 
                    type="button"
                    onClick={() => setShowRegistrationModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  >
                    Annuler
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
                  >
                    Finaliser l'inscription
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}