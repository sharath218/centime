import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      appTitle: 'Financial Flow Visualization',
      addNode: 'Add Node',
      addLink: 'Add Link',
      source: 'Source',
      target: 'Target',
      value: 'Value',
      actions: 'Actions',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
    }
  },
  hi: {
    translation: {
      appTitle: 'वित्तीय प्रवाह विज़ुअलाइज़ेशन',
      addNode: 'नोड जोड़ें',
      addLink: 'लिंक जोड़ें',
      source: 'स्रोत',
      target: 'लक्ष्य',
      value: 'मूल्य',
      actions: 'कार्रवाई',
      delete: 'हटाएं',
      save: 'सहेजें',
      cancel: 'रद्द करें',
    }
  },
  es: {
    translation: {
      appTitle: 'Visualización de Flujo Financiero',
      addNode: 'Agregar Nodo',
      addLink: 'Agregar Enlace',
      source: 'Origen',
      target: 'Destino',
      value: 'Valor',
      actions: 'Acciones',
      delete: 'Eliminar',
      save: 'Guardar',
      cancel: 'Cancelar',
    }
  },
  zh: {
    translation: {
      appTitle: '财务流量可视化',
      addNode: '添加节点',
      addLink: '添加链接',
      source: '来源',
      target: '目标',
      value: '值',
      actions: '操作',
      delete: '删除',
      save: '保存',
      cancel: '取消',
    }
  },
  de: {
    translation: {
      appTitle: 'Finanzfluss-Visualisierung',
      addNode: 'Knoten hinzufügen',
      addLink: 'Verbindung hinzufügen',
      source: 'Quelle',
      target: 'Ziel',
      value: 'Wert',
      actions: 'Aktionen',
      delete: 'Löschen',
      save: 'Speichern',
      cancel: 'Abbrechen',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;