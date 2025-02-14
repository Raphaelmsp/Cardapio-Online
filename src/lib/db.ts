/* eslint-disable @typescript-eslint/no-explicit-any */
import { openDB } from 'idb';

const dbName = 'cardapioDigitalDB';
const dbVersion = 4;

export const initDB = async () => {
  const db = await openDB(dbName, dbVersion, {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    upgrade(db, _oldVersion) {
      if (!db.objectStoreNames.contains('mainDishes')) {
        const mainDishesStore = db.createObjectStore('mainDishes', { keyPath: 'id', autoIncrement: true });
        // Add default main dishes
        const mainDishes = [
          {
            name: 'Feijoada Completa',
            description: 'Feijoada tradicional com arroz, couve e farofa',
            imageUrl: 'https://acarnequeomundoprefere.com.br/uploads/media/image/frimesa-receitas-eisbein-1.jpg',
            dayOfWeek: 'Segunda-feira'
          },
          {
            name: 'Frango Grelhado',
            description: 'Filé de frango grelhado com arroz e legumes',
            imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d',
            dayOfWeek: 'Terça-feira'
          },
          {
            name: 'Peixe ao Molho',
            description: 'Filé de peixe ao molho de ervas com purê',
            imageUrl: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62',
            dayOfWeek: 'Quarta-feira'
          },
          {
            name: 'Bife à Parmegiana',
            description: 'Bife à parmegiana com arroz e batata frita',
            imageUrl: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8',
            dayOfWeek: 'Quinta-feira'
          },
          {
            name: 'Lasanha à Bolonhesa',
            description: 'Lasanha tradicional com molho à bolonhesa',
            imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3',
            dayOfWeek: 'Sexta-feira'
          },
          {
            name: 'Picanha Grelhada',
            description: 'Picanha grelhada com arroz, feijão e vinagrete',
            imageUrl: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659',
            dayOfWeek: 'Sábado'
          },
          // {
          //   name: 'Picanha',
          //   description: 'Picanha grelhada com arroz, feijão e vinagrete',
          //   imageUrl: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659',
          //   dayOfWeek: 'Domingo'
          // }
        ];
        
        for (const dish of mainDishes) {
          mainDishesStore.add(dish);
        }
      }
      
      if (!db.objectStoreNames.contains('optionalDishes')) {
        db.createObjectStore('optionalDishes', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('orders')) {
        db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('admin')) {
        const adminStore = db.createObjectStore('admin', { keyPath: 'id' });
        adminStore.put({
          id: 1,
          username: 'refe.benito',
          password: 'n36e#a*#ku;+62g'
        });
      }
    },
  });
  return db;
};

export const addOptionalDish = async (item: any) => {
  const db = await initDB();
  return db.add('optionalDishes', item);
};

export const updateOptionalDish = async (id: number, item: any) => {
  const db = await initDB();
  return db.put('optionalDishes', { ...item, id });
};

export const updateMainDish = async (id: number, item: any) => {
  const db = await initDB();
  return db.put('mainDishes', { ...item, id });
};

export const getMainDishes = async () => {
  const db = await initDB();
  return db.getAll('mainDishes');
};

export const getOptionalDishes = async () => {
  const db = await initDB();
  return db.getAll('optionalDishes');
};

export const addOrder = async (order: any) => {
  const db = await initDB();
  return db.add('orders', order);
};

export const getOrders = async () => {
  const db = await initDB();
  return db.getAll('orders');
};

export const verifyAdmin = async (username: string, password: string) => {
  const db = await initDB();
  const admin = await db.get('admin', 1);
  
  if (!admin) {
    return false;
  }
  
  // const hashPassword = async (str: string) => {
  //   const msgBuffer = new TextEncoder().encode(str);
  //   const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  //   const hashArray = Array.from(new Uint8Array(hashBuffer));
  //   return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  // };
  
  // const hashedPassword = await hashPassword(password);
  return admin.username === username && admin.password === password;
};