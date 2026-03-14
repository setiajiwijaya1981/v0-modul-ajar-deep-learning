import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  Query,
  QueryConstraint,
  Firestore,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { COLLECTIONS, MODULE_STATUS, USER_ROLES, ModuleComponent } from './collections';

// Type definitions
export interface User {
  uid: string;
  email: string;
  name: string;
  role: typeof USER_ROLES[keyof typeof USER_ROLES];
  school?: string;
  subject?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  photoURL?: string;
}

export interface ModuleContent {
  [key: string]: any;
}

export interface Module {
  id: string;
  title: string;
  slug: string;
  description?: string;
  status: typeof MODULE_STATUS[keyof typeof MODULE_STATUS];
  authorId: string;
  schoolId?: string;
  subject: string;
  phase: string;
  grade: number;
  theme?: string;
  duration?: number;
  content: ModuleContent;
  completedComponents: ModuleComponent[];
  cpTpReferences?: string[];
  tags?: string[];
  viewCount: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  publishedAt?: Timestamp;
}

export interface MasterCP {
  id: string;
  code: string;
  phase: string;
  subject: string;
  description: string;
  dimensions?: string[];
  createdAt: Timestamp;
}

export interface MasterTP {
  id: string;
  code: string;
  cpId: string;
  description: string;
  indicators?: string[];
  createdAt: Timestamp;
}

export interface SharedModule {
  id: string;
  moduleId: string;
  ownerId: string;
  sharedWith: string[];
  permissions: 'view' | 'edit' | 'comment';
  createdAt: Timestamp;
}

export interface Comment {
  id: string;
  moduleId: string;
  userId: string;
  userName?: string;
  content: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// User operations
export async function getUser(uid: string): Promise<User | null> {
  const docRef = doc(db, COLLECTIONS.USERS, uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as User) : null;
}

export async function createUser(uid: string, userData: Omit<User, 'uid'>): Promise<void> {
  const userRef = doc(db, COLLECTIONS.USERS, uid);
  await setDoc(userRef, {
    uid,
    ...userData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
}

export async function updateUser(uid: string, updates: Partial<User>): Promise<void> {
  const userRef = doc(db, COLLECTIONS.USERS, uid);
  await updateDoc(userRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

// Module operations
export async function createModule(userId: string, moduleData: Omit<Module, 'id' | 'createdAt' | 'updatedAt' | 'viewCount'>): Promise<string> {
  const modulesRef = collection(db, COLLECTIONS.MODULES);
  const docRef = doc(modulesRef);
  
  await setDoc(docRef, {
    ...moduleData,
    authorId: userId,
    viewCount: 0,
    completedComponents: [],
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  
  return docRef.id;
}

export async function getModule(moduleId: string): Promise<Module | null> {
  const docRef = doc(db, COLLECTIONS.MODULES, moduleId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Module) : null;
}

export async function updateModule(moduleId: string, updates: Partial<Module>): Promise<void> {
  const moduleRef = doc(db, COLLECTIONS.MODULES, moduleId);
  await updateDoc(moduleRef, {
    ...updates,
    updatedAt: Timestamp.now(),
  });
}

export async function deleteModule(moduleId: string): Promise<void> {
  const moduleRef = doc(db, COLLECTIONS.MODULES, moduleId);
  await deleteDoc(moduleRef);
}

export async function getUserModules(userId: string, constraints: QueryConstraint[] = []): Promise<Module[]> {
  const modulesRef = collection(db, COLLECTIONS.MODULES);
  const q = query(
    modulesRef,
    where('authorId', '==', userId),
    orderBy('createdAt', 'desc'),
    ...constraints
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Module));
}

export async function getPublishedModules(constraints: QueryConstraint[] = []): Promise<Module[]> {
  const modulesRef = collection(db, COLLECTIONS.MODULES);
  const q = query(
    modulesRef,
    where('status', '==', MODULE_STATUS.PUBLISHED),
    orderBy('publishedAt', 'desc'),
    ...constraints
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Module));
}

export async function searchModules(searchTerm: string, constraints: QueryConstraint[] = []): Promise<Module[]> {
  const modulesRef = collection(db, COLLECTIONS.MODULES);
  // Note: For full-text search, consider using Algolia or implementing indexed search
  const q = query(
    modulesRef,
    where('status', '==', MODULE_STATUS.PUBLISHED),
    ...constraints
  );
  
  const snapshot = await getDocs(q);
  const allModules = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Module));
  
  // Client-side filtering - for production, use Firestore full-text search or Algolia
  return allModules.filter(m => 
    m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Master Data operations
export async function getMasterCP(cpId: string): Promise<MasterCP | null> {
  const docRef = doc(db, COLLECTIONS.MASTER_CP, cpId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as MasterCP) : null;
}

export async function getMasterCPs(constraints: QueryConstraint[] = []): Promise<MasterCP[]> {
  const cpRef = collection(db, COLLECTIONS.MASTER_CP);
  const q = query(cpRef, ...constraints);
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as MasterCP);
}

export async function getMasterTPs(cpId: string): Promise<MasterTP[]> {
  const tpRef = collection(db, COLLECTIONS.MASTER_TP);
  const q = query(tpRef, where('cpId', '==', cpId));
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data() as MasterTP);
}

// Comment operations
export async function addComment(moduleId: string, userId: string, content: string, userName?: string): Promise<string> {
  const commentsRef = collection(db, COLLECTIONS.COMMENTS);
  const docRef = doc(commentsRef);
  
  await setDoc(docRef, {
    moduleId,
    userId,
    userName,
    content,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  
  return docRef.id;
}

export async function getModuleComments(moduleId: string): Promise<Comment[]> {
  const commentsRef = collection(db, COLLECTIONS.COMMENTS);
  const q = query(
    commentsRef,
    where('moduleId', '==', moduleId),
    orderBy('createdAt', 'desc')
  );
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment));
}

// Sharing operations
export async function shareModule(moduleId: string, ownerId: string, sharedWithUserIds: string[], permission: 'view' | 'edit' | 'comment'): Promise<string> {
  const sharedRef = collection(db, COLLECTIONS.SHARED_MODULES);
  const docRef = doc(sharedRef);
  
  await setDoc(docRef, {
    moduleId,
    ownerId,
    sharedWith: sharedWithUserIds,
    permissions: permission,
    createdAt: Timestamp.now(),
  });
  
  return docRef.id;
}

export async function getSharedModules(userId: string): Promise<Module[]> {
  const sharedRef = collection(db, COLLECTIONS.SHARED_MODULES);
  const q = query(sharedRef, where('sharedWith', 'array-contains', userId));
  
  const snapshot = await getDocs(q);
  const sharedData = snapshot.docs.map(doc => doc.data() as SharedModule);
  
  // Fetch actual modules
  const modules: Module[] = [];
  for (const share of sharedData) {
    const module = await getModule(share.moduleId);
    if (module) modules.push(module);
  }
  
  return modules;
}

export { Timestamp };
