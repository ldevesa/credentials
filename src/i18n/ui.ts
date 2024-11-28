/* export const languages: Record<string,{ code: string; name: string; }> = {
    es: {
      code: 'es',
      name: 'Español',
    },
    en: {
      code: 'en',
      name: 'English'},
  }; */

  export const languages = {
    es: "Español",
    en: "Ingles",
    pt: "Português",
}

export const defaultLang = 'es';
export const showDefaultLang = true;

export const ui = {
  es: {
    'nav.idioma': 'Seleccioná tu país:',
    'nav.inicio': 'Inicio',
    'nav.nosotros': 'Nosotros',
    'nav.clientes': 'Clientes',
    'nav.categorias': 'Categorías',
    'nav.blog': 'Notas',
    /*'nav.red': 'Red Gestionar', */
    'nav.servicios': 'Servicios',
    'nav.cobertura': 'Cobertura',
    'nav.casos': 'Casos',
    'nav.especiales': 'Especiales',
  },
  en: {
    'nav.idioma': 'Select your country:',
    'nav.inicio': 'Home',
    'nav.nosotros': 'About Us',
    'nav.clientes': 'Clients',
    'nav.categorias': 'Categories',
    'nav.blog': 'Blog',
    /*'nav.red': 'Red Gestionar', */
    'nav.servicios': 'Services',
    'nav.cobertura': 'Reach',
    'nav.casos': 'Cases',
    'nav.especiales': 'Specials',
  },
  pt: {
    'nav.idioma': 'Select your country:',
    'nav.inicio': 'Casa',
    'nav.nosotros': 'Nós',
    'nav.clientes': 'Clientes',
    'nav.categorias': 'Categorias',
    'nav.blog': 'Blog',
    /*'nav.red': 'Red Gestionar', */
    'nav.servicios': 'Serviços',
    'nav.cobertura': 'Cobertura',
    'nav.casos': 'Casos',
    'nav.especiales': 'Especiais',
  },
} as const;

export const routes = {
  es: {
    'inicio': 'inicio',
    'nosotros': 'nosotros',
    'clientes': 'clientes',
    'categorias': 'categorias',
    'blog': 'blog',
    /*'red': 'red', */
    'servicios': 'servicios',
    'cobertura': 'cobertura',
    'casos': 'casos',
    'especiales': 'especiales',
    'index': 'index',
    'selector': 'selector',
  },
  en: {
    'inicio': 'home',
    'nosotros': 'about-us',
    'clientes': 'clients',
    'categorias': 'categories',
    'blog': 'blog',
    /*'red': 'red', */
    'servicios': 'services',
    'cobertura': 'reach',
    'casos': 'cases',
    'especiales': 'specials',
    'index': 'index',
    'selector': 'selector',
  },
  pt: {
    'inicio': 'casa',
    'nosotros': 'nos',
    'clientes': 'clientes',
    'categorias': 'categorias',
    'blog': 'blog',
    /*'red': 'red', */
    'servicios': 'servicos',
    'cobertura': 'cobertura',
    'casos': 'casos',
    'especiales': 'especiais',
    'index': 'index',
    'selector': 'selector',
  },
};