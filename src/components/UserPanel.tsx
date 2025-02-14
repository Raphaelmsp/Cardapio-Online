/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useMenuStore } from '../store/menuStore';
import { useBusinessHoursStore } from '../store/businessHoursStore';
import { Soup, Send, Clock } from 'lucide-react';
import backgroundFood from '../assets/background-food.png'; // Importando a imagem

export default function UserPanel() {
  const { mainDishes, optionalDishes, loadMainDishes, loadOptionalDishes, addOrder } = useMenuStore();
  const { openingTime, closingTime, isOpen } = useBusinessHoursStore();
  const [cart, setCart] = useState<any[]>([]);
  const [userData, setUserData] = useState({
    name: '',
    registration: '',
    observations: '',
  });
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

  useEffect(() => {
    loadMainDishes();
    loadOptionalDishes();
  }, [loadMainDishes, loadOptionalDishes]);

  const addToCart = (item: any) => {
    if (!cart.some(cartItem => cartItem.id === item.id)) {
      setCart([...cart, item]);
    }
  };

  const removeFromCart = (itemId: number) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderData = {
      ...userData,
      items: cart,
      date: new Date(),
    };

    await addOrder(orderData);
    
    setCart([]);
    setUserData({ name: '', registration: '', observations: '' });

    // Exibe o pop-up de sucesso
    setIsSuccessModalVisible(true);

    // Fecha o pop-up após 3 segundos
    setTimeout(() => {
      setIsSuccessModalVisible(false);
    }, 3000);
  };

  const currentDay = new Date().toLocaleDateString('pt-BR', { weekday: 'long' });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Permite apenas letras e espaços
    setUserData({ ...userData, name: value });
  };

  const handleObservationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Permite apenas letras e espaços
    setUserData({ ...userData, observations: value });
  };

  const handleRegistrationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Permite apenas números
    if (value.length <= 4) {
      setUserData({ ...userData, registration: value });
    }
  };

  if (!isOpen()) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Restaurante Fechado</h1>
          <p className="text-gray-600 mb-4">
            Nosso horário de funcionamento é de segunda a sábado, das {openingTime} às {closingTime}.
          </p>
          <p className="text-sm text-gray-500">
            Por favor, retorne durante nosso horário de funcionamento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-screen bg-gray-100">
        {/* Pop-up de Sucesso */}
        {isSuccessModalVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 text-center max-w-sm mx-auto">
              <h2 className="text-lg font-semibold text-green-700">Pedido Realizado com Sucesso!</h2>
              <p className="text-sm text-green-600 mt-2">Seu pedido foi enviado com sucesso. Agradecemos por escolher nosso restaurante!</p>
            </div>
          </div>
        )}

        <div className="w-full h-48 relative overflow-hidden mb-8">
          <img
            src={backgroundFood}
            alt="Restaurante"
            className="w-full max-h-screen object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">Cardápio Cinbal VR</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Pratos Principais da Semana</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mainDishes.map((dish) => (
                  <div key={dish.id} className="border rounded-lg overflow-hidden">
                    {dish.imageUrl && (
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={dish.imageUrl}
                          alt={dish.name}
                          className="w-full h-full object-cover rounded-lg" // Borda arredondada aplicada aqui
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold">{dish.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
                      <p className="text-sm font-medium text-blue-600">
                        {dish.dayOfWeek === currentDay ? '(Hoje)' : dish.dayOfWeek}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Opções Adicionais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {optionalDishes.map((item) => (
                  <div key={item.id} className="border rounded-lg overflow-hidden">
                    {item.imageUrl && (
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg" // Borda arredondada aplicada aqui também
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                      <p className="text-sm font-medium text-blue-600 mb-2">{item.dayOfWeek}</p>
                      <button
                        onClick={() => addToCart(item)}
                        className="mt-2 bg-blue-600 text-white py-1 px-3 rounded text-sm hover:bg-blue-700"
                        disabled={cart.some(cartItem => cartItem.id === item.id)}
                      >
                        {cart.some(cartItem => cartItem.id === item.id) 
                          ? 'Opção adicionada'
                          : 'Adicionar Opção'
                        }
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Soup className="w-6 h-6" />
                Opção escolhida
              </h2>

              {cart.length === 0 ? (
                <p className="text-gray-500">Sem escolha de opções no momento!</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        {item.imageUrl && (
                          <div className="w-16 h-16 mr-4">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover rounded-lg" // Borda arredondada aplicada
                            />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-blue-600">{item.dayOfWeek}</p> {/* Exibe o dia abaixo do nome do item */}
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remover
                      </button>
                    </div>
                  ))}
                  
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Nome</label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={handleNameChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Matrícula</label>
                      <input
                        type="text"
                        value={userData.registration}
                        onChange={handleRegistrationChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Observações</label>
                      <textarea
                        value={userData.observations}
                        onChange={handleObservationsChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Finalizar Pedido
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
