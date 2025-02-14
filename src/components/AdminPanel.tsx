import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMenuStore } from '../store/menuStore';
import { useAuthStore } from '../store/authStore';
import { useBusinessHoursStore } from '../store/businessHoursStore';
import { PlusCircle, ClipboardList, ImageIcon, LogOut, Download, Edit, Clock } from 'lucide-react';
import { jsPDF } from 'jspdf';

const DAYS_OF_WEEK = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado'
  // 'Domingo'
];

function LoginForm() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(credentials.username, credentials.password);
    if (!success) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Administrativo</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Usuário</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

interface Dish {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  dayOfWeek: string;
}


function EditDishModal({ dish, onSave, onClose, isMainDish = false }: { dish: Dish; onSave: (dish: Dish) => void; onClose: () => void; isMainDish?: boolean }) {
  const [formData, setFormData] = useState(dish);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Editar {isMainDish ? 'Prato Principal' : 'Opção'}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL da Imagem</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Dia da Semana</label>
            <select
              value={formData.dayOfWeek}
              onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              {DAYS_OF_WEEK.map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const navigate = useNavigate();
  const { mainDishes, optionalDishes, orders, loadMainDishes, loadOptionalDishes, loadOrders, addOptionalDish, updateMainDish, updateOptionalDish } = useMenuStore();
  const { isAuthenticated, logout } = useAuthStore();
  const { openingTime, closingTime, setHours } = useBusinessHoursStore();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
    dayOfWeek: DAYS_OF_WEEK[0]
  });
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [editingMainDish, setEditingMainDish] = useState<Dish | null>(null);
  const [businessHours, setBusinessHours] = useState({
    opening: openingTime,
    closing: closingTime
  });

  useEffect(() => {
    loadMainDishes();
    loadOptionalDishes();
    loadOrders();
  }, [loadMainDishes, loadOptionalDishes, loadOrders]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addOptionalDish({ ...formData, id: Date.now() });
    setFormData({ name: '', description: '', imageUrl: '', dayOfWeek: DAYS_OF_WEEK[0] });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleBusinessHoursSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHours(businessHours.opening, businessHours.closing);
    alert('Horário de funcionamento atualizado com sucesso!');
  };

  const generateOrdersPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Relatório de Pedidos - Cardápio Digital', 20, 20);
    
    let y = 40;
    orders.forEach((order, index) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setFontSize(14);
      doc.text(`Pedido #${index + 1}`, 20, y);
      y += 10;
      
      doc.setFontSize(12);
      doc.text(`Nome: ${order.name}`, 30, y);
      y += 10;
      doc.text(`Matrícula: ${order.registration}`, 30, y);
      y += 10;
      doc.text(`Data: ${new Date(order.date).toLocaleString()}`, 30, y);
      y += 10;
      
      doc.text('Itens:', 30, y);
      y += 10;
      order.items.forEach(item => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text(`- ${item.name}`, 40, y);
        y += 10;
      });
      
      if (order.observations) {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.text('Observações:', 30, y);
        y += 10;
        doc.text(order.observations, 40, y);
        y += 10;
      }
      
      y += 10;
    });
    
    doc.save('relatorio-pedidos.pdf');
  };

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <div className="flex gap-4">
          <button
            onClick={generateOrdersPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <Download className="w-4 h-4" />
            Baixar Relatório
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Horário de Funcionamento
            </h2>
            
            <form onSubmit={handleBusinessHoursSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Abertura</label>
                  <input
                    type="time"
                    value={businessHours.opening}
                    onChange={(e) => setBusinessHours({ ...businessHours, opening: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Fechamento</label>
                  <input
                    type="time"
                    value={businessHours.closing}
                    onChange={(e) => setBusinessHours({ ...businessHours, closing: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Atualizar Horário
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Pratos Principais</h2>
            <div className="space-y-4">
              {mainDishes.map((dish) => (
                <div key={dish.id} className="border rounded-lg overflow-hidden">
                  {dish.imageUrl && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={dish.imageUrl}
                        alt={dish.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{dish.name}</h3>
                      {/* <button
                        onClick={() => setEditingMainDish(dish)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button> */}
                      <button
  onClick={() => {
    if (dish.id !== undefined) {
      setEditingMainDish(dish);
    } else {
      console.error("Dish id is undefined");
    }
  }}
  className="text-blue-600 hover:text-blue-700"
>
  <Edit className="w-4 h-4" />
</button>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{dish.description}</p>
                    <p className="text-sm font-medium text-blue-600">{dish.dayOfWeek}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <PlusCircle className="w-6 h-6" />
              Adicionar Nova Opção
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  URL da Imagem
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="https://exemplo.com/imagem.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Dia da Semana</label>
                <select
                  value={formData.dayOfWeek}
                  onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                >
                  {DAYS_OF_WEEK.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Adicionar Item
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ClipboardList className="w-6 h-6" />
              Opções do Cardápio
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {optionalDishes.map((item) => (
                <div key={item.id} className="border rounded-lg overflow-hidden">
                  {item.imageUrl && (
                    <div className="aspect-video w-full overflow-hidden">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{item.name}</h3>
                      <button
                        onClick={() => setEditingDish(item)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <p className="text-sm font-medium text-blue-600">{item.dayOfWeek}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ClipboardList className="w-6 h-6" />
            Pedidos Recebidos
          </h2>
          
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold">Pedido #{index + 1}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(order.date).toLocaleString()}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p><strong>Nome:</strong> {order.name}</p>
                  <p><strong>Matrícula:</strong> {order.registration}</p>
                  
                  <div>
                    <strong>Itens:</strong>
                    <ul className="list-disc list-inside ml-4">
                      {order.items.map((item, i) => (
                        <li key={i}>{item.name}</li>
                      ))}
                    </ul>
                  </div>
                  
                  {order.observations && (
                    <div>
                      <strong>Observações:</strong>
                      <p className="text-gray-600">{order.observations}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingDish && (
        <EditDishModal
          dish={editingDish}
          onSave={(updatedDish) => updateOptionalDish(editingDish.id, updatedDish)}
          onClose={() => setEditingDish(null)}
        />
      )}

      {editingMainDish && (
        <EditDishModal
          dish={editingMainDish}
          onSave={(updatedDish) => updateMainDish(editingMainDish.id, updatedDish)}
          onClose={() => setEditingMainDish(null)}
          isMainDish
        />
      )}
    </div>
  );
}