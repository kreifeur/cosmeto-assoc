"use client";

import { useState, useEffect } from "react";
import AdminTabs from "./components/AdminTabs";
import OverviewTab from "./components/OverviewTab";
import EventsTab from "./components/EventsTab";
import MembersTab from "./components/MembersTab";
import ContentTab from "./components/ContentTab";
import FinancesTab from "./components/FinancesTab";
import ReportsTab from "./components/ReportsTab";
import UserMenu from "./components/UserMenu";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    pendingMembers: 0,
    totalEvents: 0,
    upcomingEvents: 0,
    totalResources: 0,
    newMessages: 0,
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);

  // Charger les données au démarrage
  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));

      setStats({
        totalMembers: 247,
        activeMembers: 192,
        pendingMembers: 15,
        totalEvents: 42,
        upcomingEvents: 5,
        totalResources: 128,
        newMessages: 23,
      });

      setRecentActivities([
        {
          id: 1,
          user: "Sophie Leroy",
          action: "Nouvelle inscription",
          time: "Il y a 10 min",
          type: "registration",
        },
        {
          id: 2,
          user: "Pierre Martin",
          action: "A téléchargé un document",
          time: "Il y a 25 min",
          type: "download",
        },
        {
          id: 3,
          user: "Thomas Bernard",
          action: "A modifié son profil",
          time: "Il y a 1 heure",
          type: "profile",
        },
        {
          id: 4,
          user: "Marie Dupont",
          action: "A posté un message",
          time: "Il y a 2 heures",
          type: "message",
        },
        {
          id: 5,
          user: "Lucie Petit",
          action: "A payé sa cotisation",
          time: "Il y a 3 heures",
          type: "payment",
        },
      ]);

      setPendingApprovals([
        {
          id: 1,
          user: "Julie Moreau",
          type: "Nouvelle inscription",
          date: "2023-09-12",
        },
        {
          id: 2,
          user: "Laboratoires Dermatech",
          type: "Adhésion entreprise",
          date: "2023-09-11",
        },
        {
          id: 3,
          user: "Marc Dubois",
          type: "Contenu à modérer",
          date: "2023-09-10",
        },
        {
          id: 4,
          user: "Institut de Beauté",
          type: "Paiement à vérifier",
          date: "2023-09-10",
        },
      ]);
    };

    loadData();
  }, []);

  const renderTabContent = () => {
    const commonProps = {
      stats,
      recentActivities,
      pendingApprovals,
      showEventModal,
      setShowEventModal,
      setStats,
    };

    switch (activeTab) {
      case "members":
        return <MembersTab {...commonProps} />;
      case "content":
        return <ContentTab {...commonProps} />;
      case "events":
        return <EventsTab {...commonProps} />;
      case "finances":
        return <FinancesTab {...commonProps} />;
      case "reports":
        return <ReportsTab {...commonProps} />;
      default:
        return <OverviewTab {...commonProps} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Tableau de Bord Administrateur
          </h1>
          <p className="text-gray-600">
            Gérez votre association et surveillez l'activité des membres
          </p>
        </div>
        {/* <UserMenu /> */}
      </div>

      <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderTabContent()}
    </div>
  );
}
