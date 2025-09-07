// components/Events.js
const Events = () => {
  const events = [
    {
      title: "Congrès Annuel de Cosmétologie",
      date: "15-17 Septembre 2023",
      description: "Notre événement phare réunissant les experts du secteur pour échanger sur les dernières innovations.",
      image: "/placeholder-event1.jpg"
    },
    {
      title: "Atelier : Cosmétiques naturels",
      date: "5 Octobre 2023",
      description: "Formation pratique sur la formulation et la production de cosmétiques naturels et bio.",
      image: "/placeholder-event2.jpg"
    },
    {
      title: "Salon des Innovations Cosmétiques",
      date: "20-22 Novembre 2023",
      description: "Découvrez les dernières innovations produits et technologies lors de ce salon professionnel.",
      image: "/placeholder-event3.jpg"
    }
  ];

  return (
    <section id="events" className="py-16 px-6 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Événements à venir</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Image événement</span>
              </div>
              <div className="p-6">
                <div className="text-yellow-600 font-medium mb-2">{event.date}</div>
                <h3 className="text-xl font-semibold mb-3 text-blue-800">{event.title}</h3>
                <p className="text-gray-700 mb-4">{event.description}</p>
                <button className="text-blue-700 font-medium hover:underline">
                  En savoir plus →
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <a href="/events" className="px-6 py-3 bg-blue-800 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
            Voir tous les événements
          </a>
        </div>
      </div>
    </section>
  );
};

export default Events;