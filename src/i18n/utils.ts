import { ui, defaultLang, showDefaultLang, routes } from './ui';


export function getLangFromUrl(url: URL) {
  // Asegurarnos de que la URL contiene el prefijo '/credentials/'
	const [, , lang] = url.pathname.split('/'); // Ahora usamos '/credentials/lang/...'
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return ui[lang][key] || ui[defaultLang][key];
	};
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    //console.log("Current language:", l);  // Depuración
    //console.log("Path to translate:", path);  // Depuración
    //console.log("Routes for current language:", routes[l as keyof typeof routes]);  // Depuración
    const pathName = path.replaceAll('/', '');
    const hasTranslation = defaultLang !== l && (routes[l as keyof typeof routes] as Record<string, string>) !== undefined && (routes[l as keyof typeof routes] as Record<string, string>)[pathName] !== undefined
    const translatedPath = hasTranslation ? '/' + (routes[l as keyof typeof routes] as Record<string, string>)[pathName] : path;

    // Aquí agregamos el prefijo de la base de URL ("/credenciales")
    const baseUrl = "/credentials"

    return !showDefaultLang && l === defaultLang 
      ? baseUrl + translatedPath 
      : `${baseUrl}/${l}${translatedPath}`

    //return !showDefaultLang && l === defaultLang ? translatedPath : `/${l}${translatedPath}`
    
  }
}


export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname?.split('/');
  const path = parts.pop() || parts.pop();

  if (path === undefined) {
    return undefined;
  }

  const currentLang = getLangFromUrl(url);

  if (defaultLang === currentLang) {
    const route = Object.values(routes)[0];
    return route[path as keyof typeof route] !== undefined ? route[path as keyof typeof route] : undefined;
  }

  const getKeyByValue = (obj: Record<string, string>, value: string): string | undefined  => {
      return Object.keys(obj).find((key) => obj[key] === value);
  }

  const reversedKey = getKeyByValue(routes[currentLang], path);

  if (reversedKey !== undefined) {
    return reversedKey;
  }

  return undefined;
}