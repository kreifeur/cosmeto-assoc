'use client'
import React, { useState } from 'react'

const Test = () => {
  const [logs, setLogs] = useState([]);

  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testAllEndpoints = async () => {
    setLogs([]);
    addLog('🔍 Test de tous les endpoints possibles...');

    const endpoints = [
      'http://localhost:3000/',
      'http://localhost:3000/api',
      'http://localhost:3000/api/auth',
      'http://localhost:3000/api/auth/signin',
      'http://localhost:3000/auth/signin',
      'http://localhost:3000/signin',
      'http://127.0.0.1:3000/api/auth/signin',
    ];

    for (const endpoint of endpoints) {
      try {
        addLog(`🔍 Test: ${endpoint}`);
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        addLog(`✅ ${endpoint} - Status: ${response.status}`, 'success');
        
        if (response.ok) {
          try {
            const data = await response.json();
            addLog(`📦 Response: ${JSON.stringify(data).substring(0, 100)}...`);
          } catch {
            addLog('📦 Response: (non JSON)');
          }
        }
        
      } catch (error) {
        addLog(`❌ ${endpoint} - Error: ${error.message}`, 'error');
      }
      
      await new Promise(resolve => setTimeout(resolve, 500)); // Pause entre les tests
    }
  };

  const testPostRequest = async () => {
    addLog('🔍 Test POST sur différents endpoints...');
    
    const endpoints = [
      'http://localhost:3000/api/auth/signin',
      'http://localhost:3000/auth/signin',
      'http://localhost:3000/signin',
      'http://127.0.0.1:3000/api/auth/signin',
    ];

    for (const endpoint of endpoints) {
      try {
        addLog(`📤 POST: ${endpoint}`);
        const response = await fetch(endpoint, {
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

        addLog(`📊 Status: ${response.status}`);
        
        if (response.ok) {
          const data = await response.json();
          addLog(`✅ SUCCESS: ${JSON.stringify(data).substring(0, 100)}...`, 'success');
          break;
        } else {
          const errorText = await response.text();
          addLog(`❌ ERROR: ${errorText.substring(0, 100)}`, 'error');
        }
        
      } catch (error) {
        addLog(`❌ FETCH ERROR: ${error.message}`, 'error');
      }
      
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🔍 Diagnostic des endpoints API</h1>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={testAllEndpoints}
          className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔍 Tester tous les endpoints
        </button>
        
        <button 
          onClick={testPostRequest}
          className="p-3 bg-green-500 text-white rounded hover:bg-green-600"
        >
          📤 Tester les POST
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-bold mb-2">📋 Logs :</h2>
        <div className="h-96 overflow-y-auto bg-black text-white p-4 font-mono text-sm">
          {logs.map((log, index) => (
            <div key={index} className={`mb-1 ${log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-green-400' : 'text-yellow-400'}`}>
              [{log.timestamp}] {log.message}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded">
        <h3 className="font-bold mb-2">💡 Prochaines étapes :</h3>
        <ol className="list-decimal list-inside text-sm space-y-1">
          <li>Vérifiez les routes dans votre fichier backend <code>server.js</code> ou <code>routes/auth.js</code></li>
          <li>Assurez-vous que la route <code>/api/auth/signin</code> est bien définie</li>
          <li>Vérifiez le préfixe des routes API</li>
          <li>Consultez les logs du serveur backend pour voir les requêtes entrantes</li>
        </ol>
      </div>
    </div>
  )
}

export default Test;