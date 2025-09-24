'use client'
import React, { useState } from 'react'

const Test = () => {
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testConnection = async () => {
    setLogs([]);
    addLog('🚀 Début du test de connexion...');

    // Test 1: Ping simple du serveur
    try {
      addLog('🔍 Test 1: Ping du serveur...');
      const pingResponse = await fetch('http://localhost:3000', {
        method: 'GET',
        mode: 'no-cors'
      });
      addLog('✅ Serveur répond au ping');
    } catch (error) {
      addLog('❌ Serveur inaccessible', 'error');
    }

    // Test 2: Test de l'endpoint API
    try {
      addLog('🔍 Test 2: Test de l\'endpoint API...');
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'OPTIONS', // Méthode OPTIONS pour tester CORS
        mode: 'cors'
      });
      addLog('✅ Endpoint API accessible');
    } catch (error) {
      addLog('❌ Endpoint API inaccessible - ' + error.message, 'error');
    }

    // Test 3: Requête POST complète
    try {
      addLog('🔍 Test 3: Envoi de la requête POST...');
      
      const response = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: 'john@example.com',
          password: 'password123'
        })
      });

      addLog(`📊 Status: ${response.status} ${response.statusText}`);

      if (response.ok) {
        const data = await response.json();
        addLog('✅ Connexion réussie!');
        addLog(`🔑 Token: ${data.data.accessToken.substring(0, 20)}...`);
      } else {
        const errorText = await response.text();
        addLog(`❌ Erreur serveur: ${errorText}`, 'error');
      }

    } catch (error) {
      addLog(`❌ Erreur fetch: ${error.message}`, 'error');
      addLog('💡 Vérifiez que le serveur backend est démarré sur le port 3000', 'info');
    }

    // Test 4: Test avec curl command (simulation)
    addLog('🔍 Test 4: Commande curl équivalente:');
    addLog('curl -X POST http://localhost:3000/api/auth/signin \\');
    addLog('  -H "Content-Type: application/json" \\');
    addLog('  -d \'{"email":"john@example.com","password":"password123"}\'');
  };

  const testWithDifferentMethods = async () => {
    addLog('🔄 Test avec différentes méthodes...');

    // Méthode 1: XMLHttpRequest (ancienne méthode)
    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/api/auth/signin');
      xhr.setRequestHeader('Content-Type', 'application/json');
      
      xhr.onload = function() {
        if (xhr.status === 200) {
          addLog('✅ XMLHttpRequest fonctionne!');
        } else {
          addLog(`❌ XMLHttpRequest erreur: ${xhr.status}`, 'error');
        }
      };
      
      xhr.onerror = function() {
        addLog('❌ XMLHttpRequest erreur réseau', 'error');
      };
      
      xhr.send(JSON.stringify({
        email: 'john@example.com',
        password: 'password123'
      }));
    } catch (error) {
      addLog('❌ XMLHttpRequest failed', 'error');
    }
  };

  const clearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔧 Diagnostic de connexion API</h1>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={testConnection}
          className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🚀 Tester la connexion
        </button>
        
        <button 
          onClick={testWithDifferentMethods}
          className="p-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          🔄 Méthodes alternatives
        </button>
        
        <button 
          onClick={clearLogs}
          className="p-3 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          🧹 Effacer les logs
        </button>
      </div>

      <div className="mb-6 p-4 bg-yellow-100 border border-yellow-300 rounded">
        <h2 className="font-bold text-yellow-800">⚠️ Problèmes possibles :</h2>
        <ul className="list-disc list-inside text-sm text-yellow-700 mt-2">
          <li>Serveur backend non démarré</li>
          <li>Port 3000 occupé par autre chose</li>
          <li>Firewall/antivirus bloque la connexion</li>
          <li>Problème de réseau local</li>
          <li>API écoute sur une autre URL</li>
        </ul>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">📋 Logs de diagnostic :</h2>
        <div className="h-96 overflow-y-auto bg-black text-white p-4 font-mono text-sm">
          {logs.length === 0 ? (
            <div className="text-gray-400">Cliquez sur "Tester la connexion" pour commencer...</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} className={`mb-1 ${log.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                [{log.timestamp}] {log.message}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded">
        <h3 className="font-bold mb-2">🔍 Vérifications manuelles :</h3>
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>Ouvrez un terminal et tapez : <code>curl http://localhost:3000</code></li>
          <li>Vérifiez que le serveur tourne : <code>netstat -an | grep 3000</code></li>
          <li>Testez dans le navigateur : <a href="http://localhost:3000" target="_blank" className="text-blue-600">http://localhost:3000</a></li>
          <li>Redémarrez le serveur backend</li>
          <li>Vérifiez les logs du serveur backend</li>
        </ol>
      </div>
    </div>
  )
}

export default Test;