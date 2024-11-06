import React from 'react'
import { Droplet, Zap, Shield, Car, Sparkles, Wrench } from 'lucide-react'

const services = [
  { 
    icon: Droplet, 
    name: 'Lavage Basique', 
    description: 'Nettoyage extérieur complet, incluant le lavage de la carrosserie, des jantes et des vitres.', 
    price: '7 500 FCFA',
    details: ['Lavage extérieur', 'Nettoyage des jantes', 'Séchage à la main']
  },
  { 
    icon: Zap, 
    name: 'Lavage Premium', 
    description: "Lavage extérieur et intérieur complet pour une voiture impeccable de l'intérieur à l'extérieur.", 
    price: '12 500 FCFA',
    details: ['Tout du lavage basique', 'Aspiration intérieure', 'Nettoyage des vitres intérieures', 'Traitement des plastiques']
  },
  { 
    icon: Shield, 
    name: 'Lavage Deluxe', 
    description: 'Notre service le plus complet avec protection céramique pour une finition durable et brillante.', 
    price: '25 000 FCFA',
    details: ['Tout du lavage premium', 'Protection céramique', 'Traitement des cuirs', 'Désodorisation']
  },
  {
    icon: Car,
    name: 'Lavage à la main',
    description: 'Un lavage minutieux à la main pour les véhicules nécessitant une attention particulière.',
    price: '17 500 FCFA',
    details: ['Lavage extérieur à la main', 'Séchage soigneux', 'Finition détaillée']
  },
  {
    icon: Sparkles,
    name: 'Polissage',
    description: 'Restaurez l\'éclat de votre peinture avec notre service de polissage professionnel.',
    price: '30 000 FCFA',
    details: ['Correction des micro-rayures', 'Restauration de la brillance', 'Protection de la peinture']
  },
  {
    icon: Wrench,
    name: 'Rénovation des phares',
    description: 'Améliorez la visibilité et l\'apparence de votre véhicule avec notre service de rénovation des phares.',
    price: '20 000 FCFA',
    details: ['Polissage des phares', 'Élimination du jaunissement', 'Application d\'un revêtement protecteur']
  }
]

const Services: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Nos Services de Lavage</h1>
        <p className="text-center text-xl mb-12">Découvrez notre gamme complète de services de lavage automobile, conçus pour répondre à tous vos besoins.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col">
              <service.icon className="w-12 h-12 text-blue-600 mb-4 self-center" />
              <h2 className="text-xl font-semibold mb-2 text-center">{service.name}</h2>
              <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
              <ul className="mb-4">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center mb-1">
                    <Droplet className="w-4 h-4 text-blue-500 mr-2" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
              <p className="text-2xl font-bold text-blue-600 text-center">{service.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services