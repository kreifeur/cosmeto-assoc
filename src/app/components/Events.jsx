// components/Events.js
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/events');
        const data = await response.json();
        
        console.log('Events API Response:', data);
        
        if (data.success && data.data) {
          // Prendre seulement les 3 premiers événements pour l'affichage
          const upcomingEvents = data.data.events 
            ? data.data.events.slice(0, 3) 
            : [];
          setEvents(upcomingEvents);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Erreur lors du chargement des événements');
        // Fallback aux événements statiques en cas d'erreur
        setEvents([
          {
            id: 1,
            title: "Congrès Annuel de Cosmétologie",
            date: "2023-09-15",
            description: "Notre événement phare réunissant les experts du secteur pour échanger sur les dernières innovations.",
            image: "/placeholder-event1.jpg",
            type: "congress"
          },
          {
            id: 2,
            title: "Atelier : Cosmétiques naturels",
            date: "2023-10-05",
            description: "Formation pratique sur la formulation et la production de cosmétiques naturels et bio.",
            image: "/placeholder-event2.jpg",
            type: "workshop"
          },
          {
            id: 3,
            title: "Salon des Innovations Cosmétiques",
            date: "2023-11-20",
            description: "Découvrez les dernières innovations produits et technologies lors de ce salon professionnel.",
            image: "/placeholder-event3.jpg",
            type: "exhibition"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date à confirmer';
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const getEventTypeLabel = (type) => {
    const types = {
      'congress': 'Congrès',
      'workshop': 'Atelier',
      'training': 'Formation',
      'exhibition': 'Salon',
      'networking': 'Networking',
      'visit': 'Visite'
    };
    return types[type] || 'Événement';
  };

  if (loading) {
    return (
      <section id="events" className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Événements à venir</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-3 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error && events.length === 0) {
    return (
      <section id="events" className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Événements à venir</h2>
          <div className="text-center text-gray-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Événements à venir</h2>
        
        {events.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Aucun événement programmé pour le moment.</p>
            <p className="mt-2">Revenez bientôt pour découvrir nos prochains événements.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id || event._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500">Image événement</span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-yellow-600 font-medium text-sm">
                        {formatDate(event.date)}
                      </span>
                      {event.type && (
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {getEventTypeLabel(event.type)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-blue-800">{event.title}</h3>
                    <p className="text-gray-700 mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <Link 
                        href={`/events/${event.id || event._id}`}
                        className="text-blue-700 font-medium hover:underline"
                      >
                        En savoir plus →
                      </Link>
                      {event.location && (
                        <span className="text-sm text-gray-600">
                          📍 {event.location}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/events" 
                className="px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Voir tous les événements
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Events;