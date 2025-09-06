// pages/blog/index.js
"use client";
import { useState } from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaSearch,
  FaCalendarAlt,
  FaUser,
  FaArrowLeft,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Head from "next/head";

// Blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Les Tendances Maquillage de l'Automne 2023",
    excerpt:
      "Découvrez les palettes de couleurs et techniques qui définiront cette saison.",
    date: "15 Septembre 2023",
    author: "Sophie Laurent",
    category: "Maquillage",
    readTime: "5 min de lecture",
    image: "/blog/autumn-trends.jpg",
    content: `
      <p>L'automne 2023 apporte avec lui une palette de couleurs riche et des techniques innovantes qui redéfinissent le maquillage. Des tons bordeaux aux fumés verts, découvrez les tendances qui domineront cette saison.</p>
      
      <h3>Les couleurs phares</h3>
      <p>Les nuances de bordeaux, de prune et de vert profond sont incontournables cette saison. Ces couleurs apportent profondeur et caractère à tous les looks.</p>
      
      <h3>Les techniques à maîtriser</h3>
      <p>Le "strobing" subtil et le contouring naturel restent de mise, avec une préférence pour des finitions plus naturelles et lumineuses.</p>
      
      <p>Continuez votre lecture pour découvrir comment adapter ces tendances à votre routine beauté quotidienne!</p>
    `,
  },
  {
    id: 2,
    title: "Soins de la Peau : Routine Matinale Essentielle",
    excerpt:
      "Les étapes incontournables pour préparer votre peau à affronter la journée.",
    date: "10 Septembre 2023",
    author: "Marc Dubois",
    category: "Soins",
    readTime: "7 min de lecture",
    image: "/blog/morning-routine.jpg",
    content: `
      <p>Une routine matinale efficace est essentielle pour protéger et préparer votre peau aux agressions quotidiennes. Découvrez les étapes clés pour une peau radieuse tout au long de la journée.</p>
      
      <h3>Nettoyage en douceur</h3>
      <p>Commencez par un nettoyant doux qui élimine les impuretés sans agresser la barrière cutanée. Privilégiez les textures gel ou lait selon votre type de peau.</p>
      
      <h3>Hydratation ciblée</h3>
      <p>Appliquez une crème hydratante adaptée à vos besoins spécifiques. Les peaux sèches opteront pour des textures riches, tandis que les peaux grasses préféreront des formulations légères.</p>
      
      <h3>Protection solaire indispensable</h3>
      <p>Terminez toujours avec une protection SPF, même par temps nuageux. C'est la meilleure protection contre le vieillissement prématuré.</p>
    `,
  },
  {
    id: 3,
    title: "Les Ingrédients Naturels à Privilégier",
    excerpt:
      "Focus sur les composants biologiques qui révolutionnent la cosmétique.",
    date: "5 Septembre 2023",
    author: "Élise Martin",
    category: "Naturel",
    readTime: "6 min de lecture",
    image: "/blog/natural-ingredients.jpg",
    content: `
      <p>La cosmétique naturelle continue de gagner du terrain, portée par des ingrédients aux propriétés remarquables. Tour d'horizon des composants à privilégier pour une beauté plus verte.</p>
      
      <h3>L'huile de jojoba</h3>
      <p>Excellente pour tous les types de peau, l'huile de jojoba régule la production de sébum et possède une composition proche de celle du sébum humain.</p>
      
      <h3>L'aloe vera</h3>
      <p>Apaisant, hydratant et régénérant, l'aloe vera est un incontournable pour calmer les irritations et hydrater en profondeur.</p>
      
      <h3>L'argile</h3>
      <p>Purifiante et absorbante, l'argile est idéale pour les masques détoxifiants. Chaque couleur d'argile possède des propriétés spécifiques.</p>
    `,
  },
  {
    id: 4,
    title: "L'Impact de la Nutrition sur la Beauté de la Peau",
    excerpt:
      "Comment votre alimentation influence directement votre apparence.",
    date: "28 Août 2023",
    author: "Dr. Claire Vincent",
    category: "Nutrition",
    readTime: "8 min de lecture",
    image: "/blog/nutrition-impact.jpg",
    content: `
      <p>Votre assiette est votre première routine beauté. Découvrez comment certains aliments peuvent transformer l'apparence de votre peau de l'intérieur.</p>
      
      <h3>Les antioxydants</h3>
      <p>Présents dans les fruits rouges, le thé vert et les légumes colorés, les antioxydants luttent contre le vieillissement cellulaire causé par les radicaux libres.</p>
      
      <h3>Les acides gras essentiels</h3>
      <p>Les oméga-3 et oméga-6, que l'on trouve dans les poissons gras, les noix et les graines, maintiennent l'hydratation cutanée et préservent l'intégrité de la barrière lipidique.</p>
      
      <h3>Les vitamines essentielles</h3>
      <p>La vitamine C stimule la production de collagène, la vitamine E protège des dommages oxydatifs, et la vitamine A favorise le renouvellement cellulaire.</p>
    `,
  },
  {
    id: 5,
    title: "Techniques de Massage Anti-Âge",
    excerpt:
      "Apprenez les gestes professionnels pour préserver la jeunesse de votre peau.",
    date: "20 Août 2023",
    author: "Thomas Leroy",
    category: "Soins",
    readTime: "5 min de lecture",
    image: "/blog/anti-aging.jpg",
    content: `
      <p>Un massage facial pratiqué régulièrement peut significativement améliorer l'aspect de votre peau. Découvrez les techniques utilisées par les professionnels.</p>
      
      <h3>Le drainage lymphatique</h3>
      <p>Cette technique douce stimule la circulation lymphatique, réduit les poches et favorise l'élimination des toxines.</p>
      
      <h3>Le modelage musculaire</h3>
      <p>En travaillant les muscles faciaux, on tonifie les tissus et on prévient l'affaissement cutané.</p>
      
      <h3>Les pressions ponctuelles</h3>
      <p>En stimulant des points précis du visage, on active la microcirculation et on relance la production de collagène.</p>
    `,
  },
  {
    id: 6,
    title: "Le Guide des Parfums et Their Composition",
    excerpt:
      "Comment sont créées les fragrances et comment choisir celle qui vous correspond.",
    date: "12 Août 2023",
    author: "Jean Moreau",
    category: "Parfum",
    readTime: "9 min de lecture",
    image: "/blog/fragrance-guide.jpg",
    content: `
      <p>Un parfum est bien plus qu'une simple fragrance - c'est une composition complexe qui évolue avec le temps. Apprenez à décrypter les notes et à choisir celle qui vous correspond.</p>
      
      <h3>Les notes de tête</h3>
      <p>Ce sont les premières impressions, volatiles et légères, qui durent environ 15 minutes. Elles donnent la première impression du parfum.</p>
      
      <h3>Les notes de cœur</h3>
      <p>Elle constituent le corps du parfum et émergent une fois les notes de tête évaporées. Elles durent plusieurs heures et représentent le caractère principal du parfum.</p>
      
      <h3>Les notes de fond</h3>
      <p>Ce sont les notes les plus persistantes, qui peuvent durer jusqu'à 24 heures. Elles forment la base olfactive et fixent l'ensemble de la composition.</p>
    `,
  },
];

const categories = [
  "Tous",
  "Maquillage",
  "Soins",
  "Naturel",
  "Nutrition",
  "Parfum",
];
const popularPosts = blogPosts.slice(0, 3);

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "Tous" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (selectedPost) {
    return (
      <div>
        <Head>
          <title>Blog - Association de Cosmétologie</title>
          <meta name="description" content="Articles et actualités de l'Association de Cosmétologie" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        
        <main className="min-h-screen bg-blue-50 py-12">
          <div className="container mx-auto px-4">
            {/* Back button */}
            <div className="w-full py-4">
              <button
                onClick={() => setSelectedPost(null)}
                className="flex items-center gap-2 text-blue-800 font-medium"
              >
                <FaArrowLeft /> Retour au blog
              </button>
            </div>

            {/* Blog post detail */}
            <article className="w-full max-w-4xl mx-auto py-8">
              <div className="mb-6">
                <span className="px-3 py-1 bg-blue-800 text-white rounded-full text-sm">
                  {selectedPost.category}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">
                {selectedPost.title}
              </h1>

              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-1">
                  <FaUser className="text-sm" />
                  <span>{selectedPost.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCalendarAlt className="text-sm" />
                  <span>{selectedPost.date}</span>
                </div>
                <div>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="bg-gray-200 aspect-video rounded-lg mb-8 flex items-center justify-center">
                <span className="text-gray-500">Image {selectedPost.id}</span>
              </div>

              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              ></div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-blue-800">
                  À propos de l'auteur
                </h3>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-800 font-semibold">{selectedPost.author.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-blue-800">{selectedPost.author}</h4>
                    <p className="text-gray-600">
                      Expert en cosmétologie et passionné par les innovations
                      beauté.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Blog - Association de Cosmétologie</title>
        <meta name="description" content="Articles et actualités de l'Association de Cosmétologie" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          {/* Blog Header */}
          <section className="w-full py-12 mb-8 text-center">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">Blog Beauté</h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Découvrez les dernières tendances, conseils d'experts et actualités
              du monde de la cosmétique.
            </p>
          </section>

          {/* Search and Filter */}
          <section className="w-full max-w-4xl mx-auto mb-12">
            <div className="flex sm:flex-row flex-col gap-4 items-center justify-between mb-8">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Rechercher un article..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              <div className="flex items-center gap-2">
                <BiSolidCategory className="text-blue-800" />
                <select
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="bg-gray-200 aspect-video flex items-center justify-center">
                    <span className="text-gray-500">Image {post.id}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="px-3 py-1 bg-blue-800 text-white rounded-full text-sm">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xl text-blue-800 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-800 text-sm font-semibold">{post.author.charAt(0)}</span>
                        </div>
                        <span className="text-sm text-gray-600">
                          {post.author}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">
                  Aucun article ne correspond à votre recherche.
                </p>
              </div>
            )}
          </section>

          {/* Popular Posts */}
          <section className="w-full max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
              Articles Populaires
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {popularPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="bg-gray-200 aspect-video flex items-center justify-center">
                    <span className="text-gray-500">Image {post.id}</span>
                  </div>
                  <div className="p-4">
                    <span className="px-2 py-1 bg-blue-800 text-white rounded-full text-xs">
                      {post.category}
                    </span>
                    <h3 className="font-semibold text-lg text-blue-800 mt-2 mb-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Categories */}
          <section className="w-full max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
              Parcourir par Catégorie
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories
                .filter((cat) => cat !== "Tous")
                .map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedCategory === category
                        ? "bg-blue-800 text-white"
                        : "bg-white text-blue-800 hover:bg-blue-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
            </div>
          </section>

          {/* Newsletter Subscription */}
          <section className="w-full bg-blue-800 rounded-lg p-8 text-center text-white mb-12">
            <h2 className="text-2xl font-semibold mb-4">Restez informé</h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter pour recevoir les actualités de l'association, 
              les invitations à nos événements et les dernières innovations du secteur.
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
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}